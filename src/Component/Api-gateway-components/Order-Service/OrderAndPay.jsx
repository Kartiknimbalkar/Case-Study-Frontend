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


















// // src/components/PlaceOrder.jsx
// import axios from 'axios';
// import React, { useState } from 'react';

// import Drugs from '../Drug-Service/Drugs';
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
//       // new code below
//       const options = {
//   key: 'rzp_test_BpK7AD2X2oh21E',            // your test/live key
//   amount: payment.total * 100,               // amount in paise
//   currency: 'INR',
//   name: 'Your Pharmacy',
//   description: `Payment for Order #${order.id}`,
//   order_id: payment.razorpayOrderId,          // razorpay order id

//   handler: async function (response) {
//     try {
//       // 1. Notify your backend of the successful payment
//       console.log(response);
      
//       await axios.post(
//         'http://localhost:8087/payment/paymentCallback',
//         {
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature,
//         }
//       );
//       // 2. Navigate to success page
//       navigate('/success', {
//         state: { orderId: order.id, paymentId: response.razorpay_payment_id }
//       });
//     } catch (err) {
//       console.error('Error in success callback:', err);
//       alert('Payment succeeded but confirmation failed. Please contact support.');
//     }
//   },

//   modal: {
//     ondismiss: async function () {
//       try {
//         // Tell your backend that payment was cancelled/failed
//         await axios.post(
//           'http://localhost:8087/payment/paymentFailureCallback',
//           {
//             razorpay_order_id: payment.razorpayOrderId,
//             reason: 'Payment failed or modal closed by user.'
//           }
//         );
//       } catch (err) {
//         console.error('Error in failure callback:', err);
//       } finally {
//         alert('Payment was cancelled or failed. Your order has been restocked.');
//         navigate('/payment-failed', { state: { orderId: order.id } });
//       }
//     }
//   },

//   theme: {
//     color: '#339900',
//   },
// };

// // Before opening, verify that Razorpay SDK is loaded
// if (!window.Razorpay) {
//   alert('Payment SDK not loaded. Please refresh and try again.');
// } else {
//   const rzp = new window.Razorpay(options);
//   rzp.open();
// }

//     // new code above

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
//     {/* <h2 style={{textAlign: 'center'}}>Drugs List</h2> */}
//     {/* <Drugs refresh={refresh} /> */}

//       {/* <h2>List of Orders</h2> */}
//       {/* <ListOrders refresh={refresh} /> */}
//     </>
//   );
// };

// export default PlaceOrder;

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrugListDC from '../Drug-Service/DrugListDC'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    batch_id: '',
    quantity: 1,
    doctorName: '',
    doctorContact: '',
    doctorEmail: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const styles = {
    form: {
      textAlign: 'center',
      margin: '0 auto',
      padding: '20px',
      maxWidth: '400px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
    },
    label: { fontWeight: 'bold', display: 'block', margin: '15px 0 5px' },
    input: {
      width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px'
    },
    button: {
      padding: '10px 20px', backgroundColor: '#339900', color: '#fff',
      border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginTop: '20px'
    }
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('Fetching price...');

    try {
      // Fetch price & total
      const response = await axios.get(
        'http://localhost:9090/order-service/orders/price-stock',
        { params: { batch_id: formData.batch_id, quantity: formData.quantity },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
    }
      }
      );
      const total = response.data.totalPrice;
      setStatusMessage(`Total amount: ₹${total}`);

      // 1) Create Razorpay-order stub
      const refId = Date.now().toString()
      setStatusMessage('Creating payment order...');
      const { data: paymentData } = await axios.post(
        'http://localhost:8087/payment/createOrder',
        { total, clientOrderRef: refId }
      );

      // 2) Configure Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: paymentData.total * 100,
        currency: 'INR',
        order_id: paymentData.razorpayOrderId,
        name: 'Your Pharmacy',
        description: `Order for ${formData.batch_id}, ref: ${refId}`,
        handler: async response => {
          setStatusMessage('Verifying payment...');
          try {
            await axios.post(
              'http://localhost:8087/payment/paymentCallback',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }
            );

            // Place real order
            setStatusMessage('Placing order...');
            const { data: savedOrder } = await axios.post(
              'http://localhost:9090/order-service/orders/place',
              {
                ...formData,
                razorpayPaymentId: response.razorpay_payment_id,
                totalPrice: paymentData.total
              },
              { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            await axios.put("http://localhost:8087/payment/update",
              {
                razorpay_order_id: response.razorpay_order_id,
                order_id: savedOrder.id
              }
            );

            navigate('/success', {
              state: { orderId: savedOrder.id, paymentId: response.razorpay_payment_id, showToast: true }
            });

          } catch (err) {
            console.error(err);
            setStatusMessage('Order placement failed after payment.');
          }
        },
        modal: {
          ondismiss: () => {
            setStatusMessage('Payment cancelled. No order created.');
            toast.error('Payment cancelled — no order was created.');
          }
        },
        theme: { color: '#339900' }
      };

      setStatusMessage('Opening payment modal...');
      if (!window.Razorpay) {
        toast.error('Payment SDK failed to load.');
        setLoading(false);
        return;
      }
      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      toast.error('Error in payment flow. Please try again.');
    } finally {
      setLoading(false);
      setStatusMessage('');
    }
  };

  return (
    <>
    <ToastContainer autoClose={2000} position='bottom-center' />
      <h2 style={{ textAlign: 'center', margin: '20px', marginTop: '40px' }}>Place Order & Pay</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Batch ID</label>
        <input name="batch_id" type="text" value={formData.batch_id}
          onChange={handleInput} style={styles.input} required />

        <label style={styles.label}>Quantity</label>
        <input name="quantity" type="number" min="1" value={formData.quantity}
          onChange={handleInput} style={styles.input} required />

        <label style={styles.label}>Doctor Name</label>
        <input name="doctorName" type="text" value={formData.doctorName}
          onChange={handleInput} style={styles.input} required />

        <label style={styles.label}>Doctor Contact</label>
        <input name="doctorContact" type="text" value={formData.doctorContact}
          onChange={handleInput} style={styles.input} required />

        <label style={styles.label}>Doctor Email</label>
        <input name="doctorEmail" type="email" value={formData.doctorEmail}
          onChange={handleInput} style={styles.input} required />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Processing...' : 'Place Order & Pay'}
        </button>
        {statusMessage && <p>{statusMessage}</p>}
      </form>

      {/* <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Drugs List</h2>
       <DrugListDC /> */}
    </>
  );
};

export default PlaceOrder;
