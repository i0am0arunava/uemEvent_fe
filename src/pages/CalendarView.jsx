// import React from 'react'
import axios from "axios";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths } from "date-fns";
import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./scroll.css"
export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);

  //! Fetch events from the server -------------------------------------------------------
  useEffect(() => {

    axios.get("/events").then((response) => {
      setEvents(response.data);
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, []);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const firstDayOfWeek = firstDayOfMonth.getDay();

  //! Create an array of empty cells to align days correctly-----------------------------------------
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, index) => <div key={`empty-${index}`} className="p-2 bg-gray-900 text-white ring-1 ring-gray-600"></div>);

console.log("events",events)
  return (
    <div className="p-4 md:mx-16 ">
      <div className=" rounded p-2">
        <div className="flex items-center mb-4 justify-center gap-6 ">
          <button className="primary" onClick={() => setCurrentMonth((prevMonth) => addMonths(prevMonth, -1))}>
            <BsCaretLeftFill className="w-auto h-5" />
          </button>
          <span className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
          <button className="primary" onClick={() => setCurrentMonth((prevMonth) => addMonths(prevMonth, 1))}>
            <BsFillCaretRightFill className="w-auto h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 font-semibold bg-gray-900 text-white ring-1 ring-gray-600">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 ">
          {
            emptyCells.concat(daysInMonth.map((date) => (
              <div key={date.toISOString()} className="p-2 relative top-0 pb-20 sm:pb-24 ring-1 ring-gray-600 bg-gray-900 text-white flex flex-col items-start justify-start">
                <div className="font-bold">{format(date, "dd")}</div>
                <div className="absolute top-8 overflow-y-auto max-h-24 w-full space-y-1 pr-1 scroll">
                  {events
                    .filter((event) => format(new Date(event.eventDate), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
                    .map((event) => (
                      <div key={event._id} className="mt-0 flex md:mt-2">
                        <Link to={`/event/${event._id}`} className="flex items-center gap-2">

                          <div className="text-white text-xs md:text-sm font-medium h-auto w-40 bg-gray-800 p-1 rounded-md">
                            {event.title}
                            <div className="h-1 bg-cus rounded mt-1 w-full"></div>
                          </div>


                        </Link>




                      </div>
                    ))}
                </div>
              </div>
            ))
            )}
        </div>
      </div>
    </div>
  )
}
