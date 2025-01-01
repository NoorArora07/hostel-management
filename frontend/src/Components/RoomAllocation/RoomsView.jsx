import React, { useState, useEffect } from "react";
import axios from "axios";
import { patchToBackend, postToBackend } from '../../store/fetchdata';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card";

const RoomAllocation = () => {
  const floors = 3;
  const roomsPerSide = 12;
  const [floor, setFloor] = useState(1);
  const [roomStatus, setRoomStatus] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allowWaitingList, setWaitingList] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch room data from the backend for the selected floor
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5090/api/room-allocation/get-rooms/${floor}`
        );
        if (response.data && Array.isArray(response.data.rooms)) {
          setRoomStatus(response.data.rooms); // Access "rooms" array
        } else {
          console.error("Unexpected data format:", response.data);
          setRoomStatus([]);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
        setRoomStatus([]);
      }
    };

    fetchRoomData();
  }, [floor]);

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
    setWaitingList(false); // Reset waiting list checkbox
  };

  const handleConfirmSelection = async () => {
    if (!selectedRoom) return;
    
    const updatedPersonData = {
        roomNumber: selectedRoom.roomNumber,
        numberOfOccupants: selectedRoom.numberOfOccupants,
        allowWaitingList
    }

    const updatedRoomData = {
      roomNumber: selectedRoom.roomNumber,
      numberOfOccupants: selectedRoom.numberOfOccupants,
      allowWaitingList
    };
  
    try {
      const response1 = await patchToBackend(
        `http://127.0.0.1:5090/api/room-allocation/room`,
        updatedRoomData
      );
      const response2 = await postToBackend(
        `http://127.0.0.1:5090/api/room-allocation/person`,
        updatedPersonData
      );
      console.log("API Response:", response); // Debug the response object
      if (response.status === 200) {
        const updatedRoomStatus = roomStatus.map((room) =>
          room.roomNumber === selectedRoom.roomNumber
            ? {
                ...room,
                numberOfOccupants: updatedRoomData.numberOfOccupants,
              }
            : room
        );
        setRoomStatus(updatedRoomStatus);
        setShowConfirmation(false); // Close confirmation popup
      }
    } catch (error) {
      console.error("Error updating room data:", error); // Log the error
      handleAxiosError(error); // Use the custom error handler
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

  return (
    <div className="flex flex-col gap-8 p-8 mt-14">
      {/* Floor Tabs */}
      <div className="flex justify-center gap-4 mb-4">
        {[...Array(floors)].map((_, floorIndex) => (
          <button
            key={floorIndex}
            onClick={() => setFloor(floorIndex + 1)}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              floor === floorIndex + 1 ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            Floor {floorIndex + 1}
          </button>
        ))}
      </div>

      {/* Floor Layout */}
      <div className="flex flex-row gap-8">
        {/* Rooms */}
        <div className="border rounded-lg p-4 bg-gray-50 shadow-md">
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
          <div className="w-64 p-4 border rounded-lg bg-gray-100 shadow-md flex flex-col items-center justify-start min-h-full overflow-auto">
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
                      onChange={(e) => setWaitingList(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Create a waiting list?</span>
                  </label>
                </div>
              )
            )}

            <button
              className={`mt-4 px-4 py-2 rounded-md ${
                selectedRoom.numberOfOccupants === 2
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white"
              }`}
              disabled={selectedRoom.numberOfOccupants === 2}
              onClick={() => setShowConfirmation(true)}
            >
              {selectedRoom.numberOfOccupants === 2 ? "Room Full" : "Select Room"}
            </button>
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomAllocation;
