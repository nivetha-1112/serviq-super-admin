import React, { useState } from 'react';

export default function Users() {
  const [activeTab, setActiveTab] = useState('users-list');
  
  const [usersList] = useState([
    { id: 'ADM-01', name: 'Rajesh Kumar', email: 'rajesh@serviq.com', phone: '+91 98765 43210', restaurant: 'Serviq Grand Bistro', role: 'BRANCH ADMIN', status: 'Active', lastLogin: '2026-06-02 12:45 PM' },
    { id: 'ADM-02', name: 'Amit Patel', email: 'amit@serviq.com', phone: '+91 98765 11111', restaurant: 'Serviq Express Cafe', role: 'BRANCH MANAGER', status: 'Active', lastLogin: '2026-06-02 11:30 AM' },
    { id: 'ADM-03', name: 'Vikram Singh', email: 'vikram@serviq.com', phone: '+91 98765 22222', restaurant: 'Serviq Lounge & Bar', role: 'BRANCH ADMIN', status: 'Disabled', lastLogin: '2026-05-30 09:15 PM' }
  ]);

  const renderUsersList = () => (

    <section className="panel-view active" style={{ padding: 0 }}>
      <div className="admin-card-container">
        <div className="admin-inner-header" style={{ marginBottom: '20px' }}>
          <h3 className="admin-inner-title" style={{ fontSize: '15px' }}>Users List</h3>
          <button className="btn" style={{ background: '#000', color: '#fff', borderRadius: '8px', padding: '10px 20px', fontWeight: 600 }} onClick={() => setActiveTab('users-add')}>
            + Create User
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>S.NO.</th>
                <th>USER ID</th>
                <th>FULL NAME</th>
                <th>EMAIL ADDRESS</th>
                <th>PHONE NUMBER</th>
                <th>ACCESS ROLE</th>
                <th>ACCOUNT STATUS</th>
                <th>LAST LOGIN</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td>{u.id}</td>
                  <td style={{ fontWeight: 700 }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td><span className="role-pill-grey">{u.role}</span></td>
                  <td><span className={u.status === 'Active' ? 'status-pill-active' : 'status-pill-disabled'}>{u.status}</span></td>
                  <td style={{ color: 'var(--text-muted)' }}>{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );\n  const renderAddUser = () => (
    <section className="panel-view active" style={{ padding: 0 }}>
      <div className="admin-card-container">
        <div className="admin-inner-header" style={{ marginBottom: '24px' }}>
          <h3 className="admin-inner-title" style={{ fontSize: '18px' }}>Create New Restaurant User</h3>
          <button className="btn btn-outline" style={{ borderRadius: '8px' }} onClick={() => setActiveTab('users-list')}>Back to Users</button>
        </div>

        <div className="admin-form-group" style={{ marginBottom: '20px' }}>
          <label className="admin-form-label">Full Name <span className="req">*</span></label>
          <input type="text" className="admin-input" placeholder="e.g. Ramesh Kumar" />
        </div>
        <div className="admin-form-group" style={{ marginBottom: '20px' }}>
          <label className="admin-form-label">Email Address <span className="req">*</span></label>
          <input type="email" className="admin-input" placeholder="e.g. ramesh@serviq.com" />
        </div>
        <div className="admin-form-group" style={{ marginBottom: '20px' }}>
          <label className="admin-form-label">Phone Number <span className="req">*</span></label>
          <input type="tel" className="admin-input" placeholder="e.g. +91 98765 43210" />
        </div>
        <div className="admin-form-group" style={{ marginBottom: '20px' }}>
          <label className="admin-form-label">Access Role <span className="req">*</span></label>
          <select className="admin-input">
            <option>Branch Admin</option>
            <option>Branch Manager</option>
            <option>Cashier</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Account Status <span className="req">*</span></label>
            <select className="admin-input">
              <option>Active</option>
              <option>Disabled</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Security Password</label>
            <input type="text" className="admin-input" placeholder="Default: Serviq@123" />
          </div>
        </div>

        <div className="admin-form-footer">
          <button className="btn btn-outline" style={{ borderRadius: '8px', padding: '10px 24px' }} onClick={() => setActiveTab('users-list')}>Cancel</button>
          <button className="btn" style={{ background: '#000', color: '#fff', borderRadius: '8px', padding: '10px 24px', fontWeight: 600 }}>Create Account</button>
        </div>
      </div>
    </section>
  );
  return (
    <>
      {activeTab === 'users-list' && renderUsersList()}
      {activeTab === 'users-add' && renderAddUser()}
    </>
  );
}
