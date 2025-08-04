// /src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState(""); // <-- 1. Add state for mobile number
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    // ... setLoading, etc.

    const { error } = await signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
          mobile_number: mobile, // This line is crucial
        },
      },
    });
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Registration successful! Please proceed to the login page.");
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-container">
        <h1 className="main-title">Create an Account</h1>
        <div
          className="input-group"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="forgot-password-link"
            style={{
              textAlign: "center",
              display: "inline",
              textDecoration: "underline",
            }}
          >
            Sign In
          </Link>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <label htmlFor="fullName" className="input-label">
              Full Name
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                id="fullName"
                className="custom-input"
                placeholder="e.g., John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* --- 3. ADD THE MOBILE NUMBER INPUT FIELD --- */}
          <div className="input-group">
            <label htmlFor="mobile" className="input-label">
              Mobile Number
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <input
                type="tel"
                id="mobile"
                className="custom-input"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input
                type="email"
                id="email"
                className="custom-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                id="password"
                className="custom-input"
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
