import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderListDC = () => {
  const [respData, setRespDate] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token not found or passed");
      navigate("/");
      return;
    }

    try {
      const response = await axios.get("http://localhost:9090/order-service/orders/getUserOrders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRespDate(response.data);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '10px',
        fontFamily: 'Arial, sans-serif',
        color: '#333'
      }}>Order List</h1>

      <h3 style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontFamily: 'Arial, sans-serif',
        color: '#555'
      }}>List of Orders</h3>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center'
      }}>
        {respData.map((order, index) => (
          <div key={index} style={{
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            backgroundColor: '#fdfdfd',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
          }}>
            <h4 style={{ color: '#2e7d32', marginBottom: '10px' }}>Order #{order.id}</h4>
            <p><strong>Doctor:</strong> {order.doctorName} ({order.username})</p>
            <p><strong>Contact:</strong> {order.doctorContact}</p>
            <p><strong>Email:</strong> {order.doctorEmail}</p>
            <p><strong>Batch ID:</strong> {order.batch_id}</p>
            <p><strong>Drugs:</strong> {order.drugNames}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Total Price:</strong> ₹ {order.totalPrice}</p>
            {/* <p><strong>Paid Amount:</strong> ₹ {order.paidAmount}</p> */}
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Pickup Date:</strong> {order.pickupDate !== null ? new Date(order.pickupDate).toLocaleString() : "Not Picked up"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderListDC;
