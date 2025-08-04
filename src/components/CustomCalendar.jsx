// /src/components/CustomCalendar.jsx
import React, { useState } from 'react';
import './CustomCalendar.css';

const CustomCalendar = ({ selectedDate, onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate));
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate today and max date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);

  // Helper: is current month
  const isCurrentMonth =
    currentDate.getFullYear() === today.getFullYear() &&
    currentDate.getMonth() === today.getMonth();

  // Helper: is max allowed month
  const isMaxMonth =
    currentDate.getFullYear() === maxDate.getFullYear() &&
    currentDate.getMonth() === maxDate.getMonth();

  const handleDayClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (newDate >= today && newDate <= maxDate) {
      onChange(newDate);
    }
  };

  const handlePrevMonth = () => {
    if (!isCurrentMonth) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (!isMaxMonth) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }
  };

  const renderHeader = () => (
    <div className="calendar-header">
      <button
        type="button"
        onClick={handlePrevMonth}
        className="calendar-nav-btn"
        disabled={isCurrentMonth}
        style={isCurrentMonth ? { opacity: 0.5, cursor: "not-allowed" } : {}}
      >
        &lt;
      </button>
      <div className="calendar-month-year">
        {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
      </div>
      <button
        type="button"
        onClick={handleNextMonth}
        className="calendar-nav-btn"
        disabled={isMaxMonth}
        style={isMaxMonth ? { opacity: 0.5, cursor: "not-allowed" } : {}}
      >
        &gt;
      </button>
    </div>
  );

  const renderDaysOfWeek = () => (
    <div className="calendar-grid weekdays">
      {daysOfWeek.map(day => <div key={day} className="weekday">{day}</div>)}
    </div>
  );

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const thisDate = new Date(year, month, day);
      thisDate.setHours(0, 0, 0, 0);

      const isToday =
        thisDate.getTime() === today.getTime();
      const isSelected =
        thisDate.getTime() === selectedDate.getTime();

      // Disable if before today or after maxDate
      const isDisabled =
        thisDate < today || thisDate > maxDate;

      let dayClasses = "calendar-day";
      if (isToday) dayClasses += " today";
      if (isSelected) dayClasses += " selected";
      if (isDisabled) dayClasses += " empty";

      days.push(
        <div
          key={day}
          className={dayClasses}
          onClick={() => !isDisabled && handleDayClick(day)}
          style={isDisabled ? { pointerEvents: "none", opacity: 0.4 } : {}}
        >
          {day}
        </div>
      );
    }
    return <div className="calendar-grid">{days}</div>;
  };

  return (
    <div className="calendar-container" onClick={e => e.stopPropagation()}>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDays()}
    </div>
  );
};

export default CustomCalendar;