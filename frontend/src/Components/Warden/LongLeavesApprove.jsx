import React, { useState, useEffect } from 'react';
import { getFromBackend } from '../../store/fetchdata'; // Assuming the function is exported from a utils file

const LongLeavesApprove = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    // Fetch long leave applications from the backend
    getFromBackend('http://127.0.0.1:5090/api/warden/long-leaves')
      .then(response => {
        setApplications(response.data);
      })
      .catch(error => {
        console.error('Error fetching leave applications:', error.response ? error.response.data : error.message);
      });
  }, []);

  const handleApplicationClick = (sid) => {
    setSelectedApplication(prev => prev === sid ? null : sid);
  };

  const handleAction = (sid, action) => {
    const actionUrl = action === 'approve' ? 'approve' : 'decline';
    getFromBackend(`/api/leaves/${sid}/${actionUrl}`)
      .then(response => {
        alert(`Application ${action === 'approve' ? 'approved' : 'declined'} successfully!`);
        setApplications(prev => prev.filter(app => app.sid !== sid));
      })
      .catch(error => {
        console.error('Error updating application status:', error.response ? error.response.data : error.message);
        alert('Failed to update application status.');
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-20 pb-6"> {/* Adjusted padding to move content below the navbar */}
      <h1 className="text-2xl font-bold text-center mb-6">Long Leave Applications</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {applications.length > 0 ? (
          applications.map(application => (
            <div key={application.sid} className="border-b border-gray-200">
              <div 
                className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleApplicationClick(application.sid)}
              >
                <div>
                  <p className="text-lg font-semibold">{application.name}</p>
                  <p className="text-sm text-gray-600">SID: {application.sid} | Branch: {application.branch}</p>
                </div>
                <span className="text-gray-500">{selectedApplication === application.sid ? '▲' : '▼'}</span>
              </div>
              {selectedApplication === application.sid && (
                <div className="p-4 bg-gray-50">
                  <p><strong>Reason:</strong> {application.reason}</p>
                  <p><strong>Start Date:</strong> {application.startDate}</p>
                  <p><strong>End Date:</strong> {application.endDate}</p>
                  <p><strong>Status:</strong> {application.approved ? 'Approved' : 'Pending'}</p>
                  <div className="flex gap-4 mt-4">
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleAction(application.sid, 'approve')}
                    >
                      Approve
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleAction(application.sid, 'decline')}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center p-6 text-gray-500">No long leave applications available.</p>
        )}
      </div>
    </div>
  );
};

export default LongLeavesApprove;
