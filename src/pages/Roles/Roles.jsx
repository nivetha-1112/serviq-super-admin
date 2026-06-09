import React, { useState } from 'react';
import { IconBtn } from '../../components/IconBtn';

export default function Roles() {
  const [activeTab, setActiveTab] = useState('roles');
  
  const [rolesList] = useState([
    { id: 1, name: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Branch Admin', status: 'Active' },
    { id: 3, name: 'Branch Manager', status: 'Active' },
    { id: 4, name: 'Cashier', status: 'Active' },
    { id: 5, name: 'Waiter', status: 'Active' },
    { id: 6, name: 'Kitchen Staff', status: 'Active' }
  ]);

  const renderRoles = () => (

    <section className="panel-view active" style={{ padding: 0 }}>
      <div className="admin-card-container">
        <div className="admin-inner-header" style={{ marginBottom: '20px' }}>
          <h3 className="admin-inner-title" style={{ fontSize: '15px' }}>Roles & Permissions</h3>
          <button className="btn" style={{ background: '#000', color: '#fff', borderRadius: '8px', padding: '10px 20px', fontWeight: 600 }} onClick={() => setActiveTab('roles-add')}>
            + Add Role
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>ROLE NAME</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {rolesList.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td><span className="status-pill-active">{r.status}</span></td>
                  <td style={{ textAlign: 'right', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <IconBtn icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>} style={{ border: 'none', background: 'transparent' }} />
                    <IconBtn icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>} style={{ border: 'none', background: 'transparent' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  const renderAddRole = () => {
    const modulesList = ['Dashboard', 'Incoming Orders', 'Menu Management', 'Billing', 'Tables', 'Staff', 'Users', 'Settings'];
    return (
      <section className="panel-view active" style={{ padding: 0 }}>
        <div className="admin-card-container">
          <div className="admin-inner-header" style={{ marginBottom: '24px' }}>
            <h3 className="admin-inner-title" style={{ fontSize: '18px' }}>Add New Role</h3>
            <button className="btn btn-outline" style={{ borderRadius: '8px' }} onClick={() => setActiveTab('roles')}>Back to Roles</button>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-form-label">Role Name <span className="req">*</span></label>
              <input type="text" className="admin-input" placeholder="E.g. Sales Manager" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Slug</label>
              <input type="text" className="admin-input" placeholder="e.g. sales-manager" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Role Status</label>
              <select className="admin-input">
                <option>Active</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3 className="admin-inner-title" style={{ fontSize: '14px', marginBottom: '16px' }}>Access Permissions</h3>
            <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <table className="admin-table permissions-matrix-table" style={{ margin: 0 }}>
                <thead>
                  <tr>
                    <th>MODULES</th>
                    <th style={{ textAlign: 'center' }}>VIEW</th>
                    <th style={{ textAlign: 'center' }}>ADD</th>
                    <th style={{ textAlign: 'center' }}>EDIT</th>
                    <th style={{ textAlign: 'center' }}>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {modulesList.map((mod, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{mod}</td>
                      {['view', 'add', 'edit', 'delete'].map(action => (
                        <td key={action} style={{ textAlign: 'center' }}>
                          <label className="circle-checkbox-wrapper">
                            <input type="checkbox" className="circle-checkbox-input" />
                            <span className="circle-checkbox-custom"></span>
                          </label>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-form-footer">
            <button className="btn btn-outline" style={{ borderRadius: '8px', padding: '10px 24px' }} onClick={() => setActiveTab('roles')}>Cancel</button>
            <button className="btn" style={{ background: '#000', color: '#fff', borderRadius: '8px', padding: '10px 24px', fontWeight: 600 }}>Create Role</button>
          </div>
        </div>
      </section>
  );
  };
  return (
    <>
      {activeTab === 'roles' && renderRoles()}
      {activeTab === 'roles-add' && renderAddRole()}
    </>
  );
}
