import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddSupplier = () => {

    const [formData, setFormData] = useState({
        supplierName: '',
        supplierEmail: '',
        batchId: '',
    });
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const handleInput = e => {
        const {name, value} = e.target;
        setFormData(fd => ({...fd, [name]: value}))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!token) {
            console.warn("No token—redirecting to login")
            navigate("/login")
            return;
        }
        try {
            const response = await axios.post("http://localhost:9090/supplier-service/suppliers/add", formData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response.data);
            setFormData({
              supplierName: '',
              supplierEmail: '',
              batchId: '',
          });
            alert(`Supplier Added Successfully`);
            navigate("/supplier-inventory/suppliers");
        }
        catch (error) {
            console.error("Error adding supplier:", error);
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Supplier Name</label><br/>
        <input name='supplierName' type='text' value={formData.supplierName} onChange={handleInput} placeholder='Enter Supplier Name' required/><br/>
        <br/>
        <label>Supplier Email</label><br/>
        <input name='supplierEmail' type='email' value={formData.supplierEmail} onChange={handleInput} placeholder='Enter Supplier Email' required/><br/>
        <br/>
        <label>Batch ID</label><br/>
        <input name='batchId' type='text' value={formData.batchId} onChange={handleInput} placeholder='Enter Batch ID' required/><br/>
        <br/>
        <button type='submit'>Add Supplier</button><br/><br/>
        <button type='reset' onClick={() => setFormData({ supplierName: '', supplierEmail: '', batchId: '' })}>Reset</button>
      </form>
    </div>
  )
}

export default AddSupplier
