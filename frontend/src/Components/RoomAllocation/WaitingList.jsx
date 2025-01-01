import React, { useState, useEffect } from 'react';
import { getFromBackend, patchToBackend } from '../../store/fetchdata'; // Import the functions
import { useNavigate } from 'react-router-dom';

const WaitingList = ({ roomNumber }) => {
  const [waitingList, setWaitingList] = useState([]);
  const [error, setError] = useState(null);
  const [showLeaveButton, setShowLeaveButton] = useState(true); // State to show/hide the button
  const navigate = useNavigate();
  // Fetch waiting list data when the component mounts
  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        const response = await getFromBackend(
          `http://127.0.0.1:5090/api/room-allocation/waiting-list/`
        );
        setWaitingList(response.data.waitingList); // Use the data from the response
      } catch (err) {
        setError('Failed to fetch waiting list');
        console.error('Error fetching waiting list:', err);
      }
    };

    fetchWaitingList();
  }, [roomNumber]);

  const handleLeaveWaitingList = async () => {
    try {
      // Send a PATCH request to update the waiting list (remove the user)
      const response = await patchToBackend(
        `http://127.0.0.1:5090/api/room-allocation/waiting-list/leave`
      );
      const sid = response.data.sid;
      // Filter out the user with the SID from the waiting list
      setWaitingList((prevList) => prevList.filter((person) => person.sid !== sid));
      setShowLeaveButton(false); // Hide the button after the user is removed
      navigate('/RoomsView');
    } catch (err) {
      setError('Failed to remove from waiting list');
      console.error('Error leaving waiting list:', err);
    }
  };

  return (
    <div className="container p-8">
      <h2 className="text-2xl font-semibold mb-4">Waiting List for Room {roomNumber}</h2>

      {error && <div className="text-red-600">{error}</div>}

      {waitingList.length === 0 ? (
        <p>No one is currently on the waiting list for this room.</p>
      ) : (
        <ul>
          {waitingList.map((person, index) => (
            <li key={index} className="mb-4 p-4 border-b">
              <strong>Name:</strong> {person.name} <br />
              <strong>SID:</strong> {person.sid} <br />
              <strong>Branch:</strong> {person.branch}
            </li>
          ))}
        </ul>
      )}

      {/* Show the "Leave Waiting List" button only once */}
      {showLeaveButton && waitingList.length > 0 && (
        <button
          onClick={handleLeaveWaitingList}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
        >
          Leave Waiting List
        </button>
      )}
    </div>
  );
};

export default WaitingList;
