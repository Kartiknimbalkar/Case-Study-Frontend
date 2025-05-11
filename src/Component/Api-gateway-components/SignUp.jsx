import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
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
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    button: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    resetButton: {
      ...this?.button,
      backgroundColor: '#6c757d'
    },
    loginButton: {
      ...this?.button,
      backgroundColor: '#28a745'
    }
  };

  return (
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
        
        <button type='submit' style={styles.button}>Sign Up</button>
        <button type='reset' style={styles.resetButton}>Reset</button>
        <button type='button' onClick={() => navigate('/login')} style={styles.loginButton}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
