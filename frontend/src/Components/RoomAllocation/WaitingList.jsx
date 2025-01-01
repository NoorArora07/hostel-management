import React, { useState, useEffect } from 'react';
import { getFromBackend, patchToBackend } from '../../store/fetchdata'; // Import the functions

const WaitingList = ({ roomNumber }) => {
  const [waitingList, setWaitingList] = useState([]);
  const [error, setError] = useState(null);

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
        console.error("Error fetching waiting list:", err);
      }
    };

    fetchWaitingList();
  }, [roomNumber]);

  const handleLeaveWaitingList = async (sid) => {
    try {
      // Send a PATCH request to update the waiting list (remove the person)
      await patchToBackend(`http://127.0.0.1:5090/api/room-allocation/waiting-list/leave`);

      // Remove the person from the local state after successful update
      setWaitingList(waitingList.filter(person => person.sid !== sid));
    } catch (err) {
      setError('Failed to remove from waiting list');
      console.error("Error leaving waiting list:", err);
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
              <strong>Branch:</strong> {person.branch} <br />
              <button
                onClick={() => handleLeaveWaitingList(person.sid)}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
              >
                Leave Waiting List
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WaitingList;
