import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { postToBackend } from '../../store/fetchdata';

const LongLeaveForm = () => {
  const navigate = useNavigate();
  const [dateOfLeaving, setDateOfLeaving] = useState('');
  const [dateOfReturn, setDateOfReturn] = useState('');
  const [reason, setReason] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dateOfLeaving || !dateOfReturn || !reason || !roomNo || !address) {
      setError('All fields are required.');
      return;
    }

    const applicationData = [
      {
        dateOfLeaving,
        dateOfReturn,
        reason,
        roomNo,
        address,
      },
    ];

    try {
      // Send application data to backend
      // await axios.post('/api/applications/create', applicationData);
      const result = await postToBackend('http://127.0.0.1:5090/api/leaves/long-leaves/', applicationData);
      console.log(`application data`);
      console.log(applicationData);
      console.log(result);

      // Redirect to the page with the table after submission
      navigate('/Homepage');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setError('There was an error submitting the leave request.');
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-blue-500 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-lg font-semibold">Leave Application System</h1>
        </div>
      </nav>

      {/* Form Section */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full bg-white p-6 shadow-lg">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create Leave Request</h1>
            <form onSubmit={handleSubmit}>
              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="mb-4">
                <label htmlFor="dateOfLeaving" className="block text-sm font-medium text-gray-700">
                  Date of Leaving
                </label>
                <input
                  type="date"
                  id="dateOfLeaving"
                  value={dateOfLeaving}
                  onChange={(e) => setDateOfLeaving(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="dateOfReturn" className="block text-sm font-medium text-gray-700">
                  Date of Return
                </label>
                <input
                  type="date"
                  id="dateOfReturn"
                  value={dateOfReturn}
                  onChange={(e) => setDateOfReturn(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="roomNo" className="block text-sm font-medium text-gray-700">
                  Room No.
                </label>
                <input
                  type="text"
                  id="roomNo"
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address of Visiting Place
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-light-teal hover:bg-dark-teal text-white font-semibold py-2 px-4 rounded-md shadow-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongLeaveForm;
