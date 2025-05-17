import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ fontSize: '3rem', color: '#ff4d4d' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Oops! Page Not Found</p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          backgroundColor: '#007bff',
          color: 'white',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Page404;
