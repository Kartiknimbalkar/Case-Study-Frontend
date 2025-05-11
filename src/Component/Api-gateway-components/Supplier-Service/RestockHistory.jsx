import axios from 'axios';
import React, { useState } from 'react'

const RestockHistory = () => {

    const [batchId, setBatchId] = useState("");
    const [restockHistory, setRestockHistory] = useState([]);

    const handleInput = (e) => {
        setBatchId(e.target.value);
    }

    const fetchDetails = async () => {
        const token = localStorage.getItem("token");
        if(!token) {
            console.warn("No token—redirecting to login")
            navigate("/")
            return;
        }
        try {
            const response = await axios.get(`http://localhost:9090/supplier-service/suppliers/history/${batchId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setRestockHistory(response.data);
            console.log("Restock History fetched successfully:", response.data);
        }
        catch (error) {
            console.error("Error fetching restock history:", error);
            setRestockHistory([]);
        }
    }

  return (
    <div>
      <label htmlFor="restock-history">Restock History</label>
      <br/>
        <input type="text" id="restock-history" onChange={handleInput} placeholder="Enter Batch ID" />
        <br/><br/>
        <button type="button" onClick={fetchDetails}>Search</button>
        <br/><br/>
        {restockHistory.length > 0 ? (
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Quantity</th>
                        <th>Restock Date</th>
                    </tr>
                </thead>
                <tbody>
                    {restockHistory.map((history, index) => (
                        <tr key={index}>
                            <td>{history.supplierName}</td>
                            <td>{history.quantity}</td>
                            <td>{history.restockDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No restock history found for the given Batch ID.</p>
        )}
    </div>
  )
}

export default RestockHistory
