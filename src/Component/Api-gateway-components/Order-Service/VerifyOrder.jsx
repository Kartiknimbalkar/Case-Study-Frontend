import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOrder = () => {

    const [order_id, setOrderId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        console.log(token);
        try{
            const response = await axios.put(`http://localhost:9090/order-service/orders/verify/${order_id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            // alert(`${response.data}`);
            toast.success(`${response.data}`);
            setOrderId('');
        } catch (error) {
            console.error("Error verifying order:", error);
            // alert(`${error.response.data}`)
            toast.error(`${error.response.data}`);
        }
    }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
        <ToastContainer position='bottom-center' autoClose={3000} />
      <h1 style={{margin: '20px'}}>Verify Order</h1>
      <h2 style={{margin: '20px'}}>Enter the Order ID to be verified</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', minWidth: '300px', background: '#fff', padding: '32px', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <label htmlFor="order_id">Order ID</label>
        <input
          name="order_id"
          id="order_id"
          type="number"
          placeholder="Enter Order ID"
          value={order_id}
          onChange={(e) => setOrderId(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
        />
        <button type="submit" style={{ backgroundColor: '#00a8ff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>Verify Order</button>
      </form>
    </div>
  )
}

export default VerifyOrder
