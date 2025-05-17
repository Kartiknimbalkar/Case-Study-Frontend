import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteDrug.css';

const DeleteDrug = () => {
  const [id, setId] = useState('');
  const [deletedId, setDeletedId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setId(e.target.value.trim());
    setError('');
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (!id) {
      setError("Please enter a valid Batch ID.");
      return;
    }
    setDeletedId(id);
  };

  useEffect(() => {
    if (!deletedId) return;

    const deleteDrug = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.delete(
          `http://localhost:9090/drug-service/drugs/delete/${deletedId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(`Drug deleted successfully: ${response.data}`);
        setId('');
        setDeletedId('');
        navigate("/drug-inventory/drugs");
      } catch (error) {
        console.error("Error deleting drug:", error);
        setError(
          error.response?.data?.message || "Failed to delete drug. Please try again."
        );
        setDeletedId('');
      } finally {
        setLoading(false);
      }
    };

    deleteDrug();
  }, [deletedId, navigate]);

  return (
    <div className="delete-drug-container">
      <h1 style={{margin: '20px'}}>Delete Drug</h1>
      <form className="delete-drug-form" onSubmit={handleDelete}>
        <label htmlFor="batchId" style={{margin: '20px'}}>Enter Drug Batch ID to be Deleted</label>
        <input
          id="batchId"
          type="text"
          value={id}
          onChange={handleInput}
          placeholder="Enter Batch ID"
          disabled={loading}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </form>
    </div>
  );
};

export default DeleteDrug;
