import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddSupplier.css';

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    supplierName: '',
    supplierEmail: '',
    batchId: '',
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token—redirecting to login');
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:9090/supplier-service/suppliers/add',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      alert(`Supplier Added Successfully`);
      setFormData({ supplierName: '', supplierEmail: '', batchId: '' });
      navigate('/supplier-inventory/suppliers');
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <div>
      <form className="add-supplier-form" onSubmit={handleSubmit}>
        <h1>Add a Supplier</h1>

        <label>Supplier Name</label>
        <input
          name="supplierName"
          type="text"
          value={formData.supplierName}
          onChange={handleInput}
          placeholder="Enter Supplier Name"
          required
        />

        <label>Supplier Email</label>
        <input
          name="supplierEmail"
          type="email"
          value={formData.supplierEmail}
          onChange={handleInput}
          placeholder="Enter Supplier Email"
          required
        />

        <label>Batch ID</label>
        <input
          name="batchId"
          type="text"
          value={formData.batchId}
          onChange={handleInput}
          placeholder="Enter Batch ID"
          required
        />

        <button type="submit">Add Supplier</button>
        <button type="reset" onClick={() => setFormData({ supplierName: '', supplierEmail: '', batchId: '' })}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default AddSupplier;
