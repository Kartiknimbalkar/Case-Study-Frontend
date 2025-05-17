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


const Privacy = () => (
  <div style={pageStyle}>
    <h1>Privacy Policy</h1>
    <p>
      We respect your privacy and are committed to protecting your personal data. All patient and doctor information
      is stored securely and is not shared with third parties without explicit consent.
    </p>
    <p>
      By using our platform, you agree to the collection and use of information in accordance with this policy.
    </p>
  </div>
);

export default Privacy;
