import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const DeleteDrug = () => {

    const [id, setId] = useState('');
    const [deletedId, setDeleteId] = useState('');
    const navigate = useNavigate();

    const handleInput = (e) => {
        setId(e.target.value);
    };

    const handleDelete = () => {
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

  return (
    <div>
      <label>Enter Drug Batch ID to be Deleted</label><br/>
      <input type='text' value={id} onChange={handleInput} placeholder='Enter Batch ID'></input>
      <br/><br/>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default DeleteDrug