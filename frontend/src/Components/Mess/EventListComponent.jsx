import React from "react";

const EventListComponent = ({ events }) => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold text-violet-700">
        Events for {events.length > 0 ? events[0].date.toLocaleDateString() : "Selected Date"}
      </h2>
      {events.length > 0 ? (
        <ul className="space-y-6">
          {events.map((event, index) => (
            <li
              key={index}
              className="bg-violet-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-violet-800 mb-2">{event.title}</h3>
              <p className="text-gray-700">{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 italic">No events to display for this date</p>
      )}
    </div>
  );
};

export default EventListComponent;