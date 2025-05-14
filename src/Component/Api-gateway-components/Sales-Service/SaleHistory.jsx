import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SaleHistory = () => {
    const [date, setDate] = useState(null);
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (!token) {
                console.warn("No token—redirecting to login")
                navigate("/login")
                return
            }
            if(!date) {
                console.warn("No date provided—redirecting in the input to login")
                // navigate("/login")
                return;
            }
        const response = await axios.get(`http://localhost:9090/sales-service/sales/history?startDate=${date}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
          });
        console.log(response.data);
        setSales(response.data);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    }

  return (
    <>
      <div style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '100px', marginRight: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: 'brown' }}>Sales History</h1>
          <label><strong>Start Date:</strong></label>
          <input type="date" onChange={(e) => setDate(e.target.value)} id="startDate" name="startDate" /><br/><br/>
          <button onClick={handleSubmit}>Get Sales</button>
      </div>
      <div>
        { sales.length > 0 &&
        <table border='1' style={{ 
          width: '90%', 
          borderCollapse: 'collapse', 
          marginTop: '20px', 
          marginLeft: '60px', 
          marginRight: '20px', 
          marginBottom: '20px', 
          textAlign: 'left', 
          fontSize: '1rem', 
          fontFamily: 'Arial, sans-serif', 
          backgroundColor: '#f9f9f9', 
          color: '#333', 
          padding: '10px', 
          borderRadius: '8px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
          border: '1px solid #ddd' 
        }}>
          <thead style={{ backgroundColor: '#f4f4f4', color: '#555' }}>
            <tr>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Sale ID</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Doctor Name</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Batch ID</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Amount</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Order ID</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Quantity</th>
              {/* <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Sale Date</th> */}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd', transition: 'background-color 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                <td style={{ padding: '10px' }}>{sale.id}</td>
                <td style={{ padding: '10px' }}>{sale.doctorName}</td>
                <td style={{ padding: '10px' }}>{sale.batchId}</td>
                <td style={{ padding: '10px' }}>{sale.totalPrice}</td>
                <td style={{ padding: '10px' }}>{sale.orderId}</td>
                <td style={{ padding: '10px' }}>{sale.quantity}</td>
                {/* <td style={{ padding: '10px' }}>{new Date(sale.saleDate).toLocaleDateString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
}
      </div>
    </>
  )
}

export default SaleHistory
