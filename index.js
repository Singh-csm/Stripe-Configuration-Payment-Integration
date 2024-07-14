const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const PORT = 3000;
const secret_key = process.env.secret_key

const stripe = Stripe(secret_key);

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Stripe Integration with Nodejs")
});

app.post("/createpayment", async (req, res)=>{

    const { amount , currency} = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({ amount, currency});

        res.json(paymentIntent);
    } catch (error) {
        res.status(500).send(error)
    }
});

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
});

