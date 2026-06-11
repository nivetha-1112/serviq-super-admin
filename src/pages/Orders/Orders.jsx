import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppContext';
import PageHeader from '../../components/PageHeader';
import { Badge } from '../../components/Badge';

const sty = {
  pageCard: { background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
  pageInlineHeader: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--primary-light)' },
  pageBackBtn: { background: '#fff', border: '1.5px solid var(--border)', borderRadius: '10px', width: '38px', height: '38px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s', flexShrink: 0 },
};

export default function Orders() {
  const { activeRestaurant, updateOrderStatus, assignWaiterToOrder, updateOrder, addToast } = useAppState();

  const [orderFilter, setOrderFilter] = useState('All');
  const [selectedWaiterFilter, setSelectedWaiterFilter] = useState('All Waiters');
  const [orderSearch, setOrderSearch] = useState('');
  const [rushOnly, setRushOnly] = useState(false);
  const [assignWaiterModal, setAssignWaiterModal] = useState({ isOpen: false, orderId: null, selectedWaiter: '' });

  const [activePage, setActivePage] = useState(null);
  const [activeViewOrder, setActiveViewOrder] = useState(null);
  const [activeEditOrder, setActiveEditOrder] = useState(null);
  const [editOrderForm, setEditOrderForm] = useState({ table: '', notes: '', waiter: 'Unassigned' });

  const [waiterDropdownOpen, setWaiterDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [orderSort, setOrderSort] = useState('newest');

  if (!activeRestaurant) return null;

  const { orders = [], tables = [], staff = [], name, plan } = activeRestaurant;
  
  const occupiedTablesCount = tables.filter(t => t.status === 'Occupied').length;

  // 2. RENDER INCOMING ORDERS
  const handleOrderStatusUpdate = (orderId, currentStatus) => {
    let nextStatus = 'preparing';
    if (currentStatus === 'new') nextStatus = 'preparing';
    else if (currentStatus === 'preparing') nextStatus = 'ready';
    else if (currentStatus === 'ready') nextStatus = 'done';

    updateOrderStatus(activeRestaurant.id, orderId, nextStatus);
  };

  const renderOrders = () => {

    const waitersList = staff.filter(s => s.role === 'Waiter').map(s => s.name);

    let filteredOrders = [...orders];

    // 1. Waiter filter
    if (selectedWaiterFilter !== 'All Waiters') {
      filteredOrders = filteredOrders.filter(o => o.waiter === selectedWaiterFilter);
    }

    // 2. Status filter
    if (orderFilter !== 'All') {
      filteredOrders = filteredOrders.filter(o => o.status === orderFilter.toLowerCase());
    }

    // 3. Search filter
    if (orderSearch) {
      const query = orderSearch.toLowerCase().trim();
      filteredOrders = filteredOrders.filter(o =>
        o.id.toLowerCase().includes(query) ||
        o.table.toLowerCase().includes(query) ||
        o.items.some(item => item.name.toLowerCase().includes(query))
      );
    }

    // 4. Delay Risk (Rush Only) filter
    if (rushOnly) {
      filteredOrders = filteredOrders.filter(o => {
        const minutesElapsed = parseInt(o.timeAgo.replace(/[^0-9]/g, '')) || 0;
        return ((o.status === 'new' || o.status === 'preparing') && minutesElapsed >= 20);
      });
    }

    return (
      <section className="panel-view active" style={{ padding: 0 }}>
        {/* V2 KPI Cards Grid */}
        <div className="mockup2-kpi-grid">
          <div className="mockup2-kpi-card">
            <div className="mockup2-kpi-icon orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </div>
            <div className="mockup2-kpi-info">
              <span className="mockup2-kpi-label">TOTAL ACTIVE ORDERS</span>
              <div className="mockup2-kpi-value-row">
                <h3 className="mockup2-kpi-value">{orders.filter(o => o.status !== 'done').length}</h3>
                <span className="mockup2-kpi-sub up">+12%</span>
              </div>
            </div>
          </div>
          <div className="mockup2-kpi-card">
            <div className="mockup2-kpi-icon grey">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div className="mockup2-kpi-info">
              <span className="mockup2-kpi-label">AVG. PREPARATION</span>
              <div className="mockup2-kpi-value-row">
                <h3 className="mockup2-kpi-value">18m</h3>
                <span className="mockup2-kpi-sub down">-2m</span>
              </div>
            </div>
          </div>
          <div className="mockup2-kpi-card">
            <div className="mockup2-kpi-icon grey">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            </div>
            <div className="mockup2-kpi-info">
              <span className="mockup2-kpi-label">TABLES OCCUPIED</span>
              <div className="mockup2-kpi-value-row">
                <h3 className="mockup2-kpi-value">{occupiedTablesCount}/{tables.length || 22}</h3>
                <span className="mockup2-kpi-sub neutral">85% Capacity</span>
              </div>
            </div>
          </div>
          <div className="mockup2-kpi-card">
            <div className="mockup2-kpi-icon orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div className="mockup2-kpi-info">
              <span className="mockup2-kpi-label">STAFF ONLINE</span>
              <div className="mockup2-kpi-value-row">
                <h3 className="mockup2-kpi-value">{staff.filter(s => s.status === 'On Duty').length}</h3>
                <span className="mockup2-kpi-sub pill">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* V2 Stream Header */}
        <div className="mockup2-stream-header">
          <h2 className="mockup2-stream-title">Live Order Stream</h2>
          <span className="mockup2-stream-badge">4 NEW</span>

          <div className="mockup2-stream-controls">
            <div className="mockup2-segmented-control">
              <button className="mockup2-segment-btn active">All Orders</button>
              <button className="mockup2-segment-btn">Rush Only</button>
            </div>
            <button className="mockup2-outline-dropdown">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filter by Status
            </button>
            <button className="mockup2-outline-dropdown">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              Sort by Time
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: '900px' }}>
            <colgroup>
              <col style={{ width: '100px' }} />
              <col style={{ width: '80px' }} />
              <col style={{ width: '220px' }} />
              <col style={{ width: '110px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '80px' }} />
              <col style={{ width: '110px' }} />
              <col style={{ width: '110px' }} />
              <col style={{ width: '120px' }} />
            </colgroup>
            <thead>
              <tr style={{ background: '#111111' }}>
                {['ORDER ID','TABLE','ITEMS & NOTES','TIME','WAITER','TOTAL','STATUS','PAYMENT','ACTIONS'].map(h => (
                  <th key={h} style={{
                    padding: '12px 14px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#ff7a00',
                    letterSpacing: '0.06em',
                    textAlign: h === 'ACTIONS' ? 'center' : 'left',
                    whiteSpace: 'nowrap',
                    borderBottom: '2px solid #ff7a00',
                    fontFamily: 'Outfit, sans-serif'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord, idx) => {
                const isEven = idx % 2 === 0;
                const statusColors = {
                  new: { bg: 'rgba(255,122,0,0.08)', dot: '#ff7a00', text: 'NEW' },
                  preparing: { bg: 'rgba(234,179,8,0.1)', dot: '#ca8a04', text: 'PREPARING' },
                  ready: { bg: 'rgba(22,163,74,0.08)', dot: '#16a34a', text: 'READY' },
                  done: { bg: 'rgba(100,116,139,0.08)', dot: '#64748b', text: 'COMPLETED' },
                };
                const sc = statusColors[ord.status] || statusColors.new;

                return (
                  <tr
                    key={ord.id}
                    style={{ background: isEven ? '#ffffff' : '#fafafa', borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fff7ed'}
                    onMouseLeave={e => e.currentTarget.style.background = isEven ? '#ffffff' : '#fafafa'}
                  >
                    {/* ORDER ID */}
                    <td style={{ padding: '14px 14px', verticalAlign: 'middle' }}>
                      <span style={{ fontWeight: 700, fontSize: '13px', color: '#1e293b', fontFamily: 'Outfit, sans-serif' }}>
                        #{ord.id}
                      </span>
                    </td>

                    {/* TABLE */}
                    <td style={{ padding: '14px 14px', verticalAlign: 'middle' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                        Table {ord.table}
                      </span>
                    </td>

                    {/* ITEMS & NOTES */}
                    <td style={{ padding: '14px 14px', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {ord.items.map((item, i) => (
                          <span key={i} style={{ fontSize: '13px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {item.name}
                            <span style={{ background: '#fff3e0', color: '#ff7a00', fontSize: '10px', fontWeight: 700, padding: '1px 5px', borderRadius: '4px' }}>
                              x{item.qty}
                            </span>
                          </span>
                        ))}
                        {ord.notes && (
                          <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', marginTop: '2px' }}>
                            🌿 {ord.notes}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* TIME */}
                    <td style={{ padding: '14px 14px', verticalAlign: 'middle' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>
                        {(ord.timeAgo || '').replace(/ ago ago$/i, ' ago').replace(/ago ago/gi, 'ago')}
                      </span>
                    </td>

                    {/* WAITER */}
                    <td style={{ padding: '14px 14px', verticalAlign: 'middle' }}>
                      <span
                        style={{ fontSize: '12px', color: ord.waiter ? '#334155' : '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                        onClick={() => setAssignWaiterModal({ isOpen: true, orderId: ord.id, selectedWaiter: ord.waiter || '' })}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        {ord.waiter || 'Unassigned'}
                      </span>
                    </td>

                    {/* TOTAL */}
                    <td style={{ padding: '14px 14px', verticalAlign: 'middle' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>₹{ord.total}</span>
                    </td>

                    {/* STATUS */}
                    <td style={{ padding: '14px 14px', verticalAlign: 'middle' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        background: sc.bg, padding: '4px 9px', borderRadius: '20px',
                        fontSize: '10px', fontWeight: 700, color: sc.dot, letterSpacing: '0.04em',
                        border: `1px solid ${sc.dot}33`, whiteSpace: 'nowrap'
                      }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: sc.dot, display: 'inline-block', flexShrink: 0 }} />
                        {sc.text}
                      </span>
                    </td>

                    {/* PAYMENT */}
                    <td style={{ padding: '14px 14px', verticalAlign: 'middle' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        background: ord.billingStatus === 'paid' ? 'rgba(22,163,74,0.08)' : 'rgba(255,122,0,0.08)',
                        color: ord.billingStatus === 'paid' ? '#16a34a' : '#ff7a00',
                        border: `1px solid ${ord.billingStatus === 'paid' ? '#16a34a33' : '#ff7a0033'}`,
                        padding: '4px 9px', borderRadius: '20px', fontSize: '10px', fontWeight: 700,
                        letterSpacing: '0.04em', whiteSpace: 'nowrap'
                      }}>
                        🔥 {ord.billingStatus === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td style={{ padding: '14px 14px', verticalAlign: 'middle', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {/* View icon */}
                        <button
                          title="View Details"
                          onClick={() => { setActiveViewOrder(ord); setActivePage('order-view'); }}
                          style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '6px', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', transition: 'all 0.15s', flexShrink: 0 }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff7a00'; e.currentTarget.style.color = '#ff7a00'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>

                        {/* Status action button */}
                        {ord.status === 'new' && (
                          <button onClick={() => handleOrderStatusUpdate(ord.id, ord.status)} style={{ background: '#ff7a00', color: '#fff', border: 'none', borderRadius: '6px', width: '90px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif', boxSizing: 'border-box' }}>
                            Accept
                          </button>
                        )}
                        {ord.status === 'preparing' && (
                          <button onClick={() => handleOrderStatusUpdate(ord.id, ord.status)} style={{ background: '#ff7a00', color: '#fff', border: 'none', borderRadius: '6px', width: '90px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif', boxSizing: 'border-box' }}>
                            Ready
                          </button>
                        )}
                        {ord.status === 'ready' && (
                          <button onClick={() => handleOrderStatusUpdate(ord.id, ord.status)} style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', width: '90px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif', boxSizing: 'border-box' }}>
                            Complete
                          </button>
                        )}
                        {ord.status === 'done' && (
                          <button disabled style={{ background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', width: '90px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, cursor: 'default', whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif', boxSizing: 'border-box' }}>
                            Completed
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 24px', color: '#94a3b8' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.4 }}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
              <h3 style={{ fontSize: '15px', color: '#64748b', marginBottom: '8px' }}>Monitoring kitchen traffic...</h3>
              <p style={{ fontSize: '13px', margin: 0 }}>New orders will appear here in real-time.</p>
            </div>
          )}
        </div>

        {assignWaiterModal.isOpen && (
          <div className="modal-overlay">
            <div className="modal-card" style={{ maxWidth: '400px', padding: 0, overflow: 'hidden' }}>
              <div className="modal-header-flex" style={{ padding: '24px 24px 0 24px', borderBottom: 'none', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', background: 'none', WebkitTextFillColor: 'initial' }}>Assign Waiter</h3>
                <button className="modal-close" style={{ background: 'none', border: 'none', fontSize: '20px' }} onClick={() => setAssignWaiterModal({ isOpen: false, orderId: null, selectedWaiter: '' })}>✕</button>
              </div>
              <div style={{ padding: '0 24px 24px 24px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Select Waiter for Order #{assignWaiterModal.orderId}</label>
                  <select
                    style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', backgroundSize: '14px', width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer' }}
                    value={assignWaiterModal.selectedWaiter}
                    onChange={(e) => setAssignWaiterModal({ ...assignWaiterModal, selectedWaiter: e.target.value })}
                  >
                    <option value="">Select Waiter...</option>
                    {activeRestaurant?.staff?.filter(s => s.role === 'Waiter').map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                    {(!activeRestaurant?.staff || activeRestaurant.staff.filter(s => s.role === 'Waiter').length === 0) && (
                      <>
                        <option value="Arjun K.">Arjun K.</option>
                        <option value="Priya M.">Priya M.</option>
                        <option value="Rahul S.">Rahul S.</option>
                        <option value="Anita D.">Anita D.</option>
                        <option value="Vikram S.">Vikram S.</option>
                      </>
                    )}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setAssignWaiterModal({ isOpen: false, orderId: null, selectedWaiter: '' })} style={{ padding: '10px 24px', fontSize: '14px', borderRadius: '8px' }}>Cancel</button>
                  <button type="button" className="btn" style={{ background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 700, padding: '10px 24px', fontSize: '14px', borderRadius: '8px' }} onClick={() => {
                    assignWaiterToOrder(activeRestaurant.id, assignWaiterModal.orderId, assignWaiterModal.selectedWaiter);
                    setAssignWaiterModal({ isOpen: false, orderId: null, selectedWaiter: '' });
                    addToast(`Waiter assigned to Order #${assignWaiterModal.orderId}`);
                  }}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );

  const pageTitle = {
    'order-edit-form': ' Edit Order Details',
    'order-view': activeViewOrder ? `Order Details - #ORD-${activeViewOrder.id}` : 'Order Details',
  };

  const PageHeaderLocal = ({ subtitle }) => (
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

  const activeOrdersForWaiters = orders.filter(o => o.status !== 'done');
  const getWaiterLabel = (s) => {
    if (s.status === 'Off Duty') {
      return `${s.name} (Off Duty)`;
    }
    const assigned = activeOrdersForWaiters
      .filter(o => o.waiter === s.name)
      .map(o => `Table ${o.table}`);
    const uniqueTables = [...new Set(assigned)];
    if (uniqueTables.length > 0) {
      return `${s.name} (Serving ${uniqueTables.join(', ')})`;
    } else {
      return `${s.name} (Available)`;
    }
  };

  return (
    <>
      {(!activePage || activePage === 'order-view') && renderOrders()}
      {activePage === 'order-edit-form' && activeEditOrder && (
        <div style={{marginTop: '20px'}}>
        <section>
          <div style={{ width: '100%' }}>
            <PageHeaderLocal subtitle={`Modify details for order #ORD-${activeEditOrder.id}`} />
            <div style={sty.pageCard}>
              <form onSubmit={(e) => {
                e.preventDefault();
                updateOrder(activeRestaurant.id, activeEditOrder.id, {
                  table: editOrderForm.table,
                  notes: editOrderForm.notes,
                  waiter: editOrderForm.waiter
                });
                setActiveEditOrder(null);
                setActivePage(null);
                setActiveTab('orders');
                addToast('Order updated successfully!');
              }} style={{ width: '100%' }}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Table Number</label>
                  <input
                    type="text"
                    value={editOrderForm.table}
                    readOnly
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-main)',
                      cursor: 'not-allowed',
                      opacity: 0.8
                    }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Assigned Waiter</label>
                  <select
                    value={editOrderForm.waiter}
                    onChange={e => setEditOrderForm({ ...editOrderForm, waiter: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'white', color: 'black' }}
                  >
                    <option value="Unassigned">Unassigned</option>
                    {staff.filter(s => s.role === 'Waiter').map(s => (
                      <option key={s.id} value={s.name} disabled={s.status === 'Off Duty'}>
                        {getWaiterLabel(s)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Notes</label>
                  <textarea
                    value={editOrderForm.notes}
                    onChange={e => setEditOrderForm({ ...editOrderForm, notes: e.target.value })}
                    rows="3"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setActiveEditOrder(null);
                      setActivePage(null);
                    }}
                    style={{ padding: '10px 24px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-black"
                    style={{ padding: '10px 24px' }}
                  >
                    💾 Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        </div>
      )}
              {activePage === 'order-view' && activeViewOrder && (
          <div className="order-view-modal-overlay">
            <div className="order-view-modal-container">
              {/* Close Button Top Right */}
              <button
                className="order-view-modal-close-btn"
                onClick={() => {
                  setActiveViewOrder(null);
                  setActivePage(null);
                }}
              >
                ✕
              </button>

              {/* Header */}
              <div className="order-view-modal-header">
                <div className="order-view-modal-title-row">
                  <h2 className="order-view-modal-title">Order Details</h2>
                  <span className="order-view-modal-id-badge">#ORD-{activeViewOrder.id}</span>
                </div>
                <span className="order-view-modal-subtitle">
                  Detailed breakdown and ticket information for receipt
                </span>
              </div>

              {/* Body */}
              <div className="order-view-modal-body">
                {/* 2x2 Meta Grid */}
                <div className="order-view-meta-grid">
                  <div className="order-view-meta-card">
                    <span className="order-view-meta-label">Dining Table</span>
                    <span className="order-view-meta-value">Table {activeViewOrder.table}</span>
                  </div>
                  <div className="order-view-meta-card">
                    <span className="order-view-meta-label">Waiter Assigned</span>
                    <span className="order-view-meta-value">{activeViewOrder.waiter || 'Unassigned'}</span>
                  </div>
                  <div className="order-view-meta-card">
                    <span className="order-view-meta-label">Order Time</span>
                    <span className="order-view-meta-value">{activeViewOrder.time}</span>
                  </div>
                  <div className="order-view-meta-card">
                    <span className="order-view-meta-label">Wait Time</span>
                    <span className="order-view-meta-value highlight-orange">{activeViewOrder.timeAgo}</span>
                  </div>
                </div>

                {/* Status Badge Block */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Status:</span>
                  <Badge status={activeViewOrder.status} />
                  {activeViewOrder.billingStatus && (
                    <span className={`order-card-status-badge-premium billing-${activeViewOrder.billingStatus === 'paid' ? 'paid' : 'unpaid'}`} style={{ fontSize: '9px', marginLeft: 'auto' }}>
                      💰 {activeViewOrder.billingStatus.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Notes Block */}
                {activeViewOrder.notes && (
                  <div className="order-view-note-box">
                    <strong>Special Request Note:</strong> "{activeViewOrder.notes}"
                  </div>
                )}

                {/* Items Table */}
                <div className="order-view-items-section">
                  <span className="order-view-items-title">Dishes Summary</span>
                  <table className="menu-items-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th style={{ textAlign: 'center' }}>Qty</th>
                        <th style={{ textAlign: 'right' }}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeViewOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="order-view-item-name-cell">
                              <span>{item.name}</span>
                            </div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className="order-view-item-qty-badge">x {item.qty}</span>
                          </td>
                          <td className="order-view-item-price">₹{item.price * item.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Billing Summary Panel */}
                <div className="order-view-billing-summary">
                  <div className="order-view-billing-row">
                    <span>Subtotal</span>
                    <strong style={{ color: 'var(--text-main)' }}>₹{activeViewOrder.subtotal}</strong>
                  </div>
                  <div className="order-view-billing-row">
                    <span>Tax (GST & SC)</span>
                    <strong style={{ color: 'var(--text-main)' }}>₹{activeViewOrder.tax}</strong>
                  </div>
                  <div className="order-view-billing-row total-row">
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Grand Total</span>
                    <span className="order-view-billing-total">₹{activeViewOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="order-view-modal-footer">
                <button
                  className="btn btn-outline"
                  style={{ padding: '10px 20px', fontSize: '13px' }}
                  onClick={() => addToast(`Print receipt ORD-${activeViewOrder.id}`)}
                >
                  🖨️ Print Receipt
                </button>
                <button
                  className="btn btn-black"
                  style={{ padding: '10px 24px', fontSize: '13px' }}
                  onClick={() => {
                    setActiveViewOrder(null);
                    setActivePage(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
