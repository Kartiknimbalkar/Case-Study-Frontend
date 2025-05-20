import React, { useState } from "react";
import './UserUpdateForm.css';

export default function UserUpdateForm() {
  const [username, setUsername] = useState('');
  const [formData, setFormData] = useState({ password: '', role: '', name: '', email: '', contact: '' });
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:9090/auth-service/auth/auth/users/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Update failed");

      setMessage("User updated successfully.");
    } catch (err) {
      setMessage("Error updating user.");
    }
  };

  return (
    <div className="user-update-form">
      <h3>Update User</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="New Password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
      /><br />

      <select
        value={formData.role}
        onChange={e => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="">Select Role</option>
        <option value="ADMIN">ADMIN</option>
        <option value="DOCTOR">DOCTOR</option>
      </select><br />

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      /><br />

      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      /><br />

      <input
        type="text"
        placeholder="Contact"
        value={formData.contact}
        onChange={e => setFormData({ ...formData, contact: e.target.value })}
      /><br />

      <button onClick={handleUpdate}>Update</button>
      {message && <p>{message}</p>}
    </div>
  );
}
