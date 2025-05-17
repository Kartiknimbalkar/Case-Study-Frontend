import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaInfoCircle, FaEnvelope, FaShieldAlt, FaGavel, FaQuestionCircle } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="logo">A Pharmacy Management Application</div>
        <nav className="nav-links">
          <Link to="/about"><FaInfoCircle />About</Link>
          <Link to="/contact"><FaEnvelope />Contact</Link>
          <Link to="/privacy"><FaShieldAlt />Privacy</Link>
          <Link to="/terms"><FaGavel />Terms</Link>
          <Link to="/help"><FaQuestionCircle />Help</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to Your Trusted Pharmacy Partner</h2>
          <p>Manage medicines, orders, and users with ease. Log in or sign up to experience the full power of our platform built for healthcare excellence.</p>
          <div className="btn-group">
            <button className="btn primary-btn" onClick={() => navigate('login')}>
              <FaSignInAlt /> Login
            </button>
            <button className="btn secondary-btn" onClick={() => navigate('signup')}>
              <FaUserPlus /> Sign Up
            </button>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="hero-image">
          <img src="/assets/image.png" alt="Pharmacy Illustration" />

        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Meraas Pharmacy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
