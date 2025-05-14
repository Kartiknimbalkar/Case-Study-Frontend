import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateDrug = () => {

    const [data, setData] = React.useState({
        name: "",
        batchId: "",
        manufacturer: "",
        price: 0,
        expiryDate: null
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((d) => ({ ...d, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token—redirecting to login")
            navigate("/login")
            return;
        }
        try {
            const response = await axios.put(`http://localhost:9090/drug-service/drugs/update/${data.batchId}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            toast.success(`Drug Updated Successfully`);
            // navigate("/drug-inventory/drugs");
        }
        catch (error) {
            console.error("Error updating drug:", error);
        }
    }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Update Drug</h1>
        <ToastContainer position='top-right' autoClose={2000} />

        <label style={styles.label} htmlFor="name">Drug Name</label>
        <input type="text" id="name" name="name" onChange={handleInput} placeholder="Enter Drug Name" required />

        <label style={styles.label} htmlFor="batchId">Batch ID</label>
        <input type="text" id="batchId" name="batchId" onChange={handleInput} placeholder="Enter Batch ID" required />

        <label style={styles.label} htmlFor="manufacturer">Manufacturer</label>
        <input type="text" id="manufacturer" name="manufacturer" onChange={handleInput} placeholder="Enter Manufacturer" required />

        <label style={styles.label} htmlFor="price">Price</label>
        <input type="number" id="price" name="price" onChange={handleInput} placeholder="Enter Price" required />

        <label style={styles.label} htmlFor='expiryDate'>Expiry Date</label>
        <input type="date" id="expiryDate" name="expiryDate" onChange={handleInput} placeholder="Enter Expiry Date" required />

        <button style={styles.button} type="submit">Update Drug</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
  },
  form: {
    background: '#fff',
    padding: '32px',
    borderRadius: '10px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
    color: '#273c75',
  },
  label: {
    fontWeight: 'bold',
    color: '#353b48',
  },
  input: {
    padding: '10px',
    border: '1px solid #dcdde1',
    borderRadius: '5px',
    fontSize: '15px',
  },
  button: {
    marginTop: '10px',
    background: '#00a8ff',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.2s',
  },
  error: {
    color: '#e84118',
    background: '#fbeee6',
    padding: '8px',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default UpdateDrug
