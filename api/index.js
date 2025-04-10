const express = require('express');
const stripe = require('stripe')('your-stripe-secret-key');

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
          unit_amount: price * 100,
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

app.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  try {
    console.log(`Reset requested for ${email}`);
    res.json({ message: 'Reset link sent (mock)' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send reset link' });
  }
});

module.exports = app;
