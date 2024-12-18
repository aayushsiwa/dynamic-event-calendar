import React, { useState } from "react";

const CalendarGrid = ({
  currentDate,
  setCurrentDate,
  onDayClick,
  events,
  onAddEvent,
  onEditEvent,
  onRemoveEvent,
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
      onAddEvent(day);
    }
  };

  const selectedDayEvents = selectedDay
    ? events[selectedDay.toDateString()] || []
    : [];

  const days = daysInMonth(currentDate);
  const DAY_NAMES = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  return (
    <div className="bg-background text-text rounded-lg p-4">
      {/* Calendar Header */}
      <div className="flex justify-start items-center mb-4 gap-4">
        <button onClick={prevMonth}>{"<"}</button>
        <button onClick={nextMonth}>{">"}</button>

        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {DAY_NAMES.map((dayName, index) => (
          <div key={index} className="text-center font-light text-gray-600">
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
            {day && (
              <span
                className={`select-none
                  ${day.getDate() === selectedDay.getDate() && !isCurrentDay(day) ? "text-selectedDay-text" : ""}

              `}
              >
                {day.getDate()}
              </span>
            )}

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
                        className="w-2 h-2 rounded-full bg-yellow-600"
                      ></div>
                    ))}
                  {hasNEvents(day).length > 5 && (
                    <span className="text-yellow-600 font-bold">+</span>
                  )}
                </div>

                {/* For smaller screens (below md) */}
                <div className="md:hidden flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                  {hasNEvents(day).length > 0 && (
                    <span className="text-yellow-600 font-bold">+</span>
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
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          onEditEvent(selectedDay, { ...event, index })
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onRemoveEvent(selectedDay, index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
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
