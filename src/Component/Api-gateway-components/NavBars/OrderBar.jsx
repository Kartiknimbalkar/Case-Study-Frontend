import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const OrderBar = () => {

  const styling = {
        textDecoration: 'none',
        color: 'skyblue',
        margin: '0 10px',
    };

  return (
    <div>
      <nav className='navbar'>
        <NavLink to="/admin-dashboard" style={styling}>Home</NavLink>
        <Link to="/order-inventory/orders">Orders</Link>
        <Link to="/order-inventory/add-order">Place Order</Link>
        <Link to="/order-inventory/verify-order">Verify Order</Link>
        <Link to="/order-inventory/pickup-order">PickUp Order</Link>
        <Link to="/order-inventory/pickedup-orders">Pickedup Orders</Link>
        <Link to="/order-inventory/order-by-id">Order By ID</Link>
      </nav>

      <Outlet />
    </div>
  )
}

export default OrderBar
