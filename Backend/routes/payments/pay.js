// server.js
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51PSJcmSF49XkwZQg7Xb5De2zHjwehdVQbOSjY9fHbQpLjeRKfZKFzwm3bLDFZeGlPeRGUT3ALVIC8XsY8Yjsmxdf00GODHZReE');
const express = require('express');
const Router = express.Router();

Router.post('/create-payment-intent', async (req, res) => {
  try {
    const {
      address,
      name,
      PHno,
      state,
      city,
      pin,
      price,
      cat,
      buyer_id,
      buyerName,
      date,
      products,
    } = req.body;

    console.log("Received products: ", products);

    // Create line items based on the product data sent from the frontend
    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'inr', // Ensure correct currency
        product_data: {
          name: product.productName,
        },
        unit_amount: product.price * 100, // Convert price to cents (if it's in INR)
      },
      quantity: product.quantity,
    }));

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems, // Products being purchased
      mode: 'payment',
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,  // Correct string interpolation
      cancel_url: `http://localhost:3000/cancel`,
      customer_email: "yaahg342@gmail.com", // Assuming buyerName is the email; replace with actual email if necessary
      shipping_address_collection: {
        allowed_countries: ['IN', 'US', 'GB'], // Allow countries for shipping address
      },
    });

    // Return the URL to redirect the user
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = Router;
