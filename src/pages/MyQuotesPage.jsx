// /src/pages/MyQuotesPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext.jsx';
import { getQuotesForUser, acceptQuote } from '../services/apiService.js';
import './MyQuotesPage.css';

const MyQuotesPage = () => {
    const { user } = useAuth();
    const [myQuotes, setMyQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyQuotes = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userQuotes = await getQuotesForUser(user.id);
            setMyQuotes(userQuotes);
        } catch (error) {
            alert("Error fetching your quotes: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyQuotes();
    }, [user]);

    const handleAccept = async (quoteId) => {
      try {
        await acceptQuote(quoteId);
        await fetchMyQuotes();
        alert("Quote accepted! The admin has been notified for final confirmation.");
      } catch(error) {
        alert("Error accepting quote: " + error.message);
      }
    };

    if (loading) {
        return <div className="info-message">Loading your quotes...</div>;
    }

    if (!user) {
        return <div className="info-message">Please log in to see your quotes.</div>
    }

    return (
        <div className="my-quotes-wrapper">
            <h1 className="main-title">My Quotes & Bookings</h1>
            
            <div className="quotes-list">
                {myQuotes.length === 0 && (
                    <div className="info-message">You have not requested any quotes yet.</div>
                )}
                
                {myQuotes.map(quote => (
                    <div key={quote.id} className={`quote-card status-${quote.status.replace(/\s+/g, '-')}`}>
                        <h3>{quote.from_location} to {quote.to_location}</h3>
                        
                        {/* --- THIS IS THE FIX --- */}
                        <p>Requested on: {new Date(quote.created_at).toLocaleString()}</p>
                        
                        <p>
                            Status: <span className="quote-status">{quote.status}</span>
                        </p>
                        
                        {quote.status === 'Quoted' && (
                            <div className="admin-response">
                                <p><strong>Admin's Offer: ₹{quote.price}</strong></p>
                                <p>Tentative Date & Time: {new Date(quote.admin_response_date).toLocaleString()}</p>
                                <button onClick={() => handleAccept(quote.id)} className="accept-btn">
                                    Accept Offer
                                </button>
                            </div>
                        )}
                        
                        {/* ... rest of the component ... */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyQuotesPage;