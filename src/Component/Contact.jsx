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


const Contact = () => (
  <div style={pageStyle}>
    <h1>Contact Us</h1>
    <p>For any inquiries or support, feel free to reach out to us:</p>
    <ul>
      <li>Email: <strong>support@pharmatrack.com</strong></li>
      <li>Phone: <strong>+91-9876543210</strong></li>
      <li>Address: <strong>123 Health Avenue, Pune, Maharashtra, India</strong></li>
    </ul>
  </div>
);

export default Contact;
