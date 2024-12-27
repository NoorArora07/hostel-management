import React, { useState } from "react";
import { postToBackend } from "../../store/fetchdata";

const FormComponent = ({ handleAddEvent, selectedDate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messData = {
      title,
      description,
      date: selectedDate, // Use the selectedDate prop
    };

    try {
      // Send the data to the backend
      const result = await postToBackend(
        "http://127.0.0.1:5090/api/mess-warden/createEvent",
        messData
      );
      console.log("Application data sent to backend:", messData, result);

      // Trigger the local event addition
      handleAddEvent(title, description);

      // Clear the form
      setTitle("");
      setDescription("");
      setError(null);
      console.log("Event added successfully");
    } catch (error) {
      console.error("Error in creating event:", error);
      setError("There was an error creating the event.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Event Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Event Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          rows={3}
        ></textarea>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        Add Event
      </button>
    </form>
  );
};

export default FormComponent;
