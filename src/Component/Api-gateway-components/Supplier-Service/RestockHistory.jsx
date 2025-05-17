import axios from 'axios';
import React, { useState } from 'react';
import './RestockHistory.css';
import { useNavigate } from 'react-router-dom';

const RestockHistory = () => {
  const [batchId, setBatchId] = useState("");
  const [restockHistory, setRestockHistory] = useState([]);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setBatchId(e.target.value);
  };

  const fetchDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token—redirecting to login");
      navigate("/");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:9090/supplier-service/suppliers/history/${batchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRestockHistory(response.data);
      console.log("Restock History fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching restock history:", error);
      setRestockHistory([]);
    }
  };

  return (
    <div className="restock-container">
      <h2>Restock History</h2>
      <input
        type="text"
        className="restock-input"
        onChange={handleInput}
        placeholder="Enter Batch ID"
      />
      <br />
      <button type="button" className="restock-button" onClick={fetchDetails}>
        Search
      </button>
      {restockHistory.length > 0 ? (
        <table className="restock-table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Quantity</th>
              <th>Restock Date</th>
            </tr>
          </thead>
          <tbody>
            {restockHistory.map((history, index) => (
              <tr key={index}>
                <td>{history.supplierName}</td>
                <td>{history.quantity}</td>
                <td>{new Date(history.restockDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: '20px' }}>No restock history found for the given Batch ID.</p>
      )}
    </div>
  );
};

export default RestockHistory;
