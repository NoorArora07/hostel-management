import React from "react";

const EventListComponent = ({ events }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Events</h2>
      {events.length > 0 ? (
        <ul className="space-y-6">
          {events.map((event, index) => (
            <li key={index} className="border-b border-purple-100 pb-6 last:border-b-0">
              <p className="text-sm text-purple-600 mb-2">
                <span className="font-semibold">Date:</span> {event.date.toLocaleDateString()}
              </p>
              <p className="text-xl font-semibold text-purple-800 mb-2">{event.title}</p>
              <p className="text-gray-700">{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic text-center">No events to display</p>
      )}
    </div>
  );
};

export default EventListComponent;
