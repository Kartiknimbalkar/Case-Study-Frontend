import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
  return (
    <div style={{textAlign: 'center', marginTop: '20px'}}>
        <h1>Welcome to Pharmacy Management System</h1>
        <h2>Admin Dashboard</h2><br/><br/>
        <button onClick={() => navigate('/drug-inventory')}>Drug Inventory</button><br/><br/>
        <button onClick={() => navigate('/supplier-inventory')}>Supplier Inventory</button><br/><br/>
        <button onClick={() => navigate('/order-inventory')}>Order Service</button><br/><br/>
        <button onClick={() => navigate('/sales-report')}>Sales Report</button><br/><br/>
        <button onClick={() => navigate('/logout')}>Logout</button><br/><br/>

    </div>
  )
}

export default AdminDashboard;
