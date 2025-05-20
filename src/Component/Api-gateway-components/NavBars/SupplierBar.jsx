import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const SupplierBar = () => {

  const styling = {
        textDecoration: 'none',
        color: 'skyblue',
        margin: '0 10px',
    };

  return (
    <div>
      <nav className='navbar'>
        <NavLink to="/admin-dashboard" style={styling}>Home</NavLink>
        <Link to="/supplier-inventory/suppliers">Suppliers</Link>
        <Link to="/supplier-inventory/add-supplier">Add Supplier</Link>
        <Link to="/supplier-inventory/restock-drugs">Restock Drugs</Link>
        {/* <Link to="/supplier-inventory/update-suppliers">Update Supplier</Link> */}
        {/* <Link to="/supplier-inventory/delete-supplier">Delete Supplier</Link> */}
        <Link to="/supplier-inventory/history-supplier">Restock History</Link>
      </nav>

      <Outlet />
    </div>
  )
}

export default SupplierBar
