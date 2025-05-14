import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h2>Pharmacy Management System</h2>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <h1>Welcome to Pharmacy Management System</h1>

        <h2>Login to continue</h2>
        <button className="home-button" onClick={() => navigate('login')}>
          Login
        </button>

        <h2>Sign Up to continue</h2>
        <button className="home-button" onClick={() => navigate('signup')}>
          Sign Up
        </button>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Meraas Pharmacy. All rights reserved.</p>
        <Link to="/about">About Us</Link>
        <span>|</span>
        <Link to="/contact">Contact Us</Link>
        <span>|</span>
        <Link to="/privacy">Privacy Policy</Link>
        <span>|</span>
        <Link to="/terms">Terms of Service</Link>
        <span>|</span>
        <Link to="/help">Help</Link>
      </footer>
    </div>
  );
};

export default Home;