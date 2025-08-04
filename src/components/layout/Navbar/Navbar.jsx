// /src/components/layout/Navbar/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/AuthContext.jsx"; // Import our hook
import "./Navbar.css";

const Navbar = () => {
  // --- THIS IS THE FIX (PART 1) ---
  // We get 'signOut' from the context, not 'logout'.
  const { user, isAdmin, signOut } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    // --- THIS IS THE FIX (PART 2) ---
    // Call the correct 'signOut' function.
    // It's good practice to make this async in case Supabase does network requests.
    await signOut(); 
    navigate('/'); // Redirect to homepage after logout
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          One-Way Cabs
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>

          {/* If there is a USER logged in */}
          {user && (
            <li className="nav-item">
              <Link
                to="/"
                className="nav-links"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Logout
              </Link>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <Link to="/my-quotes" className="nav-links">
                My Quotes
              </Link>
            </li>
          )}

          {/* If there is an ADMIN logged in */}
          {isAdmin && (
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-links">
                Dashboard
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="nav-item">
              <Link
                to="/"
                className="nav-links"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Logout
              </Link>
            </li>
          )}

          {/* If NO ONE is logged in (neither user nor admin) */}
          {!user && !isAdmin && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
