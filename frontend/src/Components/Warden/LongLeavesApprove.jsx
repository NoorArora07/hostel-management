import React, { useState, useEffect } from 'react';
import { getFromBackend, patchToBackend } from '../../store/fetchdata';

const LongLeavesApprove = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [timeFrame, setTimeFrame] = useState('1 week');

  useEffect(() => {
    fetchApplications(timeFrame);
  }, [timeFrame]);

  const fetchApplications = (time) => {
    console.log('Fetching applications for time:', time); // Debug log
    getFromBackend(`http://127.0.0.1:5090/api/warden/long-leaves/${time}`)
      .then(response => {
        console.log('Response from backend:', response); // Debug log
        setApplications(response.data || []);
        // alert(`Applications fetched successfully for timeframe: ${time}`);
      })
      .catch(error => {
        console.error('Error fetching leave applications:', error.response ? error.response.data : error.message);
        alert('Failed to fetch applications. Check the console for details.');
      });
  };

  const handleApplicationClick = (sid) => {
    setSelectedApplication(prev => (prev === sid ? null : sid));
  };

  const handleAction = (parentId, sid, action) => {
    const longLeaveId = applications.find(app => app.sid === sid)?.longLeaves._id;

    if (action === 'decline') {
      // Decline the application and remove it from the list
      patchToBackend(`http://127.0.0.1:5090/api/warden/long-leaves/delete/`, { sid, object_id: longLeaveId })
        .then(() => {
          alert('Application declined and removed successfully!');
          setApplications(prev => prev.filter(app => app._id !== parentId));
        })
        .catch(error => {
          console.error('Error declining application:', error.response ? error.response.data : error.message);
          alert('Failed to decline application.');
        });
    } else if (action === 'approve') {
      // Approve the application by updating its status
      patchToBackend(`http://127.0.0.1:5090/api/warden/long-leaves/approve/`, { sid, object_id: longLeaveId })
        .then(() => {
          alert('Application approved successfully!');
          setApplications(prev =>
            prev.map(app =>
              app.sid === sid ? { ...app, longLeaves: { ...app.longLeaves, approved: true } } : app
            )
          );
        })
        .catch(error => {
          console.error('Error approving application:', error.response ? error.response.data : error.message);
          alert('Failed to approve application.');
        });
    }
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-20 pb-6">
      <h1 className="text-2xl font-bold text-center mb-6">Long Leave Applications</h1>

      <div className="max-w-4xl mx-auto mb-6">
        <label htmlFor="time-frame" className="block text-gray-700 font-semibold mb-2">
          Select Time Frame:
        </label>
        <div className="flex items-center gap-4">
          <select
            id="time-frame"
            value={timeFrame}
            onChange={handleTimeFrameChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1 week">1 Week</option>
            <option value="2 weeks">2 Weeks</option>
            <option value="3 weeks">3 Weeks</option>
            <option value="4 weeks">4 Weeks</option>
          </select>
          <button
            onClick={() => fetchApplications(timeFrame)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Apply Filter
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {applications.length > 0 ? (
          applications.map(application => (
            <div key={application._id} className="border-b border-gray-200">
              <div
                className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleApplicationClick(application.sid)}
              >
                <div>
                  <p className="text-lg font-semibold">{application.name}</p>
                  <p className="text-sm text-gray-600">
                    SID: {application.sid} | Branch: {application.branch}
                  </p>
                </div>
                <span className="text-gray-500">{selectedApplication === application.sid ? '▲' : '▼'}</span>
              </div>
              {selectedApplication === application.sid && (
                <div className="p-4 bg-gray-50">
                  <p><strong>Reason:</strong> {application.longLeaves.reason}</p>
                  <p><strong>Start Date:</strong> {application.longLeaves.dateOfLeaving}</p>
                  <p><strong>End Date:</strong> {application.longLeaves.dateOfReturn}</p>
                  <p><strong>Room No.:</strong> {application.longLeaves.roomNumber}</p>
                  <p><strong>Address:</strong> {application.longLeaves.address}</p>
                  <p><strong>Status:</strong> {application.longLeaves.approved ? 'Approved' : 'Pending'}</p>
                  <div className="flex gap-4 mt-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleAction(application._id, application.sid, 'approve')}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleAction(application._id, application.sid, 'decline')}
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
