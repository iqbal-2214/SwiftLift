// /src/features/admin/components/AddCarForm.jsx
import React, { useState } from 'react';
import { formatNumberPlate } from '../../../utils/formatters'; // Import our new function

const AddCarForm = ({ onAddCar }) => {
  const [category, setCategory] = useState('Sedan');
  const [numberPlate, setNumberPlate] = useState('');
  const [location, setLocation] = useState('');

  const handleNumberPlateChange = (e) => {
    // Format the input value live as the user types
    const formatted = formatNumberPlate(e.target.value);
    setNumberPlate(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!numberPlate || !location) {
      alert('Please provide a number plate and initial location.');
      return;
    }
    // Remove spaces for storage, ensuring a consistent data format (e.g., JH01AB1234)
    const storedNumberPlate = numberPlate.replace(/\s/g, '');
    const name = `${category} - ${storedNumberPlate}`;
    onAddCar({ name, location, status: 'Available' });
    setCategory('Sedan');
    setNumberPlate('');
    setLocation('');
  };

  return (
    <div className="add-car-container">
      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit} className="register-form">
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
              onChange={handleNumberPlateChange} // Use our dedicated handler
              placeholder="e.g., JH 01 AB 1234"
              required
              // --- HTML5 Validation ---
              pattern="[A-Z]{2}\s[0-9]{1,2}\s[A-Z]{1,2}\s[0-9]{4}"
              title="Format must be: XX 01 AB 1234"
              maxLength="14"
            />
          </div>
        </div>
        <div className="input-group">
          <label className="input-label">Initial Location</label>
          <input
            type="text"
            className="custom-input"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g., Ranchi"
            required
          />
        </div>
        <button type="submit" className="admin-login-btn">Add Car</button>
      </form>
    </div>
  );
};

export default AddCarForm;