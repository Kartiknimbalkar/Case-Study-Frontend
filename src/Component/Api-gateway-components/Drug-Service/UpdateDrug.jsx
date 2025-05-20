import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const UpdateDrug = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [data, setData] = useState({
    batchId: "",
    name: "",
    manufacturer: "",
    price: "",
    expiryDate: null,
  });

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/drug-service/drugs/get/${id}`, {
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        const fetchedData = response.data;
        setData({
          ...fetchedData,
          expiryDate: fetchedData.expiryDate?.substring(0, 10) || null,
        });
      } catch (error) {
        toast.error("Failed to fetch drug data");
      } finally {
        setLoading(false);
      }
    };

    fetchDrug();
  }, [id]);

  const handleChange = (e) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.put(`http://localhost:9090/drug-service/drugs/update/${id}`, data, {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      });
      toast.success("Drug updated successfully");
      setTimeout(() => {
        navigate("/drug-inventory/drugs");
      }, 2000);
    } catch (error) {
      toast.error(`Update failed: ${error.response?.data?.message || "Server Error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={styles.loader}>Loading drug data...</div>;

  return (
    <div style={styles.container}>
      <ToastContainer autoClose={2000} position="bottom-center" />
      <h2>Update Drug</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label>Batch ID:</label>
          <input style={styles.input} value={data.batchId} name="batchId" readOnly />
        </div>

        <div style={styles.field}>
          <label>Name:</label>
          <input style={styles.input} value={data.name} name="name" onChange={handleChange} />
        </div>

        <div style={styles.field}>
          <label>Manufacturer:</label>
          <input style={styles.input} value={data.manufacturer} name="manufacturer" onChange={handleChange} />
        </div>

        <div style={styles.field}>
          <label>Price:</label>
          <input style={styles.input} type="number" value={data.price} name="price" onChange={handleChange} />
        </div>

        <div style={styles.field}>
          <label>Expiry Date:</label>
          <input style={styles.input} type="date" value={data.expiryDate} name="expiryDate" onChange={handleChange} />
        </div>

        <div style={styles.buttons}>
          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? "Updating..." : "Update"}
          </button>

          <button type="button" onClick={() => navigate(-1)} style={styles.backButton}>
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDrug;

// ==================== Inline Styles ====================
const styles = {
  container: {
    padding: "2rem",
    maxWidth: "500px",
    margin: "0 auto",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  field: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "1rem",
  },
  backButton: {
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loader: {
    textAlign: "center",
    marginTop: "3rem",
    fontSize: "1.2rem",
  },
};
