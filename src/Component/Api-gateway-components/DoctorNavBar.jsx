import React from 'react';
import { NavLink } from 'react-router-dom';
import './DoctorNavbar.css';

const DoctorNavBar = () => {
  return (
    <nav className="doctor-navbar">
      <NavLink to="/doctor-dashboard/drug-list-dc" className="nav-link">
        List Drugs
      </NavLink>
      <NavLink to="/doctor-dashboard/orderpay" className="nav-link">
        Place Order
      </NavLink>
      <NavLink to="/doctor-dashboard/order-list-dc" className="nav-link">
        List Orders
      </NavLink>
      <NavLink to="/doctor-dashboard/drug-id" className="nav-link">
        Get Drug by Id
      </NavLink>
      <NavLink to="/doctor-dashboard/user-profile" className="nav-link">
        User Profile
      </NavLink>
      <NavLink to="/logout" className="nav-link logout-link">
        Logout
      </NavLink>
    </nav>
  );
};

export default DoctorNavBar;
