import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './SupplierList.css';
import { toast, ToastContainer } from 'react-toastify';

const SuppliersList = () => {

    const navigate = useNavigate();
    const [foundSuppliers, setFoundSuppliers] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Token not found, redirecting to login page...");
                navigate("/");
                setFoundSuppliers(false);
                setSuppliers([]);
                return;
            }
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:9090/supplier-service/suppliers/listAll", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLoading(false);
                setFoundSuppliers(true);
                setSuppliers(response.data);
                console.log("Suppliers fetched successfully:", response.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
                setLoading(false);
                setFoundSuppliers(false);
                setSuppliers([]);
            }
        };
        fetchData();
    }, [refresh]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if(!token) {
            navigate("/login");
        }
        const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
        if (!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:9090/supplier-service/suppliers/delete/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(`Supplier with ID ${id} Deleted Successfully...`);
            setRefresh(prev => !prev);
            toast.success(`Supplier with ID ${id} Deleted Successfully...`);
        } 
        catch (error) {
            console.error(`Something went wrong...`);
            toast.error(`Failed to delete the supplier`);
        }
    }

    return (
        <>
            <ToastContainer autoClose={2000} position='bottom-center' />
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registered Suppliers</h2>
            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading suppliers...</p>
            ) : (
                foundSuppliers ? (
                    <div className="supplier-grid">
                        {suppliers.map((supp, index) => (
                            <div className="supplier-card" key={index}>
                                <p><strong>Supplier ID:</strong> {supp.id}</p>
                                <p><strong>Supplier Name:</strong> {supp.supplierName}</p>
                                <p><strong>Supplier Email:</strong> {supp.supplierEmail}</p>
                                <p><strong>Batch ID:</strong> {supp.batchId}</p>
                                <p><strong>Total Quantity Supplied:</strong> {supp.totalQuantitySupplied}</p>
                                <p><strong>Last Restocked:</strong> {supp.lastRestockDate ? new Date(supp.lastRestockDate).toLocaleDateString() : "Not Yet"}</p>
                                <div className="supplier-actions">
  <NavLink className="btn edit-btn" to={`/supplier-service/suppliers/update/${supp.id}`}>
    Edit
  </NavLink>
  <button className="btn delete-btn" onClick={() => handleDelete(supp.id)}>
    Delete
  </button>
</div>
</div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', color: '#777', marginTop: '50px' }}>
                        <h3>No Suppliers Found</h3>
                        <p>Suppliers will appear here once they are registered in the system.</p>
                    </div>
                )
            )}
        </>
    );
};

export default SuppliersList;
