import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RestockDrugs = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        batchId: "",
        quantity: "",
        expiryDate: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((d) => ({...d, [name]: value}));
    }

    const restock = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!token) {
            console.warn("No token—redirecting to login")
            navigate("/login")
            return;
        }
        try {
            const response = await axios.post("http://localhost:9090/supplier-service/suppliers/restock", data, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response.data);
            alert(`Drugs Restocked Successfully`);
            navigate("/supplier-inventory/suppliers");
        }
        catch (error) {
            console.error("Error restocking drugs:", error);
        }
    }

  return (
    <div>
      <form>
        <h1>Restock Drugs</h1>
        <div>
          <label htmlFor="batchId">Batch ID:</label><br/>
          <input type="text" onChange={handleInput} id="batchId" name="batchId" required /><br/><br/>
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label><br/> 
          <input type="number" onChange={handleInput} id="quantity" name="quantity" required /><br/><br/>
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date:</label><br/> 
          <input type="text" onChange={handleInput} id="expiryDate" name="expiryDate" required /><br/><br/>
        </div>
        <button type="submit" onClick={restock}>Restock</button><br/><br/>
        <button type="reset">Reset</button><br/><br/>
      </form>
    </div>
  )
}

export default RestockDrugs
