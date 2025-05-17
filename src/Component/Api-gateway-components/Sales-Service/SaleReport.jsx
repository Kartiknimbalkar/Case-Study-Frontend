import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SaleReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const downloadPdf = async () => {
    setError('');
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Redirecting to login...");
      setLoading(false);
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get("http://localhost:9090/sales-service/sales/report/download", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sales_report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Session expired. Redirecting to login...");
        navigate("/login");
      } else {
        setError("Failed to download the report. Please try again later.");
        console.error("Download error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '20px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ color: 'brown' }}>Sales Report</h1>
      <p>Click the button below to download the sales report.</p>
      <button
        onClick={downloadPdf}
        disabled={loading}
        aria-busy={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#aaa' : '#8B4513',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        {loading ? 'Downloading...' : 'Download Report'}
      </button>
      {error && <p role="alert" style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default SaleReport;
