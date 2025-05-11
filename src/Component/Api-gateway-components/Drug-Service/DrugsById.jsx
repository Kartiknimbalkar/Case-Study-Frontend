import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DrugsById = ({refresh}) => {
  const [searchId, setSearchId] = useState('');
  const [data, setData] = useState(null);
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e) => {
    setId(e.target.value);
  }

  const handleSearch = () => {
    setSearchId(id);
    setHasSearched(true);
  };

  useEffect(() => {
    const fetchDrugs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token—redirecting to login")
        navigate("/login")
        return
      }
      if(!searchId) {
        console.warn("No ID provided—redirecting in the input to login")
        // navigate("/login")
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:9090/drug-service/drugs/get/${searchId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        setData(response.data);
        console.log("Data fetched successfully:", response.data);
        }
    catch (error) {
        console.error("Error fetching drugs:", error);
        setData(null);
      }
  };
  
  fetchDrugs()
}, [searchId, refresh]);

  return (
    <div>
      <h1>Find Drugs By ID</h1>
      <br/><br/>
      {/* <label>Enter Drug Batch ID</label><br/> */}
      <input type='text' value={id} onChange={handleChange} placeholder='Enter Batch ID'></input>
      <br/><br/>
      <button onClick={handleSearch}>Search</button>
      <br/><br/>
     {
      hasSearched ? ( data ? (
        <div>
          <h2>Drug Details</h2>
          <p><strong>BATCH ID: </strong> {data.batchId} </p>
          <p><strong>Drug Name: </strong> {data.name} </p>
          <p><strong>Manufacturer: </strong> {data.manufacturer} </p>
          <p><strong>Price: </strong> {data.price} </p>
          <p><strong>Quantity: </strong> {data.quantity} </p>
          <p><strong>Expiry Date: </strong> {data.expiryDate} </p>
        </div>
      ) : 
      (
        <div>
          <h2>No Data Found</h2>
          <p>Please check the ID and try again.</p>
        </div>
      )
     ) : (
        <div>
          <h2>Search for a Drug</h2>
          <p>Enter a batch ID to find drug details.</p>
        </div>
      )
     }
     {
      data && (
        <button onClick={() => setData(null)}>Clear</button>
     )
      }
    </div>
  )
}

export default DrugsById
