import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postToBackend } from '../../store/fetchdata';

const LateLeaveForm = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('not-critical');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (status === 'not-critical' && !date) ||
      !reason ||
      !roomNumber ||
      !address
    ) {
      setError('All fields are required.');
      return;
    }

    const applicationData = {
      status,
      ...(status === 'not-critical' && { date }),
      reason,
      roomNumber,
      address,
      approved: 'not reviewed',
    };

    try {
      const result = await postToBackend('http://127.0.0.1:5090/api/leaves/late-leaves/', applicationData);
      console.log('Application Data:', applicationData, result);
      navigate('/LateLeavesView');
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
          <h1 className="text-lg font-semibold">Late Leave Application System</h1>
        </div>
      </nav>

      {/* Form Section */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Create Leave Request</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {error && <p className="text-red-500 mb-4 col-span-2">{error}</p>}

            {/* Leave Type Toggle */}
            <div className="col-span-2 flex justify-center gap-8 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="leaveType"
                  value="not-critical"
                  checked={status === 'not-critical'}
                  onChange={() => setStatus('not-critical')}
                  className="mr-2"
                />
                In Advance
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="leaveType"
                  value="critical"
                  checked={status === 'critical'}
                  onChange={() => setStatus('critical')}
                  className="mr-2"
                />
                Critical
              </label>
            </div>

            {/* Date Field - Shown only for "not-critical" */}
            {status === 'not-critical' && (
              <div className="col-span-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required={status === 'not-critical'}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            )}

            {/* Reason Field */}
            <div className="col-span-2">
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

            {/* Room Number Field */}
            <div>
              <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">
                Room No.
              </label>
              <input
                type="text"
                id="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Address Field */}
            <div>
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

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LateLeaveForm;
