import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SuppliersList = () => {

    const navigate = useNavigate();
    const [foundSuppliers, setFoundSuppliers] = useState(false);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
                console.log("Token not found, redirecting to login page...");
                navigate("/");
                setFoundSuppliers(false);
                setSuppliers([]);
                return;
            }
            try {
                const response = await axios.get("http://localhost:9090/supplier-service/suppliers/listAll", {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setFoundSuppliers(true);
                setSuppliers(response.data);
                console.log("Suppliers fetched successfully:", response.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
                setFoundSuppliers(false);
                setSuppliers([]);
            }
        }
        fetchData();
    }, []);

  return (
    <div>{foundSuppliers ? 
      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '98%', margin: 'auto', textAlign: 'center' }}>
        <thead>
            <tr>
                <th>Supplier Id</th>
                <th>Supplier Name</th>
                <th>Supplier Email</th>
                <th>Batch ID</th>
                <th>Total Quantity Supplied</th>
                <th>Last Restocked on</th>
            </tr>
        </thead>
        <tbody>
            {suppliers.map((supplier, index) => (
                <tr key={index}>
                    <td>{supplier.id}</td>
                    <td>{supplier.supplierName}</td>
                    <td>{supplier.supplierEmail}</td>
                    <td>{supplier.batchId}</td>
                    <td>{supplier.totalQuantitySupplied}</td>
                    <td>{(supplier.lastRestockDate) !== null ? new Date(supplier.lastRestockDate).toLocaleDateString() : null}</td>
                </tr>
            ))}
        </tbody>
      </table>
        : <h2 style={{textAlign: 'center'}}>No Suppliers Found</h2>
        }
    </div>
  )
}

export default SuppliersList
