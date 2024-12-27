import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventListComponent from "./EventListComponent";
import { getFromBackend } from "../../store/fetchdata";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getFromBackend("http://127.0.0.1:5090/api/mess/getEvent");
      const transformedEvents = response.data.map(({ title, description, date }) => ({
        date: new Date(date),
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

  const isDateWithEvent = (date) => {
    return events.some(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const filteredEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl mt-20 mb-5">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-950">
        Mess Calendar
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
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
        <div>
          <EventListComponent events={filteredEvents} />
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
