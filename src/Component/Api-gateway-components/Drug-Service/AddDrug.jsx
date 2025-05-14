import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddDrug.css'; // import CSS

const AddDrug = () => {
  const [formData, setFormData] = useState({
    name: '',
    batchId: '',
    manufacturer: '',
    price: 0,
  });

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token—redirecting to login");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9090/drug-service/drugs/add", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      alert("Drug Added Successfully");
      navigate("/drug-inventory/drugs");
    } catch (error) {
      console.error("Error adding drug:", error);
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const messages = Object.values(errorData);
        setErrors(messages);
      } else {
        setErrors(["An unexpected error occurred."]);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Add Drug</h2>

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Drug Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInput}
          placeholder="Enter Drug Name"
        />

        <label>Batch ID</label>
        <input
          name="batchId"
          type="text"
          value={formData.batchId}
          onChange={handleInput}
          placeholder="Enter Batch ID"
        />

        <label>Manufacturer</label>
        <input
          name="manufacturer"
          type="text"
          value={formData.manufacturer}
          onChange={handleInput}
          placeholder="Enter Manufacturer"
        />

        <label>Price</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInput}
          placeholder="Enter Price"
        />

        <button type="submit">Add Drug</button>
        <button
          type="reset"
          onClick={() => {
            setFormData({ name: '', batchId: '', manufacturer: '', price: 0 });
            setErrors([]);
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default AddDrug;
