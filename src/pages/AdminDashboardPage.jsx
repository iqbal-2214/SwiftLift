import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext.jsx';
// Import ALL our new async functions
import { 
  getCars, addCar, updateCar, deleteCar, 
  getQuotesForAdmin, respondToQuote, confirmBooking 
} from '../services/apiService.js';

import CarCard from '../features/admin/components/CarCard.jsx';
import AddCarForm from '../features/admin/components/AddCarForm.jsx';
import NotificationItem from '../features/admin/components/NotificationItem.jsx';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('notifications');
  const [cars, setCars] = useState([]); // Start with empty arrays
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Effect to fetch all initial data ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const carData = await getCars();
        setCars(carData);
        const quoteData = await getQuotesForAdmin();
        setQuotes(quoteData);
      } catch (error) {
        alert("Error fetching data: " + error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // --- Async Handlers ---
  const handleLogout = () => { /* ... no change ... */ };

  const handleAddCar = async (newCarData) => {
    try {
      await addCar(newCarData);
      const updatedCars = await getCars(); // Re-fetch the list to get the new item
      setCars(updatedCars);
    } catch (error) {
      alert("Error adding car: " + error.message);
    }
  };

  const handleUpdateCar = async (carId, updates) => {
    try {
      await updateCar(carId, updates);
      // For a better UX, we can update the state locally without a full re-fetch
      setCars(prevCars => prevCars.map(car => (car.id === carId ? { ...car, ...updates } : car)));
    } catch (error) {
      alert("Error updating car: " + error.message);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await deleteCar(carId);
      // Optimistic UI update: remove from state immediately
      setCars(prevCars => prevCars.filter(car => car.id !== carId));
    } catch (error) {
      alert("Error deleting car: " + error.message);
    }
  };

  const handleRespondToQuote = async (quoteId, response) => {
    try {
      await respondToQuote(quoteId, response);
      const updatedQuotes = await getQuotesForAdmin(); // Re-fetch quotes
      setQuotes(updatedQuotes);
    } catch (error) {
      alert("Error responding to quote: " + error.message);
    }
  };
  
  const handleConfirmBooking = async (quoteId) => {
    try {
      await confirmBooking(quoteId);
      const updatedQuotes = await getQuotesForAdmin(); // Re-fetch quotes
      setQuotes(updatedQuotes);
    } catch (error) {
      alert("Error confirming booking: " + error.message);
    }
  };

  // ... Derived State (notifications, history) is the same ...
  const notifications = quotes.filter(q => q.status === 'Pending Admin Review' || q.status === 'Accepted by User');
  const history = quotes.filter(q => q.status === 'Booked' || q.status === 'Declined by Admin');
  
  // --- Render Logic ---
  if (loading) {
    return <div>Loading dashboard...</div>;
  }
  return (
    <div className="admin-dashboard-wrapper">
      <div className="dashboard-header">
        <h1 className="main-title">Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-tabs">
        <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>
          Notifications ({notifications.length})
        </button>
        <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
          Booking History
        </button>
        <button onClick={() => setActiveTab('fleet')} className={activeTab === 'fleet' ? 'active' : ''}>
          Manage Fleet
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'notifications' && (
          <div className="notification-list">
            <h2>Pending Requests & Responses</h2>
            {notifications.length > 0 ? 
              notifications.map(q => <NotificationItem key={q.id} quote={q} onRespond={handleRespondToQuote} onConfirm={handleConfirmBooking}/>) :
              <p>No new notifications.</p>
            }
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-list">
            <h2>Completed & Declined Bookings</h2>
            {history.length > 0 ?
              history.map(q => (
              <div key={q.id} className="history-item">
                <p><strong>{q.status}:</strong> {q.from} to {q.to} on {new Date(q.journeyDate).toLocaleDateString()}</p>
                <p>User: {q.userName}, Final Price: {q.price ? `₹${q.price}` : 'N/A'}</p>
              </div>
            )) : <p>No booking history yet.</p>}
          </div>
        )}

        {activeTab === 'fleet' && (
          <div>
            <AddCarForm onAddCar={handleAddCar} />
            <h2>Car Fleet Status</h2>
            <div className="car-management-container">
              {cars.length > 0 ? (
                cars.map(car => (
                  <CarCard 
                    key={car.id}
                    car={car}
                    onUpdateCar={handleUpdateCar}
                    onDeleteCar={handleDeleteCar}
                  />
                ))
              ) : (
                <p>No cars in the fleet. Add one using the form above.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;