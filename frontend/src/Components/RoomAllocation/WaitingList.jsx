import React, { useState, useEffect } from 'react';
import { getFromBackend, patchToBackend } from '../../store/fetchdata';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '@/urls';
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '../ui/card'; 
import { AuroraBackground } from "../ui/aurora-background.tsx"

const WaitingList = () => {
  const [waitingList, setWaitingList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [roomNumber, setRoomNumber] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        const response = await getFromBackend(
          `${baseUrl}/api/room-allocation/waiting-list/`
        );
        const roomNumberFromResponse = response.data.roomNumber;
        setRoomNumber(roomNumberFromResponse);
        setWaitingList(response.data.waitingList);
      } catch (err) {
        setError('Failed to fetch waiting list');
        console.error('Error fetching waiting list:', err);
      }
    };

    const fetchUserInfo = async () => {
      try {
        if (roomNumber) {
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
  }, [roomNumber]);

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

  const handleAcceptApplication = async (sid, name, branch) => {
    try {
      const info = {
        sid: sid,
        name: name,
        branch: branch,
      };
      const response = await patchToBackend(
        `${baseUrl}/api/room-allocation/waiting-list/accept`, {info:info,roomNumber:roomNumber}
      );
      console.log('Application accepted:', response.data);
      setWaitingList((prevList) => prevList.slice(1));
      navigate('/RoomsView');
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

      if (userInfo && userInfo.sid === declinedSid) {
        const updatedUserInfo = { ...userInfo, inWaitingList: false };
        setUserInfo(updatedUserInfo);
      }
    } catch (err) {
      setError('Failed to decline the application');
      console.error('Error declining the application:', err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
        {/* Aurora Background */}
        <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />

    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-lg relative z-10">
        <CardHeader>
          <CardTitle className="text-center text-3xl">
            Waiting List for Room {roomNumber ? roomNumber : 'Loading...'}
          </CardTitle>
          {error && <CardDescription className="text-red-600">{error}</CardDescription>}
        </CardHeader>

        <CardContent>
          {waitingList.length === 0 ? (
            <p className="text-center text-gray-600">
              No one is currently on the waiting list for this room.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {waitingList.map((person, index) => (
                <li key={index} className="p-4 flex flex-col md:flex-row justify-between items-center">
                  <div className="text-gray-700">
                    <p> <strong>Name:</strong> {person.name} </p>
                    <p> <strong>SID:</strong> {person.sid} </p>                                    
                    <p> <strong>Branch:</strong> {person.branch} </p>                 
                  </div>
                  
                  {userInfo && userInfo.occupant && (
                    <div className="mt-4 md:mt-0 flex space-x-4">
                      <button
                        onClick={() =>
                          handleAcceptApplication(person.sid, person.name, person.branch)
                        }
                        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-800"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeclineApplication(person.sid)}
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
        </CardContent>

        {userInfo && userInfo.inWaitingList && (
          <CardFooter className="flex justify-center">
            <button
              onClick={handleLeaveWaitingList}
              disabled={userInfo.occupant}
              className={`px-4 py-2 rounded ${
                userInfo.occupant
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-800'
              }`}
            >
              {userInfo.occupant ? 'You are the Occupant' : 'Leave Waiting List'}
            </button>
          </CardFooter>
        )}
      </Card>
    </div>
    </div>
  );
};

export default WaitingList;