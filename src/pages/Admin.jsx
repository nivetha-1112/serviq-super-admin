import React, { useState, useEffect } from 'react';
import { useAppState } from '../contexts/AppContext';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { GrowthChart } from '../components/GrowthChart';

const EyeIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const PencilIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const TrashIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

const PrinterIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const DashboardIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const MenuIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const OrdersIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);

const BillingIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
    <path d="M16 14h.01" />
    <path d="M12 14h.01" />
    <path d="M8 14h.01" />
  </svg>
);

const TablesIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M12 3v18" />
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </svg>
);

const StaffIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const UsersIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);


// Helper to determine the category icon based on food item name keywords
const getFoodIcon = (name = '') => {
  const n = name.toLowerCase();
  if (n.includes('biryani') || n.includes('rice') || n.includes('pulav') || n.includes('meal')) return '🍛';
  if (n.includes('dosa') || n.includes('idly') || n.includes('tiffin') || n.includes('uthapam') || n.includes('vada') || n.includes('upma')) return '🥞';
  if (n.includes('rotti') || n.includes('naan') || n.includes('parotta') || n.includes('chapati') || n.includes('bread')) return '🫓';
  if (n.includes('juice') || n.includes('drink') || n.includes('coke') || n.includes('tea') || n.includes('coffee') || n.includes('water') || n.includes('beverage') || n.includes('lassi') || n.includes('chai') || n.includes('shake')) return '🥤';
  if (n.includes('dessert') || n.includes('ice cream') || n.includes('sweet') || n.includes('cake') || n.includes('jamun') || n.includes('halva') || n.includes('kheer') || n.includes('pudding')) return '🍰';
  if (n.includes('soup') || n.includes('manchurian') || n.includes('starter') || n.includes('fry') || n.includes('paneer') || n.includes('tikka') || n.includes('chicken') || n.includes('dry') || n.includes('gravy') || n.includes('curry')) return '🍲';
  if (n.includes('burger') || n.includes('sandwich') || n.includes('pizza') || n.includes('fries') || n.includes('snack')) return '🍔';
  return '🍳';
};

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
    updateDiningTable,
    deleteDiningTable,
    addStaff,
    updateStaff,
    deleteStaff,
    updateKitchenPassword,
    updateOrderStatus,
    assignWaiterToOrder,
    deleteOrder,
    updateOrder,
    markBillAsPaid,
    darkMode,
    setDarkMode,
    accentColor,
    setAccentColor,
    qrCustomizer,
    setQrCustomizer,
    setActiveCustomerTable,
    setCart,
    addToast
  } = useAppState();

  const [activeTab, setActiveTab] = useState('overview');
  const [dateTimeStr, setDateTimeStr] = useState('');

  // 1. Dashboard states
  // 2. Incoming Orders states
  const [orderFilter, setOrderFilter] = useState('All'); // All, New, Preparing, Ready, Done
  const [selectedWaiterFilter, setSelectedWaiterFilter] = useState('All Waiters');
  const [waiterDropdownOpen, setWaiterDropdownOpen] = useState(false);
  const [activeViewOrder, setActiveViewOrder] = useState(null);
  const [activeEditOrder, setActiveEditOrder] = useState(null);
  const [editOrderForm, setEditOrderForm] = useState({ table: '', notes: '', waiter: 'Unassigned' });
  const [orderSearch, setOrderSearch] = useState('');
  const [assignWaiterModal, setAssignWaiterModal] = useState({ isOpen: false, orderId: null, selectedWaiter: '' });
  const [orderSort, setOrderSort] = useState('newest');
  const [rushOnly, setRushOnly] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [billingSearch, setBillingSearch] = useState('');

  // 3. Menu Management states
  const [menuCategory, setMenuCategory] = useState('All Items');
  const [menuSearch, setMenuSearch] = useState('');
  const [menuSort, setMenuSort] = useState('name');
  const [activePage, setActivePage] = useState(null); // 'menu-form' | 'table-form' | 'staff-form' | 'kitchen-form'
  const [menuForm, setMenuForm] = useState({ id: '', name: '', desc: '', price: '', category: 'Starters', image: '', veg: true, available: true });

  // 4. Billing Panel states
  const [selectedBillingTable, setSelectedBillingTable] = useState('');
  const [billingPaymentMethod, setBillingPaymentMethod] = useState('UPI');
  const [editBillModal, setEditBillModal] = useState({ isOpen: false, table: null, items: [] });

  // 5. Tables & QR Management states
  const [selectedTableId, setSelectedTableId] = useState('');
  const [addTableForm, setAddTableForm] = useState({ id: '', seats: 4, waiter: '' });
  const [draftSeats, setDraftSeats] = useState(4);
  const [draftStatus, setDraftStatus] = useState('Free');
  const [draftWaiter, setDraftWaiter] = useState('');

  // 6. Staff states
  const [staffForm, setStaffForm] = useState({ id: '', name: '', role: 'Waiter', phone: '', email: '', password: '', status: 'On Duty' });
  const [kitchenPasswordForm, setKitchenPasswordForm] = useState('');

  // Users & Roles states
  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);
  const [rolesList] = useState([
    { id: 1, name: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Branch Admin', status: 'Active' },
    { id: 3, name: 'Branch Manager', status: 'Active' },
    { id: 4, name: 'Cashier', status: 'Active' },
    { id: 5, name: 'Waiter', status: 'Active' },
    { id: 6, name: 'Kitchen Staff', status: 'Active' }
  ]);
  const [usersList] = useState([
    { id: 'ADM-01', name: 'Rajesh Kumar', email: 'rajesh@serviq.com', phone: '+91 98765 43210', restaurant: 'Serviq Grand Bistro', role: 'BRANCH ADMIN', status: 'Active', lastLogin: '2026-06-02 12:45 PM' },
    { id: 'ADM-02', name: 'Amit Patel', email: 'amit@serviq.com', phone: '+91 98765 11111', restaurant: 'Serviq Express Cafe', role: 'BRANCH MANAGER', status: 'Active', lastLogin: '2026-06-02 11:30 AM' },
    { id: 'ADM-03', name: 'Vikram Singh', email: 'vikram@serviq.com', phone: '+91 98765 22222', restaurant: 'Serviq Lounge & Bar', role: 'BRANCH ADMIN', status: 'Disabled', lastLogin: '2026-05-30 09:15 PM' }
  ]);

  const pageTitle = {
    'menu-form': menuForm.id ? ' Edit Menu Item' : ' Add New Menu Item',
    'table-form': ' Add Dining Table',
    'staff-form': staffForm.id ? ' Edit Staff Details' : 'Register New Staff',
    'kitchen-form': ' Kitchen Shared Credentials',
    'order-edit-form': ' Edit Order Details',
    'order-view': activeViewOrder ? `Order Details - #ORD-${activeViewOrder.id}` : 'Order Details',
  };

  const sty = {
    pageInlineHeader: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--primary-light)' },
    pageBackBtn: { background: '#fff', border: '1.5px solid var(--border)', borderRadius: '10px', width: '38px', height: '38px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s', flexShrink: 0 },
    pageCard: { background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
    formGrid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' },
  };

  // 7. Settings states
  const [settingsForm, setSettingsForm] = useState({
    name: '',
    tagline: '',
    currency: '₹',
    tablesCount: 5,
    taxRate: 5,
    serviceChargeRate: 0,
    darkMode: false,
    logo: '',
    banner: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    gstNumber: '',
    openingTime: '08:00',
    closingTime: '22:00',
    selfService: true,
    minOrderAmount: 0
  });

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
        darkMode: darkMode,
        logo: activeRestaurant.settings?.logo || activeRestaurant.logo || '',
        banner: activeRestaurant.settings?.banner || activeRestaurant.banner || '',
        phone: activeRestaurant.settings?.phone || activeRestaurant.phone || '',
        address: activeRestaurant.settings?.address || activeRestaurant.address || '',
        city: activeRestaurant.settings?.city || activeRestaurant.city || '',
        state: activeRestaurant.settings?.state || activeRestaurant.state || '',
        gstNumber: activeRestaurant.settings?.gstNumber || activeRestaurant.gstNumber || '',
        openingTime: activeRestaurant.settings?.openingTime || activeRestaurant.openingTime || '08:00',
        closingTime: activeRestaurant.settings?.closingTime || activeRestaurant.closingTime || '22:00',
        selfService: activeRestaurant.settings?.selfService !== undefined ? activeRestaurant.settings?.selfService : true,
        minOrderAmount: activeRestaurant.settings?.minOrderAmount || 0
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

  // Sync draft states for table details editor
  useEffect(() => {
    if (activeRestaurant?.tables) {
      const current = activeRestaurant.tables.find(t => t.id === selectedTableId);
      if (current) {
        setDraftSeats(current.seats || 4);
        setDraftStatus(current.status || 'Free');
        setDraftWaiter(current.waiter || '');
      }
    }
  }, [selectedTableId, activeRestaurant]);

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
    borderRadius: '50%',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.2s ease',
    position: 'relative',
    background: 'transparent',
  };

  const iconBtnViewStyle = {
    ...iconBtnStyle,
    color: '#475569',
    marginRight: '6px'
  };

  const iconBtnEditStyle = {
    ...iconBtnStyle,
    color: '#475569',
    marginRight: '6px'
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
          e.currentTarget.style.transform = 'scale(1.15)';
          e.currentTarget.style.backgroundColor = isDelete ? '#fef2f2' : '#f1f5f9';
          if (isDelete) {
            e.currentTarget.style.color = '#dc2626';
          } else {
            e.currentTarget.style.color = '#1e293b';
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = style?.color;
        }}
      >
        {icon}
      </button>
    );
  };

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

      <div className="analytics-row">
        <div className="analytics-card" style={{ padding: 0 }}>
          <div className="analytics-card-header" style={{ padding: '20px 24px 0 24px' }}>
            <div>
              <h3 className="analytics-card-title">Revenue Growth</h3>
              <span className="analytics-card-subtitle">Past 6 Months</span>
            </div>
          </div>
          <div style={{ height: '220px', width: '100%' }}>
            <GrowthChart />
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3 className="analytics-card-title">Order Breakdown</h3>
              <span className="analytics-card-subtitle">By Menu Category</span>
            </div>
          </div>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <div className="breakdown-item-header">
                <span className="breakdown-category">Starters</span>
                <span className="breakdown-value">45%</span>
              </div>
              <div className="breakdown-bar-bg">
                <div className="breakdown-bar-fill color-1" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-item-header">
                <span className="breakdown-category">Main Course</span>
                <span className="breakdown-value">30%</span>
              </div>
              <div className="breakdown-bar-bg">
                <div className="breakdown-bar-fill color-2" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-item-header">
                <span className="breakdown-category">Beverages</span>
                <span className="breakdown-value">15%</span>
              </div>
              <div className="breakdown-bar-bg">
                <div className="breakdown-bar-fill color-3" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-item-header">
                <span className="breakdown-category">Desserts</span>
                <span className="breakdown-value">10%</span>
              </div>
              <div className="breakdown-bar-bg">
                <div className="breakdown-bar-fill color-4" style={{ width: '10%' }}></div>
              </div>
            </div>
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
                      👤 {ord.waiter ? `Waiter: ${ord.waiter}` : 'Assign Waiter'}
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


  };

  // 3. RENDER MENU MANAGEMENT
  const handleMenuSubmit = (e) => {
    e.preventDefault();
    if (menuForm.id) {
      updateMenuItem(activeRestaurant.id, {
        ...menuForm,
        price: parseFloat(menuForm.price) || 0
      });
      addToast('Menu item updated!');
    } else {
      addMenuItem(activeRestaurant.id, {
        id: 'menu-' + Date.now(),
        name: menuForm.name,
        desc: menuForm.desc,
        price: parseFloat(menuForm.price) || 0,
        category: menuForm.category,
        image: menuForm.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
        veg: menuForm.veg,
        available: menuForm.available
      });
      addToast('New dish added to menu!');
    }
    setActivePage(null);
  };

  const openAddMenuModal = () => {
    setMenuForm({ id: '', name: '', desc: '', price: '', category: 'Starters', image: '', veg: true, available: true });
    setActivePage('menu-form');
  };

  const openEditMenuModal = (item) => {
    setMenuForm({
      id: item.id,
      name: item.name,
      desc: item.desc || '',
      price: item.price.toString(),
      category: item.category,
      image: item.image || '',
      veg: item.veg ?? true,
      available: item.available ?? true
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
        {/* Title flex box */}
        <div className="panel-header-flex" style={{ marginBottom: '24px', alignItems: 'flex-start' }}>
          <div className="panel-title-desc">
            <h2 className="panel-inner-title" style={{ fontSize: '26px', fontWeight: 800 }}>Menu Management</h2>
            <p className="panel-inner-desc" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff7a00', display: 'inline-block' }}></span>
              {menu.length} items actively listed
            </p>
          </div>
          <button
            className="btn btn-black"
            onClick={openAddMenuModal}
            style={{
              background: 'var(--orange-gradient)',
              borderColor: '#ff7a00',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700
            }}
          >
            ➕ Add New Item
          </button>
        </div>

        {/* Categories Horizontal Pills */}
        <div className="menu-categories-horizontal-pills">
          {categoriesList.map(cat => {
            const displayName = cat === 'All Items' ? 'All' : cat;
            const isActive = menuCategory === cat;
            return (
              <button
                key={cat}
                className={`menu-category-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => setMenuCategory(cat)}
              >
                {displayName}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Filters */}
        <div className="menu-search-sort-row" style={{ justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sort by</span>
            <select
              value={menuSort}
              onChange={(e) => setMenuSort(e.target.value)}
              style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-main)' }}
            >
              <option value="name">Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Menu Items List Table */}
        <div className="menu-table-wrapper" style={{ overflowX: 'auto', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', boxShadow: 'var(--card-shadow)' }}>
          <table className="menu-items-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Image</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Name</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Category</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Price</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Type</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenu.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 14px' }}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🍴</div>
                    )}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '14px' }}>{item.name}</div>
                    {item.desc && (
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.desc}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 500, color: 'var(--text-main)', fontSize: '14px' }}>{item.category}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-main)', fontSize: '14px' }}>₹{item.price}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ 
                      fontSize: '10px', 
                      fontWeight: 700, 
                      color: item.veg ? '#16a34a' : '#ef4444',
                      background: item.veg ? '#dcfce7' : '#fef2f2',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      display: 'inline-block',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {item.veg ? 'VEG' : 'NON-VEG'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <Badge status={item.available ? 'Active' : 'Inactive'} />
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <IconBtn icon={<PencilIcon size={18} />} tooltip="Edit" style={iconBtnEditStyle} onClick={() => openEditMenuModal(item)} />
                    <IconBtn icon={<TrashIcon size={18} />} tooltip="Delete" style={iconBtnDeleteStyle} onClick={() => handleDeleteMenu(item.id)} />
                  </td>
                </tr>
              ))}
              {filteredMenu.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                    No menu dishes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  // 4. RENDER BILLING PANEL
  const handleMarkAsPaid = () => {
    if (!selectedBillingTable) return;
    markBillAsPaid(activeRestaurant.id, selectedBillingTable);
    addToast(`Marked bill as paid for ${selectedBillingTable}!`);
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
    const serviceRate = activeRestaurant.settings?.serviceChargeRate !== undefined ? activeRestaurant.settings?.serviceChargeRate : 0.10; // default 10% if not set

    const subtotal = billingItems.reduce((acc, curr) => acc + curr.amount, 0);
    const taxAmt = parseFloat((subtotal * taxRate * 2).toFixed(2));
    const serviceAmt = parseFloat((subtotal * serviceRate).toFixed(2));
    const totalAmt = subtotal + taxAmt + serviceAmt;

    // Filters tables list by search
    let filteredBillingData = billingData;
    if (billingSearch) {
      filteredBillingData = filteredBillingData.filter(b => b.table.toLowerCase().includes(billingSearch.toLowerCase().trim()));
    }

    const getTableGuests = (tableLabel) => {
      const num = tableLabel.replace('Table ', '');
      const cleanId = num.length === 1 ? `T-0${num}` : `T-${num}`;
      const t = tables.find(x => x.id === cleanId);
      return t ? t.seats : 3;
    };

    const getTableDuration = (tableLabel) => {
      const num = parseInt(tableLabel.replace('Table ', '')) || 1;
      if (num === 1) return '45 mins';
      if (num === 5) return '12 mins';
      if (num === 12) return '1 hour';
      return '30 mins';
    };

    const isVegItem = (itemName) => {
      const menuItem = menu.find(m => m.name.toLowerCase() === itemName.toLowerCase());
      return menuItem ? menuItem.veg : !itemName.toLowerCase().includes('chicken') && !itemName.toLowerCase().includes('keema') && !itemName.toLowerCase().includes('fish');
    };

    const getItemOptions = (itemName) => {
      if (itemName.includes('Dosa') && !itemName.includes('Keema')) return 'Extra Butter, Sambar separate';
      if (itemName.includes('Coffee')) return 'Strong, Less Sugar';
      if (itemName.includes('Idli')) return 'Ghee Roast, Podi';
      return '';
    };

    // Find the latest order ID for this table
    const latestOrderId = activeTableOrders.length > 0 ? `#ORD-${activeTableOrders[0].id}` : 'N/A';

    return (
      <section className="panel-view active">
        <div className="billing-panel-grid-new">
          {/* Column 1: Active Tables List */}
          <div className="billing-tables-column-new">
            <div className="active-tables-title-row">
              <h3>Active Tables</h3>
              <span className="active-tables-badge-new">
                {billingData.filter(b => b.status !== 'Paid').length} ACTIVE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '4px', overflowX: 'auto', paddingBottom: '12px' }}>
              {filteredBillingData.map(b => {
                const isActive = selectedBillingTable === b.table;
                const isPaid = b.status === 'Paid';
                const guests = getTableGuests(b.table);
                const duration = getTableDuration(b.table);

                return (
                  <div
                    key={b.table}
                    onClick={() => setSelectedBillingTable(b.table)}
                    className={`billing-table-select-card-new ${isActive ? 'active' : ''} ${isPaid ? 'settled' : ''}`}
                    style={{ minWidth: '240px' }}
                  >
                    <div className="billing-table-card-top">
                      <span className="billing-table-name-new">{b.table}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`billing-table-badge-new ${b.status.toLowerCase()}`}>
                          {b.status.toUpperCase()}
                        </span>
                        {!isPaid && (
                          <button
                            className="btn btn-outline"
                            style={{ padding: '4px', borderRadius: '4px', fontSize: '12px', border: 'none', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              const tNum = b.table.replace('Table ', '');
                              const tableOrders = orders.filter(o => (o.table === tNum || parseInt(o.table) === parseInt(tNum)) && o.billingStatus === 'unpaid');
                              if (tableOrders.length > 0) {
                                setActiveEditOrder(tableOrders[0]);
                                setEditOrderForm({
                                  table: tableOrders[0].table,
                                  notes: tableOrders[0].notes || '',
                                  waiter: tableOrders[0].waiter || 'Unassigned'
                                });
                                setActivePage('order-edit-form');
                              } else {
                                addToast('No active orders to edit.');
                              }
                            }}
                            title="Edit Order Details"
                          >
                            ✏️
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="billing-table-card-mid">
                      <span>{guests} Guests</span>
                      <span>•</span>
                      <span>{isPaid ? 'Checkout' : `🕒 ${duration}`}</span>
                    </div>

                    <div className={`billing-table-card-bottom ${isPaid ? 'settled' : ''}`}>
                      ₹{b.total.toLocaleString('en-IN')}
                    </div>
                  </div>
                );
              })}

              {filteredBillingData.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No active tables found.
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Bill Summary Details */}
          <div className="billing-summary-card-new">
            <div>
              <div className="bill-summary-header-row-new">
                <div>
                  <h3>Bill Summary</h3>
                  <p>Order ID: {latestOrderId} • {selectedBillingTable}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn btn-outline"
                    style={{ padding: '8px 10px', borderRadius: '8px' }}
                    onClick={() => {
                      if (activeTableOrders.length > 0) {
                        setEditBillModal({ isOpen: true, table: selectedBillingTable, items: JSON.parse(JSON.stringify(billingItems)) });
                      } else {
                        addToast('No active orders to edit.');
                      }
                    }}
                    title="Edit Bill Items"
                  >
                    ✏️
                  </button>

                  <button
                    className="btn btn-outline"
                    style={{ padding: '8px 10px', borderRadius: '8px' }}
                    onClick={() => {
                      if (activeTableOrders.length > 0) {
                        if (window.confirm(`Are you sure you want to cancel the active orders for ${selectedBillingTable}?`)) {
                          activeTableOrders.forEach(o => deleteOrder(activeRestaurant.id, o.id));
                          addToast('Orders deleted successfully.');
                        }
                      } else {
                        addToast('No active orders to cancel.');
                      }
                    }}
                    title="Delete Active Orders"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <table className="bill-items-table-new">
                <thead>
                  <tr>
                    <th style={{ width: '55%' }}>ITEM DESCRIPTION</th>
                    <th style={{ textAlign: 'center', width: '12%' }}>QTY</th>
                    <th style={{ textAlign: 'right', width: '15%' }}>RATE</th>
                    <th style={{ textAlign: 'right', width: '18%' }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {billingItems.map((item, idx) => {
                    const isVeg = isVegItem(item.name);
                    const options = getItemOptions(item.name);
                    return (
                      <tr key={idx}>
                        <td>
                          <div className="item-name-cell-new">
                            <span className={`item-status-dot ${isVeg ? 'veg' : 'non-veg'}`}></span>
                            <div className="item-name-text-wrapper">
                              <span className="item-name-bold">{item.name}</span>
                              {options && <span className="item-desc-subtitle">{options}</span>}
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: 'center', fontWeight: '600' }}>{item.qty}</td>
                        <td style={{ textAlign: 'right', fontWeight: '500', color: 'var(--text-muted)' }}>
                          ₹{item.rate.toFixed(2)}
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--black)' }}>
                          ₹{item.amount.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}

                  {billingItems.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontWeight: 500 }}>
                        No unpaid items found. This bill has been settled.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {subtotal > 0 && (
              <div className="bill-receipt-summary-new">
                <div className="bill-receipt-row-new">
                  <span>Subtotal</span>
                  <strong style={{ color: 'var(--text-main)' }}>₹{subtotal.toFixed(2)}</strong>
                </div>
                <div className="bill-receipt-row-new">
                  <span>GST ({(taxRate * 100 * 2).toFixed(0)}%)</span>
                  <strong style={{ color: 'var(--text-main)' }}>₹{taxAmt.toFixed(2)}</strong>
                </div>
                <div className="bill-receipt-row-new">
                  <span>Service Charge ({(serviceRate * 100).toFixed(0)}%)</span>
                  <strong style={{ color: 'var(--text-main)' }}>₹{serviceAmt.toFixed(2)}</strong>
                </div>
                <div className="bill-receipt-row-new grand-total-row">
                  <span className="label">Grand Total</span>
                  <span className="val">₹{totalAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}
          </div>

          {/* Column 3: Payment details selection & Actions */}
          <div className="billing-payment-card-new">
            <div className="payment-header-new">
              <h3>Payment Method</h3>
              <p>Select preference for {selectedBillingTable}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'UPI', label: 'UPI / QR Code', icon: '🔳', desc: 'Instant digital payment' },
                { id: 'Card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                { id: 'Cash', label: 'Cash', icon: '💵', desc: 'Manual reconciliation' }
              ].map(method => {
                const isSelected = billingPaymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => {
                      if (subtotal > 0) setBillingPaymentMethod(method.id);
                    }}
                    className={`billing-pay-option-card-new ${isSelected ? 'active' : ''}`}
                    style={{ opacity: subtotal === 0 ? 0.6 : 1, cursor: subtotal === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    <div className="pay-option-icon-box">
                      <span style={{ fontSize: '18px' }}>{method.icon}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--black)' }}>{method.label}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{method.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="btn btn-black"
              onClick={handleMarkAsPaid}
              disabled={subtotal === 0}
              style={{
                width: '100%',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '700',
                borderRadius: '8px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: subtotal === 0 ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px rgba(255, 122, 0, 0.2)'
              }}
            >
              <span>✓</span> Mark as Paid
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-outline"
                onClick={() => addToast('Sending receipt print command...')}
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px' }}
              >
                🖨️ Print
              </button>
              <button
                className="btn btn-outline"
                onClick={() => addToast('Invoice sharing link generated!')}
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px' }}
              >
                🔗 Share
              </button>
            </div>

            <div className="billing-tip-box-new">
              💡 <strong>BILLING TIP</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: 'inherit', fontWeight: '500', lineHeight: 1.4, textAlign: 'left' }}>
                Ensure QR codes are generated per bill for faster reconciliation in daily reports.
              </p>
            </div>
          </div>
        </div>

        {editBillModal.isOpen && (
          <div className="modal-overlay">
            <div className="modal-card" style={{ maxWidth: '600px', padding: 0, overflow: 'hidden' }}>
              <div className="modal-header-flex" style={{ padding: '24px 24px 0 24px', borderBottom: 'none', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', background: 'none', WebkitTextFillColor: 'initial' }}>Edit Bill Items</h3>
                <button className="modal-close" style={{ background: 'none', border: 'none', fontSize: '20px' }} onClick={() => setEditBillModal({ isOpen: false, table: null, items: [] })}>✕</button>
              </div>
              <div style={{ padding: '0 24px 24px 24px', maxHeight: '60vh', overflowY: 'auto' }}>
                <table className="bill-items-table-new" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th style={{ textAlign: 'left', paddingBottom: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>ITEM NAME</th>
                      <th style={{ textAlign: 'center', paddingBottom: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>QTY</th>
                      <th style={{ textAlign: 'right', paddingBottom: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>RATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editBillModal.items.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: '12px 0' }}>
                          <input type="text" value={item.name} onChange={(e) => {
                            const newItems = [...editBillModal.items];
                            newItems[idx].name = e.target.value;
                            setEditBillModal({ ...editBillModal, items: newItems });
                          }} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px', background: 'var(--bg-primary)', color: 'var(--text-main)' }} />
                        </td>
                        <td style={{ padding: '12px 12px' }}>
                          <input type="number" min="1" value={item.qty} onChange={(e) => {
                            const newItems = [...editBillModal.items];
                            newItems[idx].qty = parseInt(e.target.value) || 1;
                            setEditBillModal({ ...editBillModal, items: newItems });
                          }} style={{ width: '60px', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px', textAlign: 'center', background: 'var(--bg-primary)', color: 'var(--text-main)' }} />
                        </td>
                        <td style={{ padding: '12px 0', textAlign: 'right' }}>
                          <input type="number" min="0" step="0.01" value={item.rate} onChange={(e) => {
                            const newItems = [...editBillModal.items];
                            newItems[idx].rate = parseFloat(e.target.value) || 0;
                            setEditBillModal({ ...editBillModal, items: newItems });
                          }} style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px', textAlign: 'right', background: 'var(--bg-primary)', color: 'var(--text-main)' }} />
                        </td>
                      </tr>
                    ))}
                    {editBillModal.items.length === 0 && (
                      <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No items to edit</td></tr>
                    )}
                  </tbody>
                </table>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setEditBillModal({ isOpen: false, table: null, items: [] })} style={{ padding: '10px 24px', fontSize: '14px', borderRadius: '8px' }}>Cancel</button>
                  <button type="button" className="btn" style={{ background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 700, padding: '10px 24px', fontSize: '14px', borderRadius: '8px' }} onClick={() => {
                    addToast('Bill items updated! (Simulated)');
                    setEditBillModal({ isOpen: false, table: null, items: [] });
                  }}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )}
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
      addToast(`Created Table ${cleanId}!`);
      setActivePage(null);
    } else {
      addToast('Table ID already exists!');
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
        {/* Header Row */}
        <div className="panel-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="panel-inner-title" style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: 'var(--black)', fontFamily: 'Outfit, sans-serif' }}>Dining Tables & QR Management</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn-bell-mock" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', color: 'var(--black)', padding: '6px' }}>
              🔔
            </button>
            <button
              className="btn"
              onClick={() => { setAddTableForm({ id: '', seats: 4, waiter: '' }); setActivePage('table-form'); }}
              style={{ background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              + Add Dining Table
            </button>
          </div>
        </div>

        {/* Top: 5-column Dining Table Cards */}
        <div className="tables-row-grid-new">
          {tables.map(table => {
            const isSelected = selectedTableId === table.id;
            const isOccupied = table.status.toLowerCase() === 'occupied';
            return (
              <div
                key={table.id}
                className={`table-card-new ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedTableId(table.id);
                }}
              >
                {isSelected && <div className="table-card-checkmark-badge">✓</div>}

                <div className="table-card-header-new">
                  <span className={`table-card-id-box-new ${isOccupied ? 'occupied' : ''}`}>
                    {table.id}
                  </span>
                  <span className={`table-card-status-new ${isOccupied ? 'occupied' : 'free'}`}>
                    <span className="status-dot-new"></span>
                    {table.status.toUpperCase()}
                  </span>
                </div>

                <div className="table-card-body-new" style={{ color: isOccupied ? 'var(--black)' : 'var(--success)' }}>
                  <svg width="50" height="34" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 16C6 14.8954 6.89543 14 8 14H52C53.1046 14 54 14.8954 54 16V18C54 19.1046 53.1046 20 52 20H8C6.89543 20 6 19.1046 6 18V16Z" fill="currentColor" />
                    <rect x="16" y="20" width="4" height="14" rx="1" fill="currentColor" />
                    <rect x="40" y="20" width="4" height="14" rx="1" fill="currentColor" />
                    <path d="M12 34H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                  </svg>
                </div>

                {table.waiter && (
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', textAlign: 'center', marginBottom: '8px' }}>
                    Waiter: {table.waiter}
                  </div>
                )}

                <div className="table-card-footer-new">
                  <span>Capacity: {table.seats || 4}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Details Grid */}
        <div className="tables-details-split-new">
          {/* Column 1: QR Preview */}
          <div className="qr-preview-card-new">
            <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: 'var(--black)', fontFamily: 'Outfit, sans-serif' }}>QR Preview</h3>

            <div className="qr-dashed-container-new">
              <div className="qr-slate-box-new" style={{ backgroundColor: '#9aaaba' }}>
                <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://${window.location.hostname}:3001/table/${currentTable.id}`}
                    alt={`QR code for Table ${currentTable.id}`}
                    style={{ width: '100%', height: '100%' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="qr-active-badge-new">
                ACTIVE: {currentTable.id}
              </div>
            </div>

            <button
              className="btn"
              onClick={() => launchSimulatorTable(currentTable.id)}
              style={{
                width: '100%',
                background: '#eaeef2',
                color: '#334155',
                border: 'none',
                fontWeight: '750',
                fontSize: '13px',
                padding: '12px 20px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: 'auto',
                cursor: 'pointer'
              }}
            >
              🚀 Open in Customer Simulator
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-outline"
                onClick={() => addToast('Sending QR template to printer...')}
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                🖨️ Print Sticker
              </button>
              <button
                className="btn btn-outline"
                onClick={() => addToast('SVG QR sticker generated & downloaded!')}
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                📥 Download SVG
              </button>
            </div>
          </div>

          {/* Column 2: Selected Table Details Form */}
          <div className="table-details-card-new">
            <div className="table-details-header-new">
              <div>
                <h3>Table {currentTable.id} Details</h3>
                <p>Update seating and availability for this table.</p>
              </div>
              <div className="table-details-header-right-new">
                {currentTable.status.toLowerCase() === 'occupied' && (
                  <span>Active Since: 11:45 AM</span>
                )}
                <button
                  className="btn-trash-mock"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete Table ${currentTable.id}?`)) {
                      deleteDiningTable(activeRestaurant.id, currentTable.id);
                      addToast(`Deleted Table ${currentTable.id}`);
                      const remaining = tables.filter(t => t.id !== currentTable.id);
                      if (remaining.length > 0) {
                        setSelectedTableId(remaining[0].id);
                      }
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ef4444',
                    fontSize: '18px',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Delete Table"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="divider-new"></div>

            <div>
              <div className="details-section-label-new">Seating Capacity</div>
              <div className="capacity-control-new">
                <button
                  type="button"
                  className="capacity-btn-new"
                  onClick={() => setDraftSeats(prev => Math.max(1, prev - 1))}
                >
                  −
                </button>
                <span className="capacity-value-new">{draftSeats}</span>
                <button
                  type="button"
                  className="capacity-btn-new"
                  onClick={() => setDraftSeats(prev => Math.min(12, prev + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <div className="details-section-label-new">Current Status</div>
              <div className="status-segmented-control-new">
                <div
                  className={`status-segment-new ${draftStatus === 'Free' ? 'active free' : ''}`}
                  onClick={() => setDraftStatus('Free')}
                >
                  FREE
                </div>
                <div
                  className={`status-segment-new ${draftStatus === 'Occupied' ? 'active occupied' : ''}`}
                  onClick={() => setDraftStatus('Occupied')}
                >
                  OCCUPIED
                </div>
              </div>
            </div>

            <div className="divider-new"></div>

            <div>
              <div className="details-section-label-new">Assigned Waiter (Optional)</div>
              <select
                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', backgroundSize: '14px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer' }}
                value={draftWaiter}
                onChange={(e) => setDraftWaiter(e.target.value)}
              >
                <option value="">Select Waiter...</option>
                <option value="Arjun K.">Arjun K.</option>
                <option value="Priya M.">Priya M.</option>
                <option value="Rahul S.">Rahul S.</option>
                <option value="Anita D.">Anita D.</option>
                <option value="Vikram S.">Vikram S.</option>
              </select>
            </div>

            <div className="divider-new"></div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setDraftSeats(currentTable.seats || 4);
                  setDraftStatus(currentTable.status || 'Free');
                  setDraftWaiter(currentTable.waiter || '');
                }}
                style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '8px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  updateDiningTable(activeRestaurant.id, currentTable.id, { seats: draftSeats, status: draftStatus, waiter: draftWaiter });
                  addToast(`Saved changes for Table ${currentTable.id}!`);
                }}
                style={{
                  padding: '10px 24px',
                  fontSize: '13px',
                  borderRadius: '8px',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
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
      addToast('Staff details updated!');
    } else {
      const nextNum = staff.length + 1;
      const newId = `S-${nextNum < 10 ? '0' + nextNum : nextNum}`;
      addStaff(activeRestaurant.id, {
        ...staffForm,
        id: newId
      });
      addToast('New staff member added!');
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
                    <td style={{ padding: '12px 14px', fontWeight: 500, color: 'var(--text-main)' }}>{s.name}</td>
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
        serviceChargeRate: parseFloat(settingsForm.serviceChargeRate) / 100,
        logo: settingsForm.logo,
        banner: settingsForm.banner,
        phone: settingsForm.phone,
        address: settingsForm.address,
        city: settingsForm.city,
        state: settingsForm.state,
        gstNumber: settingsForm.gstNumber,
        openingTime: settingsForm.openingTime,
        closingTime: settingsForm.closingTime,
        selfService: !!settingsForm.selfService,
        minOrderAmount: parseFloat(settingsForm.minOrderAmount) || 0
      }
    });
    setDarkMode(settingsForm.darkMode);
    addToast('Restaurant configuration saved successfully!');
  };

  // ==========================================
  // USERS & ROLES MODULES
  // ==========================================

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
  );

  const renderAddUser = () => (
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


  const renderSettings = () => (
    <section className="panel-view active profile-settings-wrapper" style={{ padding: 0 }}>
      {/* Top Header Row with Orange Border */}
      <div className="profile-settings-top-bar">
        <h2 className="profile-settings-page-title">Settings</h2>
        <p className="profile-settings-page-subtitle">Configure your restaurant dashboard</p>
      </div>

      <div className="profile-settings-container">
        <div className="profile-settings-section-header">
          <h2 className="profile-settings-section-title">Profile Settings</h2>
          <p className="profile-settings-section-subtitle">Manage your personal profile, security credentials, and preferences</p>
        </div>

        {/* Card 1: Profile Information */}
        <div className="profile-card">
          <div className="profile-card-header">
            <span className="profile-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
            </span>
            <h3 className="profile-card-title">Profile Information</h3>
          </div>

          <div className="profile-grid-layout">
            <div className="profile-avatar-column">
              <div className="profile-avatar-box">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <button type="button" className="profile-btn-choose" onClick={() => addToast('Avatar upload clicked')}>Choose</button>
            </div>

            <div className="profile-form-grid">
              <div className="profile-form-group">
                <label className="profile-form-label">Full Name <span className="asterisk">*</span></label>
                <input type="text" className="profile-form-input" defaultValue="Admin User" />
              </div>
              <div className="profile-form-group">
                <label className="profile-form-label">Email Address <span className="asterisk">*</span></label>
                <input type="email" className="profile-form-input" defaultValue="admin@serveiq.com" />
              </div>
              <div className="profile-form-group">
                <label className="profile-form-label">Username <span className="asterisk">*</span></label>
                <input type="text" className="profile-form-input" defaultValue="superadmin" />
              </div>
              <div className="profile-form-group">
                <label className="profile-form-label">Mobile Number <span className="asterisk">*</span></label>
                <input type="text" className="profile-form-input" defaultValue="+91 9876543210" />
              </div>
              <div className="profile-form-group full-width">
                <label className="profile-form-label">Designation</label>
                <input type="text" className="profile-form-input disabled" value="Super Admin" readOnly />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Login & Security */}
        <div className="profile-card">
          <div className="profile-card-header">
            <span className="profile-card-icon" style={{ color: '#f59e0b' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" /></svg>
            </span>
            <h3 className="profile-card-title">Login & Security</h3>
          </div>

          <div className="profile-form-grid">
            <div className="profile-form-group full-width">
              <label className="profile-form-label">Current Password</label>
              <input type="password" className="profile-form-input disabled" placeholder="Enter current password" readOnly />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">New Password</label>
              <input type="password" className="profile-form-input" placeholder="Enter new password" />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Confirm Password</label>
              <input type="password" className="profile-form-input" placeholder="Confirm new password" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions-row">
          <button type="button" className="profile-btn-reset" onClick={() => addToast('Defaults restored')}>Reset Defaults</button>
          <button type="button" className="profile-btn-save" onClick={() => addToast('Profile settings saved successfully!')}>Save Settings</button>
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
        >←</button>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>{pageTitle[activePage]}</h2>
          {subtitle && <span style={{ fontSize: '12px', color: '#64748b' }}>{subtitle}</span>}
        </div>
      </div>
    );



    if (activePage === 'order-edit-form' && activeEditOrder) {
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
        <section>
          <div style={{ width: '100%' }}>
            <PageHeader subtitle={`Modify details for order #ORD-${activeEditOrder.id}`} />
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
      );
    }



    if (activePage === 'table-profile') {
      const currentTable = tables.find(t => t.id === selectedTableId) || { id: selectedTableId, status: 'Free', seats: 4 };
      const tableNum = currentTable.id.replace('T-', '');
      const activeTableOrder = orders.find(o => (o.table === tableNum || parseInt(o.table) === parseInt(tableNum)) && o.billingStatus === 'unpaid');

      return (
        <section>
          <div style={{ width: '100%' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--primary-light)' }}>
              <button
                style={{
                  background: '#fff',
                  border: '1.5px solid var(--border)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.2s',
                  flexShrink: 0
                }}
                onClick={() => setActivePage(null)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'inherit'; }}
              >
                ←
              </button>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Tables Registry</span>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: 'var(--black)' }}>Table Showcase & QR Profile</h2>
              </div>
            </div>

            {/* Main Card Container */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid var(--border)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              display: 'grid',
              gridTemplateColumns: '1.8fr 1fr',
              gap: '32px'
            }}>
              {/* Left Side: Connection Profile */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#000000' }}>Terminal Connection Profile</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>Display Name</span>
                    <strong style={{ color: '#000000', fontSize: '14px' }}>Table {tableNum}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>Seating Capacity</span>
                    <strong style={{ color: '#000000', fontSize: '14px' }}>{currentTable.seats || 4} seats</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', alignItems: 'center' }}>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>Current Status</span>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      backgroundColor: currentTable.status === 'Occupied' ? '#fef3c7' : '#dcfce7',
                      color: currentTable.status === 'Occupied' ? '#d97706' : '#15803d'
                    }}>
                      {currentTable.status}
                    </span>
                  </div>
                </div>

                {/* Active Session details */}
                <div style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '32px'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>Active Table Session</span>

                  {activeTableOrder ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b', fontSize: '13px' }}>Order ID:</span>
                        <strong style={{ color: '#000000', fontSize: '13px' }}>#ORD-{activeTableOrder.id}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b', fontSize: '13px' }}>Assigned Waiter:</span>
                        <strong style={{ color: '#000000', fontSize: '13px' }}>{activeTableOrder.waiter || 'Unassigned'}</strong>
                      </div>
                    </div>
                  ) : (
                    <div style={{ color: '#64748b', fontSize: '13px', fontStyle: 'italic' }}>No active order session for this table.</div>
                  )}
                </div>

                <button
                  className="btn btn-black"
                  onClick={() => setActivePage(null)}
                  style={{ padding: '10px 24px', fontSize: '14px', borderRadius: '8px', fontWeight: 'bold' }}
                >
                  Back to Registry
                </button>
              </div>

              {/* Right Side: QR Sticker and Print controls */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #e2e8f0', paddingLeft: '32px' }}>
                <div style={{
                  border: '1.5px dashed #cbd5e1',
                  borderRadius: '16px',
                  padding: '24px',
                  width: '100%',
                  maxWidth: '240px',
                  textAlign: 'center',
                  background: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ width: '20px', height: '20px', background: 'var(--primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>S</div>
                    <strong style={{ fontSize: '14px', color: '#000000' }}>Serviq</strong>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>Scan to View Menu & Order</div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '130px', height: '130px', background: '#000000', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', borderRadius: '8px', padding: '10px', position: 'relative' }}>
                      QR CODE
                      <div style={{ position: 'absolute', width: '24px', height: '24px', background: 'var(--primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', border: '2px solid #000' }}>S</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#000000' }}>Table {tableNum}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{currentTable.seats || 4} Seats</div>
                </div>

                <button
                  className="btn btn-outline"
                  onClick={() => addToast('Printing QR code sticker...')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '13px' }}
                >
                  🖨️ Print QR code
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (activePage === 'menu-form') {
      return (
        <section>
          <div style={{ width: '100%' }}>
            <PageHeader subtitle={menuForm.id ? 'Modify menu item details' : 'Create a new dish for the menu'} />
            <div style={sty.pageCard}>
              <form onSubmit={handleMenuSubmit} style={{ width: '100%' }}>
                {/* Hidden File Input */}
                <input
                  id="menu-item-image-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setMenuForm({ ...menuForm, image: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{ display: 'none' }}
                />

                <div className="menu-form-grid">
                  {/* Left Column: Image Uploader */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Item Image</label>
                    <div
                      className="menu-item-image-uploader"
                      onClick={() => document.getElementById('menu-item-image-file').click()}
                    >
                      {menuForm.image ? (
                        <>
                          <img src={menuForm.image} alt={menuForm.name || 'Dish preview'} />
                          <div className="menu-item-image-uploader-overlay">
                            📷 Change Photo
                          </div>
                        </>
                      ) : (
                        <div className="menu-item-image-uploader-placeholder">
                          <span className="icon">🍳</span>
                          <span className="text">Upload Dish Photo</span>
                          <span className="subtext">Supports JPG, JPEG, PNG, GIF</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Form Fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Item Name</label>
                        <input
                          type="text"
                          value={menuForm.name}
                          onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                          required
                          placeholder="e.g. Chicken Biryani"
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Category</label>
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

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Price (₹)</label>
                          <input
                            type="number"
                            value={menuForm.price}
                            onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                            required
                            placeholder="320"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Food Type</label>
                          <select
                            value={menuForm.veg ? 'veg' : 'non-veg'}
                            onChange={(e) => setMenuForm({ ...menuForm, veg: e.target.value === 'veg' })}
                            required
                          >
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                          </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Status</label>
                          <select
                            value={menuForm.available ? 'active' : 'inactive'}
                            onChange={(e) => setMenuForm({ ...menuForm, available: e.target.value === 'active' })}
                            required
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Description</label>
                        <textarea
                          rows="4"
                          value={menuForm.desc}
                          onChange={(e) => setMenuForm({ ...menuForm, desc: e.target.value })}
                          placeholder="Provide a delicious description of this menu item..."
                          style={{ resize: 'none' }}
                        ></textarea>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                      <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => setActivePage(null)}>Cancel</button>
                      <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>💾 Save Changes</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      );
    }

    if (activePage === 'table-form') {
      return (
        <section>
          <div style={{ width: '100%' }}>
            <PageHeader subtitle="Create a new physical dining table with capacity" />
            <div style={sty.pageCard}>
              <form onSubmit={handleAddTableSubmit} style={{ width: '100%' }}>
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
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>Assigned Waiter (Optional)</label>
                  <select
                    style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', backgroundSize: '14px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer' }}
                    value={addTableForm.waiter || ''}
                    onChange={(e) => setAddTableForm({ ...addTableForm, waiter: e.target.value })}
                  >
                    <option value="">Select Waiter...</option>
                    <option value="Arjun K.">Arjun K.</option>
                    <option value="Priya M.">Priya M.</option>
                    <option value="Rahul S.">Rahul S.</option>
                    <option value="Anita D.">Anita D.</option>
                    <option value="Vikram S.">Vikram S.</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => setActivePage(null)}>Cancel</button>
                  <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>💾 Create Table</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      );
    }

    if (activePage === 'staff-form') {
      return (
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
      );
    }

    if (activePage === 'kitchen-form') {
      return (
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
            <img src={activeRestaurant.settings?.logo || activeRestaurant.logo || "/logo.png"} alt="Serviq Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-text">{name}</span>
            <span className="plan-sub">{plan} Plan</span>
          </div>
        </div>

        <ul className="sidebar-menu">
          {isTabAllowed('overview') && (
            <li className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => { setActiveTab('overview'); setActivePage(null); }}>
              <a href="#">
                <DashboardIcon size={18} />
                <span>Dashboard</span>
              </a>
            </li>
          )}
          {isTabAllowed('menu') && (
            <li className={`sidebar-item ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => { setActiveTab('menu'); setActivePage(null); }}>
              <a href="#">
                <MenuIcon size={18} />
                <span>Menu Management</span>
              </a>
            </li>
          )}
          {isTabAllowed('orders') && (
            <li className={`sidebar-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => { setActiveTab('orders'); setActivePage(null); }}>
              <a href="#">
                <OrdersIcon size={18} />
                <span>Incoming Orders</span>
                {pendingOrdersCount > 0 && <span className="pulse-indicator" style={{ marginLeft: 'auto' }}></span>}
              </a>
            </li>
          )}
          {isTabAllowed('billing') && (
            <li className={`sidebar-item ${activeTab === 'billing' ? 'active' : ''}`} onClick={() => { setActiveTab('billing'); setActivePage(null); }}>
              <a href="#">
                <BillingIcon size={18} />
                <span>Billing</span>
              </a>
            </li>
          )}
          {isTabAllowed('saas') && (
            <li className={`sidebar-item ${activeTab === 'saas' ? 'active' : ''}`} onClick={() => { setActiveTab('saas'); setActivePage(null); }}>
              <a href="#">
                <TablesIcon size={18} />
                <span>Tables</span>
              </a>
            </li>
          )}
          {isTabAllowed('staff') && (
            <li className={`sidebar-item ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => { setActiveTab('staff'); setActivePage(null); }}>
              <a href="#">
                <StaffIcon size={18} />
                <span>Staff</span>
              </a>
            </li>
          )}
          {isTabAllowed('users') && (
            <li className={`sidebar-item has-dropdown ${['roles', 'roles-add', 'users-list', 'users-add'].includes(activeTab) ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsUsersMenuOpen(!isUsersMenuOpen); }}>
                <UsersIcon size={18} />
                <span>Users</span>
                <span style={{ marginLeft: 'auto', transition: 'transform 0.2s', transform: isUsersMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </a>
              <ul className={`sidebar-dropdown-menu ${isUsersMenuOpen ? 'open' : ''}`}>
                <li>
                  <a href="#" className={`sidebar-sub-item ${['roles', 'roles-add'].includes(activeTab) ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('roles'); setActivePage(null); }}>
                    Roles & Permissions
                  </a>
                </li>
                <li>
                  <a href="#" className={`sidebar-sub-item ${['users-list', 'users-add'].includes(activeTab) ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('users-list'); setActivePage(null); }}>
                    User Lists
                  </a>
                </li>
              </ul>
            </li>
          )}
          {isTabAllowed('settings') && (
            <li className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { setActiveTab('settings'); setActivePage(null); }}>
              <a href="#">
                <SettingsIcon size={18} />
                <span>Settings</span>
              </a>
            </li>
          )}
        </ul>

       
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
        {(!activePage || activePage === 'order-view') && (
          <header className="main-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px' }}>
            <div className="header-title-container" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1 className="header-title" style={{ textTransform: 'capitalize', fontSize: '22px', fontWeight: 800 }}>
                {activeTab === 'orders' ? 'Incoming Orders' : 
                 activeTab.includes('users') ? 'Users' : 
                 activeTab.includes('roles') ? 'Roles & Permissions' : 
                 activeTab}
              </h1>
              {activeTab !== 'orders' && <span className="header-subtitle-date">{dateTimeStr}</span>}
            </div>



            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button className="btn btn-user-profile" onClick={() => { setActiveTab('settings'); setActivePage(null); }}>
                👤 {currentUser?.role || 'Admin'}
              </button>
           
            </div>
          </header>
        )}

        {/* CONTENT BODY */}
        <div className="content-body">
          {activePage && activePage !== 'order-view' ? renderActivePage() : (
            <>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'orders' && renderOrders()}
              {activeTab === 'menu' && renderMenu()}
              {activeTab === 'billing' && renderBilling()}
              {activeTab === 'saas' && renderTables()}
              {activeTab === 'staff' && renderStaff()}
              {activeTab === 'roles' && renderRoles()}
              {activeTab === 'roles-add' && renderAddRole()}
              {activeTab === 'users-list' && renderUsersList()}
              {activeTab === 'users-add' && renderAddUser()}
              {activeTab === 'settings' && renderSettings()}
            </>
          )}
        </div>

        {/* MODAL OVERLAY FOR ORDER VIEW */}
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
                  <table className="order-view-items-table">
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
      </main>
    </div>
  );
} 
