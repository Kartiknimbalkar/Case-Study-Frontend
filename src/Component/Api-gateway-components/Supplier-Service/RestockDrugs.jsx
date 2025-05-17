import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestockDrugs.css';

const RestockDrugs = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    batchId: '',
    quantity: '',
    expiryDate: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const restock = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token—redirecting to login');
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:9090/supplier-service/suppliers/restock',
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      alert('Drugs Restocked Successfully');
      navigate('/supplier-inventory/suppliers');
    } catch (error) {
      console.error('Error restocking drugs:', error);
    }
  };

  return (
    <div className="restock-form-container">
      <form className="restock-form" onSubmit={restock}>
        <h1>Restock Drugs</h1>

        <label htmlFor="batchId">Batch ID:</label>
        <input
          type="text"
          id="batchId"
          name="batchId"
          placeholder="Enter Batch ID"
          value={data.batchId}
          onChange={handleInput}
          required
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Enter Quantity"
          value={data.quantity}
          onChange={handleInput}
          required
        />

        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          placeholder="Enter Expiry Date"
          value={data.expiryDate}
          onChange={handleInput}
          required
        />

        <button type="submit">Restock</button>
        <button
          type="reset"
          onClick={() => setData({ batchId: '', quantity: '', expiryDate: '' })}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default RestockDrugs;
