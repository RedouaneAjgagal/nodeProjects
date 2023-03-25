const stripe = require('stripe')(process.env.SECRET_KEY);


const stripeController = async (req, res) => {
    const { purchase, total_amount, shipping_fee } = req.body;
    const calculateOrderAmount = () => {
        return Number(total_amount) + Number(shipping_fee)
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res.json({
        clientSecret: paymentIntent.client_secret,
    });
}

module.exports = stripeController;