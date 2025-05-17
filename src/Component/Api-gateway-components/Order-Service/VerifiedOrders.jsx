import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifiedOrders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerifiedOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(
          'http://localhost:9090/order-service/orders/verifiedOrders',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (err) {
        console.error('Error fetching verified orders:', err);
        setError('Failed to fetch verified orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVerifiedOrders();
  }, [navigate]);

  return (
    <div>
      <h1 style={{ margin: '20px', marginBottom: '40px' }}>Verified Orders</h1>

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red', fontSize: '1rem' }}>{error}</p>
      ) : (
        <div style={{ overflowX: 'auto', margin: '20px' }}>
          <table
            border="1"
            cellPadding="5"
            cellSpacing="0"
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: '1rem',
              fontFamily: 'Arial, sans-serif',
              backgroundColor: '#f9f9f9',
              color: '#333',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minWidth: '1000px',
            }}
          >
            <thead style={{ backgroundColor: '#ddd' }}>
              <tr>
                <th>Order Id</th>
                <th>Doctor Name</th>
                <th>Doctor Contact</th>
                <th>Doctor Email</th>
                <th>Batch Id</th>
                <th>Drug Names</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Paid Amount</th>
                <th>Order Date</th>
                <th>Pickup Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.doctorName}</td>
                  <td>{order.doctorContact}</td>
                  <td>{order.doctorEmail}</td>
                  <td>{order.batch_id}</td>
                  <td>{order.drugNames}</td>
                  <td>{order.quantity}</td>
                  <td>₹ {order.totalPrice}</td>
                  <td>₹ {order.paidAmount}</td>
                  <td>
                    {order.orderDate ? new Date(order.orderDate).toLocaleString() : '—'}
                  </td>
                  <td>
                    {order.pickupDate ? new Date(order.pickupDate).toLocaleString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerifiedOrders;
