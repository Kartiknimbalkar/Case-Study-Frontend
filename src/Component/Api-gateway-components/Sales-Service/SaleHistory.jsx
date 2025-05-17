import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SaleHistory = () => {
  const [date, setDate] = useState('');
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!date) {
      setError('Please select a start date.');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:9090/sales-service/sales/history?startDate=${date}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSales(response.data);
    } catch (err) {
      setError('Failed to fetch sales data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#8B0000', marginBottom: 20 }}>Sales History</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <label htmlFor="startDate"><strong>Start Date:</strong></label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginLeft: 10, padding: 5 }}
        />
        <button type="submit" disabled={!date || loading} style={{ marginLeft: 10, padding: '6px 12px' }}>
          {loading ? 'Loading...' : 'Get Sales'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginBottom: 20 }}>{error}</p>}

      {sales.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <thead style={{ backgroundColor: '#f4f4f4' }}>
            <tr>
              {['Sale ID', 'Doctor Name', 'Batch ID', 'Amount', 'Order ID', 'Quantity'].map((head) => (
                <th
                  key={head}
                  style={{ padding: 12, borderBottom: '2px solid #ddd', textAlign: 'left', color: '#555' }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale.id}
                style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd', cursor: 'default' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
              >
                <td style={{ padding: 12 }}>{sale.id}</td>
                <td style={{ padding: 12 }}>{sale.doctorName}</td>
                <td style={{ padding: 12 }}>{sale.batchId}</td>
                <td style={{ padding: 12 }}>₹{sale.totalPrice}</td>
                <td style={{ padding: 12 }}>{sale.orderId}</td>
                <td style={{ padding: 12 }}>{sale.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SaleHistory;
