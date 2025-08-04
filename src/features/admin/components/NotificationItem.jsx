// /src/features/admin/components/NotificationItem.jsx
import React, { useState } from 'react';

const NotificationItem = ({ quote, onRespond, onConfirm }) => {
  const [price, setPrice] = useState('');

  const handleSendQuote = () => {
    if (!price || price <= 0) return alert('Please set a valid price.');
    const response = {
      price,
      status: 'Quoted', // Admin has responded
      adminResponseDate: new Date().toISOString(),
    };
    onRespond(quote.id, response);
  };
  
  const handleDecline = () => {
    if (window.confirm("Are you sure you want to decline this request? The user will be notified.")) {
        const response = { status: 'Declined by Admin' };
        onRespond(quote.id, response);
    }
  };
  
  const handleConfirm = () => {
    onConfirm(quote.id);
  };

  return (
    <div className="notification-card">
      <p><strong>Request from:</strong> {quote.userName} (User ID: {quote.userId})</p>
      <p><strong>Route:</strong> {quote.from} to {quote.to}</p>
      <p><strong>Date:</strong> {new Date(quote.journeyDate).toLocaleString()}</p>
      <hr/>
      {quote.status === 'Pending Admin Review' && (
        <div className="admin-response-form">
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Set Price (e.g., 1500)"/>
          <button onClick={handleSendQuote} className="quote-btn">Send Quote</button>
          <button onClick={handleDecline} className="decline-btn">Decline</button>
        </div>
      )}
      {quote.status === 'Accepted by User' && (
        <div className="admin-response-form accepted-response">
          <p>User has accepted your quote of <strong>₹{quote.price}</strong>.</p>
          <button onClick={handleConfirm} className="confirm-btn">Confirm Final Booking</button>
        </div>
      )}
    </div>
  );
};

export default NotificationItem;