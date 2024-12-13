import { useState, useEffect } from "react";

const useEventStore = () => {
  const [events, setEvents] = useState(() => {
    try {
      const storedEvents = localStorage.getItem("events");
      return storedEvents ? JSON.parse(storedEvents) : {};
    } catch (error) {
      console.error("Error parsing events from localStorage", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("events", JSON.stringify(events));
    } catch (error) {
      console.error("Error saving events to localStorage", error);
    }
  }, [events]);

  const addEvent = (date, event) => {
    const dateKey = date.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), event],
    }));
  };

  const editEvent = (date, eventIndex, updatedEvent) => {
    console.log("here");
    const dateKey = date.toDateString();
    console.log(updatedEvent);
    setEvents((prevEvents) => {
      if (
        !prevEvents[dateKey] ||
        eventIndex < 0 ||
        eventIndex >= prevEvents[dateKey].length
      ) {
        console.warn("Invalid event index for edit");
        return prevEvents;
      }
      const updatedEvents = [...prevEvents[dateKey]];
      updatedEvents[eventIndex] = updatedEvent;
      return { ...prevEvents, [dateKey]: updatedEvents };
    });
  };

  const removeEvent = (date, eventIndex) => {
    const dateKey = date.toDateString();
    setEvents((prevEvents) => {
      if (
        !prevEvents[dateKey] ||
        eventIndex < 0 ||
        eventIndex >= prevEvents[dateKey].length
      ) {
        console.warn("Invalid event index for removal");
        return prevEvents;
      }
      return {
        ...prevEvents,
        [dateKey]: prevEvents[dateKey].filter((_, i) => i !== eventIndex),
      };
    });
  };

  const clearEvents = () => {
    setEvents({});
    localStorage.removeItem("events");
  };

  return { events, addEvent, editEvent, removeEvent, clearEvents };
};

export default useEventStore;
