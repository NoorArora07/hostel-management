import React, { useState, useEffect } from "react";
import axios from "axios";
import {getSocket} from '../../store/socket';
import { getFromBackend, patchToBackend, postToBackend } from "../../store/fetchdata";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card";
import { useNavigate } from "react-router-dom"; 
import roomalloc from '../../Photos/roomalloc.jpg'
import roomallocinstruct from '../../Photos/roomallocinstruct.jpg'
import { baseUrl } from "@/urls";

const RoomAllocation = () => {
  
  const floors = 3;
  const roomsPerSide = 12;
  const [floor, setFloor] = useState(1);
  const [roomStatus, setRoomStatus] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allowWaitingList, setAllowWaitingList] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hasWaitingList, setHasWaitingList] = useState(false); // State to track waiting list status

  const navigate = useNavigate(); 
  const socket = getSocket();

  const fetchRoomData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/room-allocation/get-rooms/${floor}`
      );
      if (response.data && Array.isArray(response.data.rooms)) {
        setRoomStatus(response.data.rooms);
        console.log(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
        setRoomStatus([]);
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
      setRoomStatus([]);
    }
  };

  // Fetch room data from the backend for the selected floor
  useEffect(() => {
    if (!socket) {
      console.error("Socket is not initialized.");
      return;
    }

    socket.on("roomUpdated", (updatedRoom) => {
      console.log(updatedRoom);
      setRoomStatus((prevRoomStatus) =>
        prevRoomStatus.map((room) =>
          room.roomNumber === updatedRoom.roomNumber ? updatedRoom : room
        )
      );
      fetchRoomData();
    });

    if (socket.connected) {
      fetchRoomData();
    } else {
      socket.on("connect", fetchRoomData); // Trigger data fetch when socket connects
    }

    return () => {
      socket.off("roomUpdated");
    };
  }, [floor, socket]);

  const checkWaitingListStatus = async (roomNumber) => {
    if (!roomNumber) return;
    try {
      const response = await getFromBackend(`${baseUrl}/api/room-allocation/get-info/${roomNumber}`);
      const data = response.data;
      console.log(data);
      // Set the allowWaitingList value in state
      setAllowWaitingList(data.allowWaitingList || false); 
      // Update selectedRoom state to include allowWaitingList
      setSelectedRoom((prev) => ({
        ...prev,
        occupant: data.occupant,
        inWaitingList: data.inWaitingList,
        allowWaitingList: prev.allowWaitingList, // Ensure allowWaitingList is set correctly
      }));
    } catch (error) {
      console.error("Error fetching waiting list status:", error);
    }
  };

  const getRoomColor = (room) => {
    if (selectedRoom?.roomNumber === room.roomNumber) {
      return "bg-purple-200 border-purple-500"; // Selected room
    }
    if (!room.numberOfOccupants || room.numberOfOccupants === 0) return "bg-white"; // Empty room
    if (room.numberOfOccupants === 1) return "bg-yellow-400"; // One occupant
    if (room.numberOfOccupants === 2) return "bg-green-500"; // Two occupants
    return "bg-gray-200"; // Default
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setAllowWaitingList(false); // Reset waiting list checkbox
    setHasWaitingList(false); // Reset button display status
    checkWaitingListStatus(room.roomNumber); // Check waiting list status for the selected room
  };

  const handleConfirmSelection = async () => {
    if (!selectedRoom) return;

    console.log(allowWaitingList);

    setAllowWaitingList(selectedRoom.allowWaitingList);
    const updatedPersonData = {
      roomNumber: selectedRoom.roomNumber,
      numberOfOccupants: selectedRoom.numberOfOccupants,
      allowWaitingList: selectedRoom.numberOfOccupants === 1 ? selectedRoom.allowWaitingList : allowWaitingList,
    };
  
    const updatedRoomData = {
      roomNumber: selectedRoom.roomNumber,
      numberOfOccupants: selectedRoom.numberOfOccupants,
      allowWaitingList: selectedRoom.numberOfOccupants === 1 ? selectedRoom.allowWaitingList : allowWaitingList,
    };

    console.log(updatedRoomData);
  
    try {
      const updatedRoomStatus = roomStatus.map((room) =>
        room.roomNumber === selectedRoom.roomNumber
          ? {
              ...room,
              numberOfOccupants: updatedRoomData.numberOfOccupants,
              allowWaitingList: updatedRoomData.allowWaitingList,
            }
          : room
      );
      setRoomStatus(updatedRoomStatus);

      // SOCKET EMITTING MESSAGE 
      socket.emit("roomUpdated", {
        ...updatedRoomData,
        occupantsDetails: [updatedPersonData], // Include occupant details
      },  (response) => {
        setAllowWaitingList(response.allowWaitingList || false)

        // Check if the room is already selected
      if (response.selected === false) {
        setShowConfirmation(false); 
        alert(response.reason); 
        fetchRoomData();
        return; 
      }
        
        setShowConfirmation(false); // Close confirmation popup

        // Now check and show waiting list alert, if applicable
        if (selectedRoom.allowWaitingList) {
          alert('You have been added to the waiting list for this room.');
        }
    });
    } catch (error) {
      console.error("Error updating room data:", error);
    }
  };

  const renderRooms = (rooms, startIndex) => {
    return rooms.slice(startIndex, startIndex + roomsPerSide).map((room, index) => (
      <HoverCard key={room.roomNumber}>
        <HoverCardTrigger>
          <div
            className={`w-16 h-16 ${getRoomColor(room)} text-black flex items-center justify-center rounded-lg text-sm font-medium border`}
            onClick={() => handleRoomClick(room)}
          >
            {room.roomNumber}
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          {room.numberOfOccupants === 0
            ? `Room ${room.roomNumber}: Empty`
            : `Room ${room.roomNumber}: ${room.numberOfOccupants} Occupant(s)`}
        </HoverCardContent>
      </HoverCard>
    ));
  };

  const leftRooms = roomStatus.slice(0, roomsPerSide);
  const rightRooms = roomStatus.slice(roomsPerSide);

  if (!socket || !socket.connected) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {/* Image Section */}
    <div className="w-full max-h-screen flex justify-center mb-6 mt-30 relative">
      <img
        src={roomalloc}
        alt="Hostel Top Banner"
        className="w-full object-cover rounded-lg shadow-lg"
      />
      <div className="absolute top-1/2 left-6 transform -translate-y-1/2 flex items-center text-white text-4xl font-bold p-6 animate-slide-in">
        <div className="mr-6">
          <div>Welcome to <br /> Room Allocation System!</div>
          <div className="text-2xl font-normal">Streamlining room allocation <br /> for a hassle-free hostel experience.</div>
        </div>
      </div>
      <div className=" absolute ml-auto pb-20 pt-40 right-10">
        <img src={roomallocinstruct} alt="Side Image" className=" object-cover rounded-lg shadow-lg" />
        </div>
    </div>
    
    <div className="flex flex-col gap-8 p-8 mt-10">

      {/* Floor Tabs */}
      <div className="flex justify-center gap-4 mb-4">
        {[...Array(floors)].map((_, floorIndex) => (
          <button
            key={floorIndex}
            onClick={() => setFloor(floorIndex + 1)}
            className={`px-4 py-2 rounded-md text-white font-medium ${floor === floorIndex + 1 ? "bg-violet-500" : "bg-gray-400"}`}
          >
            Floor {floorIndex + 1}
          </button>
        ))}
      </div>

      {/* Floor Layout */}
      <div className="flex flex-row gap-8 justify-center">
        {/* Rooms */}
        <div className="border rounded-lg p-4 bg-violet-100 shadow-md">
          <h2 className="text-xl font-semibold text-center mb-4">Floor {floor}</h2>
          {roomStatus.length === 0 ? (
            <div>No room data available for Floor {floor}</div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="grid grid-cols-12 gap-4">{renderRooms(leftRooms, 0)}</div>
              <div className="w-full h-6 bg-gray-300"></div>
              <div className="grid grid-cols-12 gap-4">{renderRooms(rightRooms, 0)}</div>
            </div>
          )}
        </div>

        {/* Selected Room Details */}
        {selectedRoom && (
          <div className="w-64 p-4 border rounded-lg bg-violet-100 shadow-md flex flex-col items-center justify-start min-h-full overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Selected Room:</h3>
            <p className="text-sm mb-2">
              <strong>Room Number:</strong> {selectedRoom.roomNumber}
            </p>
            <p className="text-sm mb-4">
              <strong>Occupants:</strong> {selectedRoom.numberOfOccupants}
            </p>

            {selectedRoom.numberOfOccupants === 1 && selectedRoom.occupantsDetails && (
              <div className="mb-4">
                <h4 className="font-semibold">Occupant Details:</h4>
                <p><strong>Name:</strong> {selectedRoom.occupantsDetails[0]?.name}</p>
                <p><strong>SID:</strong> {selectedRoom.occupantsDetails[0]?.sid}</p>
                <p><strong>Branch:</strong> {selectedRoom.occupantsDetails[0]?.branch}</p>
              </div>
            )}

            <div>
              {selectedRoom.allowWaitingList === true ? (
                <HoverCard>
                  <HoverCardTrigger>
                    <p><strong>The room has a <u>Waiting List.</u></strong></p>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <p>Waiting List means that the current occupant of the room has the ability to choose the person to be alloted to the room with them.</p>
                    </HoverCardContent>
                </HoverCard>
              ) : (
                " "
              )}
            </div>

            {selectedRoom.numberOfOccupants === 2 ? (
              <p className="text-red-600 font-semibold">
                This room is at full capacity.
              </p>
            ) : (
              selectedRoom.numberOfOccupants === 0 && (
                <div className="mt-2">
                  <label className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={allowWaitingList}
                      onChange={(e) => setAllowWaitingList(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <HoverCard>
                    <HoverCardTrigger>
                    <span>Create a <u>waiting list?</u></span>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <p>Waiting List means that the current occupant of the room has the ability to choose the person to be alloted to the room with them.</p>
                    </HoverCardContent>
                    </HoverCard>
                  </label>
                </div>
              )
            )}

            <button
              className={`mt-4 px-4 py-2 rounded-md ${
                selectedRoom.numberOfOccupants === 2
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-violet-500 text-white"
              }`}
              disabled={selectedRoom.numberOfOccupants === 2}
              onClick={() => setShowConfirmation(true)}
            >
              {selectedRoom.numberOfOccupants === 2 ? "Room Full" : "Select Room"}
            </button>

            {/* View Waiting List Button */}
            {selectedRoom && selectedRoom.numberOfOccupants === 1 && selectedRoom.allowWaitingList === true && (
            (selectedRoom.occupant || selectedRoom.inWaitingList) && (
              <div className="mt-4">
                <button
                  onClick={() => navigate(`/WaitingList`)} 
                  className="px-4 py-2 bg-violet-700 text-white rounded-md"
                >
                  View Waiting List
                </button>
              </div>
            )
          )}
          </div>
        )}
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to select this room?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmSelection}
                className="px-4 py-2 bg-violet-500 text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default RoomAllocation;