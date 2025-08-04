// /src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/AuthContext.jsx';
import './LoginPage.css';

const LoginPage = () => {
  const { signIn } = useAuth(); // Get the signIn function from our context
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Call the Supabase signIn method provided by our context
    const { error } = await signIn({ email, password });

    if (error) {
      alert('Error: ' + error.message);
    } else {
      // The onAuthStateChange listener in AuthContext handles setting the user state.
      // We navigate to the homepage immediately for a better user experience.
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h1 className="main-title">Sign In to Your Account</h1>
        <div className="input-group" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span>Don't have an account? </span>
          <Link to="/register" className="forgot-password-link" style={{ textAlign: 'center', display: 'inline', textDecoration: 'underline' }}>
            Sign Up
          </Link>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email Address</label>
            <div className="input-wrapper">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              <input
                type="email" id="email" className="custom-input"
                placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              <input
                type="password" id="password" className="custom-input"
                placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} required
              />
            </div>
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;