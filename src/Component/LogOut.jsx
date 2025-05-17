import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Show logout message
    toast.success('Logged Out Successfully', {
      toastId: 'logout-success',
    });

    // Optional: Navigate to login/home after delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 3500); // Slightly more than autoClose

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 style={{ marginTop: '40px' }}>You have been logged out</h1>
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '40px',
          padding: '10px 20px',
          borderRadius: '6px',
          backgroundColor: '#00c8b3',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Click here to go back to Home Page
      </button>
    </div>
  );
};

export default LogOut;
