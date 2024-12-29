import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Ensure the correct environment variable for the Stripe Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Stripe() {

  // Logging the correct publishable key for debugging
  console.log("Stripe Publishable Key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const checkout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5090/api/payments/paynow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors", // Make sure CORS is handled properly in the backend
        body: JSON.stringify({
          amount: 500, // Correct amount structure
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location = data.url; // Redirect to Stripe checkout
      } else {
        console.error("No URL returned from server");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="mt-30">Stripe Payment Gateway</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <button onClick={checkout} className="btn-primary">
        Start Payment
      </button>
    </div>
  );
}

export default Stripe;