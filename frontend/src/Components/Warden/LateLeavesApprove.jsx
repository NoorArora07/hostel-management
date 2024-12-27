import React, { useState, useEffect } from 'react';
import { getFromBackend, patchToBackend } from '../../store/fetchdata';
import { checkWarden } from '../../store/fetchdata';
import { useNavigate } from 'react-router-dom';

const LateLeavesApprove = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [leaveStatus, setLeaveStatus] = useState('all'); // State for leave status filter
  const navigate = useNavigate();
  
  useEffect(() => {
      const verifyAccess = async () => {
        try {
          const message = await checkWarden(); // Await the result of checkWarden
          if (message === "access denied!") {
            navigate('/AccessDenied'); // Redirect if access is denied
          }
        } catch (error) {
          console.error("Error while checking access:", error);
          navigate('/AccessDenied'); // Redirect on any error
        }
      };
  
      verifyAccess(); // Call the async function
    }, [navigate]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    fetchApplications(leaveStatus); // Fetch applications based on leave status
  }, [leaveStatus]); // Trigger fetch when leaveStatus changes

  const fetchApplications = (status) => {
    console.log('Fetching applications for status:', status); // Debug log
    getFromBackend(`http://127.0.0.1:5090/api/warden/late-leaves/${status}`)
      .then(response => {
        console.log('Response from backend:', response); 
        const filteredApplications = response.data.filter(application => {
          if (status === 'critical') return application.lateLeaves.status === 'critical';
          else if (status === 'not-critical') return application.lateLeaves.status === 'not-critical';
          return true; // For 'all', return all applications
        });
        setApplications(filteredApplications || []);
      })
      .catch(error => {
        console.error('Error fetching leave applications:', error.response ? error.response.data : error.message);
        alert('Failed to fetch applications. Check the console for details.');
      });
  };

  const handleApplicationClick = (lateLeaveId) => {
    setSelectedApplication(prev => (prev === lateLeaveId ? null : lateLeaveId));
  };

  const handleAction = (sid, action) => {
    const lateLeaveId = applications.find(app => app.sid === sid)?.lateLeaves._id;

    if (action === 'decline') {
      patchToBackend(`http://127.0.0.1:5090/api/warden/late-leaves/disapprove/`, { sid, object_id: lateLeaveId })
        .then(() => {
          setApplications(prev => prev.filter(app => app.lateLeaves._id !== lateLeaveId));
        })
        .catch(error => {
          console.error('Error declining application:', error.response ? error.response.data : error.message);
          alert('Failed to decline application.');
        });
    } else if (action === 'approve') {
      patchToBackend(`http://127.0.0.1:5090/api/warden/late-leaves/approve/`, { sid, object_id: lateLeaveId })
        .then(() => {
          setApplications(prev => prev.filter(app => app.lateLeaves._id !== lateLeaveId));
        })
        .catch(error => {
          console.error('Error approving application:', error.response ? error.response.data : error.message);
          alert('Failed to approve application.');
        });
    }
  };

  const handleLeaveStatusChange = (event) => {
    setLeaveStatus(event.target.value);
  };

  // Pagination logic
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const currentApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent going out of bounds
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-20 pb-6">
      <h1 className="text-2xl font-bold text-center mb-6">Late Leave Applications</h1>

      <div className="max-w-4xl mx-auto mb-6">
        <label htmlFor="leave-status" className="block text-gray-700 font-semibold mb-2">
          Select Leave Status:
        </label>
        <div className="flex items-center gap-4">
          <select
            id="leave-status"
            value={leaveStatus}
            onChange={handleLeaveStatusChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="critical">Critical</option>
            <option value="not-critical">In Advance</option>
          </select>
          <button
            onClick={() => fetchApplications(leaveStatus)} // Re-fetch with the selected status
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Apply Filter
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {currentApplications.length > 0 ? (
          currentApplications.map(application => {
            const uniqueKey = application.lateLeaves._id.toString();

            return (
              <div key={uniqueKey} className="border-b border-gray-200">
                <div
                  className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleApplicationClick(application.lateLeaves._id)}
                >
                  <div>
                    <p className="text-lg font-semibold">{application.name}</p>
                    <p className="text-sm text-gray-600">
                      SID: {application.sid} | Branch: {application.branch}
                    </p>
                  </div>
                  <span className="text-gray-500">{selectedApplication === application.lateLeaves._id ? '▲' : '▼'}</span>
                </div>
                {selectedApplication === application.lateLeaves._id && (
                  <div className="p-4 bg-gray-50">
                    <p><strong>Reason:</strong> {application.lateLeaves.reason}</p>
                    <p><strong>Date:</strong> {application.lateLeaves.date}</p>
                    <p><strong>Room No.:</strong> {application.lateLeaves.roomNumber}</p>
                    <p><strong>Address:</strong> {application.lateLeaves.address}</p>
                    {/* <p><strong>Status:</strong> {application.lateLeaves.approved}</p> */}
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
            );
          })
        ) : (
          <p className="text-center p-6 text-gray-500">No late leave applications available.</p>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 p-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-3 py-1 text-sm rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-3 py-1 text-sm rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LateLeavesApprove;
