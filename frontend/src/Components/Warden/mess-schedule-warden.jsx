import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getFromBackend } from "../../store/fetchdata"; // Ensure the import path is correct
import FormComponent from "./FormMessWarden";
import EventListComponent from "./EventListWarden";

const WCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getFromBackend("http://127.0.0.1:5090/api/mess-warden/getEvent");
      const transformedEvents = response.data.map(({ title, description, date }) => ({
        date: new Date(date), // Convert date string to Date object
        title,
        description,
      }));

      setEvents(transformedEvents); // Update state with transformed events
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
    setShowForm(false);
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
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Mess Warden Calendar
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Calendar
              className="react-calendar border-none w-full"
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={({ date }) =>
                isDateWithEvent(date) && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto"></div>
                )
              }
            />
          </div>
          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
              onClick={toggleForm}
            >
              {showForm ? "Cancel" : "Add Event"}
            </button>
          </div>
          {showForm && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <FormComponent handleAddEvent={handleAddEvent} selectedDate={selectedDate} />
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <EventListComponent events={filteredEvents} />
        </div>
      </div>
    </div>
  );
};

export default WCalendar;
