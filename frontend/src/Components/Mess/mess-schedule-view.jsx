import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import FormComponent from "./FormComponent";
import EventListComponent from "./EventListComponent";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    const response = await axios.get("link"); // Replace with your actual backend endpoint
    const transformedEvents = response.data.map(({ title, description, date }) => ({
      date: new Date(date), // Ensure the backend sends ISO strings for dates
      title,
      description,
    }));

    setEvents(transformedEvents);
  } catch (error) {
    console.error("API fetch error:", error);
  }
};


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = (title, description) => {
    const newEvent = {
      date: selectedDate,
      title,
      description,
    };
    setEvents([...events, newEvent]);
    setShowForm(false); // Hide the form after adding an event
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const isDateWithEvent = (date) => {
    return events.some(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const filteredEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );
return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
        My Calendar
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Calendar
          className="react-calendar border-none"
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={({ date }) =>
            isDateWithEvent(date) && (
              <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto"></div>
            )
          }
        />
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
          onClick={toggleForm}
        >
          {showForm ? "Cancel" : "Add Event"}
        </button>
      </div>
      {showForm && (
        <div className="mt-6">
          <FormComponent handleAddEvent={handleAddEvent} />
        </div>
      )}
      <div className="mt-6">
        <EventListComponent events={filteredEvents} />
      </div>
    </div>
  );
};

export default MyCalendar;
