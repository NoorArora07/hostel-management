import React, { useState, useEffect } from 'react';
import { getFromBackend, patchToBackend } from '../../store/fetchdata';
import { checkWarden } from '../../store/fetchdata';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '@/urls';
import pic from '@/Photos/wardendash2.jpg';

const LongLeavesApprove = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [timeFrame, setTimeFrame] = useState('1 week');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const message = await checkWarden();
        if (message === 'access denied!') {
          navigate('/AccessDenied');
        }
      } catch (error) {
        console.error('Error while checking access:', error);
        navigate('/AccessDenied');
      }
    };

    verifyAccess();
  }, [navigate]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchApplications(timeFrame);
  }, [timeFrame]);

  const fetchApplications = (time) => {
    getFromBackend(`${baseUrl}/api/warden/long-leaves/${time}`)
      .then((response) => {
        setApplications(response.data || []);
      })
      .catch((error) => {
        console.error(
          'Error fetching leave applications:',
          error.response ? error.response.data : error.message
        );
        alert('Failed to fetch applications. Check the console for details.');
      });
  };

  const handleApplicationClick = (longLeaveId) => {
    setSelectedApplication((prev) => (prev === longLeaveId ? null : longLeaveId));
  };

  const handleAction = (applications, action) => {
    const longLeaveId = applications.longLeaves._id;
    const sid = applications.sid;

    if (action === 'decline') {
      patchToBackend(`${baseUrl}/api/warden/long-leaves/delete/`, { sid:sid, object_id: longLeaveId })
        .then(() => {
          setApplications((prev) => prev.filter((app) => app.longLeaves._id !== longLeaveId));
        })
        .catch((error) => {
          console.error('Error declining application:', error.response ? error.response.data : error.message);
          alert('Failed to decline application.');
        });
    } else if (action === 'approve') {
      patchToBackend(`${baseUrl}/api/warden/long-leaves/approve/`, { sid:sid, object_id: longLeaveId })
        .then(() => {
          setApplications((prev) => prev.filter((app) => app.longLeaves._id !== longLeaveId));
        })
        .catch((error) => {
          console.error('Error approving application:', error.response ? error.response.data : error.message);
          alert('Failed to approve application.');
        });
    }
  };

  const handleTimeFrameChange = (event) => {
    const newTimeFrame = event.target.value;
    setTimeFrame(newTimeFrame);
  };

  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const currentApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className=" min-h-screen pt-20 pb-6"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${pic})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
        <h1 className="text-3xl font-bold text-center mb-8">Long Leave Applications</h1>

        <div className="mb-6">
          <label htmlFor="time-frame" className="block text-gray-700 font-semibold mb-2">
            Select Time Frame:
          </label>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentApplications.length > 0 ? (
            currentApplications.map((application) => {
              const uniqueKey = application.longLeaves._id.toString();
              const isSelected = selectedApplication === application.longLeaves._id;

              return (
                <div
                  key={uniqueKey}
                  className="bg-gray-50 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => handleApplicationClick(application.longLeaves._id)}
                  >
                    <div>
                      <p className="text-lg font-semibold">{application.name}</p>
                      <p className="text-sm text-gray-600">
                        SID: {application.sid} | Branch: {application.branch}
                      </p>
                    </div>
                    <span className="text-gray-500 text-xl">
                      {isSelected ? '▲' : '▼'}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="mt-4">
                      <p><strong>Reason:</strong> {application.longLeaves.reason}</p>
                      <p><strong>Start Date:</strong> {application.longLeaves.dateOfLeaving}</p>
                      <p><strong>End Date:</strong> {application.longLeaves.dateOfReturn}</p>
                      <p><strong>Room No.:</strong> {application.longLeaves.roomNumber}</p>
                      <p><strong>Address:</strong> {application.longLeaves.address}</p>
                      <div className="flex gap-4 mt-4">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          onClick={() => handleAction(application, 'approve')}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          onClick={() => handleAction(application, 'decline')}
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
            <p className="text-center text-gray-500 col-span-full">
              No long leave applications available.
            </p>
          )}
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300"
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => changePage(num + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === num + 1 ? 'bg-middle-teal text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LongLeavesApprove;
