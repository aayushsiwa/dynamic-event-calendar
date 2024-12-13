import React, { useState, useEffect } from "react";

const EventModal = ({ isOpen, onClose, onSave, eventToEdit }) => {
  const [eventName, setEventName] = useState(eventToEdit?.eventName || "");
  const [startTime, setStartTime] = useState(eventToEdit?.startTime || "");
  const [endTime, setEndTime] = useState(eventToEdit?.endTime || "");
  const [description, setDescription] = useState(
    eventToEdit?.description || "",
  );
  const [isAllDay, setIsAllDay] = useState(eventToEdit?.isAllDay || false);

  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.eventName);
      setStartTime(eventToEdit.startTime);
      setEndTime(eventToEdit.endTime);
      setDescription(eventToEdit.description);
      setIsAllDay(eventToEdit.isAllDay);
    }
  }, [eventToEdit]);

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
    resetForm();
  };

  const resetForm = () => {
    setEventName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setIsAllDay(false);
  };

  // Function to handle clicks outside the modal
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {eventToEdit ? "Edit Event" : "Add Event"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>
          {!isAllDay && (
            <div className="mb-4 flex gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isAllDay}
                onChange={() => setIsAllDay(!isAllDay)}
                className="mr-2"
              />
              All Day Event
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
