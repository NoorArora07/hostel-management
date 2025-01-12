import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postToBackend } from '@/store/fetchdata';
import { loadStripe } from '@stripe/stripe-js';
import photo from "@/Photos/hostel-fee.jpg";

export default function HostelPayment() {

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {

    setError('');
    try {
      const response = await postToBackend(
        'http://127.0.0.1:5090/api/hostelFee/paynow'
      );

      console.log(response);

      if (!response?.data?.id) {
        console.error('Invalid response from backend:', response);
        alert('Failed to initiate payment. Please try again.');
        return;
      }

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) {
        console.error('Stripe initialization failed');
        alert('Payment system is currently unavailable. Please try again later.');
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: response.data.id });
      if (result?.error) {
        console.error('Error during checkout redirect:', result.error.message);
        alert(`Error: ${result.error.message}`);
      }
    } catch (error) {
      console.error('Error initiating payment:', error.response ? error.response.data : error.message);
      alert('An error occurred while processing your payment. Please try again later.');
    }
  };

  return (
    <div className="bg-white w-full">
      <div className="mx-auto py-24 sm:px-6 sm:py-32 lg:px-8 w-screen">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Pay your Hostel Fee <br /> in seconds.
            </h2>
            <p className="mt-6 text-pretty text-lg/8 text-gray-300">
              Stripe is a payment processing platform that handles billions of dollars safely every year. You can trust us with your fee and expect efficient services.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="/view-hostel-fee"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Payment Details
              </a>
              <button
                className="text-sm/6 font-semibold text-white"
                onClick={handleSubmit}
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