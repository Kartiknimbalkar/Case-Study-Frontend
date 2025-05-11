import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    // useEffect(() => {
    //   axios.get("http://localhost:9090/order-service/orders/list")
    //   .then(r => setData(r.data))
    //   .catch(err => console.log(err))
    // }, [refresh]);

    useEffect(() => {
      const fetchOrders = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token—redirecting to login");
          navigate("/");
          return;
        }
        try {
          const response = await axios.get(
            "http://localhost:9090/order-service/orders/list",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setData(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
    
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
          {data.map((order, index) => {
            return(
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.doctorName}</td>
                <td>{order.doctorContact}</td>
                <td>{order.doctorEmail}</td>
                <td>{order.batch_id}</td>
                <td>{order.drugNames}</td>
                <td>{order.quantity}</td>
                <td>₹ {order.totalPrice}</td>
                {/* <td>₹ {order.paidAmount}</td> */}
                <td>{order.orderDate}</td>
                <td>{order.status}</td>
                <td>{order.pickupDate}</td>
              </tr>
            );
          })}
        </tbody>

      </table>
      
    </div>
  )
}

export default OrderList
