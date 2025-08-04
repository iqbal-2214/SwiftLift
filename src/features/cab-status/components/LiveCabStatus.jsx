// /src/features/cab-status/components/LiveCabStatus.jsx
import React, { useState, useEffect } from 'react';

// --- SVG Icon for the car ---
const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="cab-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 8a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h1.28a1 1 0 01.97.744l.254 1.272a1 1 0 00.97.744h8.052a1 1 0 00.97-.744l.254-1.272A1 1 0 0116.72 4H18a2 2 0 012 2v2zm-2 4a1 1 0 100 2h-1a1 1 0 100-2h1zm-5 0a1 1 0 100 2H8a1 1 0 100-2h3z" clipRule="evenodd" />
    </svg>
);

const LiveCabStatus = () => {
    // This state will hold our list of available cars
    const [availableCabs, setAvailableCabs] = useState([]);

    // This effect runs once when the component first mounts
    useEffect(() => {
        // Retrieve the raw string data from Local Storage
        const savedCars = localStorage.getItem('oneWayCabCars');
        
        if (savedCars) {
            const allCars = JSON.parse(savedCars);
            // Filter the array to get only the cars with status "Available"
            const available = allCars.filter(car => car.status === 'Available');
            setAvailableCabs(available);
        }
    }, []); // Empty dependency array means this runs only once on mount

    return (
        <div className="live-status-container">
            <h2 className="section-title">Live Cab Availability</h2>
            <div className="cab-list">
                {availableCabs.length > 0 ? (
                    availableCabs.map(cab => (
                        <div key={cab.id} className="cab-status-item">
                            <CarIcon />
                            <div className="cab-details">
                                <span className="cab-name">{cab.name}</span>
                                <span className="cab-location">Available in <strong>{cab.location}</strong></span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-cabs-message">
                        <p>No cabs are available right now. Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveCabStatus;