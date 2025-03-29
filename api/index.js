const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { question } = req.body;
    if (question) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: question }] })
      });
      const data = await response.json();
      return res.status(200).json({ answer: data.choices[0].message.content || 'Error: No response from AI' });
    }
  }
  res.status(200).json({ message: 'OK' });
};
