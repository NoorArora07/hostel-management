import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getFromBackend, checkWarden } from "../../store/fetchdata"; // Ensure the import path is correct
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormMessWarden";
import EventListComponent from "./EventListWarden";
import { baseUrl } from "@/urls";
import pic from "@/Photos/wardendash5.jpg";

const WCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    verifyAccess();
  }, []);

  const verifyAccess = async () => {
    try {
      const message = await checkWarden();
      if (message === "access denied!") {
        navigate("/AccessDenied");
      } else {
        await fetchData(); // Fetch events only if access is granted
      }
    } catch (error) {
      console.error("Access verification error:", error);
      navigate("/AccessDenied");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getFromBackend(`${baseUrl}/api/mess-warden/getEvent`);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 to-black">
        <div className="w-16 h-16 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="h-screen mt-20 mb-12"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${pic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-12 text-white">
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
                className="px-6 py-2 bg-violet-500 text-white rounded-md shadow-md hover:bg-violet-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                onClick={toggleForm}
              >
                {showForm ? "Cancel" : "Add Event"}
              </button>
            </div>
            {showForm && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <FormComponent
                  handleAddEvent={handleAddEvent}
                  selectedDate={selectedDate}
                />
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <EventListComponent events={filteredEvents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WCalendar;
