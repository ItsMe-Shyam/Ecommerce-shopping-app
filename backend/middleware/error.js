const ErrorHandler = require('../utils/errorHandler');

module.exports = errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Wrong id error:
    if(err.name === 'CastError') {
      const message = `Resource not found. invalid: ${req.path}`;
      err = new ErrorHandler(message, 400);
    }

    // duplicate key error
    if(err.code === 11000) {
      const message = `email already in use, Duplicate ${Object.keys(err.keyValue)} value`
      err = new ErrorHandler(message, 400)
    }

    // json web token error
    if(err.name === 'jsonWebTokenError') {
      const message = `Invalid json web token, try again`;
      err = new ErrorHandler(message, 400);
    }

    // json web token expire
    if(err.name === 'jsonExpiredError') {
      const message = `json web token has expired.`;
      err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
}
