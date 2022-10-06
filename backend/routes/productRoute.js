const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductDetails,
  deleteProduct,
  updateProduct,
  addProductReview,
  deleteReview,
  getAllReviews,
  getAllAdminProducts,
} = require("../controllers/productController");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

router.route("/products").get(getAllProducts);

router
  .route("/admin/products/:id")
  .put(isAuthenticated, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRole("admin"), deleteProduct);

router.route("/admin/products").get(isAuthenticated, authorizeRole("admin"), getAllAdminProducts);

router.route("/products/:id").get(getProductDetails);
  
router.route("/products/new").post(isAuthenticated, createProduct);

router.route('/products/:productId/reviews').get(isAuthenticated, getAllReviews)

router.route('/products/:productId/reviews/new').put(isAuthenticated, addProductReview)

router.route('/products/:productId/reviews/:reviewId').delete(isAuthenticated, deleteReview);

module.exports = router;
