import React, { useState } from 'react';
import UserProfile from './UserProfile';
import UserByName from './UserByName';
import UpdateUserForm from './UserUpdateForm'; // a new form component
import './AdminUserSection.css';
import { useNavigate } from 'react-router-dom';

export default function AdminUserSection() {
  const [view, setView] = useState('profile'); // 'profile' | 'search' | 'update'

  const navigate = useNavigate();

  return (
    <div className="admin-user-section">
      <h2>User Management</h2>

      <div className="tabs">
        <button style={{backgroundColor: 'green'}} onClick={() => navigate('/admin-dashboard')}>Dashboard</button>
        <button onClick={() => setView('profile')}>My Profile</button>
        <button onClick={() => setView('search')}>Search User</button>
        <button onClick={() => setView('update')}>Update User</button>
      </div>

      <div className="view-content">
        {view === 'profile' && <UserProfile />}
        
        {view === 'search' && <UserByName />}

        {view === 'update' && (
          <UpdateUserForm />
        )}
      </div>
    </div>
  );
}
