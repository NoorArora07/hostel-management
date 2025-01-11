import React, { useState, useEffect } from 'react';
import { getFromBackend, patchToBackend } from '../../store/fetchdata'; // Import the functions
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '@/urls';

const WaitingList = () => {
  const [waitingList, setWaitingList] = useState([]);
  const [userInfo, setUserInfo] = useState(null); // State for user details
  const [roomNumber, setRoomNumber] = useState(null); // State for room number
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch waiting list data and user info when the component mounts
  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        const response = await getFromBackend(
          `${baseUrl}/api/room-allocation/waiting-list/`
        );
        const roomNumberFromResponse = response.data.roomNumber; // Extract roomNumber from response
        setRoomNumber(roomNumberFromResponse); // Set roomNumber from the response
        setWaitingList(response.data.waitingList);
      } catch (err) {
        setError('Failed to fetch waiting list');
        console.error('Error fetching waiting list:', err);
      }
    };

    const fetchUserInfo = async () => {
      try {
        if (roomNumber) { // Fetch user info only if roomNumber is available
          const response = await getFromBackend(
            `${baseUrl}/api/room-allocation/get-info/${roomNumber}`
          );
          setUserInfo(response.data);
        }
      } catch (err) {
        setError('Failed to fetch user information');
        console.error('Error fetching user info:', err);
      }
    };

    fetchWaitingList();
    fetchUserInfo();
  }, [roomNumber]); // Fetch user info whenever roomNumber is updated

  const handleLeaveWaitingList = async () => {
    try {
      const response = await patchToBackend(
        `${baseUrl}/api/room-allocation/waiting-list/leave`
      );
      const sid = response.data.sid;
      setWaitingList((prevList) => prevList.filter((person) => person.sid !== sid));
      navigate('/RoomsView');
    } catch (err) {
      setError('Failed to remove from waiting list');
      console.error('Error leaving waiting list:', err);
    }
  };

  const handleAcceptApplication = async (sid,name,branch) => {
    try {
        const info = {
            sid:sid,name:name,branch:branch
        }
      const response = await patchToBackend(
        `${baseUrl}/api/room-allocation/waiting-list/accept`, {info:info,roomNumber:roomNumber}
      );
      console.log('Application accepted:', response.data);
      setWaitingList((prevList) => prevList.slice(1)); // Remove the first person from the waiting list
    } catch (err) {
      setError('Failed to accept the application');
      console.error('Error accepting the application:', err);
    }
  };

  const handleDeclineApplication = async (declinedSid) => {
    try {
      const response = await patchToBackend(
        `${baseUrl}/api/room-allocation/waiting-list/decline`, {sid:declinedSid, roomNumber:roomNumber}
      );
      console.log('Application declined:', response.data);
      setWaitingList((prevList) => prevList.filter((person) => person.sid !== declinedSid));
  
      // Optional: Update user status to not be in the waiting list anymore
      if (userInfo && userInfo.sid === declinedSid) {
        const updatedUserInfo = { ...userInfo, inWaitingList: false }; // Update the user status
        setUserInfo(updatedUserInfo); // Update userInfo state
      }
    } catch (err) {
      setError('Failed to decline the application');
      console.error('Error declining the application:', err);
    }
  };
  

  return (
    <div className="container p-8 mt-16">
      <h2 className="text-2xl font-semibold mb-4">
        Waiting List for Room {roomNumber ? roomNumber : 'Loading...'}
      </h2>

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
            {userInfo && userInfo.occupant && (
            <div className="mt-4 flex space-x-4">
                <button
                onClick={() => handleAcceptApplication(person.sid,person.name,person.branch)} // Passing person.sid
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-800"
                >
                Accept
                </button>
                <button
                onClick={() => handleDeclineApplication(person.sid)} // Passing person.sid
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-800"
                >
                Decline
                </button>
            </div>
            )}
        </li>
        ))}

        </ul>
      )}

      {/* Check if userInfo is available and in waiting list */}
      {userInfo ? (
        userInfo.inWaitingList ? (
          <button
            onClick={handleLeaveWaitingList}
            disabled={userInfo.occupant} // Disables the button if userInfo.occupant is true
            className={`mt-4 px-4 py-2 rounded ${userInfo.occupant ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-800'}`}
          >
            {userInfo.occupant ? 'You are the Occupant' : 'Leave Waiting List'}
          </button>
        ) : null
      ) : null}
    </div>
  );
};

export default WaitingList;
