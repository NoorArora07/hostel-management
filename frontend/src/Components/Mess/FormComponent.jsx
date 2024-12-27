import React, { useState } from "react";

const FormComponent = ({ handleAddEvent }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [error, setError] = useState("");

  const handleEventTitleChange = (e) => {
    setEventTitle(e.target.value);
    setError("");
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventTitle.trim() === "" || eventDescription.trim() === "") {
      setError("Please enter a title and description");
      return;
    }
    handleAddEvent(eventTitle, eventDescription);
    setEventTitle("");
    setEventDescription("");
    setError("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="eventTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Event Title:
          </label>
          <input
            type="text"
            id="eventTitle"
            value={eventTitle}
            onChange={handleEventTitleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter the event title"
          />
        </div>
        <div>
          <label
            htmlFor="eventDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Event Description:
          </label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={handleEventDescriptionChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter the event description"
            rows="4"
          ></textarea>
        </div>
        {error && (
          <p className="text-red-600 text-sm font-medium">{error}</p>
        )}
        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
