import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromBackend } from '../../store/fetchdata';

const LateLeavesView = () => {
  const navigate = useNavigate();
  const [sentApplications, setSentApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);

  // Fetch leave applications from the backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const sentResponse = await getFromBackend('http://127.0.0.1:5090/api/leaves/late-leaves/pending');
        const approvedResponse = await getFromBackend('http://127.0.0.1:5090/api/leaves/late-leaves/accepted/');
  
        console.log('Sent Response:', sentResponse.data);
        console.log('Approved Response:', approvedResponse.data);
  
        // Process the responses
        const sentData = Array.isArray(sentResponse.data)
          ? sentResponse.data.map(application => ({
              date: application.date,
              status: application.status,
            }))
          : [];
  
        const approvedData = Array.isArray(approvedResponse.data)
          ? approvedResponse.data.map(application => ({
              date: application.date,
              status: application.status,
            }))
          : [];
  
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
    navigate('/LateLeaveForm');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full bg-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Late Leave Applications</h1>
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
                          <li
                            key={index}
                            className={`mb-4 p-2 ${
                              application.status === 'critical' ? 'border border-red-500 bg-red-100' : ''
                            }`}
                          >
                            <p><strong>Date:</strong> {application.date}</p>
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
                          <li
                            key={index}
                            className={`mb-4 p-2 ${
                              application.status === 'critical' ? 'border border-red-500 bg-red-100' : ''
                            }`}
                          >
                            <p><strong>Date:</strong> {application.date}</p>
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

export default LateLeavesView;
