import axios from 'axios';
import React, { useState } from 'react'

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
            alert(`${response.data}`);
            setOrderId('');
        } catch (error) {
            console.error("Error picking up order:", error);
        }
    }
  return (
    <div>
        <h1>Pickup Order</h1>
        <h2>Enter the Order ID to be picked up</h2>
      <label htmlFor="pickupOrder">Order ID</label><br/>
      <input type="number" id="pickupOrder" onChange={(e) => setOrderId(e.target.value)} name="pickupOrder" placeholder="Enter Order ID" required/>
        <br /><br />
        <button type="submit" onClick={handleSubmit}>Pickup Order</button>
        <br /><br />
    </div>
  )
}

export default PickupOrder
