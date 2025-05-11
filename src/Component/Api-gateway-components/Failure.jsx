import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Failure = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};

  const navigateToDashboard = () => {
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      navigate('/admin-dashboard');
    } else if (role === 'DOCTOR') {
      navigate('/doctor-dashboard');
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Payment Failed</h1>
      <p style={styles.message}>
        Unfortunately, your payment could not be completed.
      </p>
      {orderId && (
        <p style={styles.orderInfo}>
          Order ID: <strong>{orderId}</strong>
        </p>
      )}
      <button style={styles.button} onClick={() => navigateToDashboard()}>
        Try Again
      </button>
      <button style={{ ...styles.button, backgroundColor: '#999' }} onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '5rem',
    padding: '2rem',
    backgroundColor: '#ffe6e6',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: '5rem auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    color: '#d9534f',
    fontSize: '2rem',
  },
  message: {
    margin: '1rem 0',
    fontSize: '1.1rem',
  },
  orderInfo: {
    marginBottom: '1.5rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.7rem 1.5rem',
    margin: '0.5rem',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Failure;
