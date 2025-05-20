import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderList = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

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
    }, [refresh]);

    const verifyOrder = async (orderId) => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(`http://localhost:9090/order-service/orders/verify/${orderId}`, {},{
          headers: {Authorization: `Bearer ${token}`}
        });
        setRefresh(prev => !prev);
        console.log(response);
        toast.success(`${response.data}`);
      } catch(error) {
        toast.error(`${error.response.data}`);
      }
    };

    const pickupOrder = async (orderId) => {
      try {
        const resonse = await axios.put(`http://localhost:9090/order-service/orders/pickedup/${orderId}`, {}, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
        setRefresh(prev => !prev);
        console.log(resonse);
        toast.success(`${resonse.data}`);
      } catch (error) {
        toast.error(`${error.response.data}`);
      }
    };


  return (
    <div style={{ overflowX: 'auto', maxWidth: '100vw' }}>
      <ToastContainer autoClose={2000} position='top-center' />
      <h1 style={{textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif', color: '#333'}}>Order List</h1>
      <h3 style={{textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif', color: '#333'}}>List of Orders</h3>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '98%', margin: 'auto', textAlign: 'center', marginBottom: '30px', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderCollapse: 'collapse', borderSpacing: '0' }}>
        <thead style={{ backgroundColor: '#e0e7ef' }}>
          <tr>
            <th>Order Id</th>
            <th>Doctor Name</th>
            <th>Doctor Contact</th>
            <th>Doctor Email</th>
            <th>Batch Id</th>
            <th>Username</th>
            <th>Drug Names</th>
            <th>Quantity</th>
            <th>Total Price</th>
            {/* <th>Paid Amount</th> */}
            <th>Order Date</th>
            <th>Status</th>
            <th>Pickup Date</th>
            <th>Verify Order</th>
            <th>Pickup Order</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => {
            const isEven = index % 2 === 0;
            return(
              <tr
  key={index}
  style={{ background: isEven ? '#f7fbff' : '#fff', transition: 'background 0.2s', cursor: 'pointer' }}
  onMouseOver={e => (e.currentTarget.style.background = '#f1f7ff')}
  onMouseOut={e => (e.currentTarget.style.background = isEven ? '#f7fbff' : '#fff')}
  onClick={() => navigate(`/orders/get/${order.id}`)} // 👈 navigate to details
>

                <td>{order.id}</td>
                <td>{order.doctorName}</td>
                <td>{order.doctorContact}</td>
                <td>{order.doctorEmail}</td>
                <td>{order.batch_id}</td>
                <td>{order.username}</td>
                <td>{order.drugNames}</td>
                <td>{order.quantity}</td>
                <td>₹ {order.totalPrice}</td>
                {/* <td>₹ {order.paidAmount}</td> */}
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>{(order.pickupDate) !== null ? new Date(order.pickupDate).toLocaleString() : null}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: '#00a8ff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      margin: '0 2px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = '#007bb5')}
                    onMouseOut={e => (e.currentTarget.style.background = '#00a8ff')}
                    onClick={(e) => {
                      e.stopPropagation(); // prevents row click
                      verifyOrder(order.id);
                    }}

                  >
                    Verify
                  </button>
                </td>
                <td>
                  <button
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      margin: '0 2px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = '#1e7e34')}
                    onMouseOut={e => (e.currentTarget.style.background = '#28a745')}
                    onClick={(e) => {
                      e.stopPropagation(); // prevents row click
                      pickupOrder(order.id);
                    }}

                  >
                    Pickup
                  </button>
                </td>
              </tr>
              
            );
          })}
        </tbody>
      </table>
      
    </div>
  )
}

export default OrderList
