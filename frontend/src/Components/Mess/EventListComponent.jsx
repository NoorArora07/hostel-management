import React from "react";

const EventListComponent = ({ events }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Events</h2>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Date:</span> {event.date.toLocaleDateString()}
              </p>
              <p className="text-lg font-semibold text-gray-800 mb-1">{event.title}</p>
              <p className="text-gray-600">{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No events to display</p>
      )}
    </div>
  );
};

export default EventListComponent;
