import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromBackend } from '../../store/fetchdata';
import { Button } from '@/Components/ui/button'; // Import Button component

const LongLeavesView = () => {
  const navigate = useNavigate();
  const [sentApplications, setSentApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);

  // Fetch only the leave dates (dateOfLeaving and dateOfReturn) from the backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const sentResponse = await getFromBackend('http://127.0.0.1:5090/api/leaves/long-leaves/pending');
        const approvedResponse = await getFromBackend('http://127.0.0.1:5090/api/leaves/long-leaves/accepted/');

        console.log('Sent Response:', sentResponse.data);
        console.log('Approved Response:', approvedResponse.data);

        // Extract only necessary data
        const sentData = Array.isArray(sentResponse.data)
          ? sentResponse.data.map(application => ({
              dateOfLeaving: application.dateOfLeaving,
              dateOfReturn: application.dateOfReturn,
            }))
          : [];

        const approvedData = Array.isArray(approvedResponse.data)
          ? approvedResponse.data.map(application => ({
              dateOfLeaving: application.dateOfLeaving,
              dateOfReturn: application.dateOfReturn,
            }))
          : [];

        // Update state
        setSentApplications(sentData);
        setApprovedApplications(approvedData);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setSentApplications([]);
        setApprovedApplications([]);
      }
    };

    fetchApplications();
  }, []);

  // Navigate to form page
  const handleCreateNewRequest = () => {
    navigate('/create-leave-request');
  };

  return (
    <div
    className="min-h-screen bg-gradient-to-br from-[#8fb5f3] to-[#8ae6b8] flex items-center justify-center"
    style={{
      backgroundSize: 'cover', // Ensure it covers the entire screen
      minHeight: '100vh', // Full viewport height
    }}
    >
      <div className="w-full bg-white p-6 rounded-lg shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

          <div className="flex-1 flex gap-10">
            {/* Sent Applications */}
            <div className="flex-[2] bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Sent Applications</h2>
              </div>
              {sentApplications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-light-teal">
                      <tr>
                        <th className="px-6 py-3">Leave Dates</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sentApplications.map((application, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <strong>{application.dateOfLeaving}</strong> to {application.dateOfReturn}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No sent applications.</p>
              )}
            </div>

            {/* Approved Applications */}
            <div className="flex-[3] bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Approved Applications</h2>
              </div>
              {approvedApplications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-light-teal">
                      <tr>
                        <th className="px-6 py-3">Leave Dates</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedApplications.map((application, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <strong>{application.dateOfLeaving}</strong> to {application.dateOfReturn}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No approved applications.</p>
              )}
            </div>
          </div>

          {/* Right Side: Long Leave Applications and Create New Leave Request Button */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {/* Optional Additional Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Long Leave Applications</h2>
              <Button
                onClick={handleCreateNewRequest}
                className="w-full bg-light-teal hover:bg-dark-teal text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300"
              >
                Create a New Long Leave Request
              </Button>
              <p className="text-gray-600 mt-4">
                Click on the above Button to Create a New Long Leave Application.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LongLeavesView;
