import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SalesReport = ({refersh}) => {

    const [sales, setSales] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSales = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
                console.warn("No token—redirecting to login");
                navigate("/");
                return;
            }
            try {
                const response = await axios.get("http://localhost:9090/sales-service/sales/getAll", {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setSales(response.data);
            }
            catch (error) {
                console.error("Error fetching sales:", error);
        }
    };
        fetchSales();
    }, [refersh]);
    
    let totalSales = sales.length;
    const totalSalesAmount = sales.reduce((sum, sale) => sum + sale.paidAmount, 0);

    const containerStyle = {
  maxWidth: '900px',
  margin: '40px auto',
  padding: '30px',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  color: '#222',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#222',
};

const summaryStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  fontWeight: '700',
  fontSize: '1.25rem',
  marginBottom: '30px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 12px',
  fontSize: '1rem',
  color: '#333',
};

const thStyle = {
  backgroundColor: '#00c8b3',
  color: 'white',
  padding: '12px',
  borderRadius: '12px 12px 0 0',
  fontWeight: '700',
};

const tdStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '12px',
  textAlign: 'center',
  borderBottom: 'none',
  fontWeight: '600',
};

const trHover = {
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const onRowHover = (e) => {
  e.currentTarget.style.backgroundColor = '#d0f0f9';
};

const onRowLeave = (e) => {
  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
};


 return (
  <div style={containerStyle}>
    <div style={headerStyle}>
      <h1>Sales Report</h1>
    </div>
    <div style={summaryStyle}>
      <div><strong>Total Sales:</strong> {totalSales}</div>
      <div><strong>Total Sales Amount:</strong> ₹{totalSalesAmount.toFixed(2)}</div>
    </div>

    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Sale ID</th>
          <th style={thStyle}>Doctor Name</th>
          <th style={thStyle}>Batch Id</th>
          <th style={thStyle}>Order Id</th>
          <th style={thStyle}>Quantity</th>
          <th style={thStyle}>Paid Amount</th>
          <th style={thStyle}>Sale Date</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale, index) => (
          <tr
            key={index}
            style={{ ...tdStyle, ...trHover }}
            onMouseEnter={onRowHover}
            onMouseLeave={onRowLeave}
          >
            <td style={{ ...tdStyle, fontWeight: 'normal' }}>{sale.id}</td>
            <td style={{ ...tdStyle, fontWeight: 'normal' }}>{sale.doctorName}</td>
            <td style={{ ...tdStyle, fontWeight: 'normal' }}>{sale.batchId}</td>
            <td style={{ ...tdStyle, fontWeight: 'normal' }}>{sale.orderId}</td>
            <td style={{ ...tdStyle, fontWeight: 'normal' }}>{sale.quantity}</td>
            <td style={{ ...tdStyle, fontWeight: 'bold', color: '#00796b' }}>₹{sale.paidAmount.toFixed(2)}</td>
            <td style={{ ...tdStyle, fontWeight: 'normal' }}>{new Date(sale.saleDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}

export default SalesReport
