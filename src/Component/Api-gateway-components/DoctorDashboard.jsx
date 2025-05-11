import React from 'react'
import DoctorNavBar from './DoctorNavBar';
import { Outlet } from 'react-router-dom';

const DoctorDashboard = () => {
  return (
    <div>
        <DoctorNavBar /><br/><br/>
      <h1 style={{textAlign: 'center', marginTop: '20px'}}>Doctor Dashboard</h1>
      <h2 style={{textAlign: 'center', color: "#4CAF50"}}>Welcome to Pharmacy Management System</h2>

      <Outlet />
    </div>
  )
}

export default DoctorDashboard;
