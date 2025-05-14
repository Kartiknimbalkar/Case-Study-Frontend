import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PickedupOrders = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchPickedupOrders = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                navigate("/");
                return;
            }
            try {
                const response = await axios.get("http://localhost:9090/order-service/orders/pickedUpOrders", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching picked up orders:", error);
            }
    }
    fetchPickedupOrders();
    }, []);
  return (
    <div>
      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '98%', marginBottom: '20px', marginTop: '20px', marginLeft: '20px', marginRight:'20px', textAlign: 'center', fontSize: '1rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', color: '#333', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <thead>
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
          {data.map((order, index) => {
            return (
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
                <td>{new Date (order.orderDate).toLocaleString()}</td>
                <td>{new Date(order.pickupDate).toLocaleString()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PickedupOrders
