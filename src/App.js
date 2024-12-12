import React, { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import EventModal from "./components/EventModal";
import ThemeToggle from "./components/ThemeToggle";
import useEventStore from "./hooks/useEventStore";
import LogoWithDate from "./components/LogoWithDate";

const App = () => {
  const { events, addEvent, removeEvent } = useEventStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsModalOpen(false);
  };

  const handleAddEvent = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event) => {
    addEvent(selectedDay, event);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background text-text min-h-screen">
      <header className="p-4 flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold">Dynamic Event Calendar</h1> */}
        <LogoWithDate />
        <ThemeToggle />
      </header>
      <CalendarGrid
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        onDayClick={handleDayClick}
        events={events}
        onAddEvent={handleAddEvent}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
};

export default App;
