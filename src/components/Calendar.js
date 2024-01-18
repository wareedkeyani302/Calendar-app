import React, { useState } from 'react';
import EventModal from './EventModal';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);


  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const daysInMonth = Array.from({ length: lastDayOfMonth.getDate() }, (_, index) => index + 1);
  const blanksBefore = firstDayOfMonth.getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const [events, setEvents] = useState([]);
  const [isEventModalOpen, setEventModalOpen] = useState(false);

  const addEvent = (date, title) => {
    const newEvent = { date, title };
    setEvents([...events, newEvent]);
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setEventModalOpen(true);
  };


  return (
    <div className="calendar-container">
      <div className="header">
        <button onClick={handlePrevMonth}><FaAngleDoubleLeft /></button>
        <span>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={handleNextMonth}><FaAngleDoubleRight /></button>
      </div>
      <div className="days">
        {daysOfWeek.map(day => (
          <div key={day} className="day">{day}</div>
        ))}
        {Array.from({ length: blanksBefore }, (_, index) => (
          <div key={`blank-${index}`} className="empty-day" />
        ))}
        {daysInMonth.map(day => (
          <div
            key={day}
            className={`calendar-day ${selectedDate && selectedDate.getDate() === day ? 'selected' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
      <EventModal
        visible={isEventModalOpen}  
        onCancel={() => setEventModalOpen(false)}
        selectedDate={selectedDate}
        addEvent={addEvent}
        events={events}
      />
    </div>
  );
};

export default Calendar;


////****showing event on the date event is assigned****//////////

// <div className="days">
// {daysOfWeek.map(day => (
//   <div key={day} className="day">{day}</div>
// ))}
// {Array.from({ length: blanksBefore }, (_, index) => (
//   <div key={`blank-${index}`} className="empty-day" />
// ))}
// {daysInMonth.map(day => (
//   <div
//     key={day}
//     className={`calendar-day ${selectedDate && selectedDate.getDate() === day ? 'selected' : ''}`}
//     onClick={() => handleDateClick(day)}
//   >
//     <span>{day}</span>
//     <ul className="event-list">
//       {events
//         .filter(event => event.date.toDateString() === (new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()))
//         .map((event, index) => (
//           <li key={index}>{event.title}</li>
//         ))}
//     </ul>
//   </div>
// ))}
// </div>
// <EventModal
// visible={isEventModalOpen}
// onCancel={() => setEventModalOpen(false)}
// selectedDate={selectedDate}
// addEvent={addEvent}
// events={events}
// />
// </div>