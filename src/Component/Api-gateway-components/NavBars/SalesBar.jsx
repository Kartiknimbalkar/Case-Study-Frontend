import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const SalesBar = () => {
  return (
    <div>
      <nav className='navbar'>
        <Link to="/admin-dashboard">Home</Link>
        <Link to="/sales-report/sales">Sales</Link>
        <Link to="/sales-report/sales-history">Sales History</Link>
        <Link to="/sales-report/download-report">Download Report</Link>
      </nav>
        <hr />
        <Outlet />
    </div>
  )
}

export default SalesBar
