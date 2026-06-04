import React, { useState, useEffect } from 'react';
import { useAppState } from '../config/AppContext';
import { Badge } from '../components/Badge';

export default function Admin() {
  const {
    currentUser,
    activeRestaurant,
    isImpersonating,
    exitImpersonation,
    logout,
    saveRestaurantSettings,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addDiningTable,
    updateDiningTableSeats,
    addStaff,
    updateStaff,
    deleteStaff,
    updateKitchenPassword,
    updateOrderStatus,
    markBillAsPaid,
    darkMode,
    setDarkMode,
    accentColor,
    setAccentColor,
    qrCustomizer,
    setQrCustomizer,
    setActiveCustomerTable,
    setCart
  } = useAppState();

  const [activeTab, setActiveTab] = useState('overview');
  const [dateTimeStr, setDateTimeStr] = useState('');

  // 1. Dashboard states
  // 2. Incoming Orders states
  const [orderFilter, setOrderFilter] = useState('All'); // All, New, Preparing, Ready, Done

  // 3. Menu Management states
  const [menuCategory, setMenuCategory] = useState('All Items');
  const [menuSearch, setMenuSearch] = useState('');
  const [menuSort, setMenuSort] = useState('name');
  const [activePage, setActivePage] = useState(null); // 'menu-form' | 'table-form' | 'staff-form' | 'kitchen-form'
  const [menuForm, setMenuForm] = useState({ id: '', name: '', desc: '', price: '', category: 'Starters', image: '' });

  // 4. Billing Panel states
  const [selectedBillingTable, setSelectedBillingTable] = useState('');
  const [billingPaymentMethod, setBillingPaymentMethod] = useState('UPI');

  // 5. Tables & QR Management states
  const [selectedTableId, setSelectedTableId] = useState('');
  const [addTableForm, setAddTableForm] = useState({ id: '', seats: 4 });

  // 6. Staff states
  const [staffForm, setStaffForm] = useState({ id: '', name: '', role: 'Waiter', phone: '', email: '', password: '', status: 'On Duty' });
  const [kitchenPasswordForm, setKitchenPasswordForm] = useState('');

  const pageTitle = {
    'menu-form': menuForm.id ? ' Edit Menu Item' : ' Add New Menu Item',
    'table-form': ' Add Dining Table',
    'staff-form': staffForm.id ? ' Edit Staff Details' : 'Register New Staff',
    'kitchen-form': ' Kitchen Shared Credentials',
  };

  const sty = {
    pageInlineHeader: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--primary-light)' },
    pageBackBtn: { background: '#fff', border: '1.5px solid var(--border)', borderRadius: '10px', width: '38px', height: '38px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s', flexShrink: 0 },
    pageCard: { background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
    formGrid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' },
  };

  // 7. Settings states
  const [settingsForm, setSettingsForm] = useState({ name: '', tagline: '', currency: '₹', tablesCount: 5, taxRate: 5, serviceChargeRate: 0, darkMode: false });

  // Setup Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      setDateTimeStr(now.toLocaleDateString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sync settings form when active restaurant loads
  useEffect(() => {
    if (activeRestaurant) {
      setSettingsForm({
        name: activeRestaurant.name || '',
        tagline: activeRestaurant.settings?.tagline || '',
        currency: activeRestaurant.settings?.currency || '₹',
        tablesCount: activeRestaurant.settings?.tablesCount || 5,
        taxRate: parseFloat((activeRestaurant.settings?.taxRate * 100 * 2).toFixed(1)) || 5, // Split tax representation
        serviceChargeRate: parseFloat((activeRestaurant.settings?.serviceChargeRate * 100).toFixed(1)) || 0,
        darkMode: darkMode
      });

      // Default select first table in Tables Page
      if (activeRestaurant.tables?.length > 0 && !selectedTableId) {
        setSelectedTableId(activeRestaurant.tables[0].id);
      }

      // Default select first billing table
      if (activeRestaurant.billingData?.length > 0 && !selectedBillingTable) {
        setSelectedBillingTable(activeRestaurant.billingData[0].table);
      }
    }
  }, [activeRestaurant, darkMode]);

  if (!activeRestaurant) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>No active restaurant loaded. Please log in again.</div>;
  }

  const { name, plan, tables = [], orders = [], menu = [], staff = [], billingData = [], kitchenLogin = { email: '', password: '' } } = activeRestaurant;

  // Filter sidebar based on role
  const role = currentUser?.role || 'Waiter';
  const isTabAllowed = (tab) => {
    if (role === 'Admin') return true;
    if (role === 'Kitchen') return ['orders'].includes(tab);
    if (role === 'Waiter') return ['orders', 'saas'].includes(tab);
    return false;
  };

  const iconBtnStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    border: '1.5px solid',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    padding: 0,
    transition: 'all 0.2s ease',
    position: 'relative'
  };

  const iconBtnEditStyle = {
    ...iconBtnStyle,
    background: '#eff6ff',
    color: '#3b82f6',
    borderColor: '#93c5fd',
    marginRight: '6px'
  };

  const iconBtnDeleteStyle = {
    ...iconBtnStyle,
    background: '#fef2f2',
    color: '#ef4444',
    borderColor: '#fca5a5'
  };

  const IconBtn = ({ icon, tooltip, style, onClick }) => (
    <button title={tooltip} style={style} onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
    >{icon}</button>
  );

  // KPIs
  const todayRevenue = orders
    .filter(o => o.billingStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'new').length;
  const preparingOrdersCount = orders.filter(o => o.status === 'preparing').length;
  const occupiedTablesCount = tables.filter(t => t.status === 'Occupied').length;

  // 1. RENDER OVERVIEW PANEL
  const renderOverview = () => (
    <section className="panel-view active">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Today's Revenue</div>
              <h3>₹{todayRevenue.toLocaleString('en-IN')}</h3>
              <div className="stat-sub-label green-label">+12% from yesterday</div>
            </div>
            <div className="stat-icon-wrapper font-rupee">₹</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Total Orders</div>
              <h3>{orders.length}</h3>
              <div className="stat-sub-label green-label">{preparingOrdersCount} in progress</div>
            </div>
            <div className="stat-icon-wrapper">📋</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Active Tables</div>
              <h3>{occupiedTablesCount} / {tables.length}</h3>
              <div className="stat-sub-label green-label">{tables.length - occupiedTablesCount} tables available</div>
            </div>
            <div className="stat-icon-wrapper">🪑</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Pending Orders</div>
              <h3>{pendingOrdersCount}</h3>
              <div className="stat-sub-label red-label">Needs attention</div>
            </div>
            <div className="stat-icon-wrapper">⏱️</div>
          </div>
        </div>
      </div>

      <div className="dashboard-inner-grid">
        <div className="feed-card">
          <div className="feed-header">
            <h2 className="feed-title">Live Order Feed</h2>
            <span className="live-dot-indicator"><span className="pulse-dot"></span>Live</span>
          </div>
          <div className="feed-table-wrapper">
            <table className="menu-items-table feed-table">
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>TABLE</th>
                  <th>ITEMS</th>
                  <th>TIME</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(-5).reverse().map(ord => {
                  const itemSummary = ord.items.map(i => `${i.name} x ${i.qty}`).join(', ');
                  return (
                    <tr key={ord.id}>
                      <td>#{ord.id}</td>
                      <td>Table {ord.table}</td>
                      <td className="items-cell" title={itemSummary}>{itemSummary}</td>
                      <td>{ord.timeAgo}</td>
                      <td><Badge status={ord.status} /></td>
                    </tr>
                  );
                })}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>No live orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="tables-widget-card">
          <h2 className="feed-title" style={{ marginBottom: '20px' }}>Tables</h2>
          <div className="tables-status-grid">
            {tables.map(table => (
              <div key={table.id} className={`dash-table-cell ${table.status.toLowerCase()}`}>
                <div className="table-cell-id">{table.id}</div>
                <div className="table-cell-status">{table.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // 2. RENDER INCOMING ORDERS
  const handleOrderStatusUpdate = (orderId, currentStatus) => {
    let nextStatus = 'preparing';
    if (currentStatus === 'new') nextStatus = 'preparing';
    else if (currentStatus === 'preparing') nextStatus = 'ready';
    else if (currentStatus === 'ready') nextStatus = 'done';

    updateOrderStatus(activeRestaurant.id, orderId, nextStatus);
  };

  const renderOrders = () => {
    let filteredOrders = [...orders].reverse();
    if (orderFilter !== 'All') {
      filteredOrders = filteredOrders.filter(o => o.status === orderFilter.toLowerCase());
    }

    return (
      <section className="panel-view active">
        <div className="panel-header-flex">
          <div className="panel-title-desc">
            <h2 className="panel-inner-title">Incoming Orders</h2>
            <p className="panel-inner-desc">Manage and process all live orders</p>
          </div>
          <div className="filter-tabs-row">
            {['All', 'New', 'Preparing', 'Ready', 'Done'].map(tab => (
              <button
                key={tab}
                className={`filter-btn ${orderFilter === tab ? 'active' : ''}`}
                onClick={() => setOrderFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="incoming-orders-list-wrapper">
          {filteredOrders.map(ord => (
            <div key={ord.id} className="incoming-order-bar">
              <div className="order-bar-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="order-bar-id">#ORD-{ord.id}</span>
                  <span className="order-bar-table">📍 Table {ord.table}</span>
                  <span className="order-bar-time">🕒 {ord.time} · {ord.timeAgo}</span>
                </div>
                <Badge status={ord.status} />
              </div>
              <div className="order-bar-content">
                <div className="order-bar-details">
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Items</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {ord.items.map((item, idx) => (
                      <span key={idx} className="order-item-pill">{item.name} × {item.qty}</span>
                    ))}
                  </div>
                  {ord.notes && <div className="order-item-note">📝 Note: {ord.notes}</div>}
                </div>
                <div className="order-bar-actions">
                  {ord.status === 'done' ? (
                    <span style={{ fontSize: '13px', color: 'var(--success)', fontWeight: 600 }}>✔️ Served & Paid</span>
                  ) : (
                    <>
                      <button className="btn-print" onClick={() => alert(`Print receipt ORD-${ord.id}`)}>🖨️ Print</button>
                      <button
                        className="btn-mark-complete"
                        onClick={() => handleOrderStatusUpdate(ord.id, ord.status)}
                      >
                        {ord.status === 'new' && '🍳 Prepare'}
                        {ord.status === 'preparing' && '🔔 Set Ready'}
                        {ord.status === 'ready' && '🍽️ Serve / Done'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredOrders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No orders in {orderFilter} status.</div>
          )}
        </div>
      </section>
    );
  };

  // 3. RENDER MENU MANAGEMENT
  const handleMenuSubmit = (e) => {
    e.preventDefault();
    if (menuForm.id) {
      updateMenuItem(activeRestaurant.id, {
        ...menuForm,
        price: parseFloat(menuForm.price) || 0
      });
      alert('Menu item updated!');
    } else {
      addMenuItem(activeRestaurant.id, {
        id: 'menu-' + Date.now(),
        name: menuForm.name,
        desc: menuForm.desc,
        price: parseFloat(menuForm.price) || 0,
        category: menuForm.category,
        image: menuForm.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
        available: true
      });
      alert('New dish added to menu!');
    }
    setActivePage(null);
  };

  const openAddMenuModal = () => {
    setMenuForm({ id: '', name: '', desc: '', price: '', category: 'Starters', image: '' });
    setActivePage('menu-form');
  };

  const openEditMenuModal = (item) => {
    setMenuForm({
      id: item.id,
      name: item.name,
      desc: item.desc || '',
      price: item.price.toString(),
      category: item.category,
      image: item.image || ''
    });
    setActivePage('menu-form');
  };

  const handleDeleteMenu = (itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      deleteMenuItem(activeRestaurant.id, itemId);
    }
  };

  const renderMenu = () => {
    // Unique categories from current menu items
    const categoriesList = ['All Items', 'Starters', 'Rice Meals', 'Tiffin', 'Rotis', 'Desserts', 'Drinks'];

    let filteredMenu = menu;
    if (menuCategory !== 'All Items') {
      filteredMenu = filteredMenu.filter(item => item.category === menuCategory);
    }
    if (menuSearch) {
      filteredMenu = filteredMenu.filter(item => item.name.toLowerCase().includes(menuSearch.toLowerCase()));
    }

    // Sort
    filteredMenu = [...filteredMenu].sort((a, b) => {
      if (menuSort === 'name') return a.name.localeCompare(b.name);
      if (menuSort === 'price-asc') return a.price - b.price;
      if (menuSort === 'price-desc') return b.price - a.price;
      return 0;
    });

    return (
      <section className="panel-view active">
        <div className="panel-header-flex" style={{ marginBottom: '20px' }}>
          <div className="panel-title-desc">
            <h2 className="panel-inner-title">Menu Management</h2>
            <p className="panel-inner-desc">Add, edit, and manage your menu items</p>
          </div>
          <button className="btn btn-black" onClick={openAddMenuModal}>
            ➕ Add New Item
          </button>
        </div>

        <div className="menu-manager-grid">
          {/* Categories Side Navigation */}
          <div className="menu-categories-column">
            <div className="column-header-title">CATEGORIES</div>
            <ul className="categories-list-menu">
              {categoriesList.map(cat => {
                const count = cat === 'All Items' ? menu.length : menu.filter(i => i.category === cat).length;
                return (
                  <li
                    key={cat}
                    className={menuCategory === cat ? 'active' : ''}
                    onClick={() => setMenuCategory(cat)}
                  >
                    <span>{cat}</span>
                    <span className="category-count-badge">{count}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Items Listing */}
          <div className="menu-items-column">
            <div className="menu-search-sort-row">
              <div className="menu-search-wrapper">
                <span className="search-input-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sort by</span>
                <select
                  value={menuSort}
                  onChange={(e) => setMenuSort(e.target.value)}
                  style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '6px', background: 'white' }}
                >
                  <option value="name">Name</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="menu-table-wrapper">
              <table className="menu-items-table">
                <tbody>
                  {filteredMenu.map(item => (
                    <tr key={item.id}>
                      <td style={{ width: '60px', padding: '12px' }}>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover', display: 'block' }}
                          />
                        ) : (
                          <div style={{ width: '48px', height: '48px', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                            🍴
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ fontSize: '15px' }}>{item.name}</strong>
                          {item.veg ? <span style={{ color: '#16a34a', fontSize: '12px' }}>🟢 Veg</span> : <span style={{ color: '#dc2626', fontSize: '12px' }}>🔴 Non-Veg</span>}
                        </div>
                        <div style={{ fontSize: '12px', color: '#000000', marginTop: '4px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.desc || 'No description provided.'}
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: '#000000', fontSize: '13px' }}>{item.category}</td>
                      <td style={{ padding: '12px', fontWeight: 700, fontSize: '15px' }}>₹{item.price}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <IconBtn icon="✏️" tooltip="Edit" style={iconBtnEditStyle} onClick={() => openEditMenuModal(item)} />
                        <IconBtn icon="🗑️" tooltip="Delete" style={iconBtnDeleteStyle} onClick={() => handleDeleteMenu(item.id)} />
                      </td>
                    </tr>
                  ))}
                  {filteredMenu.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>No menu dishes found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 4. RENDER BILLING PANEL
  const handleMarkAsPaid = () => {
    if (!selectedBillingTable) return;
    markBillAsPaid(activeRestaurant.id, selectedBillingTable);
    alert(`Marked bill as paid for ${selectedBillingTable}!`);
  };

  const renderBilling = () => {
    const selectedBillData = billingData.find(b => b.table === selectedBillingTable) || { table: selectedBillingTable, orders: 0, total: 0, status: 'Paid' };

    // Find active orders for selected billing table to show details
    const billingNum = selectedBillingTable.replace('Table ', '');
    const activeTableOrders = orders.filter(o => (o.table === billingNum || parseInt(o.table) === parseInt(billingNum)) && o.billingStatus === 'unpaid');

    // Combine items from all unpaid orders of this table
    const billingItems = [];
    activeTableOrders.forEach(o => {
      o.items.forEach(item => {
        const exist = billingItems.find(x => x.name === item.name);
        if (exist) {
          exist.qty += item.qty;
          exist.amount += item.qty * item.price;
        } else {
          billingItems.push({ name: item.name, qty: item.qty, rate: item.price, amount: item.qty * item.price });
        }
      });
    });

    const taxRate = activeRestaurant.settings?.taxRate || 0.025; // split tax
    const serviceRate = activeRestaurant.settings?.serviceChargeRate || 0;

    const subtotal = billingItems.reduce((acc, curr) => acc + curr.amount, 0);
    const taxAmt = parseFloat((subtotal * taxRate * 2).toFixed(2));
    const serviceAmt = parseFloat((subtotal * serviceRate).toFixed(2));
    const totalAmt = subtotal + taxAmt + serviceAmt;

    return (
      <section className="panel-view active">
        <div className="panel-header-flex" style={{ marginBottom: '20px' }}>
          <div className="panel-title-desc">
            <h2 className="panel-inner-title">Billing Panel</h2>
            <p className="panel-inner-desc">Manage table bills, GST and payment status</p>
          </div>
        </div>

        <div className="billing-panel-grid">
          {/* Tables List */}
          <div className="billing-tables-column">
            <div className="column-header-title">TABLES</div>
            <div className="billing-tables-list-container">
              {billingData.map(b => (
                <div
                  key={b.table}
                  className={`table-selection-row ${selectedBillingTable === b.table ? 'active' : ''}`}
                  onClick={() => setSelectedBillingTable(b.table)}
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>{b.table}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.orders} orders</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>₹{b.total}</div>
                    <Badge status={b.status} />
                  </div>
                </div>
              ))}
              {billingData.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>No dining transactions available.</div>
              )}
            </div>
          </div>

          {/* Bill Summary details */}
          <div className="billing-summary-column">
            <div className="bill-summary-header-row">
              <div>
                <h3 className="bill-summary-title">{selectedBillingTable} — Bill Summary</h3>
                <p className="bill-summary-subtitle">{activeTableOrders.length} active orders</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-outline btn-bill-action" onClick={() => alert('Sending to printing queue...')}>🖨️ Print Receipt</button>
                <button className="btn btn-outline btn-bill-action" onClick={() => alert('Invoice link copied!')}>🔗 Share</button>
              </div>
            </div>

            <div className="billing-split-inner">
              <div className="bill-items-table-wrapper">
                <table className="bill-items-table">
                  <thead>
                    <tr>
                      <th>ITEM</th>
                      <th>QTY</th>
                      <th>RATE</th>
                      <th style={{ textAlign: 'right' }}>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingItems.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>₹{item.rate}</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{item.amount}</td>
                      </tr>
                    ))}
                    {billingItems.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>No unpaid items found. This bill is settled.</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {subtotal > 0 && (
                  <div className="price-breakdown-card">
                    <div className="breakdown-header">PRICE BREAKDOWN</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Subtotal:</span>
                        <strong>₹{subtotal.toFixed(2)}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>CGST ({(taxRate * 100).toFixed(1)}%):</span>
                        <strong>₹{(taxAmt / 2).toFixed(2)}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>SGST ({(taxRate * 100).toFixed(1)}%):</span>
                        <strong>₹{(taxAmt / 2).toFixed(2)}</strong>
                      </div>
                      {serviceAmt > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Service Charge ({(serviceRate * 100).toFixed(1)}%):</span>
                          <strong>₹{serviceAmt.toFixed(2)}</strong>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border)', paddingTop: '6px', marginTop: '6px', fontSize: '15px', color: 'var(--black)' }}>
                        <span>Total Due:</span>
                        <strong>₹{totalAmt.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment details status check */}
              {subtotal > 0 && (
                <div className="payment-status-wrapper">
                  <div className="payment-status-card">
                    <div className="column-header-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '16px' }}>
                      PAYMENT METHOD
                    </div>

                    <div className="payment-options-list">
                      {['Cash', 'UPI', 'Card'].map(method => (
                        <label key={method} className="payment-checkbox-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
                          <input
                            type="radio"
                            name="payment-method"
                            value={method}
                            checked={billingPaymentMethod === method}
                            onChange={() => setBillingPaymentMethod(method)}
                            style={{ margin: 0 }}
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>

                    <button className="btn btn-black" onClick={handleMarkAsPaid} style={{ width: '100%', marginTop: '24px' }}>
                      Mark as Paid
                    </button>
                    <button className="btn btn-outline" style={{ width: '100%', marginTop: '10px' }} onClick={() => alert('PDF invoice downloaded!')}>
                      Generate Receipt PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 5. RENDER TABLES & QR MANAGEMENT
  const handleAddTableSubmit = (e) => {
    e.preventDefault();
    if (!addTableForm.id) return;
    const cleanId = addTableForm.id.trim();
    const success = addDiningTable(activeRestaurant.id, {
      id: cleanId,
      status: 'Free',
      seats: parseInt(addTableForm.seats) || 4
    });
    if (success) {
      alert(`Created Table ${cleanId}!`);
      setActivePage(null);
    } else {
      alert('Table ID already exists!');
    }
  };

  const handleSeatsUpdate = (val) => {
    const seats = parseInt(val) || 4;
    updateDiningTableSeats(activeRestaurant.id, selectedTableId, seats);
  };

  const launchSimulatorTable = (tId) => {
    const rawNum = tId.replace('T-', '');
    setActiveCustomerTable(rawNum);
    setCart([]);

    // Open simulator panel
    const simPanel = document.getElementById('simulator-panel');
    if (simPanel) simPanel.classList.remove('collapsed');
  };

  const renderTables = () => {
    const currentTable = tables.find(t => t.id === selectedTableId) || { id: selectedTableId, status: 'Free', seats: 4 };

    return (
      <section className="panel-view active">
        <div className="panel-header-flex" style={{ marginBottom: '20px' }}>
          <div className="panel-title-desc">
            <h2 className="panel-inner-title">Dining Tables & QR Management</h2>
            <p className="panel-inner-desc">Monitor real-time table status, view active orders, and customize QR stickers for contactless ordering.</p>
          </div>
          <button className="btn btn-black" onClick={() => { setAddTableForm({ id: '', seats: 4 }); setActivePage('table-form'); }}>
            ➕ Add Dining Table
          </button>
        </div>

        <div className="tables-dashboard-grid">
          {/* Tables Grid */}
          <div className="tables-list-column">
            <div className="tables-metrics-row">
              <div className="table-metric-card">
                <div className="metric-value">{tables.length}</div>
                <div className="metric-label">Total Tables</div>
              </div>
              <div className="table-metric-card">
                <div className="metric-value">{occupiedTablesCount}</div>
                <div className="l">Occupied</div>
              </div>
              <div className="table-metric-card">
                <div className="metric-value">{tables.reduce((acc, t) => acc + (t.seats || 4), 0)}</div>
                <div className="metric-label">Total Seats</div>
              </div>
              <div className="table-metric-card">
                <div className="metric-value">{tables.length - occupiedTablesCount}</div>
                <div className="metric-label">Available</div>
              </div>
            </div>

            <div className="dining-tables-grid">
              {tables.map(table => (
                <div
                  key={table.id}
                  className={`dining-table-card ${table.status.toLowerCase()} ${selectedTableId === table.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTableId(table.id)}
                  style={{ cursor: 'pointer', border: selectedTableId === table.id ? '2px solid var(--primary)' : '1px solid var(--border)' }}
                >
                  <div className="table-card-header">
                    <span className="table-label-tag">{table.id}</span>
                    <span className={`table-status-dot ${table.status.toLowerCase()}`}></span>
                  </div>

                  <div className="table-seating-row">
                    <span className="seats-icon">👥</span>
                    <span className="seats-count">{table.seats || 4} Seats</span>
                  </div>

                  <div className="table-status-label">{table.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* QR Customizer & Details */}
          <div className="qr-customizer-column">
            <div className="customizer-header">Table {currentTable.id} Details</div>

            {/* Sticker Preview */}
            <div className="sticker-preview-card" style={{ borderColor: qrCustomizer.color }}>
              <div className="sticker-restaurant-name" style={{ color: qrCustomizer.color }}>{name}</div>
              <div className="sticker-subtitle">SCAN TO ORDER</div>

              <div className="sticker-qr-wrapper">
                <div className="fancy-qr-code" style={{ borderColor: qrCustomizer.color }}>
                  {/* Mock QR graphic */}
                  <div style={{ width: '80px', height: '80px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold', padding: '4px', textAlign: 'center', position: 'relative' }}>
                    QR CODE
                    {qrCustomizer.showLogo && (
                      <div style={{ position: 'absolute', width: '20px', height: '20px', background: '#ff7a00', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', border: '2px solid #000' }}>
                        S
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="sticker-table-label" style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                border: `2px solid ${qrCustomizer.color}`,
                borderRadius: '8px',
                padding: '6px 18px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                display: 'inline-block'
              }}>Table {currentTable.id}</div>
             <br></br>
              <div className="sticker-footer-instructions">Powered by Serviq</div>
            </div>

            {/* controls */}
            <div className="customizer-controls-card">
              <div className="control-section-title">QR Code Customizer</div>

              <div className="form-group">
                <label>Accent Color</label>
                <div className="qr-color-dots">
                  {['#ff7a00', '#000000', '#1e40af', '#15803d', '#7c3aed'].map(color => (
                    <button
                      key={color}
                      className={`qr-color-dot ${qrCustomizer.color === color ? 'active' : ''}`}
                      style={{ background: color }}
                      onClick={() => setQrCustomizer({ ...qrCustomizer, color })}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyStyle: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>Center Logo</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Show brand logo icon inside QR</div>
                </div>
                <label className="switch-container">
                  <input
                    type="checkbox"
                    checked={qrCustomizer.showLogo}
                    onChange={(e) => setQrCustomizer({ ...qrCustomizer, showLogo: e.target.checked })}
                  />
                  <span className="switch-slider"></span>
                </label>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label>Seating Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={currentTable.seats || 4}
                  onChange={(e) => handleSeatsUpdate(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button className="btn btn-black" style={{ width: '100%' }} onClick={() => launchSimulatorTable(currentTable.id)}>
                  📱 Open in Customer Simulator
                </button>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-outline" style={{ flex: 1, fontSize: '13px' }} onClick={() => alert('Sticker template print sent!')}>🖨️ Print Sticker</button>
                  <button className="btn btn-outline" style={{ flex: 1, fontSize: '13px' }} onClick={() => alert('SVG downloaded!')}>💾 Download SVG</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 6. RENDER STAFF PANEL
  const handleStaffSubmit = (e) => {
    e.preventDefault();
    if (staffForm.id) {
      updateStaff(activeRestaurant.id, staffForm);
      alert('Staff details updated!');
    } else {
      const nextNum = staff.length + 1;
      const newId = `S-${nextNum < 10 ? '0' + nextNum : nextNum}`;
      addStaff(activeRestaurant.id, {
        ...staffForm,
        id: newId
      });
      alert('New staff member added!');
    }
    setActivePage(null);
  };

  const handleKitchenPasswordSubmit = (e) => {
    e.preventDefault();
    if (!kitchenPasswordForm) return;
    updateKitchenPassword(activeRestaurant.id, kitchenPasswordForm);
    alert('Kitchen Shared Login Password updated!');
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
          <button className="btn btn-outline" onClick={openKitchenModal}>
            🔑 Kitchen Credentials
          </button>
          <button className="btn btn-black" onClick={openAddStaffModal}>
            ➕ Add New Staff
          </button>
        </div>
      </div>

      <div className="staff-dashboard-grid">
        <div className="staff-list-column" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--border-radius-sm)', padding: '24px', boxShadow: 'var(--card-shadow)' }}>
          <div className="staff-metrics-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div className="table-metric-card" style={{ backgroundColor: '#fafafa', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
              <div className="metric-value" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--black)' }}>{staff.length}</div>
              <div className="metric-label" style={{ fontSize: '11px', fontWeight: 600 }}>Total Staff</div>
            </div>
            <div className="table-metric-card" style={{ backgroundColor: '#fafafa', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
              <div className="metric-value" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--success)' }}>{staff.filter(s => s.status === 'On Duty').length}</div>
              <div className="metric-label" style={{ fontSize: '11px', fontWeight: 600 }}>On Duty</div>
            </div>
            <div className="table-metric-card" style={{ backgroundColor: '#fafafa', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
              <div className="metric-value" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)' }}>{staff.filter(s => s.role === 'Kitchen').length}</div>
              <div className="metric-label" style={{ fontSize: '11px', fontWeight: 600 }}>Kitchen Staff</div>
            </div>
            <div className="table-metric-card" style={{ backgroundColor: '#fafafa', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
              <div className="metric-value" style={{ fontSize: '20px', fontWeight: 700, color: '#1e40af' }}>{staff.filter(s => s.role === 'Waiter').length}</div>
              <div className="metric-label" style={{ fontSize: '11px', fontWeight: 600 }}>Waitstaff</div>
            </div>
          </div>

          <div className="menu-table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="menu-items-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
                  <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>STAFF ID</th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>NAME</th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>ROLE</th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>PHONE</th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>LOGIN EMAIL</th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>STATUS</th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'right' }}>ACTIONS</th>
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
                      <IconBtn icon="✏️" tooltip="Edit" style={iconBtnEditStyle} onClick={() => openEditStaffModal(s)} />
                      <IconBtn icon="🗑️" tooltip="Delete" style={iconBtnDeleteStyle} onClick={() => handleDeleteStaff(s.id)} />
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

  // 7. RENDER SETTINGS PANEL
  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    saveRestaurantSettings(activeRestaurant.id, {
      name: settingsForm.name,
      accentColor: accentColor,
      darkMode: settingsForm.darkMode,
      settings: {
        tagline: settingsForm.tagline,
        currency: settingsForm.currency,
        tablesCount: parseInt(settingsForm.tablesCount) || 5,
        taxRate: (parseFloat(settingsForm.taxRate) / 100) / 2, // convert back to half rate CGST/SGST
        serviceChargeRate: parseFloat(settingsForm.serviceChargeRate) / 100
      }
    });
    setDarkMode(settingsForm.darkMode);
    alert('Restaurant configuration saved successfully!');
  };

  const renderSettings = () => (
    <section className="panel-view active">
      <div className="panel-header-flex" style={{ marginBottom: '20px' }}>
        <div className="panel-title-desc">
          <h2 className="panel-inner-title">Restaurant Settings</h2>
          <p className="panel-inner-desc">Manage store branding, operations, tax policies, and dashboard appearance</p>
        </div>
      </div>

      <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
        <form onSubmit={handleSettingsSubmit} className="settings-forms-column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div className="settings-card">
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginTop: 0 }}>
              <span>🏪</span> Restaurant Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Restaurant Name</label>
                <input
                  type="text"
                  value={settingsForm.name}
                  onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Tagline / Subtitle</label>
                <input
                  type="text"
                  value={settingsForm.tagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Currency Symbol</label>
                <select
                  value={settingsForm.currency}
                  onChange={(e) => setSettingsForm({ ...settingsForm, currency: e.target.value })}
                >
                  <option value="₹">₹ (Indian Rupee)</option>
                  <option value="$">$ (US Dollar)</option>
                  <option value="€">€ (Euro)</option>
                  <option value="£">£ (British Pound)</option>
                  <option value="AED">AED (UAE Dirham)</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Support Email</label>
                <input
                  type="email"
                  value={activeRestaurant.owner}
                  readOnly
                  style={{ background: '#f1f5f9', cursor: 'not-allowed' }}
                />
              </div>
            </div>
          </div>

          <div className="settings-card">
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginTop: 0 }}>
              <span>⚙️</span> Operations & Charges
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Dining Tables Count</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={settingsForm.tablesCount}
                  onChange={(e) => setSettingsForm({ ...settingsForm, tablesCount: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Total Tax Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="0.1"
                  value={settingsForm.taxRate}
                  onChange={(e) => setSettingsForm({ ...settingsForm, taxRate: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Service Charge (%)</label>
                <input
                  type="number"
                  min="0"
                  max="25"
                  step="0.5"
                  value={settingsForm.serviceChargeRate}
                  onChange={(e) => setSettingsForm({ ...settingsForm, serviceChargeRate: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="settings-card">
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginTop: 0 }}>
              <span>🎨</span> Appearance & Theme
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-main)' }}>Dark Mode</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Enable dark mode styling for the admin panel</div>
                </div>
                <label className="switch-container">
                  <input
                    type="checkbox"
                    checked={settingsForm.darkMode}
                    onChange={(e) => setSettingsForm({ ...settingsForm, darkMode: e.target.checked })}
                  />
                  <span className="switch-slider"></span>
                </label>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '8px', color: 'var(--text-main)' }}>Theme Accent Color</div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['#ff7a00', '#1e40af', '#15803d', '#7c3aed', '#e11d48'].map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`theme-dot ${accentColor === color ? 'active' : ''}`}
                      style={{ background: color }}
                      onClick={() => setAccentColor(color)}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => setSettingsForm({ ...settingsForm })}>Reset Defaults</button>
            <button type="submit" className="btn" style={{ padding: '10px 32px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 600 }}>Save Settings</button>
          </div>
        </form>

        {/* Preview block */}
        <div className="settings-preview-column">
          <div className="settings-card">
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginTop: 0 }}>Store Profile Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Name</span>
                <strong style={{ color: 'var(--text-main)' }}>{settingsForm.name || 'Serviq'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Active Tables</span>
                <strong style={{ color: 'var(--text-main)' }}>{settingsForm.tablesCount || 5} Tables</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Tax Setup</span>
                <strong style={{ color: 'var(--text-main)' }}>{settingsForm.taxRate || 0}% (GST)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Service Charge</span>
                <strong style={{ color: 'var(--text-main)' }}>{settingsForm.serviceChargeRate || 0}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Currency</span>
                <strong style={{ color: 'var(--text-main)' }}>{settingsForm.currency}</strong>
              </div>

              <div style={{ marginTop: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '12px', borderRadius: '8px', fontSize: '12px', lineHeight: 1.5, fontWeight: 500 }}>
                💡 Saving these settings will dynamically update the customer menu simulator, billing receipts, and dining table counts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderActivePage = () => {
    const PageHeader = ({ subtitle }) => (
      <div style={sty.pageInlineHeader}>
        <button style={sty.pageBackBtn} onClick={() => setActivePage(null)}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'inherit'; }}
        >→</button>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>{pageTitle[activePage]}</h2>
          {subtitle && <span style={{ fontSize: '12px', color: '#64748b' }}>{subtitle}</span>}
        </div>
      </div>
    );

    if (activePage === 'menu-form') {
      return (
        <section>
          <PageHeader subtitle={menuForm.id ? 'Modify menu item details' : 'Create a new dish for the menu'} />
          <div style={sty.pageCard}>
            <form onSubmit={handleMenuSubmit}>
              <div className="edit-image-placeholder-box" style={{ marginBottom: '20px', border: '1px solid var(--border)', borderRadius: '12px', background: '#f8fafc', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {menuForm.image ? (
                  <img src={menuForm.image} alt={menuForm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ fontSize: '32px' }}>🍴</div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Item Name</label>
                <input
                  type="text"
                  value={menuForm.name}
                  onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  required
                  placeholder="e.g. Chicken Biryani"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Image URL</label>
                <input
                  type="text"
                  value={menuForm.image || ''}
                  onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Description</label>
                <textarea
                  rows="3"
                  value={menuForm.desc}
                  onChange={(e) => setMenuForm({ ...menuForm, desc: e.target.value })}
                  placeholder="Item description..."
                ></textarea>
              </div>

              <div style={sty.formGrid2}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                    required
                    placeholder="320"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Category</label>
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    required
                  >
                    <option value="Starters">Starters</option>
                    <option value="Rice Meals">Rice Meals</option>
                    <option value="Tiffin">Tiffin</option>
                    <option value="Rotis">Rotis</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => setActivePage(null)}>Cancel</button>
                <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>💾 Save Changes</button>
              </div>
            </form>
          </div>
        </section>
      );
    }

    if (activePage === 'table-form') {
      return (
        <section>
          <PageHeader subtitle="Create a new physical dining table with capacity" />
          <div style={{ ...sty.pageCard, maxWidth: '500px' }}>
            <form onSubmit={handleAddTableSubmit}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Table Number / ID</label>
                <input
                  type="text"
                  value={addTableForm.id}
                  onChange={(e) => setAddTableForm({ ...addTableForm, id: e.target.value })}
                  placeholder="e.g. T-06"
                  required
                />
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Recommended format: T-XX (e.g. T-06, T-07)</p>
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label>Seating Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={addTableForm.seats}
                  onChange={(e) => setAddTableForm({ ...addTableForm, seats: parseInt(e.target.value) || 4 })}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => setActivePage(null)}>Cancel</button>
                <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>💾 Create Table</button>
              </div>
            </form>
          </div>
        </section>
      );
    }

    if (activePage === 'staff-form') {
      return (
        <section>
          <PageHeader subtitle={staffForm.id ? 'Update employee profile' : 'Add a new member to the restaurant staff'} />
          <div style={sty.pageCard}>
            <form onSubmit={handleStaffSubmit}>
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
        </section>
      );
    }

    if (activePage === 'kitchen-form') {
      return (
        <section>
          <PageHeader subtitle="Update the password shared by kitchen station screens" />
          <div style={{ ...sty.pageCard, maxWidth: '500px' }}>
            <form onSubmit={handleKitchenPasswordSubmit}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Kitchen Login Email</label>
                <input type="email" value={kitchenLogin.email} nly style={{ backgroundColor: 'var(--bg-tertiary)', cursor: 'not-allowed' }} />
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
        </section>
      );
    }

    return null;
  };

  return (
    <div id="dashboard-view" className="dashboard-wrapper">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '24px 16px' }}>
          <div className="sidebar-logo-icon" style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, boxShadow: 'none' }}>
            <img src="/logo.png" alt="Serviq Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-text">{name}</span>
            <span className="plan-sub">{plan} Plan</span>
          </div>
        </div>

        <ul className="sidebar-menu">
          {isTabAllowed('overview') && (
            <li className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => { setActiveTab('overview'); setActivePage(null); }}>
              <a href="#">🎛️ Dashboard</a>
            </li>
          )}
          {isTabAllowed('orders') && (
            <li className={`sidebar-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => { setActiveTab('orders'); setActivePage(null); }}>
              <a href="#">
                📝 Incoming Orders
                {pendingOrdersCount > 0 && <span className="pulse-indicator" style={{ marginLeft: 'auto' }}></span>}
              </a>
            </li>
          )}
          {isTabAllowed('menu') && (
            <li className={`sidebar-item ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => { setActiveTab('menu'); setActivePage(null); }}>
              <a href="#">🍴 Menu Management</a>
            </li>
          )}
          {isTabAllowed('billing') && (
            <li className={`sidebar-item ${activeTab === 'billing' ? 'active' : ''}`} onClick={() => { setActiveTab('billing'); setActivePage(null); }}>
              <a href="#">💵 Billing</a>
            </li>
          )}
          {isTabAllowed('saas') && (
            <li className={`sidebar-item ${activeTab === 'saas' ? 'active' : ''}`} onClick={() => { setActiveTab('saas'); setActivePage(null); }}>
              <a href="#">📋 Tables</a>
            </li>
          )}
          {isTabAllowed('staff') && (
            <li className={`sidebar-item ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => { setActiveTab('staff'); setActivePage(null); }}>
              <a href="#">👥 Staff</a>
            </li>
          )}
          {isTabAllowed('settings') && (
            <li className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { setActiveTab('settings'); setActivePage(null); }}>
              <a href="#">⚙️ Settings</a>
            </li>
          )}
        </ul>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar" id="avatar-letter">{name.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <div className="user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{currentUser?.name || 'QRMenu Admin'}</div>
              <div className="user-role" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{currentUser?.email || 'admin@restaurant.com'}</div>
            </div>
          </div>
          <button id="logout-btn" className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--border)' }} onClick={logout}>
            🔒 Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content" style={{ position: 'relative' }}>
        {/* Impersonation Banner */}
        {isImpersonating && (
          <div id="saas-impersonation-banner" style={{ display: 'flex', background: '#fff1f2', borderBottom: '1.5px solid #fca5a5', color: '#991b1b', padding: '12px 32px', fontSize: '13px', fontWeight: 600, alignItems: 'center', justifyContent: 'space-between', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span>
              <span><strong>Super Admin Impersonation Mode:</strong> Currently managing <strong>{name}</strong> (Simulated Session)</span>
            </div>
            <button className="btn" onClick={exitImpersonation} style={{ background: '#991b1b', color: 'white', padding: '4px 12px', fontSize: '12px', fontWeight: 700, borderRadius: '4px', border: 'none', transition: 'all 0.2s', cursor: 'pointer' }}>
              Exit & Return to Super Admin
            </button>
          </div>
        )}

        {/* HEADER */}
        {!activePage && (
          <header className="main-header">
            <div className="header-title-container">
              <h1 className="header-title" style={{ textTransform: 'capitalize' }}>{activeTab}</h1>
              <span className="header-subtitle-date">{dateTimeStr}</span>
            </div>
            <div className="header-actions">
              <button className="simulator-toggle-btn" onClick={() => {
                const simPanel = document.getElementById('simulator-panel');
                if (simPanel) simPanel.classList.toggle('collapsed');
              }}>
                📱 Toggle Simulator
              </button>
              <button className="btn btn-notify" onClick={() => alert('No new notifications.')}>
                🔔 {pendingOrdersCount > 0 ? `${pendingOrdersCount} notifications` : '0 notifications'}
              </button>
              <button className="btn btn-user-profile" onClick={() => alert('Profile menu')}>
                👤 {currentUser?.role || 'Admin'}
              </button>
            </div>
          </header>
        )}

        {/* CONTENT BODY */}
        <div className="content-body">
          {activePage ? renderActivePage() : (
            <>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'orders' && renderOrders()}
              {activeTab === 'menu' && renderMenu()}
              {activeTab === 'billing' && renderBilling()}
              {activeTab === 'saas' && renderTables()}
              {activeTab === 'staff' && renderStaff()}
              {activeTab === 'settings' && renderSettings()}
            </>
          )}
        </div>
      </main>
    </div>
  );
} 
