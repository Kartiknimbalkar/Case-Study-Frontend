import React from 'react';

const About = () => {
  return (
    <div style={{
      padding: '40px',
      maxWidth: '900px',
      margin: '60px auto',
      backgroundColor: '#fdf6e3',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#333',
      lineHeight: '1.6',
    }}>
      <h1 style={{ color: '#005f73', marginBottom: '20px' }}>About Us</h1>
      <p>
        Welcome to <strong>PharmaTrack</strong> – your trusted partner in pharmacy management.
      </p>
      <p>
        Our platform is designed to simplify, streamline, and secure the process of managing drug inventories,
        processing orders, and handling healthcare workflows for pharmacies of all sizes.
      </p>
      <p>
        With robust features like real-time stock updates, prescription order handling, role-based access control,
        and detailed reporting, we empower medical professionals to focus more on patient care and less on administrative tasks.
      </p>
      <p style={{ marginTop: '20px' }}>
        <strong>Mission:</strong> To innovate and optimize pharmacy operations through smart, secure, and scalable technology.
      </p>
      <p>
        <strong>Vision:</strong> To become the leading digital platform for pharmacy and healthcare service providers.
      </p>
    </div>
  );
};

export default About;
