import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { postToBackend } from '@/store/fetchdata';
import { motion } from 'framer-motion';
import { BadgeDollarSign } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '@/urls';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const [session, setSession] = useState(null);
  const location = useLocation(); 
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id'); 
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      const sendPaymentSuccess = async () => {
        try {
          console.log("sessionid: ", sessionId)
          const response = await postToBackend(`${baseUrl}/api/payments/updateStatus`, {
            success: true,
            sessionId,  // send sessionId
          });
          console.log('Payment success data sent to backend.');
        } catch (error) {
          console.error('Error sending payment success data:', error);
        }
      };

      sendPaymentSuccess();
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
            <BadgeDollarSign className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Payment Successful</h1>
          <p className="text-center text-gray-600 mb-8">Your payment was processed successfully.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick ={() => navigate('/view-mess-fee')}
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors duration-200">
              Go to Mess
            </button>
          </div>
        </div>
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-1 bg-green-600"
        />
      </motion.div>
    </div>
  )
};

export default PaymentSuccess;