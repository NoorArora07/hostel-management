import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postToBackend } from '@/store/fetchdata';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY");

const Stripe = () => {
  const navigate = useNavigate();
  const [amount, setamount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount) {
      setError('All fields are required.');
      return;
    }

    const paymentdata = [{ amount: amount }];

    try {
      const response = await postToBackend('http://127.0.0.1:5090/api/payments/paynow', paymentdata);
  //     export const postToBackend = async (link, data) => {
  //   try {
  //     const token = localStorage.getItem('token'); // Ensure token is retrieved
  //     if (!token) {
  //       throw new Error('No token found in localStorage');
  //     }
  
  //     const response = await axios.post(link, data, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //     });
  //     return response; // Return the full Axios response object
  //   } catch (error) {
  //     console.error('Request Error:', error.response ? error.response.data : error.message);
  //     throw error; // Rethrow to allow handling at the calling site
  //   }
  // };

      // const data = await response.json();

      // console.log("Response from backend:", data);
      console.log("Amount number sent to backend:", amount);

      if (response.data.url) {
        window.location = response.data.url; // Redirect to Stripe checkout
      } else {
        console.error("No URL returned from server");
      }
    } catch (error) {
      console.log("Error:", error);
      console.log("hello ji")
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen mt-8">
        <div className="max-w-3xl bg-white p-8 shadow-lg rounded-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Stripe payment</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Enter Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setamount(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
            >
              Submit
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Stripe;
