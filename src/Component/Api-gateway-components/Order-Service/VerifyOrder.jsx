import axios from 'axios';
import React, { useState } from 'react'

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
            alert(`${response.data}`);
            setOrderId('');
        } catch (error) {
            console.error("Error verifying order:", error);
        }
    }

  return (
    <div>
        <h1>Verify Order</h1>
        <h2>Enter the Order ID to be verified</h2>
        <label>Order ID</label><br />
        <input
        name="order_id"
        type="number"
        placeholder="Enter Order ID"
        value={order_id}
        onChange={(e) => setOrderId(e.target.value)}
        required
        /><br /><br />

        <button type="submit" onClick={handleSubmit}>Verify Order</button>
    </div>
  )
}

export default VerifyOrder
