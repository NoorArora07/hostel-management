import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getFromBackend } from '../../store/fetchdata';

const LongLeavesView = () => {
  const navigate = useNavigate();
  const [sentApplications, setSentApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);

  // Fetch only the leave dates (dateOfLeaving and dateOfReturn) from the backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch the data from the backend
        // let sentResponse;
       
        const sentResponse = await getFromBackend('http://127.0.0.1:5090/api/leaves/long-leaves/pending');
        const approvedResponse = await getFromBackend('http://127.0.0.1:5090/api/leaves/long-leaves/accepted/');
  
        console.log('Sent Response:', sentResponse.data); // Should log the array of sent applications
        console.log('Approved Response:', approvedResponse.data); // Should log the array of approved applications
  
        // Use the response directly as arrays
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full bg-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Leave Applications</h1>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">Sent Applications</th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">Approved Applications</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 align-top">
                    {sentApplications.length > 0 ? (
                      <ul className="list-disc pl-6">
                        {sentApplications.map((application, index) => (
                          <li key={index} className="mb-4">
                            <p><strong>Leave Dates:</strong> {application.dateOfLeaving} to {application.dateOfReturn}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No sent applications.</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 align-top">
                    {approvedApplications.length > 0 ? (
                      <ul className="list-disc pl-6">
                        {approvedApplications.map((application, index) => (
                          <li key={index} className="mb-4">
                            <p><strong>Leave Dates:</strong> {application.dateOfLeaving} to {application.dateOfReturn}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No approved applications.</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button 
            onClick={handleCreateNewRequest} 
            className="mt-6 w-full bg-light-teal hover:bg-dark-teal text-white font-semibold py-2 px-4 rounded-md shadow-md"
          >
            Create a New Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default LongLeavesView;