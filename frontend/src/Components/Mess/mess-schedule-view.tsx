import React, { useState } from "react";
import { Calendar } from '@/Components/ui/calendar';

const MessCalendar = () => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const messSchedule: { [key: string]: string } = {
    "2024-12-28": "Pasta & Salad",
    "2024-12-29": "Fried Rice & Curry",
  };

  const offDays = ["2024-12-25", "2024-12-31"]; // Example off days

  const handleMouseEnter = (date: Date) => setHoveredDate(date);
  const handleMouseLeave = () => setHoveredDate(null);

  const isOffDay = (date: { toISOString: () => string; }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return offDays.includes(formattedDate);
  };

  const getMessMenu = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return messSchedule[formattedDate] || null;
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-24">
      <h2 className="text-xl font-bold text-center mb-4 text-white border-4-dark-teal rounded">Mess Schedule</h2>
      <div className="relative bg-slate-400">
        <Calendar
          mode="single"
          className="shadow-md rounded-md border p-4"
          renderDay={(date: Date, modifiers: { onDayClick: (arg0: any) => void; }) => (
            <div
              key={date ? date.toString() : 'null'}
              onMouseEnter={() => handleMouseEnter(date)}
              onMouseLeave={handleMouseLeave}
              onClick={date && isOffDay(date) ? undefined : () => modifiers.onDayClick(date)}
              className={`p-2 text-center rounded-md ${
                isOffDay(date)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "hover:bg-blue-200 bg-white"
              }`}
            >
              {date.getDate()}
            </div>
          )}
        />
        {hoveredDate && getMessMenu(hoveredDate) && (
          <div className="absolute bg-white p-2 shadow-lg border rounded-md text-sm">
            {getMessMenu(hoveredDate)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessCalendar;