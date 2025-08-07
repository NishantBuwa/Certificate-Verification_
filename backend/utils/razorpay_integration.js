const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: process.env.TEST_KEY_ID,
    key_secret: process.env.TEST_KEY_SECRET,
});

const createOrder = async (req, res) => {
    const { amount } = req.body;

    try {
        const order = await instance.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        });

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: "Failed to create order" });
    }
};

module.exports = createOrder