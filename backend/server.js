const app = require('./app');
const connectToDatabase = require('./config/database');
const cloudinary = require('cloudinary');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

// config
if(process.env.NODE_ENV !== "PRODUCTION") {
  require('dotenv').config({path: 'backend/config/var.env'});
}


// Connecting to database
connectToDatabase();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`App listening on PORT ${process.env.PORT} `);
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });