import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Pharmacy Management System</h1>
        <h2>Admin Dashboard</h2>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate('/drug-inventory')}>Drug Inventory</div>
        <div className="dashboard-card" onClick={() => navigate('/supplier-inventory')}>Supplier Inventory</div>
        <div className="dashboard-card" onClick={() => navigate('/order-inventory')}>Order Service</div>
        <div className="dashboard-card" onClick={() => navigate('/sales-report')}>Sales Report</div>
        <div className="dashboard-card logout" onClick={() => navigate('/logout')}>Logout</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
