import React from 'react';
import DoctorNavBar from './DoctorNavBar';
import { Outlet } from 'react-router-dom';
import './DoctorDashboard.css'; // import CSS

const DoctorDashboard = () => {
  return (
    <div>
      <DoctorNavBar />
      <Outlet />
    </div>
  );
};

export default DoctorDashboard;
