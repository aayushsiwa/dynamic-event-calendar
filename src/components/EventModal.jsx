// src/components/EventModal.jsx
import React, { useState } from "react";

const EventModal = ({ isOpen, onClose, onSave }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);

  const handleSave = () => {
    if (!eventName) {
      alert("Event name is required!");
      return;
    }

    if (!isAllDay && (!startTime || !endTime)) {
      alert("Start and end times are required unless it's an all-day event.");
      return;
    }

    onSave({
      eventName,
      startTime: isAllDay ? "00:00" : startTime,
      endTime: isAllDay ? "23:59" : endTime,
      description,
      isAllDay,
    });

    onClose();
    // Clear the form after saving
    setEventName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setIsAllDay(false);
  };

  const handleAllDayToggle = () => {
    setIsAllDay((prev) => !prev);
    if (!isAllDay) {
      setStartTime("00:00");
      setEndTime("23:59");
    } else {
      setStartTime("");
      setEndTime("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-background p-6 rounded-lg shadow-paper w-96">
        <h2 className="text-xl font-bold mb-4">Add Event</h2>
        <input
          type="text"
          placeholder="Event Name"
          className="w-full p-2 border border-border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="allDay"
            className="mr-2"
            checked={isAllDay}
            onChange={handleAllDayToggle}
          />
          <label htmlFor="allDay" className="text-sm text-text">
            All Day
          </label>
        </div>
        <div className="flex space-x-4 mb-4">
          <input
            type="time"
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            disabled={isAllDay}
          />
          <input
            type="time"
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={isAllDay}
          />
        </div>
        <textarea
          placeholder="Description (optional)"
          className="w-full p-2 border border-border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-accent transition"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
