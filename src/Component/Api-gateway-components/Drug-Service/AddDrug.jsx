import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddDrug = () => {
    const [formData, setFormData] = useState({
        name: '',
        batchId: '',
        manufacturer: '',
        price: 0,
    });
    const navigate = useNavigate();
    const handleInput = e => {
        const { name, value } = e.target;
        setFormData(fd => ({ ...fd, [name]: value }));
    }

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
            alert(`Drug Added Successfully`);
            navigate("/drug-inventory/drugs");
        } catch (error) {
            console.error("Error adding drug:", error);
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Drug Name</label><br />
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInput}
          placeholder="Enter Drug Name"
          required
        /><br />

        <label>Batch ID</label><br />
        <input
          name="batchId"
          type="text"
          value={formData.batchId}
          onChange={handleInput}
          placeholder="Enter Batch ID"
          required
        /><br />

        <label>Manufacturer</label><br />
        <input
          name="manufacturer"
          type="text"
          value={formData.manufacturer}
          onChange={handleInput}
          placeholder="Enter Manufacturer"
          required
          /><br />

        <label>Price</label><br />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInput}
          placeholder="Enter Price"
          required
          /><br /> <br/>

          <button type="submit">Add Drug</button> <br/><br/>
        <button type="reset" onClick={() => setFormData({ name: '', batchId: '', manufacturer: '', price: 0 })}>Reset</button>
          </form>
    </div>
  )
}

export default AddDrug

