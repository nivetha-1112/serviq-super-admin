import React, { useState, useEffect } from 'react';
import { useAppState } from '../config/AppContext';
import { Badge } from '../components/Badge';
import { GrowthChart } from '../components/GrowthChart';

export default function SuperAdmin() {
  const {
    restaurantsData,
    saasSettings,
    saasPlans,
    saasAdmins,
    saasLogs,
    saasInvoices,
    logout,
    addPlatformLog,
    clearPlatformLogs,
    impersonateRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createAdmin,
    updateAdmin,
    resetAdminPassword,
    addSaaSPlan,
    updateSaaSPlan,
    upgradeRestaurantPlan,
    generateInvoice,
    refundInvoice
  } = useAppState();

  const [activeTab, setActiveTab] = useState('saas-overview');
  const [dateTimeStr, setDateTimeStr] = useState('');

  // Search and filters
  const [adminSearchText, setAdminSearchText] = useState('');
  const [restaurantSearchText, setRestaurantSearchText] = useState('');
  const [invoiceFilter, setInvoiceFilter] = useState('All');

  // Page-style panels (replaces modals)
  const [activePage, setActivePage] = useState(null); // 'rest-form' | 'rest-perf' | 'rest-view' | 'admin-form' | 'admin-view' | 'admin-resetpw' | 'plan-form' | 'plan-upgrade' | 'invoice-gen' | 'invoice-view'

  // Selected entities
  const [selectedRest, setSelectedRest] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Forms
  const [restForm, setRestForm] = useState({
    id: '', name: '', ownerName: '', email: '', phone: '',
    address: '', city: '', state: '', gstNumber: '',
    openingTime: '08:00', closingTime: '22:00',
    logo: '', banner: '', plan: 'Standard', tablesLimit: 5,
    status: 'Active', createdDate: ''
  });

  const [adminForm, setAdminForm] = useState({
    id: '', name: '', email: '', phone: '', restaurantName: '', role: 'Owner', status: 'Active'
  });

  const [planForm, setPlanForm] = useState({
    id: '', name: '', monthlyPrice: 999, annualPrice: 9999,
    branchLimit: 1, userLimit: 5, orderLimit: 500,
    features: '', status: 'Active', autoRenewal: true
  });

  const [upgradeForm, setUpgradeForm] = useState({ restaurantId: '', planId: '' });

  const [resetPwForm, setResetPwForm] = useState({ adminId: '', adminName: '', newPassword: '' });

  const [genInvoiceForm, setGenInvoiceForm] = useState({
    restaurant: '', plan: '', amount: 0, paymentMethod: 'Razorpay', date: '', dueDate: '', status: 'Pending'
  });

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDateTimeStr(now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // ── Statistics ──
  const totalRestaurants = Object.keys(restaurantsData).length;
  const activeRestaurants = Object.values(restaurantsData).filter(r => r.status === 'Active').length;
  const inactiveRestaurants = totalRestaurants - activeRestaurants;
  const totalUsers = Object.values(restaurantsData).reduce((acc, r) => acc + (r.staff?.length || 0) + 1, 0);
  const totalOrders = Object.values(restaurantsData).reduce((acc, r) => acc + (r.orders?.length || 0), 0);
  const todayOrders = Object.values(restaurantsData).reduce((acc, r) => acc + r.orders.filter(o => o.status !== 'done').length, 0);
  const monthlyRevenue = Object.values(restaurantsData).reduce((acc, r) => {
    const plan = saasPlans.find(p => p.name === r.plan);
    return acc + (r.status === 'Active' && plan ? plan.monthlyPrice : 0);
  }, 0);
  const subscriptionRevenue = saasInvoices.filter(inv => inv.status === 'Paid').reduce((acc, inv) => acc + inv.amount, 0);

  // ── Shared Styles ──
  const sty = {
    sectionTitle: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
    titleLeft: { display: 'flex', flexDirection: 'column', gap: '4px' },
    h2: { fontSize: '20px', fontWeight: 800, color: 'var(--black)', margin: 0, fontFamily: "'Outfit', sans-serif" },
    subtitle: { fontSize: '13px', color: '#64748b', fontWeight: 500 },
    tableWrap: { background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', overflowX: 'auto' },
    th: { padding: '14px 16px', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid var(--border)', background: '#fafafa', whiteSpace: 'nowrap' },
    td: { padding: '14px 16px', fontSize: '13px', color: 'var(--text-main)', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle', whiteSpace: 'nowrap' },
    avatar: (name, bg) => ({
      width: '36px', height: '36px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: '13px', color: '#fff', background: bg || 'linear-gradient(135deg, #ff7a00, #f03514)',
      flexShrink: 0, boxShadow: '0 2px 6px rgba(255,122,0,0.2)'
    }),
    nameCell: { display: 'flex', alignItems: 'center', gap: '10px' },
    search: { padding: '10px 18px', borderRadius: '24px', border: '1.5px solid var(--border)', width: '320px', outline: 'none', fontSize: '13px', background: '#fff', transition: 'border-color 0.2s' },
    btnAdd: { background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', color: '#fff', padding: '10px 20px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' },
    // Icon action buttons
    iconBtn: { width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px', padding: 0, transition: 'all 0.2s ease', position: 'relative' },
    iconBtnView: { background: '#f0fdf4', color: '#16a34a', borderColor: '#86efac' },
    iconBtnEdit: { background: '#eff6ff', color: '#3b82f6', borderColor: '#93c5fd' },
    iconBtnSuspend: { background: '#fffbeb', color: '#f59e0b', borderColor: '#fcd34d' },
    iconBtnDelete: { background: '#fef2f2', color: '#ef4444', borderColor: '#fca5a5' },
    iconBtnStats: { background: 'linear-gradient(135deg, #ff7a00, #f03514)', color: '#fff', borderColor: 'transparent' },
    iconBtnPurple: { background: '#f5f3ff', color: '#7c3aed', borderColor: '#c4b5fd' },
    iconBtnGreen: { background: '#f0fdf4', color: '#16a34a', borderColor: '#86efac' },
    iconBtnRed: { background: '#fef2f2', color: '#dc2626', borderColor: '#fca5a5' },
    iconBtnDownload: { background: '#faf5ff', color: '#7c3aed', borderColor: '#c4b5fd' },
    actions: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'nowrap' },
    formSection: { fontSize: '14px', fontWeight: 700, color: 'var(--primary)', borderBottom: '2px solid var(--primary-light)', paddingBottom: '6px', marginBottom: '14px', marginTop: '16px', fontFamily: "'Outfit', sans-serif" },
    formGrid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' },
    formGrid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '16px' },
    logoPreview: { width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--border)', background: '#f1f5f9' },
    modalBtn: { padding: '10px 24px', fontSize: '14px', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer' },
    // Inline page style (within content-body)
    pageInlineHeader: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--primary-light)' },
    pageBackBtn: { background: '#fff', border: '1.5px solid var(--border)', borderRadius: '10px', width: '38px', height: '38px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s', flexShrink: 0 },
    pageCard: { background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
  };

  const getInitials = (name = '') => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const avatarColors = ['#ff7a00', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b', '#06b6d4', '#ec4899'];
  const getAvatarColor = (idx) => avatarColors[idx % avatarColors.length];

  // ── HANDLERS ──
  const handleRestSubmit = (e) => {
    e.preventDefault();
    if (restForm.id) {
      updateRestaurant(restForm.id, { name: restForm.name, ownerName: restForm.ownerName, owner: restForm.email, email: restForm.email, phone: restForm.phone, address: restForm.address, city: restForm.city, state: restForm.state, gstNumber: restForm.gstNumber, openingTime: restForm.openingTime, closingTime: restForm.closingTime, logo: restForm.logo, banner: restForm.banner, plan: restForm.plan, status: restForm.status });
      addPlatformLog(`Updated restaurant: ${restForm.name}`);
      alert('Restaurant updated!');
    } else {
      const newId = `rest-${Date.now()}`;
      addRestaurant({
        id: newId, name: restForm.name, ownerName: restForm.ownerName, owner: restForm.email, email: restForm.email, phone: restForm.phone, address: restForm.address, city: restForm.city, state: restForm.state, gstNumber: restForm.gstNumber, openingTime: restForm.openingTime, closingTime: restForm.closingTime, logo: restForm.logo, banner: restForm.banner, plan: restForm.plan, status: restForm.status, createdDate: new Date().toISOString().split('T')[0],
        settings: { name: restForm.name, tagline: '', currency: '₹', tablesCount: restForm.tablesLimit, taxRate: 0.05, serviceChargeRate: 0.0 },
        menu: [], tables: [], orders: [], billingData: [], staff: [], kitchenLogin: { email: `kitchen@${newId}.com`, password: '123' }
      });
      addPlatformLog(`Created restaurant: ${restForm.name}`);
      alert('Restaurant created!');
    }
    setActivePage(null);
  };

  const openAddRestPage = () => { setRestForm({ id: '', name: '', ownerName: '', email: '', phone: '', address: '', city: '', state: '', gstNumber: '', openingTime: '08:00', closingTime: '22:00', logo: '', banner: '', plan: 'Standard', tablesLimit: 5, status: 'Active', createdDate: '' }); setActivePage('rest-form'); };
  const openEditRestPage = (r) => { setRestForm({ id: r.id, name: r.name, ownerName: r.ownerName, email: r.owner, phone: r.phone, address: r.address, city: r.city, state: r.state, gstNumber: r.gstNumber, openingTime: r.openingTime || '08:00', closingTime: r.closingTime || '22:00', logo: r.logo || '', banner: r.banner || '', plan: r.plan, tablesLimit: r.settings?.tablesCount || 5, status: r.status, createdDate: r.createdDate }); setActivePage('rest-form'); };
  const handleSuspend = (r) => { updateRestaurant(r.id, { status: 'Suspended' }); addPlatformLog(`Suspended: ${r.name}`); };
  const handleDelete = (r) => { if (window.confirm(`Delete ${r.name}? This cannot be undone.`)) { deleteRestaurant(r.id); addPlatformLog(`Deleted: ${r.name}`); } };
  const openViewRestPage = (r) => { setSelectedRest(r); setActivePage('rest-view'); };
  const openPerfPage = (r) => { setSelectedRest(r); setActivePage('rest-perf'); };

  const handleAdminSubmit = (e) => { e.preventDefault(); if (adminForm.id) { updateAdmin(adminForm.id, adminForm); addPlatformLog(`Updated admin: ${adminForm.name}`); } else { createAdmin({ ...adminForm, id: `ADM-${Date.now().toString().slice(-4)}`, lastLogin: 'Never' }); addPlatformLog(`Created admin: ${adminForm.name}`); } setActivePage(null); };
  const openAddAdminPage = () => { setAdminForm({ id: '', name: '', email: '', phone: '', restaurantName: '', role: 'Owner', status: 'Active' }); setActivePage('admin-form'); };
  const openEditAdminPage = (a) => { setAdminForm({ ...a }); setActivePage('admin-form'); };
  const openViewAdminPage = (a) => { setSelectedAdmin(a); setActivePage('admin-view'); };
  const handleResetPw = (e) => { e.preventDefault(); resetAdminPassword(resetPwForm.adminId, resetPwForm.newPassword); alert(`Password reset for ${resetPwForm.adminName}!`); setActivePage(null); };
  const toggleAdminStatus = (a) => { const s = a.status === 'Active' ? 'Disabled' : 'Active'; updateAdmin(a.id, { status: s }); addPlatformLog(`${s} admin: ${a.name}`); };

  const handlePlanSubmit = (e) => { e.preventDefault(); if (planForm.id) { updateSaaSPlan(planForm.id, planForm); addPlatformLog(`Updated plan: ${planForm.name}`); } else { addSaaSPlan({ ...planForm, id: `plan-${planForm.name.toLowerCase().replace(/[^a-z0-9]/g, '')}` }); addPlatformLog(`Created plan: ${planForm.name}`); } setActivePage(null); };
  const openAddPlanPage = () => { setPlanForm({ id: '', name: '', monthlyPrice: 999, annualPrice: 9999, branchLimit: 1, userLimit: 5, orderLimit: 500, features: '', status: 'Active', autoRenewal: true }); setActivePage('plan-form'); };
  const openEditPlanPage = (p) => { setPlanForm({ ...p }); setActivePage('plan-form'); };
  const handleUpgrade = (e) => { e.preventDefault(); upgradeRestaurantPlan(upgradeForm.restaurantId, upgradeForm.planId); alert('Plan changed!'); setActivePage(null); };

  const handleGenInvoice = (e) => { e.preventDefault(); generateInvoice({ id: `INV-${Date.now().toString().slice(-6)}`, ...genInvoiceForm, paymentDate: genInvoiceForm.status === 'Paid' ? genInvoiceForm.date : '' }); alert('Invoice generated!'); setActivePage(null); };
  const handleRefund = (id) => { if (window.confirm('Refund this invoice?')) { refundInvoice(id); } };

  // ── Icon Button Helper ──
  const IconBtn = ({ icon, tooltip, style, onClick }) => (
    <button title={tooltip} style={{ ...sty.iconBtn, ...style }} onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
    >{icon}</button>
  );

  // ── RENDER: DASHBOARD ──
  const renderDashboard = () => {
    const kpis = [
      { label: 'Total Restaurants', value: totalRestaurants, icon: '🏪', color: '#ff7a00' },
      { label: 'Active Restaurants', value: activeRestaurants, icon: '✅', color: '#ff7a00' },
      { label: 'Inactive Restaurants', value: inactiveRestaurants, icon: '⏸️', color: '#ff7a00' },
      { label: 'Total Admins', value: totalUsers, icon: '👥', color: '#ff7a00' },
      { label: 'Total Orders', value: totalOrders, icon: '📦', color: '#ff7a00' },
      { label: "Today's Orders", value: todayOrders, icon: '🚀', color: '#ff7a00' },
      { label: 'Monthly Revenue', value: `₹${monthlyRevenue.toLocaleString('en-IN')}`, icon: '💰', color: '#ff7a00' },
      { label: 'Subscription Revenue', value: `₹${subscriptionRevenue.toLocaleString('en-IN')}`, icon: '💎', color: '#ff7a00' },
    ];

    return (
      <section className="panel-view active">
        <div style={sty.sectionTitle}>
          <div style={sty.titleLeft}>
            <h2 style={sty.h2}>Dashboard Overview</h2>
            <span style={sty.subtitle}>Platform-wide metrics at a glance</span>
          </div>
        </div>

        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          {kpis.map((kpi, i) => (
            <div key={i} className="stat-card" style={{ borderLeft: `5px solid ${kpi.color}` }}>
              <div className="stat-main-row">
                <div className="stat-info">
                  <div className="stat-label" style={{ color: '#64748b' }}>{kpi.label}</div>
                  <h3 style={{ color: 'var(--black)' }}>{kpi.value}</h3>
                </div>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  {kpi.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Growth Chart + Audit Logs */}
        <div className="dashboard-inner-grid" style={{ gap: '24px' }}>
          <div className="feed-card">
            <div className="feed-header">
              <h2 className="feed-title">📈 Monthly Subscription Growth</h2>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Year 2026</span>
            </div>
            <div style={{ height: '250px', paddingTop: '10px' }}>
              <GrowthChart invoices={saasInvoices} />
            </div>
          </div>

          <div className="feed-card">
            <div className="feed-header">
              <h2 className="feed-title">📜 System Audit Logs</h2>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }}></span> Live
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
              {saasLogs.slice(0, 10).map((log, i) => (
                <div key={i} style={{ fontSize: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px', display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, minWidth: '65px' }}>{log.time}</span>
                  <span style={{ color: '#334155' }}>{log.text}</span>
                </div>
              ))}
              {saasLogs.length === 0 && <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>No logs yet.</div>}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ── RENDER: RESTAURANTS ──
  const renderRestaurants = () => {
    const list = Object.values(restaurantsData).filter(r =>
      r.name.toLowerCase().includes(restaurantSearchText.toLowerCase()) ||
      r.ownerName.toLowerCase().includes(restaurantSearchText.toLowerCase())
    );

    return (
      <section className="panel-view active">
        <div style={sty.sectionTitle}>
          <div style={sty.titleLeft}>
            <h2 style={sty.h2}> Restaurant Directory</h2>
            <span style={sty.subtitle}>Manage all tenant restaurants, subscriptions, and status</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input style={sty.search} placeholder="🔍  Search by name or owner..." value={restaurantSearchText} onChange={e => setRestaurantSearchText(e.target.value)} />
          <button style={sty.btnAdd} onClick={openAddRestPage}>➕ Add Restaurant</button>
        </div>

        <div style={sty.tableWrap}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['S.No', '', 'Restaurant ID', 'Restaurant Name', 'Owner Name', 'Email', 'Phone', 'Address', 'City', 'State', 'GST Number', 'Plan', 'Status', 'Created', 'Timings', 'Actions'].map((h, i) => (
                  <th key={i} style={sty.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((r, idx) => (
                <tr key={r.id} style={{ transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#fffaf5'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ ...sty.td, fontWeight: 700, color: '#94a3b8', textAlign: 'center', fontSize: '12px' }}>{idx + 1}</td>
                  <td style={sty.td}>
                    {r.logo ? <img src={r.logo} alt="" style={sty.logoPreview} /> : <div style={sty.avatar(r.name, getAvatarColor(idx))}>{getInitials(r.name)}</div>}
                  </td>
                  <td style={{ ...sty.td, fontFamily: 'monospace', fontSize: '12px', color: '#64748b' }}>{r.id}</td>
                  <td style={{ ...sty.td, fontWeight: 700 }}>{r.name}</td>
                  <td style={sty.td}>{r.ownerName}</td>
                  <td style={{ ...sty.td, fontSize: '12px' }}>{r.owner}</td>
                  <td style={sty.td}>{r.phone}</td>
                  <td style={{ ...sty.td, fontSize: '12px', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.address}</td>
                  <td style={sty.td}>{r.city}</td>
                  <td style={sty.td}>{r.state}</td>
                  <td style={{ ...sty.td, fontSize: '12px', fontFamily: 'monospace' }}>{r.gstNumber}</td>
                  <td style={{ ...sty.td, fontWeight: 600, color: 'var(--primary)' }}>{r.plan}</td>
                  <td style={sty.td}><Badge status={r.status} /></td>
                  <td style={{ ...sty.td, fontSize: '12px' }}>{r.createdDate}</td>
                  <td style={{ ...sty.td, fontSize: '12px', whiteSpace: 'nowrap' }}>{r.openingTime} – {r.closingTime}</td>
                  <td style={sty.td}>
                    <div style={sty.actions}>
                      <IconBtn icon="👁️" tooltip="View" style={sty.iconBtnView} onClick={() => openViewRestPage(r)} />
                      <IconBtn icon="✏️" tooltip="Edit" style={sty.iconBtnEdit} onClick={() => openEditRestPage(r)} />
                      {r.status !== 'Suspended' && <IconBtn icon="⏸️" tooltip="Suspend" style={sty.iconBtnSuspend} onClick={() => handleSuspend(r)} />}
                      <IconBtn icon="🗑️" tooltip="Delete" style={sty.iconBtnDelete} onClick={() => handleDelete(r)} />
                      <IconBtn icon="📊" tooltip="Stats" style={sty.iconBtnStats} onClick={() => openPerfPage(r)} />
                    </div>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan="16" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No restaurants found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  // ── RENDER: ADMINS ──
  const renderAdmins = () => {
    const list = saasAdmins.filter(a =>
      a.name.toLowerCase().includes(adminSearchText.toLowerCase()) ||
      a.email.toLowerCase().includes(adminSearchText.toLowerCase()) ||
      a.restaurantName.toLowerCase().includes(adminSearchText.toLowerCase())
    );

    return (
      <section className="panel-view active">
        <div style={sty.sectionTitle}>
          <div style={sty.titleLeft}>
            <h2 style={sty.h2}> Admin Management</h2>
            <span style={sty.subtitle}>Create, manage, and control restaurant administrator accounts</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input style={sty.search} placeholder="🔍  Search admins..." value={adminSearchText} onChange={e => setAdminSearchText(e.target.value)} />
          <button style={sty.btnAdd} onClick={openAddAdminPage}>➕ Create Admin</button>
        </div>

        <div style={sty.tableWrap}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['S.No', '', 'Admin ID', 'Name', 'Email', 'Phone', 'Restaurant Name', 'Role', 'Status', 'Last Login', 'Actions'].map((h, i) => (
                  <th key={i} style={sty.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((a, idx) => (
                <tr key={a.id} onMouseEnter={e => e.currentTarget.style.background = '#fffaf5'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ ...sty.td, fontWeight: 700, color: '#94a3b8', textAlign: 'center', fontSize: '12px' }}>{idx + 1}</td>
                  <td style={sty.td}><div style={sty.avatar(a.name, getAvatarColor(idx))}>{getInitials(a.name)}</div></td>
                  <td style={{ ...sty.td, fontFamily: 'monospace', fontSize: '12px', color: '#64748b' }}>{a.id}</td>
                  <td style={{ ...sty.td, fontWeight: 700 }}>{a.name}</td>
                  <td style={{ ...sty.td, fontSize: '12px' }}>{a.email}</td>
                  <td style={sty.td}>{a.phone}</td>
                  <td style={{ ...sty.td, fontWeight: 500 }}>{a.restaurantName}</td>
                  <td style={sty.td}><span style={{ background: '#f1f5f9', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>{a.role}</span></td>
                  <td style={sty.td}><Badge status={a.status} /></td>
                  <td style={{ ...sty.td, fontSize: '12px', color: '#64748b' }}>{a.lastLogin}</td>
                  <td style={sty.td}>
                    <div style={sty.actions}>
                      <IconBtn icon="👁️" tooltip="View" style={sty.iconBtnView} onClick={() => openViewAdminPage(a)} />
                      <IconBtn icon="✏️" tooltip="Edit" style={sty.iconBtnEdit} onClick={() => openEditAdminPage(a)} />
                      <IconBtn icon="🔑" tooltip="Reset Password" style={sty.iconBtnPurple} onClick={() => { setResetPwForm({ adminId: a.id, adminName: a.name, newPassword: '' }); setActivePage('admin-resetpw'); }} />
                      <IconBtn icon={a.status === 'Active' ? '🚫' : '✅'} tooltip={a.status === 'Active' ? 'Disable' : 'Enable'} style={a.status === 'Active' ? sty.iconBtnRed : sty.iconBtnGreen} onClick={() => toggleAdminStatus(a)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  // ── RENDER: PLANS (Card Style) ──
  const planColors = ['linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'linear-gradient(135deg, #ff7a00 0%, #f03514 100%)', 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', 'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)'];
  const renderPlans = () => (
    <section className="panel-view active">
      <div style={sty.sectionTitle}>
        <div style={sty.titleLeft}>
          <h2 style={sty.h2}> Subscription & Plans</h2>
          <span style={sty.subtitle}>Define pricing tiers, resource limits, and manage plan assignments</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button style={{ background: '#fff', color: '#3b82f6', border: '1.5px solid #93c5fd', padding: '10px 18px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }} onClick={() => { setUpgradeForm({ restaurantId: Object.keys(restaurantsData)[0] || '', planId: saasPlans[0]?.id || '' }); setActivePage('plan-upgrade'); }}>⬆️ Upgrade / Downgrade</button>
        <button style={sty.btnAdd} onClick={openAddPlanPage}>➕ Create Plan</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {saasPlans.map((p, idx) => (
          <div key={p.id} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'default' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; }}
          >
            {/* Card Header */}
            <div style={{ background: planColors[idx % planColors.length], padding: '24px', color: '#fff', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>{p.name}</h3>
                  <div style={{ marginTop: '8px', opacity: 0.9, fontSize: '13px' }}>
                    <Badge status={p.status} />
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>₹{p.monthlyPrice.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>per month</div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: '24px' }}>
              {/* Annual Price */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Annual Price</span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--black)' }}>₹{p.annualPrice.toLocaleString('en-IN')} <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>/ yr</span></span>
              </div>

              {/* Limits Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'Branches', value: p.branchLimit, icon: '🏢' },
                  { label: 'Users', value: p.userLimit, icon: '👥' },
                  { label: 'Orders', value: p.orderLimit.toLocaleString(), icon: '📦' },
                ].map((lim, li) => (
                  <div key={li} style={{ textAlign: 'center', padding: '12px 8px', background: '#fafafa', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '18px', marginBottom: '4px' }}>{lim.icon}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--black)' }}>{lim.value}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{lim.label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              {p.features && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Features</div>
                  <div style={{ fontSize: '12px', color: '#334155', lineHeight: 1.6 }}>{p.features}</div>
                </div>
              )}

              {/* Auto Renewal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px 16px', background: p.autoRenewal ? '#f0fdf4' : '#fef2f2', borderRadius: '10px', border: `1px solid ${p.autoRenewal ? '#bbf7d0' : '#fecaca'}` }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Auto Renewal</span>
                <span style={{ fontWeight: 700, fontSize: '12px', color: p.autoRenewal ? '#16a34a' : '#dc2626' }}>{p.autoRenewal ? '✅ Enabled' : '❌ Disabled'}</span>
              </div>

              {/* Action Button */}
              <button onClick={() => openEditPlanPage(p)} style={{ width: '100%', padding: '12px', fontSize: '13px', fontWeight: 700, borderRadius: '10px', border: '1.5px solid var(--border)', background: '#fff', color: 'var(--black)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--black)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--black)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--black)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >✏️ Modify Plan</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // ── RENDER: REVENUE ──
  const renderRevenue = () => {
    const list = saasInvoices.filter(inv => invoiceFilter === 'All' || inv.status === invoiceFilter);
    const totalCollected = saasInvoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.amount, 0);
    const pendingCount = saasInvoices.filter(i => i.status === 'Pending').length;

    return (
      <section className="panel-view active">
        <div style={sty.sectionTitle}>
          <div style={sty.titleLeft}>
            <h2 style={sty.h2}> Revenue & Billing</h2>
            <span style={sty.subtitle}>Track subscription payments, invoices, and refunds</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'Paid', 'Pending', 'Refunded'].map(f => (
              <button key={f} onClick={() => setInvoiceFilter(f)} style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: invoiceFilter === f ? '2px solid var(--primary)' : '1.5px solid var(--border)', background: invoiceFilter === f ? 'var(--primary-light)' : '#fff', color: invoiceFilter === f ? 'var(--primary)' : '#64748b' }}>{f}</button>
            ))}
          </div>
          <button style={sty.btnAdd} onClick={() => { setGenInvoiceForm({ restaurant: '', plan: '', amount: 0, paymentMethod: 'Razorpay', date: new Date().toISOString().split('T')[0], dueDate: '', status: 'Pending' }); setActivePage('invoice-gen'); }}>➕ Generate Invoice</button>
        </div>

        {/* Revenue KPI row */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div className="stat-card" style={{ borderLeft: '5px solid var(--primary)' }}>
            <div className="stat-main-row">
              <div className="stat-info">
                <div className="stat-label" style={{ color: '#64748b' }}>Total Revenue Collected</div>
                <h3 style={{ color: 'var(--black)', marginTop: '6px', margin: 0 }}>₹{totalCollected.toLocaleString('en-IN')}</h3>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                💵
              </div>
            </div>
          </div>
          <div className="stat-card" style={{ borderLeft: '5px solid var(--primary)' }}>
            <div className="stat-main-row">
              <div className="stat-info">
                <div className="stat-label" style={{ color: '#64748b' }}>Pending Invoices</div>
                <h3 style={{ color: 'var(--black)', marginTop: '6px', margin: 0 }}>{pendingCount}</h3>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                ⏳
              </div>
            </div>
          </div>
          <div className="stat-card" style={{ borderLeft: '5px solid var(--primary)' }}>
            <div className="stat-main-row">
              <div className="stat-info">
                <div className="stat-label" style={{ color: '#64748b' }}>Next Projected Billing (MRR)</div>
                <h3 style={{ color: 'var(--black)', marginTop: '6px', margin: 0 }}>₹{monthlyRevenue.toLocaleString('en-IN')}</h3>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                📈
              </div>
            </div>
          </div>
        </div>

        <div style={sty.tableWrap}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['S.No', 'Invoice Number', 'Restaurant Name', 'Subscription Plan', 'Amount', 'Payment Method', 'Payment Date', 'Due Date', 'Payment Status', 'Actions'].map((h, i) => (
                  <th key={i} style={sty.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((inv, idx) => (
                <tr key={inv.id} onMouseEnter={e => e.currentTarget.style.background = '#fffaf5'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ ...sty.td, fontWeight: 700, color: '#94a3b8', textAlign: 'center', fontSize: '12px' }}>{idx + 1}</td>
                  <td style={{ ...sty.td, fontFamily: 'monospace', fontWeight: 600 }}>{inv.id}</td>
                  <td style={{ ...sty.td, fontWeight: 600 }}>{inv.restaurant}</td>
                  <td style={sty.td}>{inv.plan}</td>
                  <td style={{ ...sty.td, fontWeight: 700, color: '#10b981' }}>₹{inv.amount.toLocaleString('en-IN')}</td>
                  <td style={sty.td}>{inv.paymentMethod}</td>
                  <td style={sty.td}>{inv.paymentDate || '—'}</td>
                  <td style={sty.td}>{inv.dueDate}</td>
                  <td style={sty.td}><Badge status={inv.status} /></td>
                  <td style={sty.td}>
                    <div style={sty.actions}>
                      <IconBtn icon="👁️" tooltip="View Invoice" style={sty.iconBtnView} onClick={() => { setSelectedInvoice(inv); setActivePage('invoice-view'); }} />
                      <IconBtn icon="📥" tooltip="Download" style={sty.iconBtnDownload} onClick={() => window.print()} />
                      {inv.status === 'Paid' && <IconBtn icon="↩️" tooltip="Refund" style={sty.iconBtnRed} onClick={() => handleRefund(inv.id)} />}
                    </div>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan="10" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No invoices match the filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  // ══════════════════════════════════════════════════════════
  //  INLINE PAGE RENDERER (forms/views inside content-body)
  // ══════════════════════════════════════════════════════════
  const pageTitle = {
    'rest-form': restForm.id ? ' Edit Restaurant' : ' Add New Restaurant',
    'rest-view': ' Restaurant Details',
    'rest-perf': ' Restaurant Performance',
    'admin-form': adminForm.id ? ' Edit Admin' : ' Create Admin',
    'admin-view': ' Admin Details',
    'admin-resetpw': 'Reset Admin Password',
    'plan-form': planForm.id ? ' Modify Plan' : 'Create Subscription Plan',
    'plan-upgrade': '⬆Upgrade / Downgrade Plan',
    'invoice-gen': ' Generate Invoice',
    'invoice-view': ' Invoice Receipt',
  };

  const renderActivePage = () => {
    const PageHeader = ({ subtitle }) => (
      <div style={sty.pageInlineHeader}>
        <button style={sty.pageBackBtn} onClick={() => setActivePage(null)}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'inherit'; }}
        >←</button>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>{pageTitle[activePage]}</h2>
          {subtitle && <span style={{ fontSize: '12px', color: '#64748b' }}>{subtitle}</span>}
        </div>
      </div>
    );

    // ── RESTAURANT FORM ──
    if (activePage === 'rest-form') return (
      <section>
        <PageHeader subtitle={restForm.id ? 'Update restaurant details' : 'Register a new restaurant to the platform'} />
        <div style={sty.pageCard}>
          <form onSubmit={handleRestSubmit}>
            <h4 style={sty.formSection}>📋 Basic Information</h4>
            <div style={sty.formGrid2}>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Restaurant Name *</label><input type="text" value={restForm.name} onChange={e => setRestForm({ ...restForm, name: e.target.value })} required placeholder="e.g. Saravana Bhavan" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Owner Name *</label><input type="text" value={restForm.ownerName} onChange={e => setRestForm({ ...restForm, ownerName: e.target.value })} required placeholder="e.g. Rajesh Kumar" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Email *</label><input type="email" value={restForm.email} onChange={e => setRestForm({ ...restForm, email: e.target.value })} required placeholder="admin@restaurant.com" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Phone Number *</label><input type="tel" value={restForm.phone} onChange={e => setRestForm({ ...restForm, phone: e.target.value })} required placeholder="9876543210" /></div>
            </div>
            <h4 style={sty.formSection}>📍 Location & Legal</h4>
            <div className="form-group" style={{ marginBottom: '14px' }}><label>Address *</label><input type="text" value={restForm.address} onChange={e => setRestForm({ ...restForm, address: e.target.value })} required placeholder="123 Main Street" /></div>
            <div style={sty.formGrid3}>
              <div className="form-group" style={{ marginBottom: 0 }}><label>City *</label><input type="text" value={restForm.city} onChange={e => setRestForm({ ...restForm, city: e.target.value })} required placeholder="Bangalore" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>State *</label><input type="text" value={restForm.state} onChange={e => setRestForm({ ...restForm, state: e.target.value })} required placeholder="Karnataka" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>GST Number *</label><input type="text" value={restForm.gstNumber} onChange={e => setRestForm({ ...restForm, gstNumber: e.target.value })} required placeholder="29AABCT5678B2ZY" /></div>
            </div>
            <h4 style={sty.formSection}>⏰ Timings & tion</h4>
            <div style={sty.formGrid2}>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Opening Time</label><input type="time" value={restForm.openingTime} onChange={e => setRestForm({ ...restForm, openingTime: e.target.value })} /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Closing Time</label><input type="time" value={restForm.closingTime} onChange={e => setRestForm({ ...restForm, closingTime: e.target.value })} /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Subscription Plan</label>
                <select value={restForm.plan} onChange={e => setRestForm({ ...restForm, plan: e.target.value })}>
                  {saasPlans.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Status</label>
                <select value={restForm.status} onChange={e => setRestForm({ ...restForm, status: e.target.value })}>
                  <option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
            <h4 style={sty.formSection}>🖼️ Restaurant Logo & Banner</h4>
            <div style={sty.formGrid2}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Logo Image URL</label>
                <input type="url" value={restForm.logo} onChange={e => setRestForm({ ...restForm, logo: e.target.value })} placeholder="https://example.com/logo.png" />
                {restForm.logo && <img src={restForm.logo} alt="Logo preview" style={{ marginTop: '8px', width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }} />}
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Banner Image URL</label>
                <input type="url" value={restForm.banner} onChange={e => setRestForm({ ...restForm, banner: e.target.value })} placeholder="https://example.com/banner.jpg" />
                {restForm.banner && <img src={restForm.banner} alt="Banner preview" style={{ marginTop: '8px', width: '100%', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }} />}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button type="button" style={{ ...sty.modalBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => setActivePage(null)}>Cancel</button>
              <button type="submit" style={{ ...sty.modalBtn, background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', color: '#fff' }}>💾 Save Restaurant</button>
            </div>
          </form>
        </div>
      </section>
    );

    // ── RESTAURANT VIEW ──
    if (activePage === 'rest-view' && selectedRest) return (
      <section>
        <PageHeader subtitle={`Viewing full details for ${selectedRest.name}`} />
        <div style={sty.pageCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '2px solid var(--primary-light)' }}>
            {selectedRest.logo ? <img src={selectedRest.logo} alt="" style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--border)' }} /> : <div style={sty.avatar(selectedRest.name, '#ff7a00')}>{getInitials(selectedRest.name)}</div>}
            <div>
              <h3 style={{ margin: 0, fontSize: '22px' }}>{selectedRest.name}</h3>
              <span style={{ fontSize: '13px', color: '#64748b' }}>{selectedRest.city}, {selectedRest.state} · <Badge status={selectedRest.status} /></span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            {[
              { label: 'Owner Name', value: selectedRest.ownerName },
              { label: 'Email', value: selectedRest.owner },
              { label: 'Phone', value: selectedRest.phone },
              { label: 'Address', value: selectedRest.address },
              { label: 'GST Number', value: selectedRest.gstNumber },
              { label: 'Subscription Plan', value: selectedRest.plan },
              { label: 'Opening Time', value: selectedRest.openingTime || '—' },
              { label: 'Closing Time', value: selectedRest.closingTime || '—' },
              { label: 'Created Date', value: selectedRest.createdDate },
              { label: 'Restaurant ID', value: selectedRest.id },
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px 18px', background: '#fafafa', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{item.label}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--black)' }}>{item.value || '—'}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
            <button style={{ ...sty.modalBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => setActivePage(null)}>Back</button>
            <button style={{ ...sty.modalBtn, background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', color: '#fff' }} onClick={() => openEditRestPage(selectedRest)}>✏️ Edit Restaurant</button>
          </div>
        </div>
      </section>
    );

    // ── RESTAURANT PERFORMANCE ──
    if (activePage === 'rest-perf' && selectedRest) return (
      <section>
        <PageHeader subtitle={`Analytics for ${selectedRest.name}`} />
        <div style={sty.pageCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--primary-light)' }}>
            <div style={sty.avatar(selectedRest.name, '#ff7a00')}>{getInitials(selectedRest.name)}</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px' }}>{selectedRest.name}</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>{selectedRest.city}, {selectedRest.state} · <Badge status={selectedRest.status} /></span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Sales Revenue', value: `₹${(selectedRest.orders?.filter(o => o.billingStatus === 'paid').reduce((s, o) => s + o.total, 0) || 0).toLocaleString('en-IN')}`, color: '#10b981' },
              { label: 'Total Orders', value: selectedRest.orders?.length || 0, color: '#3b82f6' },
              { label: 'Average Order Value', value: `₹${selectedRest.orders?.length ? Math.round(selectedRest.orders.reduce((s, o) => s + o.total, 0) / selectedRest.orders.length) : 0}`, color: '#8b5cf6' },
              { label: 'Active Tables', value: `${selectedRest.tables?.filter(t => t.status === 'Occupied').length || 0} / ${selectedRest.tables?.length || 0}`, color: '#f59e0b' },
            ].map((m, i) => (
              <div key={i} style={{ background: '#fafafa', border: '1px solid var(--border)', padding: '20px', borderRadius: '12px', borderLeft: `4px solid ${m.color}` }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{m.label}</div>
                <h3 style={{ marginTop: '8px', fontSize: '24px', color: m.color }}>{m.value}</h3>
              </div>
            ))}
          </div>
          <div style={{ background: '#fafafa', border: '1px solid var(--border)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Monthly Revenue Trend</h4>
            <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              {[40, 50, 70, 60, 95, 80].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '6px', background: i === 4 ? 'var(--primary)' : '#e2e8f0', transition: 'all 0.3s' }}></div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button style={{ ...sty.modalBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => setActivePage(null)}>Back</button>
          </div>
        </div>
      </section>
    );

    // ── ADMIN FORM ──
    if (activePage === 'admin-form') return (
      <section>
        <PageHeader subtitle={adminForm.id ? 'Update administrator details' : 'Register a new admin account'} />
        <div style={sty.pageCard}>
          <form onSubmit={handleAdminSubmit}>
            <h4 style={sty.formSection}>👤 Admin Details</h4>
            <div style={sty.formGrid2}>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Full Name *</label><input type="text" value={adminForm.name} onChange={e => setAdminForm({ ...adminForm, name: e.target.value })} required placeholder="Admin Name" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Email *</label><input type="email" value={adminForm.email} onChange={e => setAdminForm({ ...adminForm, email: e.target.value })} required placeholder="admin@example.com" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Phone *</label><input type="tel" value={adminForm.phone} onChange={e => setAdminForm({ ...adminForm, phone: e.target.value })} required placeholder="9876543210" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Restaurant Name *</label><input type="text" value={adminForm.restaurantName} onChange={e => setAdminForm({ ...adminForm, restaurantName: e.target.value })} required placeholder="Restaurant Name" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Role</label>
                <select value={adminForm.role} onChange={e => setAdminForm({ ...adminForm, role: e.target.value })}>
                  <option value="Owner">Owner</option><option value="Manager">Manager</option><option value="Staff">Staff</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Status</label>
                <select value={adminForm.status} onChange={e => setAdminForm({ ...adminForm, status: e.target.value })}>
                  <option value="Active">Active</option><option value="Disabled">Disabled</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button type="button" style={{ ...sty.modalBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => setActivePage(null)}>Cancel</button>
              <button type="submit" style={{ ...sty.modalBtn, background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', color: '#fff' }}>💾 Save Admin</button>
            </div>
          </form>
        </div>
      </section>
    );

    // ── ADMIN VIEW ──
    if (activePage === 'admin-view' && selectedAdmin) return (
      <section>
        <PageHeader subtitle={`Viewing details for ${selectedAdmin.name}`} />
        <div style={sty.pageCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '2px solid var(--primary-light)' }}>
            <div style={sty.avatar(selectedAdmin.name, '#3b82f6')}>{getInitials(selectedAdmin.name)}</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '22px' }}>{selectedAdmin.name}</h3>
              <span style={{ fontSize: '13px', color: '#64748b' }}>{selectedAdmin.role} · <Badge status={selectedAdmin.status} /></span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            {[
              { label: 'Admin ID', value: selectedAdmin.id },
              { label: 'Email', value: selectedAdmin.email },
              { label: 'Phone', value: selectedAdmin.phone },
              { label: 'Restaurant', value: selectedAdmin.restaurantName },
              { label: 'Role', value: selectedAdmin.role },
              { label: 'Last Login', value: selectedAdmin.lastLogin },
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px 18px', background: '#fafafa', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{item.label}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--black)' }}>{item.value || '—'}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
            <button style={{ ...sty.modalBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => setActivePage(null)}>Back</button>
            <button style={{ ...sty.modalBtn, background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', color: '#fff' }} onClick={() => openEditAdminPage(selectedAdmin)}>✏️ Edit Admin</button>
          </div>
        </div>
      </section>
    );

    // ── RESET PASSWORD ──
    if (activePage === 'admin-resetpw') return (
      <section>
        <PageHeader subtitle={`Reset password for ${resetPwForm.adminName}`} />
        <div style={{ ...sty.pageCard, maxWidth: '500px' }}>
          <form onSubmit={handleResetPw}>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Resetting password for: <strong style={{ color: 'var(--black)' }}>{resetPwForm.adminName}</strong></p>
            <div className="form-group"><label>New Password *</label><input type="password" value={resetPwForm.newPassword} onChange={e => setResetPwForm({ ...resetPwForm, newPassword: e.target.value })} required placeholder="Enter new password" /></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button type="button" style={{ ...sty.modalBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => setActivePage(null)}>Cancel</button>
              <button type="submit" style={{ ...sty.modalBtn, background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', color: '#fff' }}>🔑 Reset Password</button>
            </div>
          </form>
        </div>
      </section>
    );

    // ── PLAN FORM ──
    if (activePage === 'plan-form') return (
      <section>
        <PageHeader subtitle={planForm.id ? 'Edit plan configuration' : 'Set up a new pricing tier'} />
        <div style={sty.pageCard}>
          <form onSubmit={handlePlanSubmit}>
            <h4 style={sty.formSection}>💰 Pricing Details</h4>
            <div style={sty.formGrid2}>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Plan Name *</label><input type="text" value={planForm.name} onChange={e => setPlanForm({ ...planForm, name: e.target.value })} required placeholder="e.g. Pro" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Status</label>
                <select value={planForm.status} onChange={e => setPlanForm({ ...planForm, status: e.target.value })}>
                  <option value="Active">Active</option><option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Monthly Price (₹) *</label><input type="number" value={planForm.monthlyPrice} onChange={e => setPlanForm({ ...planForm, monthlyPrice: parseInt(e.target.value) || 0 })} required /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Annual Price (₹) *</label><input type="number" value={planForm.annualPrice} onChange={e => setPlanForm({ ...planForm, annualPrice: parseInt(e.target.value) || 0 })} required /></div>
            </div>
            <h4 style={sty.formSection}>📊 Resource Limits</h4>
            <div style={sty.formGrid3}>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Branch Limit</label><input type="number" value={planForm.branchLimit} onChange={e => setPlanForm({ ...planForm, branchLimit: parseInt(e.target.value) || 1 })} /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>User Limit</label><input type="number" value={planForm.userLimit} onChange={e => setPlanForm({ ...planForm, userLimit: parseInt(e.target.value) || 5 })} /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Order Limit</label><input type="number" value={planForm.orderLimit} onChange={e => setPlanForm({ ...planForm, orderLimit: parseInt(e.target.value) || 500 })} /></div>
            </div>
            <h4 style={sty.formSection}>✨ Features & Auto Renewal</h4>
            <div className="form-group" style={{ marginBottom: '12px' }}><label>Features Included (comma separated)</label><textarea rows="3" value={planForm.features} onChange={e => setPlanForm({ ...planForm, features: e.target.value })} placeholder="Standard Support, Basic Analytics..." /></div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={planForm.autoRenewal} onChange={e => setPlanForm({ ...planForm, autoRenewal: e.target.checked })} style={{ width: '16px', height: '16px' }} />
                Auto Renewal Enabled
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button type="button" style={{ ...sty.modalBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => setActivePage(null)}>Cancel</button>
              <button type="submit" style={{ ...sty.modalBtn, background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', color: '#fff' }}>💾 Save Plan Configuration</button>
            </div>
          </form>
        </div>
      </section>
    );

    // ── UPGRADE / DOWNGRADE ──
    if (activePage === 'plan-upgrade') return (
      <section>
        <PageHeader subtitle="Change a restaurant's subscription plan" />
        <div style={{ ...sty.pageCard, maxWidth: '560px' }}>
          <form onSubmit={handleUpgrade}>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Assign or change a restaurant's subscription plan.</p>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Select Restaurant</label>
              <select value={upgradeForm.restaurantId} onChange={e => setUpgradeForm({ ...upgradeForm, restaurantId: e.target.value })}>
                {Object.values(restaurantsData).map(r => <option key={r.id} value={r.id}>{r.name} (Current: {r.plan})</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>New Plan</label>
              <select value={upgradeForm.planId} onChange={e => setUpgradeForm({ ...upgradeForm, planId: e.target.value })}>
                {saasPlans.map(p => <option key={p.id} value={p.id}>{p.name} — ₹{p.monthlyPrice}/mo</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button type="button" style={{ ...sty.modalBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => setActivePage(null)}>Cancel</button>
              <button type="submit" style={{ ...sty.modalBtn, background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', color: '#fff' }}>⬆️ Apply Change</button>
            </div>
          </form>
        </div>
      </section>
    );

    // ── GENERATE INVOICE ──
    if (activePage === 'invoice-gen') return (
      <section>
        <PageHeader subtitle="Create a new subscription invoice" />
        <div style={sty.pageCard}>
          <form onSubmit={handleGenInvoice}>
            <h4 style={sty.formSection}>📄 Invoice Details</h4>
            <div style={sty.formGrid2}>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Restaurant Name *</label><input type="text" value={genInvoiceForm.restaurant} onChange={e => setGenInvoiceForm({ ...genInvoiceForm, restaurant: e.target.value })} required placeholder="Restaurant Name" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Subscription Plan *</label><input type="text" value={genInvoiceForm.plan} onChange={e => setGenInvoiceForm({ ...genInvoiceForm, plan: e.target.value })} required placeholder="Plan name" /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Amount (₹) *</label><input type="number" value={genInvoiceForm.amount} onChange={e => setGenInvoiceForm({ ...genInvoiceForm, amount: parseFloat(e.target.value) || 0 })} required /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Payment Method</label>
                <select value={genInvoiceForm.paymentMethod} onChange={e => setGenInvoiceForm({ ...genInvoiceForm, paymentMethod: e.target.value })}>
                  <option>Razorpay</option><option>Stripe</option><option>Bank Transfer</option><option>Credit Card</option><option>UPI</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Payment Date</label><input type="date" value={genInvoiceForm.date} onChange={e => setGenInvoiceForm({ ...genInvoiceForm, date: e.target.value })} /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Due Date *</label><input type="date" value={genInvoiceForm.dueDate} onChange={e => setGenInvoiceForm({ ...genInvoiceForm, dueDate: e.target.value })} required /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Payment Status</label>
                <select value={genInvoiceForm.status} onChange={e => setGenInvoiceForm({ ...genInvoiceForm, status: e.target.value })}>
                  <option value="Paid">Paid</option><option value="Pending">Pending</option><option value="Failed">Failed</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button type="button" style={{ ...sty.modalBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => setActivePage(null)}>Cancel</button>
              <button type="submit" style={{ ...sty.modalBtn, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' }}>📄 Generate Invoice</button>
            </div>
          </form>
        </div>
      </section>
    );

    // ── INVOICE VIEW ──
    if (activePage === 'invoice-view' && selectedInvoice) return (
      <section>
        <PageHeader subtitle={`Invoice ${selectedInvoice.id}`} />
        <div style={{ ...sty.pageCard, maxWidth: '560px' }}>
          <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#334155' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px dashed var(--border)' }}>
              <strong style={{ fontSize: '20px', color: 'var(--black)', letterSpacing: '0.5px' }}>SERVIQ SAAS PLATFORM</strong>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>support@serviq.com · www.serviq.com</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div><span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>BILL TO:</span><br /><strong>{selectedInvoice.restaurant}</strong></div>
              <div style={{ textAlign: 'right' }}><span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>INVOICE:</span><br /><strong style={{ fontFamily: 'monospace' }}>{selectedInvoice.id}</strong></div>
            </div>
            <div style={{ background: '#fafafa', borderRadius: '10px', padding: '18px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '10px', fontSize: '11px', color: '#94a3b8' }}><span>DESCRIPTION</span><span>AMOUNT</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}><span>{selectedInvoice.plan} Plan — Monthly</span><strong style={{ color: '#10b981' }}>₹{selectedInvoice.amount.toLocaleString('en-IN')}</strong></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px dashed var(--border)', paddingTop: '16px' }}>
              <Badge status={selectedInvoice.status} />
              <button style={{ background: '#f5f3ff', color: '#7c3aed', border: '1.5px solid #c4b5fd', padding: '8px 18px', fontSize: '12px', fontWeight: 600, borderRadius: '8px', cursor: 'pointer' }} onClick={() => window.print()}>🖨️ Print</button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button style={{ ...sty.modalBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => setActivePage(null)}>Back</button>
          </div>
        </div>
      </section>
    );

    return null;
  };

  // ══════════════════════════════════════════════════════════
  //  MAIN RETURN
  // ══════════════════════════════════════════════════════════
  return (
    <div id="superadmin-view" className="superadmin-wrapper">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar superadmin-sidebar" style={{ backgroundColor: '#0c0a09' }}>
        <div className="sidebar-header-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '24px 16px' }}>
          <div className="sidebar-logo-icon" style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, boxShadow: 'none' }}>
            <img src="/logo.png" alt="Serviq Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-text">Serviq SaaS</span>
            <span className="plan-sub">Super Admin Panel</span>
          </div>
        </div>

        <ul className="sidebar-menu">
          {[
            { key: 'saas-overview', icon: '📊', label: 'Dashboard' },
            { key: 'saas-restaurants', icon: '🏪', label: 'Restaurants' },
            { key: 'saas-admins', icon: '👤', label: 'Admins' },
            { key: 'saas-plans', icon: '💳', label: 'Subscription & Plans' },
            { key: 'saas-invoices', icon: '💰', label: 'Revenue & Billing' },
          ].map(tab => (
            <li key={tab.key} className={`sidebar-item superadmin-sidebar-item ${activeTab === tab.key ? 'active' : ''}`} onClick={() => { setActiveTab(tab.key); setActivePage(null); }}>
              <a href="#">{tab.icon} {tab.label}</a>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">SA</div>
            <div className="user-details">
              <div className="user-name">SaaS Owner</div>
              <div className="user-role">Super Admin</div>
            </div>
          </div>
          <button className="btn btn-outline" onClick={logout} style={{ width: '100%', borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>🔒 Log Out</button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-title-container">
            <h1 className="header-title" style={{ textTransform: 'capitalize', margin: 0 }}>
              {activeTab === 'saas-overview' && 'Dashboard'}
              {activeTab === 'saas-restaurants' && 'Restaurants'}
              {activeTab === 'saas-admins' && 'Admin Management'}
              {activeTab === 'saas-plans' && 'Subscription & Plans'}
              {activeTab === 'saas-invoices' && 'Revenue & Billing'}
            </h1>
            <span className="header-subtitle-date">{dateTimeStr}</span>
          </div>
          <div className="header-actions">
            <button className="btn btn-notify">🔔 Alerts</button>
            <button className="btn btn-user-profile">👤 Super Admin</button>
          </div>
        </header>

        <div className="content-body">
          {activePage ? renderActivePage() : (
            <>
              {activeTab === 'saas-overview' && renderDashboard()}
              {activeTab === 'saas-restaurants' && renderRestaurants()}
              {activeTab === 'saas-admins' && renderAdmins()}
              {activeTab === 'saas-plans' && renderPlans()}
              {activeTab === 'saas-invoices' && renderRevenue()}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
