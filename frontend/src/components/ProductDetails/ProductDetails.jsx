import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  getProductDetails,
  clearErrors,
  addNewReview,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import Review from "../Review/Review.jsx";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import "./ProductDetails.css";
import "../../utils/helpers.css";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

// Here "match" is like params, to access productId we have to do as following...
const ProductDetails = ({ match }) => {
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addQuantity = () => {
    if (quantity === product.stock) return;
    setQuantity(quantity + 1);
  };

  const removeQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart(match.params.productId, quantity));
    alert.success("Item added to Cart!");
  };

  const reviewToggler = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    reviewToggler();
    const myForm = { rating, comment, productId: match.params.productId };
    dispatch(addNewReview(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
    }
    if (success) {
      alert.success("Review added successfully!");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.productId));
  }, [dispatch, match.params.productId, alert, error, success, reviewError]);

  const options = {
    size: "large",
    value: product.averageRating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- BAGGED`} />
          <div className="productContainer">
            <div className="carouselContainer">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                        key={i}
                        className="carouselImg"
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                  ))}
              </Carousel>
            </div>
            <div className="infoContainer">
              <h2>{product.name}</h2>
              <p>product Id: {product._id}</p>
              <div className="review-flex">
                <Rating {...options} />
                <p>({product.numberOfReviews} reviews)</p>
              </div>
              <h2 className="product-price">₹{product.price}</h2>
              <div className="quantityGroup">
                <span onClick={addQuantity} className="red-hover">
                  +
                </span>
                <input readOnly value={quantity} type="number" />
                <span onClick={removeQuantity} className="red-hover">
                  -
                </span>
              </div>
              <button
                disabled={product.stock < 1 ? true : false}
                onClick={addToCartHandler}
                className="red-hover addCart"
              >
                Add to Cart
              </button>
              <p className="default-font-size">
                Status:
                <span className={product.stock > 0 ? "instock" : "outstock"}>
                  {product.stock > 0 ? "InStock" : "OutOfStock"}
                </span>
              </p>
              <div>
                <h2 className="u-margin-bottom-small">Description:</h2>
                <p>{product.description}</p>
              </div>
              <button onClick={reviewToggler} className="addReviewButton">
                Add review
              </button>
            </div>
          </div>
          <div className="u-text-align">
            <div className="reviews-heading">CUSTOMER REVIEWS</div>
          </div>
          <Dialog
            aria-labelledby="simple-dialog-title"
            className="submitDialog"
            open={open}
            onClose={reviewToggler}
          >
            <DialogTitle>Add your review</DialogTitle>
            <DialogContent>
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                name="rating"
                size="large"
              />
              <textarea
                className="submitDialogTextarea"
                rows="5"
                cols="30"
                onChange={(e) => setComment(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
              <Button onClick={reviewToggler} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <div className="reviews-container">
            <div>
              {product.reviews && product.reviews[0] ? (
                product.reviews.map((rev) => (
                  <Review
                    user={rev.user}
                    key={rev._id}
                    name={rev.name}
                    rating={rev.rating}
                    comment={rev.comment}
                  />
                ))
              ) : (
                <div className="u-text-align">
                  <h1 className="no-reviews">No reviews currently.</h1>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
