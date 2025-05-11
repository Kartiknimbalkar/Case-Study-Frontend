import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const DrugsBar = () => {

    const styling = {
        textDecoration: 'none',
        color: 'skyblue',
        margin: '0 10px',
    };

  return (
    <>
    <nav className='navbar'>
        <NavLink to="/admin-dashboard" style={styling}>Home</NavLink>
        <NavLink to="/drug-inventory/drug-add" style={styling}>Add Drug</NavLink>
        <NavLink to="/drug-inventory/drug-delete" style={styling}>Delete Drug</NavLink>
        <NavLink to="/drug-inventory/drug-id" style={styling}>Get Drug by Id</NavLink>
        <NavLink to="/drug-inventory/drugs" style={styling}>List Drugs</NavLink>
    </nav>
    <hr/>

    <div style={{ marginTop: '20px', padding: '10px' }}>
        <Outlet />
      </div>
      <br/>
    </>
  );
}

export default DrugsBar;
