import axios from 'axios';
import React, { useEffect, useState } from 'react'
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
                headers: {Authorization: `Bearer ${token}`},
            });
            setRespDate(response.data);
        } catch(error) {
            console.error("Error fetching orders: ", error);
        }
    };
    
    useEffect(() => {
        fetchOrders();
    }, []);

  return (
    <div>
      <h1 style={{textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif', color: '#333'}}>Order List</h1>
      <h3 style={{textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif', color: '#333'}}>List of Orders</h3>

      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '98%', margin: 'auto', textAlign: 'center', marginBottom: '30px', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Doctor Username</th>
            <th>Doctor Name</th>
            <th>Doctor Contact</th>
            <th>Doctor Email</th>
            <th>Batch Id</th>
            <th>Drug Names</th>
            <th>Quantity</th>
            <th>Total Price</th>
            {/* <th>Paid Amount</th> */}
            <th>Order Date</th>
            <th>Status</th>
            <th>Pickup Date</th>
          </tr>
        </thead>
        <tbody>
          {respData.map((order, index) => {
            return(
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.username}</td>
                <td>{order.doctorName}</td>
                <td>{order.doctorContact}</td>
                <td>{order.doctorEmail}</td>
                <td>{order.batch_id}</td>
                <td>{order.drugNames}</td>
                <td>{order.quantity}</td>
                <td>₹ {order.totalPrice}</td>
                {/* <td>₹ {order.paidAmount}</td> */}
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>{(order.pickupDate) !== null ? new Date(order.pickupDate).toLocaleString() : <p>Not Pickedup yet</p>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderListDC
