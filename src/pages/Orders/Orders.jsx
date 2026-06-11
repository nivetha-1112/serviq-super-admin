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

        {/* V3 Minimalist Order Grid */}
        <div className="minimal-orders-grid">
          {filteredOrders.map(ord => {
            const minutesElapsed = parseInt((ord.timeAgo || '').replace(/[^0-9]/g, '')) || 0;
            const itemSummary = ord.items.map(i => `${i.qty}x ${i.name}`).join(', ');

            return (
              <div key={ord.id} className="minimal-order-card">
                <div className={`minimal-icon-box ${ord.status}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
                </div>
                <div>
                  <h3 className="minimal-heading">Table {ord.table} • #{ord.id}</h3>
                  <p className="minimal-desc">{itemSummary}{ord.notes ? ` (Note: ${ord.notes})` : ''}</p>
                  <div style={{ marginTop: '8px', fontSize: '12px' }}>
                    <span 
                      style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      onClick={() => setAssignWaiterModal({ isOpen: true, orderId: ord.id, selectedWaiter: ord.waiter || '' })}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {ord.waiter ? `Waiter: ${ord.waiter}` : 'Assign Waiter'}
                    </span>
                  </div>
                </div>
                
                <div className="minimal-btn-row">
                  <button className="minimal-btn minimal-btn-outline" onClick={() => { setActiveViewOrder(ord); setActivePage('order-view'); }}>View Details</button>
                  {ord.status === 'new' && (
                    <button className="minimal-btn minimal-btn-solid" onClick={() => handleOrderStatusUpdate(ord.id, ord.status)}>Accept Order</button>
                  )}
                  {ord.status === 'preparing' && (
                    <button className="minimal-btn minimal-btn-solid" onClick={() => handleOrderStatusUpdate(ord.id, ord.status)}>Mark as Ready</button>
                  )}
                  {ord.status === 'ready' && (
                    <button className="minimal-btn minimal-btn-solid" style={{ background: '#16a34a', borderColor: '#16a34a' }} onClick={() => handleOrderStatusUpdate(ord.id, ord.status)}>Serve Order</button>
                  )}
                  {ord.status === 'done' && (
                    <button className="minimal-btn minimal-btn-solid" style={{ background: '#000', borderColor: '#000', cursor: 'default' }} disabled>Served</button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="mockup2-empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
              <h3 style={{ fontSize: '15px', color: '#64748b', marginBottom: '8px' }}>Monitoring kitchen traffic...</h3>
              <p style={{ fontSize: '13px', margin: 0, maxWidth: '200px' }}>New orders will appear here in real-time.</p>
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
