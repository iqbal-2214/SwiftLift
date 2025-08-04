import React, { useState, useEffect } from 'react';
import './CustomTimeSelection.css';

const CustomTimeSelection = ({ onClose, onSetTime, initialTime }) => {
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');

  useEffect(() => {
    if (initialTime) {
      const [time, initialPeriod] = initialTime.split(' ');
      const [initialHour, initialMinute] = time.split(':');
      setHour(initialHour);
      setMinute(initialMinute);
      setPeriod(initialPeriod);
    }
  }, [initialTime]);

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const handleHourChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
      setHour(value);
    }
  };

  const handleMinuteChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 59)) {
      setMinute(value);
    }
  };

  const handleSetTime = () => {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    const timeString = `${formattedHour}:${formattedMinute} ${period}`;
    onSetTime(timeString);
    onClose();
  };

  const handleTimeChange = (timeString) => {
    setSelectedTime(timeString);
    // ... update journeyDate if needed ...
    setIsTimePickerOpen(false); // This must be here!
  };

  return (
    <div className="time-picker-overlay">
      <div className="time-picker-container">
        <div className="time-display">
          <span>{hour || '12'}</span>
          <span className="time-display-separator">:</span>
          <span>{minute || '00'}</span>
        </div>

        <div className="am-pm-toggle">
          <button
            type="button"
            className={`am-pm-btn ${period === 'AM' ? 'active' : ''}`}
            onClick={() => setPeriod('AM')}
          >
            AM
          </button>
          <button
            type="button"
            className={`am-pm-btn ${period === 'PM' ? 'active' : ''}`}
            onClick={() => setPeriod('PM')}
          >
            PM
          </button>
        </div>

        <div className="time-inputs">
          <input
            type="number"
            className="time-input"
            value={hour}
            onChange={handleHourChange}
            onBlur={() => setHour(formatTime(hour || '12'))}
            min="1"
            max="12"
          />
          <span className="time-display-separator">:</span>
          <input
            type="number"
            className="time-input"
            value={minute}
            onChange={handleMinuteChange}
            onBlur={() => setMinute(formatTime(minute || '00'))}
            min="0"
            max="59"
          />
        </div>

        <div className="time-picker-actions">
          <button type="button" className="time-picker-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="time-picker-btn set" onClick={handleSetTime}>
            Set Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTimeSelection;