const express = require('express');
const { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrder } = require('../controllers/orderController');
const { isAuthenticated, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.route('/orders/new').post(isAuthenticated, createOrder);

router.route('/orders/:orderId').get(isAuthenticated, getSingleOrder);

router.route("/orders/:id").put(isAuthenticated, updateOrder)

router.route("/myorders").get(isAuthenticated, myOrders)

router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRole("admin"), getAllOrders);

module.exports = router;