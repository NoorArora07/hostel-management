import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postToBackend } from '@/store/fetchdata';
import { loadStripe } from '@stripe/stripe-js';
import { baseUrl } from '@/urls';
import pic from '@/Photos/messamount.jpg';

const Stripe = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    setError('');

    const paymentData = { amount: parseFloat(amount) };
    console.log('Payment data:', paymentData);

    try {
      const response = await postToBackend(`${baseUrl}/api/payments/paynow`, paymentData,);

      console.log("post to backend ho gya")
      console.log(response)

      if (!response || !response.data || !response.data.id) {
        console.error('Invalid response from backend:', response);
        alert('Failed to initiate payment. Please try again.');
        return;
      }

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      console.log(stripe);
      console.log(response.data.success);
      if (response.data.success) {
        const result = await stripe.redirectToCheckout({ sessionId: response.data.id });
      }

      if (result?.error) {
        console.error('Error during checkout redirect:', result.error.message);
        alert(`Error: ${result.error.message}`);
      }
    } catch (error) {
      console.error('Error initiating payment:', error.response ? error.response.data : error.message);
      alert('An error occurred while processing your payment. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src= {pic}
            alt="Payment Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Secure Payment
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the amount you need to pay
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="amount" className="sr-only">
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Pay Now'
              )}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-100 text-gray-500">
                Secured by Stripe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stripe;