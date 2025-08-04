// /src/pages/HomePage.jsx
import React, { useState, useRef, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import CustomCalendar from "../components/CustomCalendar";
import CustomTimeSelection from "../components/CustomTimeSelection";

import { useAuth } from '../store/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { createQuoteRequest } from '../services/apiService.js'; // Using the real API
import { locations } from "../data/jharkhandLocations";

import "react-datepicker/dist/react-datepicker.css";
import "./HomePage.css";
import LiveCabStatus from "../features/cab-status/components/LiveCabStatus.jsx";

// ... SVG Icon components are unchanged ...
const LocationIcon = () => ( <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg> );
const CalendarIcon = () => ( <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm10 5H4v8h12V7z" clipRule="evenodd" /></svg> );
const ClockIcon = () => ( <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg> );


const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [journeyDate, setJourneyDate] = useState(() => new Date());
  const [loading, setLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);

  // --- Handlers ---
  const handleGetQuote = async () => {
    if (!user) {
      alert("Please log in to get a quote.");
      navigate('/login');
      return;
    }

    if (!fromLocation || !toLocation) {
      alert("Please select both 'From' and 'To' locations.");
      return;
    }
    
    setLoading(true);

    const request = {
      user_id: user.id, // Supabase uses user_id, matches our table
      user_name: user.user_metadata?.full_name || user.email, // Get name from metadata
      from_location: fromLocation.label,
      to_location: toLocation.label,
      journey_date: journeyDate.toISOString(), // Standard format for the database
    };

    try {
      await createQuoteRequest(request);
      alert(`Your quote request has been sent! You will be notified of the response on the 'My Quotes' page.`);
      navigate('/my-quotes');
    } catch (error) {
      alert("Error sending request: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ... other handlers (handleDateChange, handleTimeChange, etc. are correct) ...
    const handleDateChange = (date) => {
    const newDate = new Date(journeyDate);
    newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    setJourneyDate(newDate);
    setIsCalendarOpen(false);
  };

  const handleTimeChange = (timeString) => {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const newDate = new Date(journeyDate);
    newDate.setHours(hours, minutes);
    setJourneyDate(newDate);
    setIsTimePickerOpen(false);
  };

  const formatDateForDisplay = (date) => date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const formatTimeForDisplay = (date) => date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true });

  // --- Effect to handle clicks outside (correct) ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
      if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
        setIsTimePickerOpen(false);
      }
    };
    if (isCalendarOpen || isTimePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen, isTimePickerOpen]);

  // --- Custom Styles (correct) ---
  const customSelectStyles = {
    control: (provided) => ({ ...provided, height: "50px", paddingLeft: "38px", borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "none", "&:hover": { borderColor: "#d1d5db" }, }),
    input: (provided) => ({ ...provided, margin: "0", padding: "0" }),
    placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
  };

  return (
    <div className="booking-page-wrapper">
      <div className="booking-container">
        <h1 className="main-title">Book Your One-Way Cab</h1>
        <form className="booking-form">
          {/* --- Pickup Location --- */}
          <div className="input-group">
            <label className="input-label">Pickup Location</label>
            <div className="input-wrapper">
              <LocationIcon />
              <CreatableSelect
                isClearable
                options={locations}
                placeholder="Enter pickup location"
                styles={customSelectStyles}
                classNamePrefix="select"
                // --- ADD THESE TWO PROPS ---
                value={fromLocation}
                onChange={(selectedOption) => setFromLocation(selectedOption)}
              />
            </div>
          </div>
          {/* --- Drop-off Location --- */}
          <div className="input-group">
            <label className="input-label">Drop-off Location</label>
            <div className="input-wrapper">
              <LocationIcon />
              <CreatableSelect
                isClearable
                options={locations}
                placeholder="Enter drop-off location"
                styles={customSelectStyles}
                classNamePrefix="select"
                // --- ADD THESE TWO PROPS ---
                value={toLocation}
                onChange={(selectedOption) => setToLocation(selectedOption)}
              />
            </div>
          </div>

          {/* ... Date and Time inputs (correct) ... */}
           <div className="form-row">
            <div className="input-group" ref={datePickerRef}>
              <label className="input-label">Date</label>
              <div className="input-wrapper" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                <CalendarIcon />
                <input type="text" className="custom-input" value={formatDateForDisplay(journeyDate)} readOnly style={{ cursor: "pointer", background: "#fff" }} />
              </div>
              {isCalendarOpen && ( <CustomCalendar selectedDate={journeyDate} onChange={handleDateChange} /> )}
            </div>
            <div className="input-group" ref={timePickerRef}>
              <label className="input-label">Time</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <ClockIcon />
                <input type="text" className="custom-input" value={formatTimeForDisplay(journeyDate)} readOnly style={{ cursor: "pointer", background: "#fff" }} onClick={() => setIsTimePickerOpen(!isTimePickerOpen)} />
                {isTimePickerOpen && (
                  <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 10 }}>
                    <CustomTimeSelection onClose={() => setIsTimePickerOpen(false)} onSetTime={handleTimeChange} initialTime={formatTimeForDisplay(journeyDate)} />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button 
            type="button" 
            className="find-cabs-btn" 
            onClick={handleGetQuote}
            disabled={loading}
          >
            {loading ? 'Sending Request...' : 'Get Quote'}
          </button>
        </form>
        
        {/* ... Recent Locations and LiveCabStatus (correct) ... */}
        <div className="recent-locations">
            <h2 className="section-title">Recent Locations</h2>
            <div className="tag-container">
                <div className="tag-item">Ranchi</div>
                <div className="tag-item">Jamshedpur</div>
                <div className="tag-item">Bokaro</div>
            </div>
        </div>
        <LiveCabStatus />
      </div>
    </div>
  );
};

export default HomePage;