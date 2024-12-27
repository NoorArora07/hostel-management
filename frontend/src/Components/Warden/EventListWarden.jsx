import React from "react";

const EventListComponent = ({ events }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">
        Events for {events.length > 0 ? events[0].date.toLocaleDateString() : 'Selected Date'}
      </h2>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No events to display for this date</p>
      )}
    </div>
  );
};

export default EventListComponent;

