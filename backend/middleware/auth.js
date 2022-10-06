const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("./asyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

// We use this function is routes ...
exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if(!token) {
      return next(new ErrorHandler('Please login first!', 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_TOKEN);

  // here as we are logging in the user, we save the user's details in req.user
  req.user = await User.findById(decodedData.id);
  next();
});

// here spreading role (...role) converts role to array
exports.authorizeRole = (...role) => {
  return (req, res, next) => {
    if(!role.includes(req.user.role)) {
      return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource. `), 403);
    }
    next();
  }
}
