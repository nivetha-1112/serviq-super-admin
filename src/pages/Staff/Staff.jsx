import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppContext';
import PageHeader from '../../components/PageHeader';
import { PencilIcon, TrashIcon } from '../../components/Icons';
import { Badge } from '../../components/Badge';

const sty = {
  pageCard: { background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
  formGrid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' },
};

const iconBtnStyle = {
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: '4px',
  transition: 'all 0.2s ease',
  position: 'relative',
  background: 'transparent',
};

const iconBtnEditStyle = {
  ...iconBtnStyle,
  color: '#475569',
  marginRight: '12px'
};

const iconBtnDeleteStyle = {
  ...iconBtnStyle,
  color: '#ef4444'
};

const IconBtn = ({ icon, tooltip, style, onClick }) => {
  const isDelete = style?.color === '#ef4444';
  return (
    <button
      title={tooltip}
      style={style}
      onClick={onClick}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.2)';
        if (isDelete) {
          e.currentTarget.style.color = '#dc2626';
        } else {
          e.currentTarget.style.color = '#0f172a';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.color = style?.color;
      }}
    >
      {icon}
    </button>
  );
};

export default function Staff() {
  const { activeRestaurant, updateStaff, addStaff, deleteStaff, updateKitchenPassword, addToast } = useAppState();

  const [activePage, setActivePage] = useState(null);
  const [staffForm, setStaffForm] = useState({ id: '', name: '', role: 'Waiter', phone: '', email: '', password: '', status: 'On Duty' });
  const [kitchenPasswordForm, setKitchenPasswordForm] = useState('');

  if (!activeRestaurant) return null;

  const { staff = [], kitchenLogin = { email: '', password: '' } } = activeRestaurant;

  const handleStaffSubmit = (e) => {
    e.preventDefault();
    if (staffForm.id) {
      updateStaff(activeRestaurant.id, staffForm);
      addToast('Staff Updated Successfully');
    } else {
      const nextNum = staff.length + 1;
      const newId = `S-${nextNum < 10 ? '0' + nextNum : nextNum}`;
      addStaff(activeRestaurant.id, {
        ...staffForm,
        id: newId
      });
      addToast('Staff Created Successfully');
    }
    setActivePage(null);
  };

  const handleKitchenPasswordSubmit = (e) => {
    e.preventDefault();
    if (!kitchenPasswordForm) return;
    updateKitchenPassword(activeRestaurant.id, kitchenPasswordForm);
    addToast('Kitchen Shared Login Password updated!');
    setActivePage(null);
  };

  const openAddStaffModal = () => {
    setStaffForm({ id: '', name: '', role: 'Waiter', phone: '', email: '', password: '', status: 'On Duty' });
    setActivePage('staff-form');
  };

  const openEditStaffModal = (s) => {
    setStaffForm(s);
    setActivePage('staff-form');
  };

  const openKitchenModal = () => {
    setKitchenPasswordForm(kitchenLogin.password);
    setActivePage('kitchen-form');
  };

  const handleDeleteStaff = (sId) => {
    if (window.confirm('Delete staff member?')) {
      deleteStaff(activeRestaurant.id, sId);
      addToast('Staff Deleted Successfully');
    }
  };

  const renderStaff = () => (

    <section className="panel-view active">
      <div className="panel-header-flex" style={{ marginBottom: '20px' }}>
        <div className="panel-title-desc">
          <h2 className="panel-inner-title">Staff Management</h2>
          <p className="panel-inner-desc">Manage your restaurant staff, roles, contact details, and duty status.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
         
          <button className="btn btn-black" onClick={openAddStaffModal}>
            ➕ Add New Staff
          </button>
        </div>
      </div>

      <div className="staff-dashboard-grid">
        <div className="staff-list-column" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--border-radius-sm)', padding: '24px', boxShadow: 'var(--card-shadow)' }}>
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div className="stat-card" style={{ borderLeft: '5px solid var(--primary)' }}>
              <div className="stat-main-row">
                <div className="stat-info">
                  <div className="stat-label" style={{ color: '#64748b' }}>Total Staff</div>
                  <h3 style={{ color: 'var(--black)', marginTop: '4px', marginBottom: '4px', fontSize: '20px', fontWeight: '700' }}>{staff.length}</h3>
                  <div className="stat-sub-label green-label">Registered team</div>
                </div>
                <div className="stat-icon-wrapper" style={{ fontSize: '16px' }}>👥</div>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeft: '5px solid var(--primary)' }}>
              <div className="stat-main-row">
                <div className="stat-info">
                  <div className="stat-label" style={{ color: '#64748b' }}>On Duty</div>
                  <h3 style={{ color: 'var(--black)', marginTop: '4px', marginBottom: '4px', fontSize: '20px', fontWeight: '700' }}>{staff.filter(s => s.status === 'On Duty').length}</h3>
                  <div className="stat-sub-label green-label">Active duty</div>
                </div>
                <div className="stat-icon-wrapper" style={{ fontSize: '16px' }}>🟢</div>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeft: '5px solid var(--primary)' }}>
              <div className="stat-main-row">
                <div className="stat-info">
                  <div className="stat-label" style={{ color: '#64748b' }}>Kitchen Staff</div>
                  <h3 style={{ color: 'var(--black)', marginTop: '4px', marginBottom: '4px', fontSize: '20px', fontWeight: '700' }}>{staff.filter(s => s.role === 'Kitchen').length}</h3>
                  <div className="stat-sub-label green-label">Culinary team</div>
                </div>
                <div className="stat-icon-wrapper" style={{ fontSize: '16px' }}>🍳</div>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeft: '5px solid var(--primary)' }}>
              <div className="stat-main-row">
                <div className="stat-info">
                  <div className="stat-label" style={{ color: '#64748b' }}>Waitstaff</div>
                  <h3 style={{ color: 'var(--black)', marginTop: '4px', marginBottom: '4px', fontSize: '20px', fontWeight: '700' }}>{staff.filter(s => s.role === 'Waiter').length}</h3>
                  <div className="stat-sub-label green-label">Service team</div>
                </div>
                <div className="stat-icon-wrapper" style={{ fontSize: '16px' }}>🍽️</div>
              </div>
            </div>
          </div>

          <div className="menu-table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="menu-items-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th>STAFF ID</th>
                  <th>NAME</th>
                  <th>ROLE</th>
                  <th>PHONE</th>
                  <th>LOGIN EMAIL</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {staff.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace' }}>{s.id}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: '12px 14px' }}>{s.role}</td>
                    <td style={{ padding: '12px 14px' }}>{s.phone}</td>
                    <td style={{ padding: '12px 14px' }}>{s.email}</td>
                    <td style={{ padding: '12px 14px' }}><Badge status={s.status} /></td>
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                      <IconBtn icon={<PencilIcon size={18} />} tooltip="Edit" style={iconBtnEditStyle} onClick={() => openEditStaffModal(s)} />
                      <IconBtn icon={<TrashIcon size={18} />} tooltip="Delete" style={iconBtnDeleteStyle} onClick={() => handleDeleteStaff(s.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
  return (
    <>
      {(!activePage) && renderStaff()}
      {activePage === 'staff-form' && (
        <div style={{marginTop: '20px'}}>
                
        <section>
          <div style={{ width: '100%' }}>
            <PageHeader subtitle={staffForm.id ? 'Update employee profile' : 'Add a new member to the restaurant staff'} />
            <div style={sty.pageCard}>
              <form onSubmit={handleStaffSubmit} style={{ width: '100%' }}>
                <div style={sty.formGrid2}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Full Name</label>
                    <input type="text" value={staffForm.name} onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })} required placeholder="e.g. Ramesh Kumar" />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Role</label>
                    <select value={staffForm.role} onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })} required>
                      <option value="Waiter">Waiter</option>
                      <option value="Kitchen">Kitchen</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '16px', marginTop: '16px' }}>
                  <label>Phone Number</label>
                  <input type="tel" value={staffForm.phone} onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })} required placeholder="e.g. 9876543210" />
                </div>

                <div style={sty.formGrid2}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Email Address</label>
                    <input type="email" value={staffForm.email} onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })} required placeholder="e.g. ramesh@serviq.com" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Password</label>
                    <input type="text" value={staffForm.password} onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })} required placeholder="e.g. waiter123" />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px', marginTop: '16px' }}>
                  <label>Duty Status</label>
                  <select value={staffForm.status} onChange={(e) => setStaffForm({ ...staffForm, status: e.target.value })} required>
                    <option value="On Duty">On Duty</option>
                    <option value="Off Duty">Off Duty</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => setActivePage(null)}>Cancel</button>
                  <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>💾 Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        </div>
      )}
      {activePage === 'kitchen-form' && (
        <div style={{marginTop: '20px'}}>
                
        <section>
          <div style={{ width: '100%' }}>
            <PageHeader subtitle="Update the password shared by kitchen station screens" />
            <div style={sty.pageCard}>
              <form onSubmit={handleKitchenPasswordSubmit} style={{ width: '100%' }}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Kitchen Login Email</label>
                  <input type="email" value={kitchenLogin.email} readOnly style={{ backgroundColor: 'var(--bg-tertiary)', cursor: 'not-allowed' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>Kitchen Login Password</label>
                  <input
                    type="text"
                    value={kitchenPasswordForm}
                    onChange={(e) => setKitchenPasswordForm(e.target.value)}
                    required
                    placeholder="e.g. kitchen123"
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => setActivePage(null)}>Cancel</button>
                  <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>💾 Update Password</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        </div>
      )}
    </>
  );
}
