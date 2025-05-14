import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:9090/auth-service/auth/login", {
        username,
        password
      });

      const token = response.data;
      localStorage.setItem("token", token);
      console.log("Token stored:", token);

      const role = jwtDecode(token).role;    //extracting the role from the token
      localStorage.setItem("role", role);
      console.log("Decoded Role:", role);

      if (response.status === 200 && role === "ADMIN") {
        toast.success("Login successful");
        setTimeout(() => navigate("/admin-dashboard"), 2000);
      } else if (response.status === 200 && role === "DOCTOR") {
        toast.success("Login successful");
        setTimeout(() => navigate("/doctor-dashboard"), 2000);
      } else {
        setErrorMessage("Invalid credentials or insufficient permissions.");
      }

    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
              <ToastContainer position='top-right' autoClose={3000}/>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Login</h1>

        <label htmlFor="username" style={styles.label}>Username</label>
        <input type="text" id="username" name="username" placeholder="Enter username" style={styles.input} required />

        <label htmlFor="password" style={styles.label}>Password</label>
        <input type="password" id="password" name="password" placeholder="Enter password" style={styles.input} required />

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <div style={styles.buttonGroup}>
          <input type="submit" value="Login" style={styles.loginButton} />
          <input type="reset" value="Reset" style={styles.resetButton} />
        </div>


        <p style={styles.signupPrompt}>
          Don't have an account? <span onClick={() => navigate('/signup')} style={styles.signupLink}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'color-gradient(135deg , #00a8ff, #9c88ff)',
  },
  form: {
    background: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#2f3640',
  },
  label: {
    marginBottom: '5px',
    fontWeight: '600',
    color: '#353b48',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #dcdde1',
    borderRadius: '5px',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  loginButton: {
    backgroundColor: '#00a8ff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#e84118',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  signupPrompt: {
    marginTop: '20px',
    fontSize: '14px',
    textAlign: 'center',
    color: '#718093',
  },
  signupLink: {
    color: '#0097e6',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '-10px',
    marginBottom: '10px',
  }
};

export default Login;
