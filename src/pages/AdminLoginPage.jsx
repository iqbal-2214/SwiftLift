// /src/pages/AdminLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext.jsx'; // Using the central Auth context
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Get the generic 'signIn' function and the specific 'isAdmin' state
  const { signIn, isAdmin } = useAuth(); 

  // This effect will run AFTER a successful login, when 'isAdmin' becomes true
  useEffect(() => {
    if (isAdmin) {
      // If the logged-in user is an admin, navigate to the dashboard
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // --- THIS IS THE CORRECT LOGIC ---
    // We call the same signIn function as the regular user login.
    // Supabase will handle the secure authentication.
    const { error } = await signIn({ email, password });

    if (error) {
      // If Supabase returns an error (e.g., wrong password), we show it.
      alert('Error: ' + error.message);
    }
    // If there's no error, we do nothing here. The useEffect above will
    // detect the state change and handle the redirect automatically.
    
    setLoading(false);
  };

  return (
    <div className="admin-login-page-wrapper">
        <div className="admin-login-container">
            <h1 className="main-title">Admin Portal</h1>
            <form onSubmit={handleAdminLogin} className="admin-login-form">
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Admin Email</label>
                    <div className="input-wrapper">
                        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                        <input type="email" id="email" className="custom-input" placeholder="admin@one-way.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password</label>
                    <div className="input-wrapper">
                        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                        <input type="password" id="password" className="custom-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <button type="submit" className="admin-login-btn" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default AdminLoginPage;