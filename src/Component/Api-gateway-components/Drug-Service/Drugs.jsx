import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Drugs = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchDrugs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token—redirecting to login");
      navigate("/");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:9090/drug-service/drugs/getAll",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching drugs:", error);
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  const handleDelete = async (batchId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the drug with Batch ID ${batchId}?`);
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://localhost:9090/drug-service/drugs/delete/${batchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Drug deleted successfully.");
      fetchDrugs(); // Refresh the list
    } catch (error) {
      console.error("Error deleting drug:", error);
      alert("Failed to delete the drug.");
    }
  };

  const filteredDrugs = data.filter((drug) =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Drug Inventory</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Find drugs by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            marginRight: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'flex-start'
          }}
        />
      </div>

      <div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px'
}}>
        {filteredDrugs.map((drug, index) => (
          <div key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '15px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            flex: '0 0 auto',
            width: '300px'
          }}>
            <p><strong>Supplier:</strong> {drug.manufacturer}</p>
            <p><strong>Drug Name:</strong> {drug.name}</p>
            <p><strong>Quantity:</strong> {drug.quantity}</p>
            <p><strong>Batch ID:</strong> {drug.batchId}</p>
            <p><strong>Expire Date:</strong> {(drug.expiryDate) !== null ? new Date(drug.expiryDate).toLocaleDateString() : null}</p>
            <p><strong>Price:</strong> ₹ {drug.price}</p>
            <div style={{ marginTop: '10px' }}>
              <button style={{
                backgroundColor: '#00c8b3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                marginRight: '10px'
              }} onClick={() => navigate(`drug-update`)}>
                Edit
              </button>
              <button style={{
                backgroundColor: '#f85d7f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px'
              }} onClick={() => handleDelete(drug.batchId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drugs;
