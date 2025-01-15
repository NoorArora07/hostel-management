import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postToBackend, getFromBackend } from '@/store/fetchdata';
import { loadStripe } from '@stripe/stripe-js';
import photo from "@/Photos/hostel-fee.jpg";
import { baseUrl } from '@/urls';

export default function HostelPayment() {
  const [error, setError] = useState('');
  const [userFeeStatus, setUserFeeStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFeeStatus = async () => {
      try {
        const response = await getFromBackend(`${baseUrl}/api/hostelFee/status`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch user fee status');
        }

        const data = response.data;
        setUserFeeStatus(data.status); // Assuming `data.status` contains 'p
        // 
        // 
        // 
        // aid' or 'unpaid'
      } catch (error) {
        console.error('Error fetching user fee status:', error);
      }
    };

    fetchUserFeeStatus();
  }, []);

  const handleSubmit = async () => {
    if (userFeeStatus === 'paid') {
      setError('Payment has already been completed.');
      return;
    }

    setError('');
    try {
      const response = await postToBackend(`${baseUrl}/api/hostelFee/paynow`);
      if (!response?.data?.id) {
        alert('Failed to initiate payment. Please try again.');
        return;
      }

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) {
        alert('Payment system is currently unavailable. Please try again later.');
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: response.data.id });
      if (result?.error) {
        alert(`Error: ${result.error.message}`);
      }
    } catch (error) {
      alert('An error occurred while processing your payment. Please try again later.');
    }
  };

  return (
    <div className="bg-white w-full">
      <div className="mx-auto py-24 sm:px-6 sm:py-32 lg:px-8 w-screen">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Pay your Hostel Fee <br /> in seconds.
            </h2>
            <p className="mt-6 text-pretty text-lg/8 text-gray-300">
              Stripe is a payment processing platform that handles billions of dollars safely every year. You can trust us with your fee and expect efficient services.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <button
                onClick={() => navigate("/view-hostel-fee")}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Payment Details
              </button>
              <button
                className={`text-sm/6 font-semibold ${
                  userFeeStatus === 'paid' ? 'text-gray-500 cursor-not-allowed' : 'text-white'
                }`}
                onClick={handleSubmit}
                disabled={userFeeStatus === 'paid'}
              >
                Complete Payment <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              alt="App screenshot"
              src={photo}
              width={1824}
              height={1080}
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            />
          </div>
        </div>
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}
