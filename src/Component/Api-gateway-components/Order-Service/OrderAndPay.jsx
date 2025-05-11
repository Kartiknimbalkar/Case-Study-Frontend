// // src/components/PlaceOrder.jsx
// import axios from 'axios';
// import React, { useState } from 'react';
// // import OrderList from './OrderList';
// import Drugs from '../../Drugs';
// import { useNavigate } from 'react-router-dom';
// import ListOrders from './ListOrders';

// const PlaceOrder = () => {

//   const formStyle = {
//   textAlign: 'center',
//   margin: '0 auto',
//   padding: '20px',
//   maxWidth: '400px',
//   border: '1px solid #ccc',
//   borderRadius: '10px',
//   boxShadow: '0px 0px 10px rgba(95, 17, 17, 0.22)',
//   backgroundColor: '#f9f9f9'
// };

// const labelStyle = {
//   fontWeight: 'bold',
//   display: 'block',
//   marginBottom: '5px',
//   marginTop: '15px',
// };

// const inputStyle = {
//   width: '100%',
//   padding: '6px',
//   fontSize: '14px',
//   border: '1px solid #ccc',
//   borderRadius: '4px',
// };

// const buttonStyle = {
//   padding: '10px 20px',
//   backgroundColor: '#339900',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
//   fontSize: '16px',
//   marginTop: '20px',
// };


//   const [formData, setFormData] = useState({
//     batch_id: '',
//     quantity: 0,
//     doctorName: '',
//     doctorContact: '',
//     doctorEmail: '',
//     // You can keep paymentMethod/paidAmount if you want to record them,
//     // but Razorpay will handle the actual payment flow.
//   });

//     const navigate = useNavigate();

//   const [refresh, setRefresh] = useState(false);

//   const handleInput = e => {
//     const { name, value } = e.target;
//     setFormData(fd => ({ ...fd, [name]: value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     try {
//       // 1) Place the order
//       const { data: order } = await axios.post(
//         'http://localhost:9090/order-service/orders/place',
//         formData, {
//         headers : {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         }}
//       );

//       // 2) Kick off Razorpay payment for that order
//       const { data: payment } = await axios.post(
//         `http://localhost:8087/payment/makePayment/${order.id}`
//       );

//       // 3) Configure and open Razorpay checkout
//       const options = {
//         key: 'rzp_test_BpK7AD2X2oh21E',             // your test/live key
//         amount: payment.total * 100,                   // amount in paise
//         currency: 'INR',
//         name: 'Your Pharmacy',
//         description: `Payment for Order #${order.id}`,
//         order_id: payment.razorpayOrderId,             // razorpay order id
//         // callback_url: 'http://localhost:8087/payment/paymentCallback',
//         handler: function (response) {
//           axios.post('http://localhost:8087/payment/paymentCallback', {
//         razorpay_order_id: response.razorpay_order_id,
//         razorpay_payment_id: response.razorpay_payment_id,
//         razorpay_signature: response.razorpay_signature,
//   });
//           navigate('/success', { state: { orderId: order.id, paymentId: response.razorpay_payment_id } });
//         },
//         theme: {
//           color: '#339900',
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//       // 4) Trigger a re-render or confirmation message
//       setRefresh(r => !r);
//     } catch (err) {
//       console.error('Error placing order or initiating payment:', err);
//       alert('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <>
//     <br />
//       <h2 style={{textAlign: 'center'}}>Place Order & Pay</h2>
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <label style={labelStyle}>Batch ID</label><br />
//         <input
//           name="batch_id"
//           type="text"
//           value={formData.batch_id}
//           onChange={handleInput}
//           placeholder="Enter Batch ID"
//           style={inputStyle}
//           required
//         /><br />

//         <label style={labelStyle}>Quantity</label><br />
//         <input
//           name="quantity"
//           type="number"
//           min="1"
//           value={formData.quantity}
//           onChange={handleInput}
//           placeholder="Enter Quantity"
//           style={inputStyle}
//           required
//         /><br />

//         <label style={labelStyle}>Doctor Name</label><br />
//         <input
//           name="doctorName"
//           type="text"
//           value={formData.doctorName}
//           onChange={handleInput}
//           placeholder="Enter Doctor Name"
//           style={inputStyle}
//           required
//         /><br />

//         <label style={labelStyle}>Doctor Contact</label><br />
//         <input
//           name="doctorContact"
//           type="text"
//           value={formData.doctorContact}
//           onChange={handleInput}
//           placeholder="Enter Doctor Contact"
//           style={inputStyle}
//           required
//         /><br />

//         <label style={labelStyle}>Doctor Email</label><br />
//         <input
//           name="doctorEmail"
//           type="email"
//           value={formData.doctorEmail}
//           onChange={handleInput}
//           placeholder="Enter Doctor Email"
//           style={inputStyle}
//           required
//         /><br /><br/>

//         <button style={buttonStyle} type="submit">Place Order & Pay</button>
//         {refresh && <p>Order placed and payment initiated!</p>}
//       </form>
//       <br/><br/>
//     <h2 style={{textAlign: 'center'}}>Drugs List</h2>
//     <Drugs refresh={refresh} />

//       {/* <h2>List of Orders</h2> */}
//       {/* <ListOrders refresh={refresh} /> */}
//     </>
//   );
// };

// export default PlaceOrder;


















// src/components/PlaceOrder.jsx
import axios from 'axios';
import React, { useState } from 'react';

import Drugs from '../Drug-Service/Drugs';
import { useNavigate } from 'react-router-dom';
import ListOrders from './ListOrders';

const PlaceOrder = () => {

  const formStyle = {
  textAlign: 'center',
  margin: '0 auto',
  padding: '20px',
  maxWidth: '400px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px rgba(95, 17, 17, 0.22)',
  backgroundColor: '#f9f9f9'
};

const labelStyle = {
  fontWeight: 'bold',
  display: 'block',
  marginBottom: '5px',
  marginTop: '15px',
};

const inputStyle = {
  width: '100%',
  padding: '6px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#339900',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '20px',
};


  const [formData, setFormData] = useState({
    batch_id: '',
    quantity: 0,
    doctorName: '',
    doctorContact: '',
    doctorEmail: '',
    // You can keep paymentMethod/paidAmount if you want to record them,
    // but Razorpay will handle the actual payment flow.
  });

    const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // 1) Place the order
      const { data: order } = await axios.post(
        'http://localhost:9090/order-service/orders/place',
        formData, {
        headers : {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }}
      );

      // 2) Kick off Razorpay payment for that order
      const { data: payment } = await axios.post(
        `http://localhost:8087/payment/makePayment/${order.id}`
      );

      // 3) Configure and open Razorpay checkout
      // new code below
      const options = {
  key: 'rzp_test_BpK7AD2X2oh21E',            // your test/live key
  amount: payment.total * 100,               // amount in paise
  currency: 'INR',
  name: 'Your Pharmacy',
  description: `Payment for Order #${order.id}`,
  order_id: payment.razorpayOrderId,          // razorpay order id

  handler: async function (response) {
    try {
      // 1. Notify your backend of the successful payment
      await axios.post(
        'http://localhost:8087/payment/paymentCallback',
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }
      );
      // 2. Navigate to success page
      navigate('/success', {
        state: { orderId: order.id, paymentId: response.razorpay_payment_id }
      });
    } catch (err) {
      console.error('Error in success callback:', err);
      alert('Payment succeeded but confirmation failed. Please contact support.');
    }
  },

  modal: {
    ondismiss: async function () {
      try {
        // Tell your backend that payment was cancelled/failed
        await axios.post(
          'http://localhost:8087/payment/paymentFailureCallback',
          {
            razorpay_order_id: payment.razorpayOrderId,
            reason: 'Payment failed or modal closed by user.'
          }
        );
      } catch (err) {
        console.error('Error in failure callback:', err);
      } finally {
        alert('Payment was cancelled or failed. Your order has been restocked.');
        navigate('/payment-failed', { state: { orderId: order.id } });
      }
    }
  },

  theme: {
    color: '#339900',
  },
};

// Before opening, verify that Razorpay SDK is loaded
if (!window.Razorpay) {
  alert('Payment SDK not loaded. Please refresh and try again.');
} else {
  const rzp = new window.Razorpay(options);
  rzp.open();
}

    // new code above

      const rzp = new window.Razorpay(options);
      rzp.open();

      // 4) Trigger a re-render or confirmation message
      setRefresh(r => !r);
    } catch (err) {
      console.error('Error placing order or initiating payment:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
    <br />
      <h2 style={{textAlign: 'center'}}>Place Order & Pay</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>Batch ID</label><br />
        <input
          name="batch_id"
          type="text"
          value={formData.batch_id}
          onChange={handleInput}
          placeholder="Enter Batch ID"
          style={inputStyle}
          required
        /><br />

        <label style={labelStyle}>Quantity</label><br />
        <input
          name="quantity"
          type="number"
          min="1"
          value={formData.quantity}
          onChange={handleInput}
          placeholder="Enter Quantity"
          style={inputStyle}
          required
        /><br />

        <label style={labelStyle}>Doctor Name</label><br />
        <input
          name="doctorName"
          type="text"
          value={formData.doctorName}
          onChange={handleInput}
          placeholder="Enter Doctor Name"
          style={inputStyle}
          required
        /><br />

        <label style={labelStyle}>Doctor Contact</label><br />
        <input
          name="doctorContact"
          type="text"
          value={formData.doctorContact}
          onChange={handleInput}
          placeholder="Enter Doctor Contact"
          style={inputStyle}
          required
        /><br />

        <label style={labelStyle}>Doctor Email</label><br />
        <input
          name="doctorEmail"
          type="email"
          value={formData.doctorEmail}
          onChange={handleInput}
          placeholder="Enter Doctor Email"
          style={inputStyle}
          required
        /><br /><br/>

        <button style={buttonStyle} type="submit">Place Order & Pay</button>
        {refresh && <p>Order placed and payment initiated!</p>}
      </form>
      <br/><br/>
    <h2 style={{textAlign: 'center'}}>Drugs List</h2>
    <Drugs refresh={refresh} />

      {/* <h2>List of Orders</h2> */}
      {/* <ListOrders refresh={refresh} /> */}
    </>
  );
};

export default PlaceOrder;
