# Stripe Payment Handling Demo

This repository demonstrates how to handle Stripe payments using a checkout session and webhook events with a React frontend and a Node.js backend. The frontend is written in TypeScript.

## Prerequisites

- Node.js and npm installed
- Stripe account and Stripe CLI installed
- Create a new Stripe API key from the Stripe Dashboard

## Setup Instructions

### Backend (Node.js)

1. **Initialize the Node.js project:**

   - Navigate to the project root directory.
   - Run `npm init -y` to initialize a new Node.js project.

2. **Install necessary packages:**

   - Run `npm install express stripe body-parser` to install the required packages.

3. **Create the server file:**

   - Create a `server.js` file in the project root directory.
   - Implement the server logic to handle Stripe checkout sessions and webhooks.

4. **Run the server:**
   - Execute `node server.js` to start the Node.js server.

### Frontend (React with TypeScript)

1. **Create a new React app with TypeScript template:**

   - Run `npx create-react-app client --template typescript` to create a new React app.

2. **Install necessary packages:**

   - Navigate to the `client` directory.
   - Run `npm install @stripe/stripe-js @stripe/react-stripe-js` to install Stripe's JavaScript libraries.

3. **Implement the checkout logic:**

   - Modify `src/App.tsx` to include the checkout button and Stripe integration.

4. **Start the React app:**
   - In the `client` directory, run `npm start` to start the React development server.

### Configuring Stripe CLI for Webhooks

1. **Login to Stripe CLI:**

   - Run `stripe login` to authenticate the Stripe CLI.

2. **Listen for webhook events:**
   - Run `stripe listen --forward-to localhost:4242/webhook` to forward webhook events to your local server.

## Running the Project

1. **Start the backend server:**

   - Ensure you are in the root directory of the project.
   - Run `node server.js`.

2. **Start the frontend server:**

   - Navigate to the `client` directory.
   - Run `npm start`.

3. **Testing the Setup:**
   - Open your browser and go to `http://localhost:3000`.
   - Click on the Checkout button.
   - Complete the payment using Stripe's test card details.
   - Verify the success message and check the server logs for webhook event processing.

## Notes

- Replace `YOUR_STRIPE_SECRET_KEY`, `YOUR_STRIPE_PUBLIC_KEY`, and `YOUR_STRIPE_WEBHOOK_SECRET` with your actual Stripe keys.
- Ensure both frontend and backend servers are running concurrently.
- Use Stripe CLI to forward webhook events to your local development environment.
