import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const OrderById = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState({});
    const navigate = useNavigate();
    const [hasSearched, setHasSearched] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token—redirecting to login")
            navigate("/")
            return;
        }
        try {
            const response = await axios.get(`http://localhost:9090/order-service/orders/get/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrder(response.data);
            setHasSearched(true);
            console.log("Order fetched successfully:", response.data);
        } catch (error) {
            console.error("Error fetching order:", error);
            setOrder(null);
            setHasSearched(false);
        }
    }

  return (
    <div>
      <label htmlFor="orderId">Enter Order ID:</label><br/>
      <input type="number" onChange={(e) => setOrderId(e.target.value)} id="orderId" name="orderId" placeholder='Enter Order ID' /><br/><br/>
      <button onClick={handleSubmit}>Get Order</button><br/><br/>
        {hasSearched && order ? (
            <div>
            <h2>Order Details:</h2>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Drug Name:</strong> {order.drugNames}</p>
            <p><strong>Drug Price:</strong> {order.drugPrices}</p>
            <p><strong>Batch ID:</strong> {order.batch_id}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Doctor Name:</strong> {order.doctorName}</p>
            <p><strong>Doctor Contact:</strong> {order.doctorContact}</p>
            <p><strong>Doctor Email:</strong> {order.doctorEmail}</p>
            <p><strong>Total Amount:</strong> {order.totalPrice}</p>
            <p><strong>Paid Amount:</strong> {order.paidAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>Pickup Date:</strong> {new Date(order.pickupDate).toLocaleString()}</p>
            </div>
        ) : hasSearched && !order ? (
            <div>No order found with the given ID.</div>
        ) : null}
    </div>
  )
}

export default OrderById
