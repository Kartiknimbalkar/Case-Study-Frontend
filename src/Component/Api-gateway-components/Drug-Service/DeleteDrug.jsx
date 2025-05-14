import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './DeleteDrug.css'; // import CSS

const DeleteDrug = () => {

    const [id, setId] = useState('');
    const [deletedId, setDeleteId] = useState('');
    const navigate = useNavigate();

    const handleInput = (e) => {
        setId(e.target.value);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        setDeleteId(id);   
    };

    useEffect(() => {
        if (!deletedId) return;
        const deleteDrug = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("No token—redirecting to login")
                navigate("/login")
                return
            }
            try {
            const respone = await axios.delete(`http://localhost:9090/drug-service/drugs/delete/${deletedId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(respone.data);
            alert(`Drug Deleted Successfully ${respone.data}`);
            navigate("/drug-inventory/drugs");
            setId('');
            setDeleteId('');
        }
        catch (error) {
            console.error("Error deleting drug:", error);
            // alert("Error deleting drug:", error);
        }

    }
    deleteDrug();
}, [deletedId, navigate]);

  return (<div>
    <h1 style={{textAlign: 'center', color: '#343a40'}}>Delete Drug</h1>
    <form style={{padding: '20px', margin: 'auto', width: '300px', textAlign: 'center', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
      <label>Enter Drug Batch ID to be Deleted</label><br/>
      <input type='text' value={id} onChange={handleInput} placeholder='Enter Batch ID'></input>
      <br/><br/>
      <button type='submit' onClick={handleDelete}>Delete</button>
    </form>

    </div>
  )
}

export default DeleteDrug