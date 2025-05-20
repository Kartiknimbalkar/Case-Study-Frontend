import React from 'react';
import DoctorNavBar from './DoctorNavBar';
import { Outlet } from 'react-router-dom';
import './DoctorDashboard.css'; // Import the CSS here

const DoctorDashboard = () => {
  return (
    <div className="dashboard-container">
      <DoctorNavBar />
      <div className="dashboard-content">
        <div className="header">
          <h1 >Doctor Dashboard</h1>
          <h2 style={{textAlign: 'center'}}>Welcome to your workspace</h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorDashboard;
