import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SalesReport = ({refersh}) => {

    const [sales, setSales] = React.useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get("http://localhost:9090/sales-service/sales/getAll")
    //         .then(da => setSales(da.data))
    //         .catch(err => console.log(err));
    // }, []);

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

  return (
    <div>
           {/* <li key={index}>{sale.doctorName} || {sale.id} || {sale.batchId} || {sale.quantity} || ₹{sale.totalPrice} || {sale.saleDate}</li> */}

           <div style={{ marginBottom: '1rem', textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#333', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '20px', padding: '20px' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>Sales Report</h1>
            <p><strong>Total Sales:</strong> {totalSales}</p>
            <p><strong>Total Sales Amount:</strong> ₹{totalSalesAmount}</p>
          </div>

          <table border="1" cellPadding="5" cellSpacing="0" style={{width: '100%', margin: 'auto', textAlign: 'center', marginBottom: '30px', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif', color: '#333', fontSize: '1rem', fontWeight: 'bold', padding: '10px', marginTop: '20px', border: '1px solid #ccc', borderSpacing: '0'}}>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Batch Id</th>
                <th>Order Id</th>
                <th>Quantity</th>
                <th>Paid Amount</th>
                {/* <th>Balance</th> */}
                <th>Sale Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => {
                return(
                  <tr key={index}>
                    <td>{sale.doctorName}</td>
                    <td>{sale.batchId}</td>
                    <td>{sale.orderId}</td>
                    <td>{sale.quantity}</td>
                    <td>₹{sale.paidAmount}</td>
                    {/* <td>₹{sale.balance}</td> */}
                    <td>{sale.saleDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
    </div>
  )
}

export default SalesReport
