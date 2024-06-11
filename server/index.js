require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
// const bodyParser = require('body-parser');

// app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
// app.use(bodyParser.json());

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.json({ id: session.id });
});

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log(`Session completed: ${session.id}`);
      // Handle successful payment here
    }

    response.json({ received: true });
  }
);

app.listen(4242, () => {
  console.log('Example app listening on port 4242!');
});
