import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    const { orderId, paymentId } = location.state || {};
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        const role = localStorage.getItem('role');
        if (role === 'ADMIN') {
            navigate('/admin-dashboard');
        } else if (role === 'DOCTOR') {
            navigate('/doctor-dashboard');
        }
    }

    return (
        <div id='success' style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            backgroundColor: '#f4f4f4',
            color: '#111',
            fontFamily: 'Arial, sans-serif',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: '100px',
            marginRight: '100px',
            border: '3px solid #ccc',
            borderSpacing: '0'
            }}>
            <h1 style={{color: 'green'}}>Payment Successful!</h1>
            <p>Order ID: {orderId}</p>
            <p>Payment ID: {paymentId}</p>
            <p>Thank you for your payment. Your order has been placed successfully!</p>

            <button onClick={() => navigateToDashboard()} style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    backgroundColor: '#28a745',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>Dashboard</button>
        </div>
    );
};

export default Success;