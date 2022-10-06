
const asyncErrorHandler = require('../middleware/asyncError');
const stripe = require("stripe")("sk_test_51L42SaSD6sIMmEqORKLxslbJ7Nwqwc5pRnlD1dDQw85BpxBO8ncSAOhiww30wfNXN4KcpD5AjNB2WgqodLdqEfmU00hUavB2wc");


exports.processPayment = asyncErrorHandler(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        // metadata: {
        //     company: "Ecommerce"
        // }
    });
    res.status(200).json({success: true, client_secret: myPayment.client_secret})
})


exports.sendApiKey = asyncErrorHandler((req, res, next) => {
    res.json({stripeApiKey: process.env.STRIPE_API_KEY});
})