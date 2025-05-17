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


const Terms = () => (
    
  <div style={pageStyle}>
    <h1>Terms & Conditions</h1>
    <p>
      By accessing or using our services, you agree to comply with all applicable laws and regulations.
    </p>
    <p>
      The platform is intended for authorized users only. Unauthorized access, data tampering, or system abuse
      will result in legal action.
    </p>
    <p>
      PharmaTrack reserves the right to update terms and features without prior notice.
    </p>
  </div>
);

export default Terms;
