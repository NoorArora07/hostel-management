import React, { useState } from 'react';
import { AuroraBackground } from "../ui/aurora-background.tsx";
import { useNavigate } from 'react-router-dom';
import { postToBackend } from '../../store/fetchdata';
import { baseUrl } from '@/urls.jsx';

const LateLeaveForm = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('critical'); // 'not-critical' for In Advance, 'critical' for Critical
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
      const result = await postToBackend(`${baseUrl}/api/leaves/late-leaves/`, applicationData);
      console.log('Application Data:', applicationData, result);
      if (result.data.sent === false) {
        alert(`${result.data.reason}`);
      }
      navigate('/LateLeavesView');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setError('There was an error submitting the leave request.');
    }
  };

  return (
    <div className="relative min-h-screen mt-3">
      <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />

      <div className="relative z-10 flex items-center justify-center min-h-screen mt-2">
      <div className="flex items-center justify-center min-h-screen mt-4">
        <div className=" max-w-4xl bg-white p-6 shadow-lg rounded-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Create Late Leave Request</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {error && <p className="text-red-500 mb-4 col-span-2">{error}</p>}

            {/* Leave Type Toggle */}
            <div className="col-span-2 flex justify-center gap-8 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm">In Advance</span>
                <input
                  type="checkbox"
                  checked={status === 'not-critical'}
                  onChange={() => setStatus(status === 'not-critical' ? 'critical' : 'not-critical')}
                  className="form-checkbox h-5 w-5 text-teal-500"
                />
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md h-75"
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
                className="w-full bg-violet-500 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LateLeaveForm;
