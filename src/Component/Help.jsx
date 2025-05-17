import React from 'react';

const pageStyle = {
  padding: '40px',
  maxWidth: '900px',
  margin: '60px auto',
  backgroundColor: '#fffefc',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Segoe UI, sans-serif',
  color: '#333',
  lineHeight: '1.6',
};


const Help = () => (
  <div style={pageStyle}>
    <h1>Help & Support</h1>
    <p>If you are experiencing issues with the system, here are a few steps to try:</p>
    <ul>
      <li>Ensure you have a stable internet connection.</li>
      <li>Clear browser cache and cookies, then log in again.</li>
      <li>Check the FAQ section for common issues.</li>
      <li>Still stuck? Email us at <strong>support@pharmatrack.com</strong>.</li>
    </ul>
  </div>
);

export default Help;
