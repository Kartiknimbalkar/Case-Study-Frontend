import React from 'react'
import { Link } from 'react-router-dom'

const DoctorNavBar = () => {
  return (
    <div>
      <nav className='navbar'>
        <Link to="/doctor-dashboard/drug-list-dc" style={{textDecoration: 'none', color: 'skyblue', margin: '0 10px'}}>List Drugs</Link>
        <Link to="/doctor-dashboard/orderpay" style={{textDecoration: 'none', color: 'skyblue', margin: '0 10px'}}>Place Order</Link>
        <Link to="/doctor-dashboard/order-list-dc" style={{textDecoration: 'none', color: 'skyblue', margin: '0 10px'}}>List Orders</Link>
        <Link to="/doctor-dashboard/drug-id" style={{textDecoration: 'none', color: 'skyblue', margin: '0 10px'}}>Get Drug by Id</Link>
        <Link to="/logout" style={{textDecoration: 'none', color: 'skyblue', margin: '0 10px'}}>Logout</Link>
      </nav>
    </div>
  )
}

export default DoctorNavBar
