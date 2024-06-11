// src/App.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const handleClick = async () => {
    const response = await fetch(
      'http://localhost:4242/create-checkout-session',
      { method: 'POST' }
    );
    const session = await response.json();
    const stripe = await stripePromise;
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    }
  };

  return <button onClick={handleClick}>Checkout</button>;
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default App;
