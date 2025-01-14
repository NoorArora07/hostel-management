import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventListComponent from "./EventListComponent";
import { getFromBackend } from "../../store/fetchdata";
import { baseUrl } from "@/urls";
import pic from '@/Photos/schedulemess.jpg'

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getFromBackend(`${baseUrl}/api/mess/getEvent`);
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
    <div className="h-screen mt-20 mb-12"
    style={{
      backgroundImage: `url(${pic})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <div className="container mx-auto p-4 max-w-4xl mt-20 mb-5">
      <h1 className="p-3 text-4xl font-bold bg-white text-center mb-12 text-black">
        Mess Calendar
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <Calendar
            className="react-calendar border-none w-full"
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={({ date, view }) =>
              view === 'month' && isDateWithEvent(date) ? (
                <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mt-1"></div>
              ) : null
            }
            tileClassName={({ date, view }) => 
              view === 'month' && selectedDate.toDateString() === date.toDateString() 
                ? 'bg-purple-100 text-purple-800 rounded-full' 
                : null
            }
          />
        </div>
        <div>
          <EventListComponent events={filteredEvents} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyCalendar;