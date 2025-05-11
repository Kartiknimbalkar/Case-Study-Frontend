import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';

const Drugs = ({ refresh }) => {
  const [data, setData] = useState([]);
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
  

  return (
    <div>
      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '98%', margin: 'auto', textAlign: 'center', marginBottom: '30px', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderCollapse: 'collapse', marginTop: '20px', fontFamily: 'Arial, sans-serif', color: '#333', fontSize: '1.1rem', fontWeight: 'bold', padding: '20px' }}>
        <thead>
          <tr>
            <th>Batch Id</th>
            <th>Drug Name</th>
            <th>Drug Manufacturer</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((drug, index) => (
            <tr key={index}>
              <td>{drug.batchId}</td>
              <td>{drug.name}</td>
              <td>{drug.manufacturer}</td>
              <td>{drug.quantity}</td>
              <td>₹ {drug.price}</td>
              <td>{drug.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Drugs;
