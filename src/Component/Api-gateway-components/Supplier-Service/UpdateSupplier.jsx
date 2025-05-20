import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './UpdateSupplier.css'
// import 'react-toastify'

const UpdateSupplier = () => {

  const [formData, setFormData] = useState({
    supplierName: '',
    supplierEmail: '',
    batchId: ''
  });

  const navigate = useNavigate();
  const {id} = useParams();

  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormData(() => ({...formData, [name]: value}));
  };

  useEffect(() => {
    // Fetch existing supplier data if needed
    axios.get(`http://localhost:9090/supplier-service/suppliers/get/${id}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    })
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching supplier:', err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if(!token) {
      console.warn("No token found, redirecting to the login page");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:9090/supplier-service/suppliers/update/${id}`, formData, {
        headers: {Authorization: `Bearer ${token}`}
      })
      console.log(response);
      toast.success(`Supplier Updated Successfully\nRedirecting back to the list`);
      setTimeout(() => (navigate(-1)), 3000);
    } catch (error) {
      console.error(error);
      toast.error(`Supplier Not Updated, something went wrong`);
    }
  };

  return (
  <div className="update-supplier-container">
    <ToastContainer autoClose={3000} position='bottom-center' />
    <h2>Update Supplier with ID: {`${id}`}</h2>
    <form className="update-supplier-form" onSubmit={handleSubmit}>
      <label>Supplier Name</label>
      <input
        type='text'
        onChange={handleInput}
        name='supplierName'
        value={formData.supplierName}
        placeholder='Enter name'
        
      />

      <label>Supplier Email</label>
      <input
        type='email'
        onChange={handleInput}
        name='supplierEmail'
        value={formData.supplierEmail}
        placeholder='Enter email'
        
      />

      <label>Batch ID</label>
      <input
        type='text'
        onChange={handleInput}
        name='batchId'
        value={formData.batchId}
        placeholder='Enter batch ID'
        
      />

      <button type='submit'>Update Supplier</button>
    </form>
  </div>
);

}

export default UpdateSupplier
