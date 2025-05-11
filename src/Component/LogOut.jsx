import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogOut = () => {
  const navigate = useNavigate();

  return (
    <div>
      {localStorage.removeItem("token")}
      <h1>Logged Out Successfully !!!</h1>
      {/* <h2>Redirecting to Login Page...</h2> */}
      <button onClick={() => navigate("/")}>Click here to go back to Login Page</button>
    </div>
  )
}

export default LogOut
