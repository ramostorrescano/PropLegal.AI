const express = require('express');
const stripe = require('stripe')('your-stripe-secret-key'); // Replace with your key

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
  const { email, password, plan, price } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `${plan} Plan` },
          unit_amount: price * 100, // Cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://prop-legal-ai.vercel.app/success',
      cancel_url: 'https://prop-legal-ai.vercel.app/cancel',
    });
    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
