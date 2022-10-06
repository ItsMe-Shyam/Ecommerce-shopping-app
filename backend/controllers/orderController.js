const Order = require("../models/orderModel");
const asyncErrorHandler = require("../middleware/asyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.createOrder = asyncErrorHandler(async (req, res, next) => {
  const { shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id
  });

  res.status(200).json({
      success: true,
      order
  })
});

// get single order
exports.getSingleOrder = asyncErrorHandler(async(req, res, next) => {
  const order = await Order.findById(req.params.orderId).populate("user", "name")

  if(!order) {
    return next(new ErrorHandler(`Order with id: ${req.params.id} doesn't exists.`), 404)
  }

  res.status(200).json({
    success: true,
    order
  });
});

// get all orders of the logged in user

exports.myOrders = asyncErrorHandler(async(req, res, next) => {

  const orders = await Order.find({user: req.user._id}).populate("user", "name email");

  res.status(200).json({
    success: true,
    orders
  })

})

// get all orders --admin

exports.getAllOrders = asyncErrorHandler(async(req, res, next) => {

  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach(order => totalAmount += order.totalPrice);

  totalAmount = parseInt(totalAmount);

  res.status(200).json({
    success: true,
    orders,
    totalAmount
  })
});

// update order status --admin

exports.updateOrder = asyncErrorHandler(async(req, res, next) => {

  const order = await Order.findById(req.params.id);
  
  if(order.orderStatus === 'delivered' ) {
    return next(new ErrorHandler('Order has already been delivered', 400));
  } 

  if(req.body.status === 'shipped') {
    order.orderItems.forEach(async(item) => await updateStock(item.product, item.quantity))

  }
  
  order.orderStatus = req.body.status;

  if(req.body.status === 'delivered') {
    order.deliveredAt = Date.now();
  } 

  await order.save({validateBeforeSave: false});

  res.status(200).json({
    success: true,
  })
})

async function updateStock(id, quantity) {

  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({validateBeforeSave: false})

}

// delete order --admin

exports.deleteOrder = asyncErrorHandler(async(req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  if(!order) {
    next(new ErrorHandler('order with the provided Id does not exist', 404));
  }

  await order.remove();

  res.status(200).json({
    success: true
  })
})

