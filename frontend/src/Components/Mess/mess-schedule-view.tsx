import React from "react";
import MessCalendar from "./mess-calendar"

export default function MessSchedule() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Mess Calendar</h1>
      <MessCalendar />
    </div>
  )
}

