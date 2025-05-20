import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    name: '',
    email: '',
    contact: ''
  });

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9090/auth-service/auth/register", formData);
      console.log(response.data);
      alert(`User Registered Successfully`);
      navigate("/");
    }
    catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // CSS Object
  const styles = {
  outerContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #d0f0ec, #c2e9fb)', // Soft green to blue
    fontFamily: 'Segoe UI, sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '420px',
    padding: '40px 30px',
    margin: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },
  button: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
  },
  primaryButton: {
    backgroundColor: '#007bff',
  },
  resetButton: {
    backgroundColor: '#6c757d',
  },
  loginButton: {
    backgroundColor: '#28a745',
  },
};


  return (
  <div style={styles.outerContainer}>
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" style={styles.label}>Username:</label>
        <input type='text' onChange={handleInput} id='username' name='username' required style={styles.input} />

        <label htmlFor="password" style={styles.label}>Password:</label>
        <input type='password' onChange={handleInput} id='password' name='password' required style={styles.input} />

        <label htmlFor="role" style={styles.label}>Role:</label>
        <select id='role' onChange={handleInput} name='role' required style={styles.input}>
          <option value="">-- Select Role --</option>
          <option value="ADMIN">ADMIN</option>
          <option value="DOCTOR">DOCTOR</option>
        </select>

        <label htmlFor="name" style={styles.label}>Name:</label>
        <input type='text' onChange={handleInput} id='name' name='name' required style={styles.input} />

        <label htmlFor="email" style={styles.label}>Email:</label>
        <input type='text' onChange={handleInput} id='email' name='email' required style={styles.input} />

        <label htmlFor="contact" style={styles.label}>Contact:</label>
        <input type='text' onChange={handleInput} id='contact' name='contact' required style={styles.input} />

        <button type='submit' style={{ ...styles.button, ...styles.primaryButton }}>Sign Up</button>
        <button type='reset' style={{ ...styles.button, ...styles.resetButton }}>Reset</button>
        <button type='button' onClick={() => navigate('/login')} style={{ ...styles.button, ...styles.loginButton }}>
          Already have an account? Login
        </button>
      </form>
    </div>
  </div>
);
};

export default SignUp;
