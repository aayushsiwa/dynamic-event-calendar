// src/hooks/useEventStore.js
import { useState, useEffect } from "react";

const useEventStore = () => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : {};
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (date, event) => {
    const dateKey = date.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), event],
    }));
  };

  const removeEvent = (date, eventIndex) => {
    const dateKey = date.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: prevEvents[dateKey].filter((_, i) => i !== eventIndex),
    }));
  };

  return { events, addEvent, removeEvent };
};

export default useEventStore;
