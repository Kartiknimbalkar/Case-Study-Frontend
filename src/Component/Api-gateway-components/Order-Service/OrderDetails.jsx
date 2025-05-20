import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchOrder = async (oid) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token—redirecting to login");
            navigate("/");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:9090/order-service/orders/get/${oid}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrder(response.data);
            setHasSearched(true);
        } catch (error) {
            console.error("Error fetching order:", error);
            setOrder(null);
            setHasSearched(true);
        }
    };

    useEffect(() => {
        if (id) {
            setOrderId(id);
            fetchOrder(id);
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchOrder(orderId);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', borderRadius: '12px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ color: '#6a1b9a', textAlign: 'center', marginBottom: '20px' }}>Get Order By ID</h1>

            {!id && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <label htmlFor="orderId" style={{ fontWeight: 'bold' }}>Enter Order ID:</label>
                    <input
                        type="number"
                        id="orderId"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="e.g., 101"
                        required
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '16px' }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '10px',
                            backgroundColor: '#6a1b9a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#4a148c'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#6a1b9a'}
                    >
                        Get Order
                    </button>
                </form>
            )}

            <br />

            {hasSearched && order ? (
                <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px', backgroundColor: 'white', marginTop: '20px' }}>
                    <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>Order Details</h3>
                    <p><strong>Order ID:</strong> #{order.id}</p>
                    <p><strong>Drug Name:</strong> {order.drugNames}</p>
                    <p><strong>Drug Price:</strong> ₹{order.drugPrices}</p>
                    <p><strong>Batch ID:</strong> {order.batch_id}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Doctor Name:</strong> {order.doctorName} ({order.username})</p>
                    <p><strong>Contact:</strong> {order.doctorContact}</p>
                    <p><strong>Email:</strong> {order.doctorEmail}</p>
                    <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                    <p><strong>Pickup Date:</strong> {order.pickupDate ? new Date(order.pickupDate).toLocaleString() : "N/A"}</p>
                </div>
            ) : hasSearched && !order ? (
                <div style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>
                    No order found with the given ID.
                </div>
            ) : null}
        </div>
    );
};

export default OrderDetails;
