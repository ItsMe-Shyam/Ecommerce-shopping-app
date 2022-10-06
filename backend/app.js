const dotenv = require('dotenv');
const express = require('express');
const errorMiddleware = require('./middleware/error')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require("path");
const app = express();

// config
if(process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({path: 'backend/config/var.env'});
}

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());


// Routes import
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');
const paymentRouter = require('./routes/paymentRoute');

// Routers
app.use('/api', productRouter);
app.use('/api', userRouter);
app.use('/api', orderRouter);
app.use('/api', paymentRouter);


//  Always I said ALWAYS put this bitch 'errorMiddlware' at the end because you suffered alot remember? always put this at the end .....
app.use(errorMiddleware);


module.exports = app;