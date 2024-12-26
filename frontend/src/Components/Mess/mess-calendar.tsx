'use client'

import * as React from "react"
import { format } from "date-fns"
import { Calendar } from "@/Components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"

const messOffDates = [new Date(2023, 11, 5), new Date(2023, 11, 12), new Date(2023, 11, 19), new Date(2023, 11, 26)]
const menuItems: { [key: string]: string[] } = {
  "2023-12-01": ["Pasta", "Salad", "Fruit"],
  "2023-12-02": ["Chicken", "Rice", "Vegetables"],
}

const MessCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const isMessOff = (date: Date) => {
    return messOffDates.some(messOffDate => 
      messOffDate.getDate() === date.getDate() &&
      messOffDate.getMonth() === date.getMonth() &&
      messOffDate.getFullYear() === date.getFullYear()
    )
  }

  const getDayContent = (day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd")
    const dayMenu = menuItems[formattedDate]

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={`w-full h-full flex items-center justify-center cursor-pointer ${
              isMessOff(day) ? 'text-gray-500' : 'text-white'
            }`}
          >
            {format(day, "d")}
          </div>
        </PopoverTrigger>
        {dayMenu && (
          <PopoverContent className="w-64 bg-gray-800 text-white">
            <div className="space-y-2">
              <h3 className="font-semibold">Menu for {format(day, "MMMM d, yyyy")}</h3>
              <ul className="list-disc pl-4">
                {dayMenu.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </PopoverContent>
        )}
      </Popover>
    )
  }

  return (
    <div className="p-4 bg-black text-white">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border border-gray-700"
        classNames={{
          day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
          day_today: "bg-gray-800 text-white",
          day: "text-white hover:bg-gray-700",
          day_disabled: "text-gray-500",
          day_range_middle: "bg-gray-800",
          day_hidden: "invisible",
          nav_button: "text-gray-400 hover:text-white",
          table: "border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-gray-400",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-2 relative [&:has([aria-selected])]:bg-gray-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected])]:bg-gray-800",
          day_range_end: "rounded-r-md",
          day_range_start: "rounded-l-md",
        }}
        components={{
          Day: ({ date: dayDate, ...props }: { date: Date; className?: string; style?: React.CSSProperties; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void; }) => {
            // Extract only the props that are valid for HTML elements
            const { className, style, onClick, onMouseEnter, onMouseLeave } = props;
            return (
              <div 
                className={className}
                style={style}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                {getDayContent(dayDate)}
              </div>
            )
          },
        }}
      />
    </div>
  )
}

export default MessCalendar
