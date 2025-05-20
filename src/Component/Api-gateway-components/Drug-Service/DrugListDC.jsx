import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';

const DrugListDC = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchDrugs();
  }, [refresh]);

  const filteredDrugs = data.filter((drug) =>
  [drug.name, drug.manufacturer, drug.batchId].some(field =>
    field.toLowerCase().includes(searchTerm.toLowerCase())
  )
);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
        padding: '20px',
      }}
    >
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
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredDrugs.length > 0 ? (
          filteredDrugs.map((drug) => (
            <div
              key={`${drug.batchId}-${drug.name}-${drug.manufacturer}`}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p>
                <strong style={{ color: '#2c3e50', fontSize: '18px' }}>
                  Drug Name:
                </strong>{' '}
                <span style={{ fontWeight: '600', color: '#27ae60' }}>
                  {drug.name}
                </span>
              </p>
              <p>
                <strong style={{ color: '#2c3e50' }}>Supplier:</strong>{' '}
                <span style={{ fontWeight: '500', color: '#2980b9' }}>
                  {drug.manufacturer}
                </span>
              </p>
              <p>
                <strong>Batch ID:</strong> {drug.batchId}
              </p>
              <p><strong>Quantity:</strong>{drug.quantity}</p>
              <p>
                <strong>Expire Date:</strong>{' '}
                {drug.expiryDate
                  ? new Date(drug.expiryDate).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                <strong>Price:</strong> ₹ {drug.price}
              </p>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1' }}>No drugs found.</p>
        )}
      </div>
    </div>
  );
};

export default DrugListDC;
