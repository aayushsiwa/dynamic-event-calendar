import React, { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import EventModal from "./components/EventModal";
import ThemeToggle from "./components/ThemeToggle";
import useEventStore from "./hooks/useEventStore";
import LogoWithDate from "./components/LogoWithDate";

const App = () => {
  const { events, addEvent, editEvent, removeEvent } = useEventStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [eventIndex, setEventIndex] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsModalOpen(false);
  };

  const handleAddEvent = (day) => {
    setSelectedDay(day);
    setEventToEdit(null);
    setEventIndex(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (day, event, index) => {
    console.log("hi");
    setSelectedDay(day);
    setEventToEdit(event);
    setEventIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event, index) => {
    if (index !== null) {
      editEvent(selectedDay, index, event);
    } else {
      addEvent(selectedDay, event);
    }
    setIsModalOpen(false);
  };

  const handleRemoveEvent = (day, index) => {
    removeEvent(day, index);
  };

  return (
    <div className="bg-background text-text min-h-screen">
      <header className="p-4 flex justify-between items-center">
        <LogoWithDate />
        <ThemeToggle />
      </header>
      <CalendarGrid
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        onDayClick={handleDayClick}
        events={events}
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        onRemoveEvent={handleRemoveEvent}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEventToEdit(null); // Reset modal state
        }}
        onSave={handleSaveEvent}
        eventToEdit={eventToEdit}
        eventIndex={eventIndex}
      />
    </div>
  );
};

export default App;
