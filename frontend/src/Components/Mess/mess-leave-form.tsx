import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { postToBackend } from '../../store/fetchdata';

const MessLeaveForm = () => {
  const navigate = useNavigate();
  const [dateOfLeaving, setDateOfLeaving] = useState('');
  const [dateOfReturn, setDateOfReturn] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dateOfLeaving || !dateOfReturn || !roomNumber) {
      setError('All fields are required.');
      return;
    }

    const applicationData = [
      {
        dateOfLeaving,
        dateOfReturn,
        roomNumber,
      },
    ];

    try {
    //   const result = await postToBackend('http://127.0.0.1:5090/api/mess-leaves/', applicationData);
    //   console.log(`application data`, applicationData, result);
      navigate('/Homepage');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setError('There was an error submitting the leave request.');
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-200 to-purple-500 min-h-screen flex items-center justify-center">
      {/* Navigation Bar */}
      <nav className="bg-purple-600 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-lg font-semibold">Mess Leave Application System</h1>
        </div>
      </nav>

      {/* Form Section */}
      <div className="bg-white p-6 shadow-lg rounded-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-600">Create Mess Leave Request</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div>
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

          <div>
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

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:bg-gradient-to-br focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessLeaveForm;
