import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <header style={{
        backgroundColor: '#1e1e2f',
        color: '#ffffff',
        padding: '16px',
        textAlign: 'center',
        borderBottom: '4px solid #4CAF50'
      }}>
        <h2>Pharmacy Management System</h2>
      </header>

      {/* Main Content */}
      <main style={{
        padding: '40px',
        textAlign: 'center',
        minHeight: '70vh',
        backgroundColor: '#f4f4f4'
      }}>
        <h1 style={{ color: "#4CAF50" }}>Welcome to Pharmacy Management System</h1>

        <h2 style={{ marginTop: '40px' }}>Login to continue</h2>
        <button
          onClick={() => navigate('login')}
          style={{
            padding: '10px 24px',
            marginBottom: '30px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>

        <h2>Sign Up to continue</h2>
        <button
          onClick={() => navigate('signup')}
          style={{
            padding: '10px 24px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Sign Up
        </button>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1e1e2f',
        color: '#ffffff',
        padding: '12px',
        textAlign: 'center',
        borderTop: '2px solid #4CAF50'
      }}>
        <p>&copy; {new Date().getFullYear()} Meraas Pharmacy. All rights reserved.</p>
        <Link to="/about" style={{ color: '#ffffff', textDecoration: 'none' }}>About Us</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/contact" style={{ color: '#ffffff', textDecoration: 'none' }}>Contact Us</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/privacy" style={{ color: '#ffffff', textDecoration: 'none' }}>Privacy Policy</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/terms" style={{ color: '#ffffff', textDecoration: 'none' }}>Terms of Service</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/help" style={{ color: '#ffffff', textDecoration: 'none' }}>Help</Link>
      </footer>
    </>
  );
};

export default Home;
