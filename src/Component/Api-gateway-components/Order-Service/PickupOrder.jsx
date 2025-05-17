import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PickupOrder = () => {
    const [orderId, setOrderId] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        console.log(token);
        try{
            const response = await axios.put(`http://localhost:9090/order-service/orders/pickedup/${orderId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            // alert(`${response.data}`);
            toast.success(`${response.data}`);
            setOrderId('');
        } catch (error) {
            console.error("Error picking up order:", error);
            // alert(`${error.response.data}`)
            toast.error(`${error.response.data}`);
        }
    }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // horizontal centering
      justifyContent: 'center',
    }}>
      <ToastContainer position='bottom-center' autoClose={3000} />
      <h1 style={{margin: '20px'}}>Pickup Order</h1>
      <h2 style={{margin: '20px'}}>Enter the Order ID to be picked up</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', minWidth: '300px', background: '#fff', padding: '32px', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <label htmlFor="pickupOrder">Order ID</label>
        <input type="number" id="pickupOrder" value={orderId} onChange={(e) => setOrderId(e.target.value)} name="pickupOrder" placeholder="Enter Order ID" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
        <button type="submit" style={{ backgroundColor: '#00a8ff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>Pickup Order</button>
      </form>
    </div>
  )
}

export default PickupOrder
