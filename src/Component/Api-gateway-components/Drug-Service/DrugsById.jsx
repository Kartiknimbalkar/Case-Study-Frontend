import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DrugsById = () => {
  const [id, setId] = useState('');
  const [searchId, setSearchId] = useState('');
  const [drug, setDrug] = useState(null);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setId(e.target.value);
  };

  const handleSearch = () => {
    setSearchId(id);
    setHasSearched(true);
    setError('');
    setDrug(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  useEffect(() => {
    const fetchDrugById = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      if (!searchId) return;

      try {
        const response = await axios.get(`http://localhost:9090/drug-service/drugs/get/${searchId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDrug(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Drug not found.");
        } else {
          setError("Failed to fetch drug data.");
        }
      }
    };

    fetchDrugById();
  }, [searchId]);

  const handleReset = () => {
    setId('');
    setSearchId('');
    setDrug(null);
    setError('');
    setHasSearched(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Find Drug by Batch ID</h1>

      <input
        type="text"
        value={id}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter Batch ID"
        style={styles.input}
      />
      <div>
        <button onClick={handleSearch} style={styles.button}>Search</button>
        <button onClick={handleReset} style={{ ...styles.button, backgroundColor: '#888' }}>Reset</button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {hasSearched && !error && drug && (
        <div style={styles.card}>
          <h2 style={{ marginBottom: '10px' }}>Drug Details</h2>
          <p><strong>Batch ID:</strong> {drug.batchId}</p>
          <p><strong>Name:</strong> {drug.name}</p>
          <p><strong>Manufacturer:</strong> {drug.manufacturer}</p>
          <p><strong>Price:</strong> ₹{drug.price}</p>
          <p><strong>Quantity:</strong> {drug.quantity}</p>
          <p><strong>Expiry Date:</strong> {new Date(drug.expiryDate).toLocaleDateString()}</p>
        </div>
      )}

      {hasSearched && !error && !drug && (
        <p style={styles.info}>No data found for the entered Batch ID.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '50px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '20px',
    color: '#333'
  },
  input: {
    padding: '10px',
    width: '250px',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 16px',
    margin: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: 'white'
  },
  card: {
    marginTop: '20px',
    padding: '20px',
    width: '350px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'left'
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: '15px'
  },
  info: {
    color: '#555',
    marginTop: '15px'
  }
};

export default DrugsById;
