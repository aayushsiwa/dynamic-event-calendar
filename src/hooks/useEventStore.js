import { useState, useEffect } from "react";

const useEventStore = () => {
  const [events, setEvents] = useState(() => {
    try {
      const storedEvents = localStorage.getItem("events");
      return storedEvents ? JSON.parse(storedEvents) : {};
    } catch (error) {
      console.error("Error parsing events from localStorage:", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("events", JSON.stringify(events));
    } catch (error) {
      console.error("Error saving events to localStorage:", error);
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
    const dateKey = date.toDateString();
    setEvents((prevEvents) => {
      if (
        !prevEvents[dateKey] ||
        eventIndex < 0 ||
        eventIndex >= prevEvents[dateKey].length
      ) {
        console.warn(
          `Invalid event index (${eventIndex}) for editing on ${dateKey}`,
        );
        return prevEvents;
      }
      const updatedEvents = [...prevEvents[dateKey]];
      updatedEvents[eventIndex] = updatedEvent;
      return { ...prevEvents, [dateKey]: updatedEvents };
    });
  };

  const removeEvent = (date, eventIndex) => {
    console.log("removeEvent:", { date, eventIndex });
    const dateKey = date.toDateString();
    setEvents((prevEvents) => {
      console.log("Current events for date:", prevEvents[dateKey]);
      if (
        !prevEvents[dateKey] ||
        eventIndex < 0 ||
        eventIndex >= prevEvents[dateKey].length
      ) {
        console.warn("Invalid index or no events for this day.");
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
  };

  const getEventsForDate = (date) => {
    const dateKey = date.toDateString();
    return events[dateKey] || [];
  };

  return {
    events,
    addEvent,
    editEvent,
    removeEvent,
    clearEvents,
    getEventsForDate,
  };
};

export default useEventStore;
