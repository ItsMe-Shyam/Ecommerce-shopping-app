const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const Apifeatures = require("../utils/apifeatures");
const asyncErrorHandler = require("../middleware/asyncError");
const cloudinary = require("cloudinary");

exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLink = [];

  for (i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLink;
  //  we have assigned "req.user.id" in "auth.js" line 13
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  if (!product) {
    return next(new ErrorHandler("unable to add product", 400));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const productCount = await Product.countDocuments();
  const resultPerPage = 10;
  // below "Product.find()" is the query and "req.query" is queryStr
  const apifeature = new Apifeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apifeature.query;

  let allProducts = await Product.find();

  let filteredProductsCount = products.length;

  apifeature.pagination(resultPerPage);

  products = await apifeature.query.clone();

  if (!products) {
    return next(new ErrorHandler("no products found", 404));
  }
  res.status(200).json({
    success: true,
    allProducts,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});

exports.getAllAdminProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product was not found", 404));
  }
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    let imagesLink = [];
    for (i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "product updated successfully",
    product,
  });
});

exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product was not found", 404));
  }
  for (i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("reviews.user");
  if (!product) {
    return next(new ErrorHandler("product was not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// creating product review

exports.addProductReview = asyncErrorHandler(async (req, res, next) => {
  const { rating, comment } = req.body;
  const { productId } = req.params;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  // finding average for Product.averageRating
  let ratingSum = 0;
  product.reviews.forEach((rev) => {
    ratingSum += rev.rating;
  });

  if (ratingSum === 0) {
    product.averageRating = 0;
  } else {
    product.averageRating = ratingSum / product.reviews.length;
  }

  // product.averageRating = ratingSum / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
});

// get all reviews

exports.getAllReviews = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  console.log(product.reviews.user);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  const reviews = product.reviews;

  res.status(200).json({
    success: true,
    reviews,
  });
});

// deleting review

exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
  const { productId, reviewId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== reviewId.toString()
  );

  let rating = 0;
  let averageRating = 0;

  if (reviews.length === 0) {
    rating = 0;
    averageRating = 0;
  } else {
    product.reviews.forEach((rev) => (rating += rev.rating));
    averageRating = avg / reviews.length;
  }
  
  const numberOfReviews = reviews.length;


  await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      averageRating,
      numberOfReviews,
    },
    {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    product,
  });
});
