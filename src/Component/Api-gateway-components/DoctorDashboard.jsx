import React from 'react';
import DoctorNavBar from './DoctorNavBar';
import { Outlet } from 'react-router-dom';
import './DoctorDashboard.css'; // import CSS

const DoctorDashboard = () => {
  return (
    <div className="dashboard-container">
      <DoctorNavBar />
      <div className="header">
        <h1>Doctor Dashboard</h1>
        <h2>Welcome to Pharmacy Management System</h2>
      </div>
      <Outlet />
    </div>
  );
};

export default DoctorDashboard;
