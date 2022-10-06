
const {processPayment, sendApiKey} = require('../controllers/paymentController');
const express = require('express');
const {isAuthenticated} = require('../middleware/auth')
const router = express.Router();

router.route('/payment/process').post(isAuthenticated, processPayment);
router.route('/stripeapikey').get(isAuthenticated, sendApiKey);

module.exports = router;