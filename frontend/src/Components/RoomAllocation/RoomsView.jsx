import React, { useState, useEffect } from "react";
import { getFromBackend } from "../../store/fetchdata"; 
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card"; 

const RoomAllocation = () => {
  const floors = 3; 
  const roomsPerSide = 12; 
  const [currentFloor, setCurrentFloor] = useState(1); 
  const [roomStatus, setRoomStatus] = useState(
    Array(roomsPerSide * 2).fill(0) // Initial room data for a single floor
  );
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [waitingList, setWaitingList] = useState(false);

  // Fetch room data from the backend for the selected floor
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await getFromBackend(
          `http://127.0.0.1:5090/api/room-allocation/get-rooms/${currentFloor}`
        );
        setRoomStatus(response.data); // Update the room data for the current floor
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [currentFloor]); // Refetch data when the currentFloor changes

  const getRoomColor = (roomNumber, occupants) => {
    if (selectedRoom?.roomNumber === roomNumber) {
      // Apply light purple color for selected room
      return "bg-purple-200 border-purple-500";
    }
    if (occupants === 0) return "bg-white";
    if (occupants === 1) return "bg-yellow-400";
    if (occupants === 2) return "bg-green-500";
  };

  const handleRoomClick = (roomNumber, occupants) => {
    setSelectedRoom({ roomNumber, occupants });
    setWaitingList(false); // Reset waiting list checkbox on room selection
  };

  return (
    <div className="flex flex-col gap-8 p-8 mt-14">
      {/* Floor Tabs */}
      <div className="flex justify-center gap-4 mb-4">
        {[...Array(floors)].map((_, floorIndex) => (
          <button
            key={floorIndex}
            onClick={() => setCurrentFloor(floorIndex + 1)}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              currentFloor === floorIndex + 1 ? "bg-blue-600" : "bg-gray-400"
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
          <h2 className="text-xl font-semibold text-center mb-4">
            Floor {currentFloor}
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-12 gap-4">
              {[...Array(roomsPerSide)].map((_, roomIndex) => (
                <HoverCard key={roomIndex}>
                  <HoverCardTrigger>
                    <div
                      className={`w-16 h-16 ${getRoomColor(
                        currentFloor * 100 + roomIndex + 1,
                        roomStatus[roomIndex]
                      )} text-black flex items-center justify-center rounded-lg text-sm font-medium border`}
                      onClick={() =>
                        handleRoomClick(currentFloor * 100 + roomIndex + 1, roomStatus[roomIndex])
                      }
                    >
                      {currentFloor * 100 + roomIndex + 1}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    {roomStatus[roomIndex] === 0
                      ? `Room ${currentFloor * 100 + roomIndex + 1} : Empty`
                      : `Room ${currentFloor * 100 + roomIndex + 1} : ${roomStatus[roomIndex]} Occupant(s)` }
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>

            <div className="w-full h-6 bg-gray-300"></div>

            <div className="grid grid-cols-12 gap-4">
              {[...Array(roomsPerSide)].map((_, roomIndex) => (
                <HoverCard key={roomIndex}>
                  <HoverCardTrigger>
                    <div
                      className={`w-16 h-16 ${getRoomColor(
                        currentFloor * 100 + roomIndex + 13,
                        roomStatus[roomIndex + roomsPerSide]
                      )} text-black flex items-center justify-center rounded-lg text-sm font-medium border`}
                      onClick={() =>
                        handleRoomClick(currentFloor * 100 + roomIndex + 13, roomStatus[roomIndex + roomsPerSide])
                      }
                    >
                      {currentFloor * 100 + roomIndex + 13}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    {roomStatus[roomIndex + roomsPerSide] === 0
                      ? `Room ${currentFloor * 100 + roomIndex + 13}: Empty`
                      : `Room ${currentFloor * 100 + roomIndex + 13}: ${roomStatus[roomIndex + roomsPerSide]} Occupant(s)` }
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Room Details */}
        {selectedRoom && (
          <div className="w-64 h-64 p-4 border rounded-lg bg-gray-100 shadow-md flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-4">Selected Room:</h3>
            <p className="text-sm mb-2">
              <strong>Room Number:</strong> {selectedRoom.roomNumber}
            </p>
            <p className="text-sm mb-4">
              <strong>Occupants:</strong> {selectedRoom.occupants}
            </p>
            {selectedRoom.occupants === 0 && (
              <div className="mt-2">
                <label className="flex items-center gap-3 text-sm">
                <input
                    type="checkbox"
                    checked={waitingList}
                    onChange={(e) => setWaitingList(e.target.checked)}
                    className="w-4 h-4"
                />
                <span>Add to waiting list?</span>
                </label>
              </div>
            )}
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
              Select Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomAllocation;
