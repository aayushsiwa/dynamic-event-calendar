// src/components/CalendarGrid.jsx
import React, { useState } from "react";

const CalendarGrid = ({
  currentDate,
  setCurrentDate,
  onDayClick,
  events,
  onAddEvent,
}) => {
  const [selectedDay, setSelectedDay] = useState(currentDate);

  // Helper functions
  const startOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth = (date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days = [];

    // Add padding days for the start of the month
    for (let i = 0; i < start.getDay(); i++) {
      days.push(null);
    }

    // Add days of the current month
    for (
      let day = new Date(start);
      day <= end;
      day.setDate(day.getDate() + 1)
    ) {
      days.push(new Date(day));
    }

    return days;
  };

  const prevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prev);
  };

  const nextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(next);
  };

  const isCurrentDay = (day) =>
    day && day.toDateString() === new Date().toDateString();
  const hasEvents = (day) => day && events[day.toDateString()];
  const hasNEvents = (day) => events[day.toDateString()] || [];

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day);
      onDayClick(day);
    }
  };

  const selectedDayEvents = selectedDay
    ? events[selectedDay.toDateString()] || []
    : [];

  const days = daysInMonth(currentDate);
  const DAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="bg-background text-text rounded-lg shadow-paper p-4">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 rounded-md shadow bg-primary text-white hover:bg-accent transition"
          onClick={prevMonth}
        >
          Previous
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          className="px-4 py-2 rounded-md shadow bg-primary text-white hover:bg-accent transition"
          onClick={nextMonth}
        >
          Next
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {DAY_NAMES.map((dayName, index) => (
          <div key={index} className="text-center font-medium">
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`relative h-20 flex flex-col items-center justify-center border rounded-md cursor-pointer transition ${
              !day
                ? "bg-grid"
                : `hover:bg-accent ${
                    isCurrentDay(day)
                      ? "bg-currentDay-bg text-currentDay-text"
                      : "bg-light"
                  }`
            }`}
            onClick={() => handleDayClick(day)}
          >
            {/* Day Number */}
            {day && <span className="select-none">{day.getDate()}</span>}

            {/* Event Indicators */}
            {day && hasEvents(day) && (
              <div className="absolute bottom-2 flex items-center space-x-1">
                {/* For larger screens (md and above) */}
                <div className="hidden md:flex gap-1 items-center">
                  {hasNEvents(day)
                    .slice(0, 5)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-500"
                      ></div>
                    ))}
                  {hasNEvents(day).length > 5 && (
                    <span className="text-gray-500 font-bold">+</span>
                  )}
                </div>

                {/* For smaller screens (below md) */}
                <div className="md:hidden flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  {hasNEvents(day).length > 0 && (
                    <span className="text-gray-500 font-bold">+</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Event List Section */}
      <div className="mt-6">
        {selectedDay ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Events for{" "}
                {selectedDay.toLocaleString("default", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <button
                onClick={() => onAddEvent(selectedDay)}
                className="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-accent transition"
              >
                +
              </button>
            </div>
            {selectedDayEvents.length > 0 ? (
              <ul>
                {selectedDayEvents.map((event, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 border-b hover:bg-grid transition"
                  >
                    <div>
                      <h4 className="font-bold">{event.eventName}</h4>
                      <p>
                        {event.startTime} - {event.endTime}
                      </p>
                      <p className="text-sm text-gray-600">
                        {event.description}
                      </p>
                    </div>
                    {/* Optional: Delete Button */}
                    {/* <button
                      onClick={() => removeEvent(selectedDay, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button> */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No events for this day.</p>
            )}
          </>
        ) : (
          <p className="text-gray-500">Click on a day to view events.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;
