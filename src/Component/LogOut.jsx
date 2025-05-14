import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage on mount
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Show toast on logout
    toast.success("Logged Out Successfully");
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 style={{ marginTop: '40px' }}>Logged Out Successfully !!!</h1>
      <button
        style={{ marginTop: '40px', padding: '10px 20px', borderRadius: '6px', backgroundColor: '#00c8b3', color: 'white', border: 'none' }}
        onClick={() => navigate("/")}
      >
        Click here to go back to Home Page
      </button>
    </div>
  );
};

export default LogOut;
