// /src/features/admin/components/CarCard.jsx
import React, { useState } from 'react';
import { formatNumberPlate } from '../../../utils/formatters'; // Import the formatter

const parseCarName = (name) => {
  const parts = name.split(' - ');
  if (parts.length === 2) {
    // Format the number plate part for display
    return { category: parts[0], numberPlate: formatNumberPlate(parts[1]) };
  }
  return { category: 'Sedan', numberPlate: formatNumberPlate(name) };
};

const CarCard = ({ car, onUpdateCar, onDeleteCar }) => {
  const { category: initialCategory, numberPlate: initialNumberPlate } = parseCarName(car.name);

  const [category, setCategory] = useState(initialCategory);
  const [numberPlate, setNumberPlate] = useState(initialNumberPlate);
  const [location, setLocation] = useState(car.location);
  const [destination, setDestination] = useState(car.destination || '');
  const [status, setStatus] = useState(car.status);

  const handleNumberPlateChange = (e) => {
    // Apply live formatting in the update form as well
    const formatted = formatNumberPlate(e.target.value);
    setNumberPlate(formatted);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Remove spaces for storage, just like in the add form
    const storedNumberPlate = numberPlate.replace(/\s/g, '');
    const name = `${category} - ${storedNumberPlate}`;
    const updates = { name, location, destination, status };
    onUpdateCar(car.id, updates);
    alert(`Car ${name} has been updated!`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${car.name}?`)) {
      onDeleteCar(car.id);
    }
  };

  return (
    <div className="car-card clearfix">
      <button onClick={handleDelete} className="delete-btn">Delete</button>
      <h3>{car.name}</h3>
      <div className="car-info">
        <p><strong>Current Location:</strong> {car.location}</p>
        <p><strong>Destination:</strong> {car.destination || 'Not set'}</p>
        <p><strong>Status:</strong> {car.status}</p>
      </div>

      <form onSubmit={handleUpdate} className="update-form register-form">
        <div className="form-row">
          <div className="input-group">
            <label className="input-label">Category</label>
            <select
              className="custom-input"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option>Sedan</option>
              <option>Prime</option>
              <option>Mini</option>
              <option>Auto</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Number Plate</label>
            <input
              type="text"
              className="custom-input"
              value={numberPlate}
              onChange={handleNumberPlateChange} // Use the dedicated handler
              required
              // --- HTML5 Validation ---
              pattern="[A-Z]{2}\s[0-9]{1,2}\s[A-Z]{1,2}\s[0-9]{4}"
              title="Format must be: XX 01 AB 1234"
              maxLength="14"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label className="input-label">Update Location</label>
            <input 
              type="text" 
              className="custom-input" 
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Update Destination</label>
            <input 
              type="text" 
              className="custom-input" 
              value={destination}
              onChange={e => setDestination(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group">
          <label className="input-label">Update Status</label>
          <select
            className="custom-input"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option>Available</option>
            <option>On Trip</option>
            <option>Maintenance</option>
          </select>
        </div>
        <button type="submit" className="admin-login-btn">Update Car</button>
      </form>
    </div>
  );
};

export default CarCard;