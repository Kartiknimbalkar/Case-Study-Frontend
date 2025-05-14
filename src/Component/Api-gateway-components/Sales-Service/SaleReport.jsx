import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SaleReport = () => {
  const navigate = useNavigate();

  const downloadPdf = async () => {
    const token = localStorage.getItem("token");
    if(!token) {
      console.error("No token found");
      navigate("/login");
      return;
    }
    try {
      const respone = await axios.get("http://localhost:9090/sales-service/sales/report/download", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Important for handling binary data
      });
      const blob = new Blob([respone.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf'); // Specify the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the URL object
    }
    catch (error) {
      console.error("Error downloading PDF:", error);
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - redirecting to login");
        navigate("/login");
      } else {
        console.error("An error occurred while downloading the report");
      }
  }
}

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '100px', marginRight: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: 'brown' }}>Sales Report</h1>
      <p>Click the button below to download the sales report.</p>
      <button onClick={downloadPdf}>Download Report</button>
    </div>
  )
}

export default SaleReport
