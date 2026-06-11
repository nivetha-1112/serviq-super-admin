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

const FilterIcon = ({ size = 16, color = '#ff7a00' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// ─── Professional Sidebar Icons (Lucide-style) ───────────────────────────────

// Dashboard: LayoutDashboard
const DashboardIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

// Table Management: TableProperties (grid with header row)
const TablesIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M3 9h18" />
    <path d="M12 3v6" />
    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
  </svg>
);

// QR Code: QrCode
const QrIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect width="5" height="5" x="3" y="3" rx="1" />
    <rect width="5" height="5" x="16" y="3" rx="1" />
    <rect width="5" height="5" x="3" y="16" rx="1" />
    <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
    <path d="M21 21v.01" />
    <path d="M12 7v3a2 2 0 0 1-2 2H7" />
    <path d="M3 12h.01" />
    <path d="M12 3h.01" />
    <path d="M12 16v.01" />
    <path d="M16 12h1" />
    <path d="M21 12v.01" />
    <path d="M12 21v-1" />
  </svg>
);

// Menu Management: BookOpen (restaurant menu book)
const MenuIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// Order Management: ShoppingBag
const OrdersIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <line x1="3" x2="21" y1="6" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

// Billing: Receipt
const BillingIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <path d="M14 8H8" />
    <path d="M16 12H8" />
    <path d="M13 16H8" />
  </svg>
);

// Waiter Management: ConciergeBell (a serving bell)
const WaiterIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M3 20a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2Z" />
    <path d="M20 16a8 8 0 1 0-16 0" />
    <path d="M12 4v4" />
    <path d="M10 4h4" />
  </svg>
);

// Kitchen Management: ChefHat
const KitchenIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
    <line x1="6" x2="18" y1="17" y2="17" />
  </svg>
);

// Users: Users2 (two people)
const UsersIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M14 19a6 6 0 0 0-12 0" />
    <circle cx="8" cy="9" r="4" />
    <path d="M22 19a6 6 0 0 0-6-6 4 4 0 0 0 0-8" />
  </svg>
);

// Reports: BarChart3
const ReportsIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
);

// Settings: Settings2 (sliders)
const SettingsIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M20 7h-9" />
    <path d="M14 17H5" />
    <circle cx="17" cy="17" r="3" />
    <circle cx="7" cy="7" r="3" />
  </svg>
);

// Staff (generic)
const StaffIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CreditCardIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
    <line x1="7" x2="11" y1="15" y2="15" />
    <line x1="15" x2="17" y1="15" y2="17" />
  </svg>
);

const ListIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const CustomerIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <line x1="19" y1="8" x2="21" y2="10" />
    <line x1="21" y1="8" x2="19" y2="10" />
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
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [billingSearch, setBillingSearch] = useState('');

  // 3. Menu Management states
  const [menuCategory, setMenuCategory] = useState('All Items');
  const [menuSearch, setMenuSearch] = useState('');
  const [menuSort, setMenuSort] = useState('name');
  const [activePage, setActivePage] = useState(null); // 'menu-form' | 'table-form' | 'staff-form' | 'kitchen-form' | 'categories-manager' | 'category-form'
  const [menuForm, setMenuForm] = useState({ id: '', name: '', desc: '', price: '', category: 'Starters', image: '', prepTime: '15 mins', veg: true, available: true });
  const [categoriesListState, setCategoriesListState] = useState([
    { id: 1, name: 'Starters', desc: 'Appetizers and quick bites', status: 'Available' },
    { id: 2, name: 'Rice Meals', desc: 'Main course rice dishes', status: 'Available' },
    { id: 3, name: 'Tiffin', desc: 'South Indian tiffins', status: 'Available' },
    { id: 4, name: 'Rotis', desc: 'Indian breads', status: 'Available' },
    { id: 5, name: 'Desserts', desc: 'Sweets and ice creams', status: 'Available' },
    { id: 6, name: 'Drinks', desc: 'Beverages', status: 'Available' }
  ]);
  const [categoryForm, setCategoryForm] = useState({ id: '', name: '', desc: '', status: 'Available' });
  const [assignWaiterForm, setAssignWaiterForm] = useState({ selectedWaiter: '', selectedTables: [] });

  // 4. Billing Panel states
  const [selectedBillingTable, setSelectedBillingTable] = useState('');
  const [billingPaymentMethod, setBillingPaymentMethod] = useState('UPI');
  const [editBillModal, setEditBillModal] = useState({ isOpen: false, table: null, items: [] });

  // 5. Tables & QR Management states
  const [selectedTableId, setSelectedTableId] = useState('');
  const [addTableForm, setAddTableForm] = useState({ id: '', seats: 4, waiter: '' });
  const [tableFormErrors, setTableFormErrors] = useState({});
  const [draftSeats, setDraftSeats] = useState(4);
  const [draftStatus, setDraftStatus] = useState('Available');
  const [draftWaiter, setDraftWaiter] = useState('');
  const [draftName, setDraftName] = useState('');
  const [draftArea, setDraftArea] = useState('Main Dining');
  const [isTableDetailsOpen, setIsTableDetailsOpen] = useState(false);
  const [isGenerateQrOpen, setIsGenerateQrOpen] = useState(false);
  const [genQrForm, setGenQrForm] = useState({ id: '', status: 'Free' });
  const [genQrFormErrors, setGenQrFormErrors] = useState({});
  const [menuFormErrors, setMenuFormErrors] = useState({});
  const [categoryFormErrors, setCategoryFormErrors] = useState({});
  const [deleteMenuItemId, setDeleteMenuItemId] = useState(null);

  // 6. Staff states
  const [staffForm, setStaffForm] = useState({ id: '', name: '', role: 'Waiter', phone: '', email: '', password: '', status: 'On Duty' });
  const [staffFormErrors, setStaffFormErrors] = useState({});
  const [kitchenPasswordForm, setKitchenPasswordForm] = useState('');
  const [kitchenPasswordError, setKitchenPasswordError] = useState('');

  // Users & Roles states
  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);
  const [isWaitersMenuOpen, setIsWaitersMenuOpen] = useState(false);
  const [isKitchenMenuOpen, setIsKitchenMenuOpen] = useState(false);

  // Waiter Report filter states
  const [waiterFilterDateStart, setWaiterFilterDateStart] = useState('');
  const [waiterFilterDateEnd, setWaiterFilterDateEnd] = useState('');
  const [waiterFilterName, setWaiterFilterName] = useState('All');
  const [waiterFilterTable, setWaiterFilterTable] = useState('All');
  const [waiterFilterSource, setWaiterFilterSource] = useState('All');
  const [waiterFilterPayMode, setWaiterFilterPayMode] = useState('All');
  const [waiterFilterPayStatus, setWaiterFilterPayStatus] = useState('All');
  const [waiterFilterOrderStatus, setWaiterFilterOrderStatus] = useState('All');

  // Waiter Report popup states
  const [activeReportViewOrder, setActiveReportViewOrder] = useState(null);
  const [activeReportOfflinePaymentOrder, setActiveReportOfflinePaymentOrder] = useState(null);
  const [offlinePaymentType, setOfflinePaymentType] = useState('Cash');

  // Kitchen Report filter states
  const [kitchenFilterDateStart, setKitchenFilterDateStart] = useState('');
  const [kitchenFilterDateEnd, setKitchenFilterDateEnd] = useState('');
  const [kitchenFilterStaff, setKitchenFilterStaff] = useState('All');
  const [kitchenFilterDish, setKitchenFilterDish] = useState('All');
  const [kitchenFilterPriority, setKitchenFilterPriority] = useState('All');

  // Kitchen Report popup states
  const [activeKitchenReportViewOrder, setActiveKitchenReportViewOrder] = useState(null);
  const [activeKitchenReportItemOrder, setActiveKitchenReportItemOrder] = useState(null);
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
    'waiter-list': ' Waiter Live Directory',
    'assign-waiter-page': ' Assign Waiter to Tables',
    'category-form': categoryForm.id ? ' Edit Category' : ' Add New Category',
    'categories-manager': ' Menu Categories',
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

  // 9. Reports State
  const [reportTab, setReportTab] = useState('sales');

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
        setDraftStatus(current.status || 'Available');
        setDraftWaiter(current.waiter || '');
        setDraftName(current.name || '');
        setDraftArea(current.area || 'Main Dining');
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
    if (role === 'Kitchen') return ['orders', 'kitchen', 'kitchen-report'].includes(tab);
    if (role === 'Waiter') return ['orders', 'saas', 'waiters', 'waiter-report'].includes(tab);
    return false;
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

  const iconBtnViewStyle = {
    ...iconBtnStyle,
    color: '#475569',
    marginRight: '12px'
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

  // KPIs
  const todayRevenue = orders
    .filter(o => o.billingStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'new').length;
  const preparingOrdersCount = orders.filter(o => o.status === 'preparing').length;
  const completedOrdersCount = orders.filter(o => o.status === 'done').length;
  const occupiedTablesCount = tables.filter(t => t.status === 'Occupied').length;

  const revenueThisMonth = todayRevenue * 24 + 14500; // Mock calculation for demo
  const qrScansCount = orders.length * 3 + 12; // Mock calculation for demo

  const topSellingItem = (() => {
    const counts = {};
    orders.forEach(o => o.items.forEach(i => { counts[i.name] = (counts[i.name] || 0) + i.qty; }));
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0] ? sorted[0][0] : 'N/A';
  })();

  // 1. RENDER OVERVIEW PANEL
  const renderOverview = () => (
    <section className="panel-view active">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Today's Orders</div>
              <h3>{orders.length}</h3>
              <div className="stat-sub-label green-label">Orders received today</div>
            </div>
            <div className="stat-icon-wrapper">📋</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Active Tables</div>
              <h3>{occupiedTablesCount}</h3>
              <div className="stat-sub-label green-label">Occupied tables</div>
            </div>
            <div className="stat-icon-wrapper">🪑</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Revenue Today</div>
              <h3>₹{todayRevenue.toLocaleString('en-IN')}</h3>
              <div className="stat-sub-label green-label">Daily sales</div>
            </div>
            <div className="stat-icon-wrapper font-rupee">₹</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Revenue This Month</div>
              <h3>₹{revenueThisMonth.toLocaleString('en-IN')}</h3>
              <div className="stat-sub-label green-label">Monthly sales</div>
            </div>
            <div className="stat-icon-wrapper font-rupee">₹</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Pending Orders</div>
              <h3>{pendingOrdersCount}</h3>
              <div className="stat-sub-label red-label">Orders awaiting processing</div>
            </div>
            <div className="stat-icon-wrapper">⏱️</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Completed Orders</div>
              <h3>{completedOrdersCount}</h3>
              <div className="stat-sub-label green-label">Orders served</div>
            </div>
            <div className="stat-icon-wrapper">✅</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">Top Items</div>
              <h3 style={{ fontSize: topSellingItem.length > 15 ? '16px' : '20px' }}>{topSellingItem}</h3>
              <div className="stat-sub-label green-label">Most ordered items</div>
            </div>
            <div className="stat-icon-wrapper">⭐</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-main-row">
            <div className="stat-info">
              <div className="stat-label">QR Scans</div>
              <h3>{qrScansCount}</h3>
              <div className="stat-sub-label green-label">Total table scans</div>
            </div>
            <div className="stat-icon-wrapper">📱</div>
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

  const handlePaymentStatusToggle = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const newStatus = order.billingStatus === 'paid' ? 'pending' : 'paid';
      updateOrder(activeRestaurant.id, { ...order, billingStatus: newStatus });
      addToast(`Payment marked as ${newStatus === 'paid' ? 'Paid' : 'Pending'} for Order #${orderId}`);
    }
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
      <section className="panel-view active">
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
          <h2 className="mockup2-stream-title">Incoming orders</h2>


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

        {/* Responsive Orders Table */}
        <div className="menu-table-wrapper" style={{ overflowX: 'auto', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', boxShadow: 'var(--card-shadow)', marginBottom: '24px' }}>
          <table className="menu-items-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Order ID</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Table</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Items & Notes</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Time</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Waiter</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Total</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Payment</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(ord => {
                const minutesElapsed = parseInt((ord.timeAgo || '').replace(/[^0-9]/g, '')) || 0;
                const isRush = (ord.status === 'new' || ord.status === 'preparing') && minutesElapsed >= 20;
                const statusLabels = { new: 'NEW', preparing: 'PREPARING', ready: 'READY', done: 'COMPLETED' };
                const statusLabel = statusLabels[ord.status] || ord.status?.toUpperCase();

                return (
                  <tr key={ord.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    {/* Order ID */}
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-main)', fontSize: '13px', fontFamily: 'monospace' }}>
                      #ORD-{ord.id}
                      {isRush && (
                        <span style={{ marginLeft: '6px', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '12px', background: '#ff4d00', color: '#fff', display: 'inline-block', verticalAlign: 'middle' }}>
                          RUSH
                        </span>
                      )}
                    </td>
                    {/* Table */}
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-main)', fontSize: '13px' }}>
                      Table {ord.table}
                    </td>
                    {/* Items & Notes */}
                    <td style={{ padding: '12px 14px', fontSize: '13px', whiteSpace: 'normal', minWidth: '180px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {ord.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.name}</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#ff7a00', background: 'rgba(255,122,0,0.09)', padding: '1px 6px', borderRadius: '4px' }}>×{item.qty}</span>
                          </div>
                        ))}
                        {ord.notes && (
                          <div style={{ fontSize: '11px', color: '#888', fontStyle: 'italic', marginTop: '4px' }}>
                            📝 {ord.notes}
                          </div>
                        )}
                      </div>
                    </td>
                    {/* Time */}
                    <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      {ord.timeAgo ? `${ord.timeAgo} ago` : 'Just now'}
                    </td>
                    {/* Waiter */}
                    <td style={{ padding: '12px 14px' }}>
                      <button
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                        onClick={() => setAssignWaiterModal({ isOpen: true, orderId: ord.id, selectedWaiter: ord.waiter || '' })}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        {ord.waiter ? ord.waiter.split(' ')[0] : 'Unassigned'}
                      </button>
                    </td>
                    {/* Total */}
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-main)', fontSize: '13px' }}>
                      ₹{ord.total}
                    </td>
                    {/* Status */}
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        letterSpacing: '0.5px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: ord.status === 'done' ? '#dcfce7' : 'rgba(255,122,0,0.09)',
                        border: `1px solid ${ord.status === 'done' ? 'rgba(34,197,94,0.4)' : 'rgba(255,122,0,0.3)'}`,
                        color: ord.status === 'done' ? '#16a34a' : '#ff7a00',
                        textTransform: 'uppercase'
                      }}>
                        <span style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: ord.status === 'done' ? '#16a34a' : '#ff7a00',
                          display: 'inline-block'
                        }} />
                        {statusLabel}
                      </span>
                    </td>
                    {/* Payment Status */}
                    <td style={{ padding: '12px 14px' }}>
                      <button
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          background: ord.billingStatus === 'paid' ? '#dcfce7' : 'rgba(255,122,0,0.05)',
                          color: ord.billingStatus === 'paid' ? '#16a34a' : '#ff7a00',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        onClick={() => handlePaymentStatusToggle(ord.id)}
                      >
                        💰 {ord.billingStatus === 'paid' ? 'Paid' : 'Pending'}
                      </button>
                    </td>
                    {/* Actions */}
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <IconBtn
                          icon={<EyeIcon size={18} />}
                          tooltip="View Details"
                          style={{ ...iconBtnViewStyle, marginRight: 0 }}
                          onClick={() => { setActiveViewOrder(ord); setActivePage('order-view'); }}
                        />
                        {ord.status !== 'done' ? (
                          <button
                            className="btn"
                            style={{
                              background: 'var(--orange-gradient)',
                              borderColor: '#ff7a00',
                              color: '#fff',
                              fontWeight: 700,
                              width: '100px',
                              fontSize: '12px',
                              borderRadius: '6px',
                              height: '32px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              boxSizing: 'border-box'
                            }}
                            onClick={() => handleOrderStatusUpdate(ord.id, ord.status)}
                          >
                            {ord.status === 'new' && 'Accept'}
                            {ord.status === 'preparing' && 'Ready'}
                            {ord.status === 'ready' && 'Complete'}
                          </button>
                        ) : (
                          <button
                            className="btn btn-black"
                            style={{ width: '100px', fontSize: '12px', borderRadius: '6px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6, cursor: 'default', boxSizing: 'border-box' }}
                            disabled
                          >
                            Completed
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '40px 20px', color: '#aaa' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px', opacity: 0.3 }}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>
                    <h3 style={{ fontSize: '15px', color: '#666', marginBottom: '4px' }}>No orders found</h3>
                    <p style={{ fontSize: '13px', margin: 0 }}>New orders will appear here in real-time.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!categoryForm.name || !categoryForm.name.trim()) {
      errors.name = "Category Name is required";
    }
    if (Object.keys(errors).length > 0) {
      setCategoryFormErrors(errors);
      return;
    }
    setCategoryFormErrors({});

    if (categoryForm.id) {
      setCategoriesListState(prev => prev.map(c => c.id === categoryForm.id ? { ...categoryForm, name: categoryForm.name.trim() } : c));
      addToast("Category Updated Successfully");
    } else {
      const newId = Date.now();
      setCategoriesListState(prev => [...prev, { ...categoryForm, id: newId, name: categoryForm.name.trim() }]);
      addToast("Category Created Successfully");
    }
    setActivePage('categories-manager');
  };

  // 3. RENDER MENU MANAGEMENT
  const handleMenuSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!menuForm.name || !menuForm.name.trim()) {
      errors.name = "Item Name is required";
    }
    if (!menuForm.price || !menuForm.price.toString().trim()) {
      errors.price = "Price is required";
    } else {
      const priceVal = parseFloat(menuForm.price);
      if (isNaN(priceVal) || priceVal <= 0) {
        errors.price = "Price must be a positive number";
      }
    }
    if (!menuForm.prepTime || !menuForm.prepTime.trim()) {
      errors.prepTime = "Preparation Time is required";
    }

    if (Object.keys(errors).length > 0) {
      setMenuFormErrors(errors);
      return;
    }
    setMenuFormErrors({});

    if (menuForm.id) {
      updateMenuItem(activeRestaurant.id, {
        ...menuForm,
        price: parseFloat(menuForm.price) || 0
      });
      addToast("Menu Item Updated Successfully");
    } else {
      addMenuItem(activeRestaurant.id, {
        id: 'menu-' + Date.now(),
        name: menuForm.name,
        desc: menuForm.desc,
        price: parseFloat(menuForm.price) || 0,
        category: menuForm.category,
        image: menuForm.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
        prepTime: menuForm.prepTime,
        veg: menuForm.veg,
        available: menuForm.available
      });
      addToast("Menu Item Created Successfully");
    }
    setActivePage(null);
  };

  const openAddMenuModal = () => {
    setMenuForm({ id: '', name: '', desc: '', price: '', category: 'Starters', image: '', prepTime: '15 mins', veg: true, available: true });
    setMenuFormErrors({});
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
      prepTime: item.prepTime || '15 mins',
      veg: item.veg ?? true,
      available: item.available ?? true
    });
    setMenuFormErrors({});
    setActivePage('menu-form');
  };

  const handleDeleteMenu = (itemId) => {
    setDeleteMenuItemId(itemId);
  };

  const renderMenu = () => {
    // Unique categories from current menu items
    const categoriesList = ['All Items', ...categoriesListState.filter(c => c.status === 'Available').map(c => c.name)];

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
            <h2 className="panel-inner-title">Menu list</h2>
            <p className="panel-inner-desc" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff7a00', display: 'inline-block' }}></span>
              {menu.length} items actively listed
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-outline"
              onClick={() => setActivePage('categories-manager')}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 700
              }}
            >
              Manage Categories
            </button>
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
              Add Menu Item
            </button>
          </div>
        </div>

        {/* Menu Category pills and Sort by Filter Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {/* Categories Horizontal Pills */}
          <div className="menu-categories-horizontal-pills" style={{ margin: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Sort by</label>
            <select
              value={menuSort}
              onChange={(e) => setMenuSort(e.target.value)}
              style={{ padding: '7px 12px', fontSize: '13px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-main)', cursor: 'pointer', outline: 'none' }}
            >
              <option value="name">Name (A–Z)</option>
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
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>S.No</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Image</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Name</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Category</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Price</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Prep Time</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Type</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenu.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-main)', fontSize: '14px' }}>{index + 1}</td>
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
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: '13px' }}>{item.prepTime || '15 mins'}</td>
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
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: item.available ? '#16a34a' : '#ef4444',
                      background: item.available ? '#dcfce7' : '#fef2f2',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      display: 'inline-block',
                      textTransform: 'uppercase'
                    }}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
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
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="billing-table-card-mid">
                      <span>{guests} Guests</span>
                      <span>•</span>
                      <span>
                        {isPaid ? (
                          'Checkout'
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            {duration}
                          </span>
                        )}
                      </span>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                </div>
              </div>

              <table className="menu-items-table">
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
                { id: 'UPI', label: 'UPI / QR Code', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                    <line x1="7" y1="17" x2="7" y2="17.01"></line>
                    <line x1="17" y1="17" x2="17" y2="17.01"></line>
                    <line x1="17" y1="7" x2="17" y2="7.01"></line>
                    <line x1="7" y1="7" x2="7" y2="7.01"></line>
                  </svg>
                ), desc: 'Instant digital payment' },
                { id: 'Card', label: 'Credit / Debit Card', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                ), desc: 'Visa, Mastercard, RuPay' },
                { id: 'Cash', label: 'Cash', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M6 12h.01M18 12h.01"></path>
                  </svg>
                ), desc: 'Manual reconciliation' }
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
                      {method.icon}
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><polyline points="20 6 9 17 4 12"></polyline></svg> Mark as Paid
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-outline"
                onClick={() => addToast('Sending receipt print command...')}
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                Print
              </button>
              <button
                className="btn btn-outline"
                onClick={() => addToast('Invoice sharing link generated!')}
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                Share
              </button>
            </div>

            <div className="billing-tip-box-new">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><path d="M9 18h6M10 22h4M12 2v1M5.22 5.22l.71.71M18.78 5.22l-.71.71M22 12h-1M2 12h1M5.9 16.1a6 6 0 1 1 12.2 0H5.9z"></path></svg>
                <strong>BILLING TIP</strong>
              </span>
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
                <table className="menu-items-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
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
    const errors = {};
    if (!addTableForm.id || !addTableForm.id.trim()) {
      errors.id = "Table Number / ID is required";
    }
    if (!addTableForm.seats) {
      errors.seats = "Seating capacity is required";
    } else if (addTableForm.seats < 1 || addTableForm.seats > 20) {
      errors.seats = "Seating capacity must be between 1 and 20";
    }

    if (Object.keys(errors).length > 0) {
      setTableFormErrors(errors);
      return;
    }

    const cleanId = addTableForm.id.trim();
    const exists = tables.some(t => t.id.toLowerCase() === cleanId.toLowerCase());
    if (exists) {
      setTableFormErrors({ id: "Table ID already exists!" });
      return;
    }

    const success = addDiningTable(activeRestaurant.id, {
      id: cleanId,
      status: 'Free',
      seats: parseInt(addTableForm.seats) || 4,
      area: addTableForm.area || 'Main Dining'
    });
    if (success) {
      addToast("Table Created Successfully");
      setAddTableForm({ id: '', seats: 4, waiter: '' });
      setTableFormErrors({});
      setActivePage(null);
    } else {
      setTableFormErrors({ id: "Table ID already exists!" });
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
          <div className="panel-title-desc">
            <h2 className="panel-inner-title">Tables list</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', display: 'none' }}></p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="btn btn-outline"
              onClick={() => setActivePage('waiter-list')}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <StaffIcon size={14} />
              Waiter List
            </button>
            <button
              className="btn"
              onClick={() => { setAddTableForm({ id: '', seats: 4, waiter: '' }); setActivePage('table-form'); }}
              style={{ background: 'var(--orange-gradient)', color: 'white', border: 'none', fontWeight: '700', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(255, 122, 0, 0.25)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 122, 0, 0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 122, 0, 0.25)'; }}
            >
              + Add Dining Table
            </button>
          </div>
        </div>

        {/* Table List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tables.map(table => {
            const isOccupied = table.status.toLowerCase() === 'occupied';
            const isReserved = table.status.toLowerCase() === 'reserved';
            const isInactive = table.status.toLowerCase() === 'inactive';
            const statusColor = isOccupied ? '#ef4444' : isReserved ? '#f59e0b' : isInactive ? '#94a3b8' : '#22c55e';
            const statusBg = isOccupied ? '#fef2f2' : isReserved ? '#fffbeb' : isInactive ? '#f1f5f9' : '#f0fdf4';
            return (
              <div
                key={table.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderLeft: `4px solid ${statusColor}`,
                  borderRadius: '12px',
                  padding: '16px 20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {/* Table Icon */}
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: statusBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="16" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: statusColor }}>
                    <path d="M6 16C6 14.8954 6.89543 14 8 14H52C53.1046 14 54 14.8954 54 16V18C54 19.1046 53.1046 20 52 20H8C6.89543 20 6 19.1046 6 18V16Z" fill="currentColor" />
                    <rect x="16" y="20" width="4" height="14" rx="1" fill="currentColor" />
                    <rect x="40" y="20" width="4" height="14" rx="1" fill="currentColor" />
                  </svg>
                </div>

                {/* Table ID & Name */}
                <div style={{ minWidth: '100px' }}>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--black)', fontFamily: 'Outfit, sans-serif' }}>{table.id}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{table.name || table.area || 'Main Dining'}</div>
                </div>

                {/* Status Badge */}
                <div style={{ flex: '0 0 auto' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: statusBg, color: statusColor }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: statusColor, display: 'inline-block' }}></span>
                    {table.status.toUpperCase()}
                  </span>
                </div>

                {/* Capacity */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', minWidth: '90px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  <span>{table.seats || 4} seats</span>
                </div>

                {/* Waiter */}
                <div style={{ flex: 1, fontSize: '13px', color: '#475569' }}>
                  {table.waiter ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="6" r="3" /><path d="M12 9v5" /><path d="M6.5 14.5C7.5 13 9.6 12 12 12s4.5 1 5.5 2.5" /><path d="M5 21h14" /><path d="M7 17h10l-1 4H8l-1-4z" /></svg>
                      {table.waiter}
                    </span>
                  ) : (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No waiter assigned</span>
                  )}
                </div>

                {/* QR & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <IconBtn
                    icon={<PencilIcon size={18} />}
                    tooltip="Edit Table"
                    style={iconBtnEditStyle}
                    onClick={() => { setSelectedTableId(table.id); setIsTableDetailsOpen(true); }}
                  />
                  <IconBtn
                    icon={<TrashIcon size={18} />}
                    tooltip="Delete Table"
                    style={iconBtnDeleteStyle}
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete Table ${table.id}?`)) {
                        deleteDiningTable(activeRestaurant.id, table.id);
                        addToast("Table Deleted Successfully");
                        const remaining = tables.filter(t => t.id !== table.id);
                        if (remaining.length > 0) setSelectedTableId(remaining[0].id);
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Table Details Modal Popup */}
        {isTableDetailsOpen && (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={(e) => { if (e.target === e.currentTarget) setIsTableDetailsOpen(false); }}
          >
            <div style={{ background: '#fff', borderRadius: '18px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 30px 60px rgba(0,0,0,0.28)', overflow: 'hidden' }}>
              {/* Modal Header - Gradient Brand Banner */}
              <div style={{ background: 'var(--orange-gradient)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>Edit Table — {currentTable.id}</h3>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Update seating and availability</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsTableDetailsOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '8px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#fff' }}
                >✕</button>
              </div>

              {/* Modal Body - Form Fields Only */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
                <div className="form-group">
                  <label className="form-label">Area / Section</label>
                  <select
                    className="admin-input"
                    value={draftArea}
                    onChange={(e) => setDraftArea(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Main Dining">Main Dining</option>
                    <option value="Patio">Patio</option>
                    <option value="Bar">Bar</option>
                    <option value="Private Room">Private Room</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Seating Capacity</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 14px' }}>
                    <button type="button" onClick={() => setDraftSeats(prev => Math.max(1, prev - 1))} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>−</button>
                    <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '700', fontSize: '16px', color: 'var(--black)' }}>{draftSeats}</span>
                    <button type="button" onClick={() => setDraftSeats(prev => Math.min(12, prev + 1))} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>+</button>
                    <span style={{ fontSize: '13px', color: '#64748b', marginLeft: '4px' }}>seats</span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Current Status</label>
                  <select
                    className="admin-input"
                    value={draftStatus}
                    onChange={(e) => setDraftStatus(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid var(--border)', background: '#fafafa' }}>
                <button
                  type="button"
                  onClick={() => {
                    setDraftSeats(currentTable.seats || 4);
                    setDraftStatus(currentTable.status || 'Available');
                    setDraftWaiter(currentTable.waiter || '');
                    setDraftName(currentTable.name || '');
                    setDraftArea(currentTable.area || 'Main Dining');
                    setIsTableDetailsOpen(false);
                  }}
                  style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '8px', background: '#fff', border: '1.5px solid var(--border)', color: '#475569', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = '#475569'; }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateDiningTable(activeRestaurant.id, currentTable.id, { area: draftArea, seats: draftSeats, status: draftStatus });
                    addToast("Table Updated Successfully");
                    setIsTableDetailsOpen(false);
                  }}
                  style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '8px', background: 'var(--orange-gradient)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,122,0,0.28)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(255,122,0,0.38)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,122,0,0.28)'; }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  };

  // 6. RENDER STAFF PANEL
  const handleStaffSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!staffForm.name || !staffForm.name.trim()) {
      errors.name = "Full Name is required";
    }
    if (!staffForm.phone || !staffForm.phone.trim()) {
      errors.phone = "Phone Number is required";
    }
    if (!staffForm.email || !staffForm.email.trim()) {
      errors.email = "Email Address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(staffForm.email)) {
        errors.email = "Please enter a valid email address";
      }
    }
    if (!staffForm.password || !staffForm.password.trim()) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setStaffFormErrors(errors);
      return;
    }
    setStaffFormErrors({});

    if (staffForm.id) {
      updateStaff(activeRestaurant.id, staffForm);
      addToast("Staff Updated Successfully");
    } else {
      const nextNum = staff.length + 1;
      const newId = `S-${nextNum < 10 ? '0' + nextNum : nextNum}`;
      addStaff(activeRestaurant.id, {
        ...staffForm,
        id: newId
      });
      addToast("Staff Created Successfully");
    }
    setActivePage(null);
  };

  const handleKitchenPasswordSubmit = (e) => {
    e.preventDefault();
    if (!kitchenPasswordForm || !kitchenPasswordForm.trim()) {
      setKitchenPasswordError("Kitchen Login Password is required");
      return;
    }
    setKitchenPasswordError('');
    updateKitchenPassword(activeRestaurant.id, kitchenPasswordForm.trim());
    addToast('Kitchen Shared Login Password updated!');
    setActivePage(null);
  };

  const openAddStaffModal = (defaultRole = 'Waiter') => {
    setStaffForm({ id: '', name: '', role: defaultRole, phone: '', email: '', password: '', status: 'On Duty' });
    setStaffFormErrors({});
    setActivePage('staff-form');
  };

  const openEditStaffModal = (s) => {
    setStaffForm(s);
    setStaffFormErrors({});
    setActivePage('staff-form');
  };

  const openKitchenModal = () => {
    setKitchenPasswordForm(kitchenLogin.password);
    setKitchenPasswordError('');
    setActivePage('kitchen-form');
  };

  const handleDeleteStaff = (sId) => {
    if (window.confirm('Delete staff member?')) {
      deleteStaff(activeRestaurant.id, sId);
      addToast("Staff Deleted Successfully");
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
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '14px' }}>{s.id}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 500, color: 'var(--text-main)', fontSize: '14px' }}>{s.name}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px' }}>{s.role}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px' }}>{s.phone}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px' }}>{s.email}</td>
                    <td style={{ padding: '10px 14px' }}><Badge status={s.status} /></td>
                    <td style={{ padding: '10px 14px', textAlign: 'right' }}>
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
    <section className="panel-view active">
      <div className="admin-card-container">
        <div className="admin-inner-header" style={{ marginBottom: '20px' }}>
          <h3 className="admin-inner-title" style={{ fontSize: '15px' }}>Roles & Permissions</h3>
          <button className="btn" style={{ background: '#000', color: '#fff', borderRadius: '8px', padding: '10px 20px', fontWeight: 600 }} onClick={() => setActiveTab('roles-add')}>
            + Add Role
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="menu-items-table">
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
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <IconBtn icon={<PencilIcon size={18} />} tooltip="Edit" style={iconBtnEditStyle} />
                      <IconBtn icon={<TrashIcon size={18} />} tooltip="Delete" style={iconBtnDeleteStyle} />
                    </div>
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
      <section className="panel-view active">
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
              <table className="menu-items-table permissions-matrix-table" style={{ margin: 0 }}>
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
    <section className="panel-view active">
      <div className="admin-card-container">
        <div className="admin-inner-header" style={{ marginBottom: '20px' }}>
          <h3 className="admin-inner-title" style={{ fontSize: '15px' }}>Users List</h3>
          <button className="btn" style={{ background: '#000', color: '#fff', borderRadius: '8px', padding: '10px 20px', fontWeight: 600 }} onClick={() => setActiveTab('users-add')}>
            + Create User
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="menu-items-table">
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
    <section className="panel-view active">
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


      <div className="profile-settings-container">

        {/* Card 3: Restaurant Information */}
        <div className="profile-card">
          <div className="profile-card-header">
            <span className="profile-card-icon" style={{ color: 'var(--black)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </span>
            <h3 className="profile-card-title">Restaurant Information</h3>
          </div>
          <div className="profile-form-grid">
            <div className="profile-form-group">
              <label className="profile-form-label">Restaurant Name</label>
              <input type="text" className="profile-form-input" defaultValue={activeRestaurant.name} />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Business Name</label>
              <input type="text" className="profile-form-input" defaultValue={activeRestaurant.name + " Pvt Ltd"} />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Contact Number</label>
              <input type="text" className="profile-form-input" defaultValue="+91 9999999999" />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Email Address</label>
              <input type="email" className="profile-form-input" defaultValue={`contact@${activeRestaurant.name.toLowerCase().replace(/\s/g, '')}.com`} />
            </div>
            <div className="profile-form-group full-width">
              <label className="profile-form-label">Address</label>
              <textarea className="profile-form-input" style={{ resize: 'vertical', minHeight: '80px' }} defaultValue="123 Main Street, Cityville, State, 123456"></textarea>
            </div>
          </div>
        </div>

        {/* Card 4: Tax Configuration */}
        <div className="profile-card">
          <div className="profile-card-header">
            <span className="profile-card-icon" style={{ color: 'var(--black)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12" />
                <path d="M6 8h12" />
                <path d="m6 13 8.5 8" />
                <path d="M6 13h3" />
                <path d="M9 13c0-2.76 2.24-5 5-5" />
              </svg>
            </span>
            <h3 className="profile-card-title">Tax Configuration</h3>
          </div>
          <div className="profile-form-grid">
            <div className="profile-form-group">
              <label className="profile-form-label">GST Percentage (%)</label>
              <input type="number" className="profile-form-input" defaultValue="5" />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Service Charge (%)</label>
              <input type="number" className="profile-form-input" defaultValue="0" />
            </div>
          </div>
        </div>

        {/* Card 5: Printer Configuration */}
        <div className="profile-card">
          <div className="profile-card-header">
            <span className="profile-card-icon" style={{ color: 'var(--black)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            </span>
            <h3 className="profile-card-title">Printer Configuration</h3>
          </div>
          <div className="profile-form-grid">
            <div className="profile-form-group">
              <label className="profile-form-label">Printer Name</label>
              <input type="text" className="profile-form-input" defaultValue="Epson TM-T82" />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Printer Type</label>
              <select className="profile-form-input" defaultValue="Thermal">
                <option value="Thermal">Thermal Receipt Printer</option>
                <option value="Laser">Laser Printer</option>
                <option value="Inked">Inked Printer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 6: User Management */}
        <div className="profile-card">
          <div className="profile-card-header">
            <span className="profile-card-icon" style={{ color: 'var(--black)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </span>
            <h3 className="profile-card-title">User Management</h3>
          </div>

          <div className="menu-table-wrapper" style={{ overflowX: 'auto', margin: '0 24px 24px 24px', border: '1px solid var(--border)', borderRadius: '10px' }}>
            <table className="menu-items-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', background: 'var(--black)' }}>User Name</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', background: 'var(--black)' }}>Role</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', background: 'var(--black)' }}>Status</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', background: 'var(--black)', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: '13px', color: 'var(--text-main)' }}>Admin User</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>Admin</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', background: '#dcfce7', color: '#15803d' }}>Active</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '11px' }}>Edit</button>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: '13px', color: 'var(--text-main)' }}>Manager John</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>Manager</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', background: '#dcfce7', color: '#15803d' }}>Active</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '11px' }}>Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ padding: '0 24px 24px 24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-black" style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => addToast('Add user modal clicked')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add User
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions-row">
          <button type="button" className="profile-btn-reset" onClick={() => addToast('Defaults restored')}>Reset Defaults</button>
          <button type="button" className="profile-btn-save" onClick={() => addToast('Configuration saved successfully!')}>Save Configuration</button>
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

    if (activePage === 'categories-manager') {
      return (
        <section>
          <div style={{ width: '100%' }}>
            <div className="panel-header-flex" style={{ marginBottom: '24px' }}>
              <div className="panel-title-desc">
                <h2 className="panel-inner-title">Menu Categories</h2>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Manage the categories that organize your menu items.</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-outline" style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: 700 }} onClick={() => setActivePage(null)}>
                  ← Back to Menu
                </button>
                <button className="btn btn-black" style={{ background: 'var(--orange-gradient)', borderColor: '#ff7a00', padding: '10px 20px', borderRadius: '8px', fontWeight: 700 }} onClick={() => { setCategoryForm({ id: '', name: '', desc: '', status: 'Available' }); setCategoryFormErrors({}); setActivePage('category-form'); }}>
                  Add Category
                </button>
              </div>
            </div>
            <div style={sty.pageCard}>
              <table className="menu-items-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', width: '60px' }}>S.No</th>
                    <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Category Name</th>
                    <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Description</th>
                    <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesListState.map((cat, index) => (
                    <tr key={cat.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: '13px' }}>{index + 1}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-main)', fontSize: '14px' }}>{cat.name}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: '13px' }}>{cat.desc}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: cat.status === 'Available' ? '#16a34a' : '#ef4444',
                          background: cat.status === 'Available' ? '#dcfce7' : '#fef2f2',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          display: 'inline-block',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {cat.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <IconBtn icon={<PencilIcon size={18} />} tooltip="Edit" style={iconBtnEditStyle} onClick={() => { setCategoryForm(cat); setCategoryFormErrors({}); setActivePage('category-form'); }} />
                      </td>
                    </tr>
                  ))}
                  {categoriesListState.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>No categories found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );
    }

    if (activePage === 'category-form') {
      return (
        <section>
          <div style={{ width: '100%' }}>
            <PageHeader subtitle={categoryForm.id ? 'Modify category details' : 'Create a new menu category'} />
            <div style={sty.pageCard}>
              <form onSubmit={handleCategorySubmit} style={{ width: '100%' }} noValidate>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Category Name</label>
                  <input
                    type="text"
                    value={categoryForm.name || ''}
                    onChange={(e) => {
                      setCategoryForm({ ...categoryForm, name: e.target.value });
                      if (categoryFormErrors.name) {
                        setCategoryFormErrors({ ...categoryFormErrors, name: null });
                      }
                    }}
                    required
                    placeholder="e.g. Desserts"
                  />
                  {categoryFormErrors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{categoryFormErrors.name}</p>}
                </div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Description</label>
                  <textarea
                    rows="3"
                    value={categoryForm.desc || ''}
                    onChange={(e) => setCategoryForm({ ...categoryForm, desc: e.target.value })}
                    placeholder="Short description of this category..."
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Status</label>
                  <select
                    value={categoryForm.status || 'Available'}
                    onChange={(e) => setCategoryForm({ ...categoryForm, status: e.target.value })}
                    required
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }}
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => { setActivePage('categories-manager'); setCategoryFormErrors({}); }}>Cancel</button>
                  <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>Save Category</button>
                </div>
              </form>
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
              <form onSubmit={handleMenuSubmit} style={{ width: '100%' }} noValidate>
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
                          value={menuForm.name || ''}
                          onChange={(e) => {
                            setMenuForm({ ...menuForm, name: e.target.value });
                            if (menuFormErrors.name) {
                              setMenuFormErrors({ ...menuFormErrors, name: null });
                            }
                          }}
                          required
                          placeholder="e.g. Chicken Biryani"
                        />
                        {menuFormErrors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{menuFormErrors.name}</p>}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Category</label>
                          <select
                            value={menuForm.category || ''}
                            onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                            required
                          >
                            {categoriesListState.map(c => (
                              <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Price (₹)</label>
                          <input
                            type="number"
                            value={menuForm.price || ''}
                            onChange={(e) => {
                              setMenuForm({ ...menuForm, price: e.target.value });
                              if (menuFormErrors.price) {
                                setMenuFormErrors({ ...menuFormErrors, price: null });
                              }
                            }}
                            required
                            placeholder="320"
                          />
                          {menuFormErrors.price && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{menuFormErrors.price}</p>}
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
                            <option value="active">Available</option>
                            <option value="inactive">Unavailable</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Preparation Time</label>
                        <input
                          type="text"
                          value={menuForm.prepTime || ''}
                          onChange={(e) => {
                            setMenuForm({ ...menuForm, prepTime: e.target.value });
                            if (menuFormErrors.prepTime) {
                              setMenuFormErrors({ ...menuFormErrors, prepTime: null });
                            }
                          }}
                          required
                          placeholder="e.g. 15 mins"
                        />
                        {menuFormErrors.prepTime && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{menuFormErrors.prepTime}</p>}
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Description</label>
                        <textarea
                          rows="4"
                          value={menuForm.desc || ''}
                          onChange={(e) => setMenuForm({ ...menuForm, desc: e.target.value })}
                          placeholder="Provide a delicious description of this menu item..."
                          style={{ resize: 'none' }}
                        ></textarea>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                      <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => { setActivePage(null); setMenuFormErrors({}); }}>Cancel</button>
                      <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>Save Changes</button>
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
              <form onSubmit={handleAddTableSubmit} style={{ width: '100%' }} noValidate>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Table Number / ID</label>
                  <input
                    type="text"
                    value={addTableForm.id}
                    onChange={(e) => setAddTableForm({ ...addTableForm, id: e.target.value })}
                    placeholder="e.g. T-06"
                  />
                  {tableFormErrors.id && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{tableFormErrors.id}</p>}
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Recommended format: T-XX (e.g. T-06, T-07)</p>
                </div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Table Name</label>
                  <input
                    type="text"
                    value={addTableForm.name || ''}
                    onChange={(e) => setAddTableForm({ ...addTableForm, name: e.target.value })}
                    placeholder="e.g. Window Seat 1"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label>Seating Capacity</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={addTableForm.seats}
                      onChange={(e) => setAddTableForm({ ...addTableForm, seats: parseInt(e.target.value) || 0 })}
                    />
                    {tableFormErrors.seats && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{tableFormErrors.seats}</p>}
                  </div>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label>Area / Section</label>
                    <select
                      style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', backgroundSize: '14px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer' }}
                      value={addTableForm.area || 'Main Dining'}
                      onChange={(e) => setAddTableForm({ ...addTableForm, area: e.target.value })}
                    >
                      <option value="Main Dining">Main Dining</option>
                      <option value="Patio">Patio</option>
                      <option value="Bar">Bar</option>
                      <option value="Private Room">Private Room</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => { setTableFormErrors({}); setActivePage(null); }}>Cancel</button>
                  <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>Create Table</button>
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
              <form onSubmit={handleStaffSubmit} style={{ width: '100%' }} noValidate>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={staffForm.name || ''}
                    onChange={(e) => {
                      setStaffForm({ ...staffForm, name: e.target.value });
                      if (staffFormErrors.name) {
                        setStaffFormErrors({ ...staffFormErrors, name: null });
                      }
                    }}
                    required
                    placeholder="e.g. Ramesh Kumar"
                  />
                  {staffFormErrors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{staffFormErrors.name}</p>}
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={staffForm.phone || ''}
                    onChange={(e) => {
                      setStaffForm({ ...staffForm, phone: e.target.value });
                      if (staffFormErrors.phone) {
                        setStaffFormErrors({ ...staffFormErrors, phone: null });
                      }
                    }}
                    required
                    placeholder="e.g. 9876543210"
                  />
                  {staffFormErrors.phone && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{staffFormErrors.phone}</p>}
                </div>

                <div style={sty.formGrid2}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={staffForm.email || ''}
                      onChange={(e) => {
                        setStaffForm({ ...staffForm, email: e.target.value });
                        if (staffFormErrors.email) {
                          setStaffFormErrors({ ...staffFormErrors, email: null });
                        }
                      }}
                      required
                      placeholder="e.g. ramesh@serviq.com"
                    />
                    {staffFormErrors.email && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{staffFormErrors.email}</p>}
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Password</label>
                    <input
                      type="text"
                      value={staffForm.password || ''}
                      onChange={(e) => {
                        setStaffForm({ ...staffForm, password: e.target.value });
                        if (staffFormErrors.password) {
                          setStaffFormErrors({ ...staffFormErrors, password: null });
                        }
                      }}
                      required
                      placeholder="e.g. waiter123"
                    />
                    {staffFormErrors.password && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{staffFormErrors.password}</p>}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px', marginTop: '16px' }}>
                  <label>Status</label>
                  <select value={staffForm.status === 'On Duty' ? 'Active' : staffForm.status === 'Off Duty' ? 'Inactive' : staffForm.status} onChange={(e) => setStaffForm({ ...staffForm, status: e.target.value === 'Active' ? 'On Duty' : 'Off Duty' })} required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => { setActivePage(null); setStaffFormErrors({}); }}>Cancel</button>
                  <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>Save Changes</button>
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
              <form onSubmit={handleKitchenPasswordSubmit} style={{ width: '100%' }} noValidate>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Kitchen Login Email</label>
                  <input type="email" value={kitchenLogin.email} readOnly style={{ backgroundColor: 'var(--bg-tertiary)', cursor: 'not-allowed' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>Kitchen Login Password</label>
                  <input
                    type="text"
                    value={kitchenPasswordForm || ''}
                    onChange={(e) => {
                      setKitchenPasswordForm(e.target.value);
                      if (kitchenPasswordError) {
                        setKitchenPasswordError('');
                      }
                    }}
                    required
                    placeholder="e.g. kitchen123"
                  />
                  {kitchenPasswordError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{kitchenPasswordError}</p>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => { setActivePage(null); setKitchenPasswordError(''); }}>Cancel</button>
                  <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>Update Password</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      );
    }
    if (activePage === 'waiter-list') {
      const waiters = staff.filter(s => s.role === 'Waiter');
      const activeOrders = orders.filter(o => o.status !== 'done');

      return (
        <section>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--primary-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
                >
                  ←
                </button>
                <div>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: 'var(--black)' }}>Waiter Live Directory</h2>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Live directory of waitstaff, their current duty status, and assigned tables</span>
                </div>
              </div>
              <button
                className="btn"
                onClick={() => {
                  setAssignWaiterForm({ selectedWaiter: '', selectedTables: [] });
                  setActivePage('assign-waiter-page');
                }}
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '700',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <StaffIcon size={14} />
                Assign Waiter
              </button>
            </div>

            <div style={sty.pageCard}>
              <div className="menu-table-wrapper" style={{ overflowX: 'auto' }}>
                <table className="menu-items-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)' }}>
                      <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Waiter ID</th>
                      <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Name</th>
                      <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Phone</th>
                      <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Duty Status</th>
                      <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Assigned Tables</th>
                      <th style={{ padding: '12px 14px', fontSize: '12px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase' }}>Active Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waiters.map(w => {
                      const assignedTables = activeOrders
                        .filter(o => o.waiter === w.name)
                        .map(o => `Table ${o.table}`);
                      const uniqueTables = [...new Set(assignedTables)];

                      return (
                        <tr key={w.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: 'var(--text-main)', fontSize: '14px' }}>{w.id}</td>
                          <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-main)', fontSize: '14px' }}>{w.name}</td>
                          <td style={{ padding: '12px 14px', color: 'var(--text-main)', fontSize: '14px' }}>{w.phone}</td>
                          <td style={{ padding: '12px 14px' }}>
                            <Badge status={w.status} />
                          </td>
                          <td style={{ padding: '12px 14px', color: 'var(--text-main)', fontSize: '14px' }}>
                            {uniqueTables.length > 0 ? (
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {uniqueTables.map(t => (
                                  <span key={t} style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color: 'var(--primary)',
                                    background: 'rgba(255, 122, 0, 0.1)',
                                    border: '1px solid var(--primary)',
                                    padding: '2px 8px',
                                    borderRadius: '12px'
                                  }}>
                                    {t}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>None</span>
                            )}
                          </td>
                          <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-main)', fontSize: '14px' }}>
                            {activeOrders.filter(o => o.waiter === w.name).length} orders
                          </td>
                        </tr>
                      );
                    })}
                    {waiters.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                          No waitstaff registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (activePage === 'assign-waiter-page') {
      const waiters = staff.filter(s => s.role === 'Waiter');
      const activeOrders = orders.filter(o => o.status !== 'done');

      const handleAssignSubmit = (e) => {
        e.preventDefault();
        const { selectedWaiter, selectedTables } = assignWaiterForm;

        if (!selectedWaiter) {
          addToast('Please select a waiter first.');
          return;
        }
        if (selectedTables.length === 0) {
          addToast('Please select at least one table.');
          return;
        }

        // Loop through selected tables
        selectedTables.forEach(tableId => {
          // 1. Update the table assignment
          updateDiningTable(activeRestaurant.id, tableId, { waiter: selectedWaiter });

          // 2. Find active orders for this table and update waiter assignment
          const tableNum = tableId.replace('T-', '');
          const activeTableOrders = orders.filter(o =>
            (o.table === tableNum || parseInt(o.table) === parseInt(tableNum)) &&
            o.billingStatus === 'unpaid'
          );

          activeTableOrders.forEach(ord => {
            assignWaiterToOrder(activeRestaurant.id, ord.id, selectedWaiter);
          });
        });

        addToast(`Successfully assigned ${selectedWaiter} to ${selectedTables.length} table(s)!`);
        setAssignWaiterForm({ selectedWaiter: '', selectedTables: [] });
        setActivePage('waiter-list'); // Go back to waiter directory
      };

      const handleWaiterSelect = (waiterName) => {
        setAssignWaiterForm(prev => ({
          ...prev,
          selectedWaiter: waiterName
        }));
      };

      const handleTableToggle = (tableId) => {
        setAssignWaiterForm(prev => {
          const isSelected = prev.selectedTables.includes(tableId);
          const newTables = isSelected
            ? prev.selectedTables.filter(id => id !== tableId)
            : [...prev.selectedTables, tableId];
          return {
            ...prev,
            selectedTables: newTables
          };
        });
      };

      const handleSelectAllTables = () => {
        setAssignWaiterForm(prev => {
          const allTableIds = tables.map(t => t.id);
          const areAllSelected = prev.selectedTables.length === tables.length;
          return {
            ...prev,
            selectedTables: areAllSelected ? [] : allTableIds
          };
        });
      };

      return (
        <section style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
          <div style={{
            width: '100%',
            maxWidth: '1000px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden'
          }}>
            {/* Header Block */}
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <button
                type="button"
                style={{
                  background: '#fff',
                  border: '1.5px solid var(--border)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  color: 'inherit'
                }}
                onClick={() => {
                  setAssignWaiterForm({ selectedWaiter: '', selectedTables: [] });
                  setActivePage('waiter-list');
                }}
                title="Back to Waiter Directory"
              >
                ←
              </button>
              <h2 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '700',
                color: '#002b5c',
                fontFamily: "'Outfit', sans-serif"
              }}>
                Assign Waiter to Tables
              </h2>
            </div>

            {/* Form Block */}
            <form onSubmit={handleAssignSubmit} style={{ padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

              {/* Dropdown 1: Select Waiter */}
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Select Waiter <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={assignWaiterForm.selectedWaiter}
                  onChange={(e) => handleWaiterSelect(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    color: '#1f2937',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    fontFamily: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select Waiter</option>
                  {waiters.map(w => (
                    <option key={w.id} value={w.name}>
                      {w.name} ({w.status === 'On Duty' ? 'On Duty' : 'Off Duty'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Input 2: Select Tables */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Select Tables <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  {tables.length > 0 && (
                    <button
                      type="button"
                      onClick={handleSelectAllTables}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#002b5c',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {assignWaiterForm.selectedTables.length === tables.length ? 'Deselect All' : 'Select All'}
                    </button>
                  )}
                </div>

                <div style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  maxHeight: '220px',
                  overflowY: 'auto'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '12px'
                  }}>
                    {tables.map(table => {
                      const isSelected = assignWaiterForm.selectedTables.includes(table.id);
                      return (
                        <label
                          key={table.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            fontSize: '13.5px',
                            color: '#374151',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            backgroundColor: isSelected ? '#f3f4f6' : 'transparent',
                            transition: 'background-color 0.15s',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleTableToggle(table.id)}
                            style={{
                              width: '16px',
                              height: '16px',
                              accentColor: '#002b5c',
                              cursor: 'pointer',
                              flexShrink: 0
                            }}
                          />
                          <span style={{ whiteSpace: 'nowrap' }}>
                            {table.id} <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '2px' }}>({table.seats} seats)</span>
                          </span>
                        </label>
                      );
                    })}
                    {tables.length === 0 && (
                      <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#9ca3af', fontSize: '13px', padding: '10px 0' }}>
                        No dining tables registered.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons Row */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '32px'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setAssignWaiterForm({ selectedWaiter: '', selectedTables: [] });
                    setActivePage('waiter-list');
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #ef4444',
                    color: '#ef4444',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    minWidth: '90px',
                    textAlign: 'center'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fef2f2'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!assignWaiterForm.selectedWaiter || assignWaiterForm.selectedTables.length === 0}
                  style={{
                    backgroundColor: '#002b5c',
                    border: '1px solid #002b5c',
                    color: '#ffffff',
                    padding: '10px 28px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: (!assignWaiterForm.selectedWaiter || assignWaiterForm.selectedTables.length === 0) ? 'not-allowed' : 'pointer',
                    opacity: (!assignWaiterForm.selectedWaiter || assignWaiterForm.selectedTables.length === 0) ? 0.6 : 1,
                    transition: 'all 0.15s ease',
                    minWidth: '90px',
                    textAlign: 'center'
                  }}
                  onMouseEnter={e => {
                    if (assignWaiterForm.selectedWaiter && assignWaiterForm.selectedTables.length > 0) {
                      e.currentTarget.style.backgroundColor = '#001e40';
                    }
                  }}
                  onMouseLeave={e => {
                    if (assignWaiterForm.selectedWaiter && assignWaiterForm.selectedTables.length > 0) {
                      e.currentTarget.style.backgroundColor = '#002b5c';
                    }
                  }}
                >
                  Save
                </button>
              </div>

            </form>
          </div>
        </section>
      );
    }

    return null;
  };

  // ==========================================
  // NEW MODULE RENDER FUNCTIONS
  // ==========================================

  const renderQrManagement = () => (
    <section className="panel-view active">
      <div className="panel-header-flex" style={{ marginBottom: '24px' }}>
        <div className="panel-title-desc">
          <h2 className="panel-inner-title">QR lists</h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', display: 'none' }}></p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn btn-outline"
            onClick={() => { setActiveTab('saas'); setActivePage(null); }}
            style={{ padding: '10px 18px', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ⚙️ Go to Table Setup
          </button>
          <button
            className="btn"
            style={{ background: 'var(--orange-gradient)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => {
              const tableNums = (tables || [])
                .map(t => parseInt(t.id.replace('T-', '')))
                .filter(n => !isNaN(n));
              const maxNum = tableNums.length > 0 ? Math.max(...tableNums) : 0;
              const nextNum = maxNum + 1;
              const nextId = `T-${nextNum < 10 ? '0' + nextNum : nextNum}`;

              setGenQrForm({
                id: nextId,
                status: 'Free'
              });
              setGenQrFormErrors({});
              setIsGenerateQrOpen(true);
            }}
          >
            ➕ Generate QR
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {tables.map(table => {
          const qrUrl = `http://${window.location.hostname}:3001/table/${table.id}`;
          return (
            <div
              key={table.id}
              style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 3px 16px rgba(0,0,0,0.06)', overflow: 'hidden', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,122,0,0.15)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 3px 16px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Card Top Header */}
              <div style={{ width: '100%', background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--orange-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(255,122,0,0.35)' }}>
                    <svg width="16" height="12" viewBox="0 0 60 40" fill="none"><path d="M6 16C6 14.9 6.9 14 8 14H52C53.1 14 54 14.9 54 16V18C54 19.1 53.1 20 52 20H8C6.9 20 6 19.1 6 18V16Z" fill="white" /><rect x="16" y="20" width="4" height="14" rx="1" fill="white" /><rect x="40" y="20" width="4" height="14" rx="1" fill="white" /></svg>
                  </div>
                  <span style={{ fontWeight: '800', fontSize: '15px', color: '#fff', fontFamily: 'Outfit, sans-serif', letterSpacing: '0.03em' }}>Table {table.id}</span>
                </div>
                {(() => {
                  const s = (table.status || 'Free').toLowerCase();
                  let col = '#22c55e'; // Free = green
                  let borderCol = '#22c55e';
                  if (s === 'occupied') {
                    col = '#ef4444'; // red
                    borderCol = '#ef4444';
                  } else if (s === 'reserved') {
                    col = '#3b82f6'; // blue
                    borderCol = '#3b82f6';
                  } else if (s === 'inactive') {
                    col = '#94a3b8'; // gray
                    borderCol = '#94a3b8';
                  }

                  return (
                    <select
                      value={table.status || 'Free'}
                      onChange={(e) => {
                        updateDiningTable(activeRestaurant.id, table.id, { ...table, status: e.target.value });
                        addToast('Table Updated Successfully');
                      }}
                      style={{
                        fontSize: '12px',
                        fontWeight: 800,
                        width: '110px',
                        padding: '6px 24px 6px 12px',
                        borderRadius: '20px',
                        backgroundColor: '#ffffff',
                        color: col,
                        border: `1.5px solid ${borderCol}`,
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        outline: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        textAlign: 'left',
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(col)}' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 10px center',
                        backgroundSize: '10px',
                        lineHeight: '1.2'
                      }}
                    >
                      <option value="Free" style={{ color: '#22c55e', fontWeight: 800 }}>FREE</option>
                      <option value="Occupied" style={{ color: '#ef4444', fontWeight: 800 }}>OCCUPIED</option>
                      <option value="Reserved" style={{ color: '#3b82f6', fontWeight: 800 }}>RESERVED</option>
                      <option value="Inactive" style={{ color: '#94a3b8', fontWeight: 800 }}>INACTIVE</option>
                    </select>
                  );
                })()}
              </div>

              {/* QR Preview */}
              <div style={{ padding: '20px 20px 16px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ background: 'linear-gradient(135deg, #fff8f0 0%, #fff5eb 100%)', padding: '14px', borderRadius: '12px', marginBottom: '16px', border: '1.5px solid rgba(255,122,0,0.15)', boxShadow: '0 2px 10px rgba(255,122,0,0.08)' }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&color=000000&bgcolor=FFFFFF&data=${encodeURIComponent(qrUrl)}`}
                    alt={`QR for Table ${table.id}`}
                    style={{ width: '140px', height: '140px', display: 'block', borderRadius: '6px' }}
                  />
                </div>

                {/* Meta Info */}
                <div style={{ width: '100%', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <span style={{ color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Created</span>
                    <span style={{ color: '#000', fontWeight: 700, fontSize: '12px' }}>Oct 24, 2024</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <input
                      type="text"
                      readOnly
                      value={qrUrl}
                      style={{ flex: 1, padding: 0, fontSize: '10px', border: 'none', background: 'transparent', color: '#64748b', outline: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}
                    />
                    <button
                      onClick={() => { navigator.clipboard.writeText(qrUrl).catch(() => { }); addToast('URL copied to clipboard!'); }}
                      style={{ padding: '4px 8px', borderRadius: '6px', background: 'var(--orange-gradient)', border: 'none', color: '#fff', fontSize: '11px', fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}
                      title="Copy URL"
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    style={{ fontSize: '12px', padding: '9px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', background: '#fff', border: '1.5px solid var(--border)', color: '#334155', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = '#334155'; }}
                    onClick={() => addToast(`Printing QR for Table ${table.id}...`)}
                  >
                    🖨️ Print
                  </button>
                  <button
                    style={{ fontSize: '12px', padding: '9px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', background: '#fff', border: '1.5px solid var(--border)', color: '#334155', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = '#334155'; }}
                    onClick={() => addToast(`QR downloaded for Table ${table.id}`)}
                  >
                    📥 Download
                  </button>
                  <button
                    style={{ gridColumn: '1 / -1', fontSize: '12px', padding: '10px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'var(--orange-gradient)', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer', boxShadow: '0 3px 10px rgba(255,122,0,0.25)', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 5px 14px rgba(255,122,0,0.38)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 3px 10px rgba(255,122,0,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    onClick={() => addToast(`Regenerated QR Code for Table ${table.id}`)}
                  >
                    🔄 Regenerate QR Code
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {tables.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            <QrIcon size={40} />
            <p style={{ marginTop: '12px', fontSize: '14px' }}>No tables found. Add tables first.</p>
          </div>
        )}
      </div>
    </section>
  );

  const renderCustomerManagement = () => (
    <section className="panel-view active">
      <div className="panel-header-flex" style={{ marginBottom: '24px' }}>
        <div className="panel-title-desc">
          <h2 className="panel-inner-title">Customer Management</h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>View customer visit history, feedback, and order patterns.</p>
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <table className="menu-items-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Table</th>
              <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Order ID</th>
              <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Items Ordered</th>
              <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Total Spent</th>
              <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: '13px' }}>Table {o.table}</td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--primary)' }}>#{o.id}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</td>
                <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: '13px' }}>₹{o.total}</td>
                <td style={{ padding: '12px 16px' }}><Badge status={o.status} /></td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: '#94a3b8' }}>{o.timeAgo}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px' }}>No customer orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderWaiterManagement = () => {
    const waiters = staff.filter(s => s.role === 'Waiter');
    const activeOrders = orders.filter(o => o.status !== 'done');
    const completedOrders = orders.filter(o => o.status === 'done');
    return (
      <section className="panel-view active">
        <div className="panel-header-flex" style={{ marginBottom: '24px' }}>
          <div className="panel-title-desc">
            <h2 className="panel-inner-title">waiters list</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', display: 'none' }}></p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline" style={{ padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}
              onClick={() => { setActivePage('assign-waiter-page'); }}>Assign Tables</button>
            <button className="btn btn-black" style={{ background: 'var(--orange-gradient)', borderColor: '#ff7a00', padding: '10px 18px', borderRadius: '8px', fontWeight: 700 }}
              onClick={() => openAddStaffModal('Waiter')}>Add Waiter</button>
          </div>
        </div>
        <div className="admin-card-container">
          <div style={{ overflowX: 'auto' }}>
            <table className="menu-items-table">
              <thead>
                <tr>
                  <th>S.NO.</th>
                  <th>WAITER NAME</th>
                  <th>PHONE NUMBER</th>
                  <th>EMAIL ADDRESS</th>
                  <th>ASSIGNED TABLES</th>
                  <th style={{ textAlign: 'center' }}>ACTIVE ORDERS</th>
                  <th style={{ textAlign: 'center' }}>COMPLETED ORDERS</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {waiters.map((w, i) => {
                  const myOrders = activeOrders.filter(o => o.waiter === w.name);
                  const myCompletedOrders = completedOrders.filter(o => o.waiter === w.name);
                  const myTables = [...new Set(myOrders.map(o => `T-${o.table}`))];
                  const isActive = w.status === 'On Duty' || w.status === 'Active';
                  return (
                    <tr key={w.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: isActive ? 'rgba(255,122,0,0.1)' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <WaiterIcon size={14} color={isActive ? 'var(--primary)' : '#94a3b8'} />
                          </div>
                          <span style={{ fontWeight: 700 }}>{w.name}</span>
                        </div>
                      </td>
                      <td>{w.phone || 'No phone'}</td>
                      <td>{w.email || 'No email'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {myTables.length > 0 ? myTables.map(t => (
                            <span key={t} style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: 'var(--orange-gradient)', padding: '2px 8px', borderRadius: '10px' }}>{t}</span>
                          )) : <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>None</span>}
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: isActive ? 'var(--primary)' : 'inherit' }}>{myOrders.length}</td>
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>{myCompletedOrders.length}</td>
                      <td>
                        <span className={isActive ? 'status-pill-active' : 'status-pill-disabled'}>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <IconBtn icon={<PencilIcon size={18} />} tooltip="Edit Waiter" style={iconBtnEditStyle} onClick={() => openEditStaffModal(w)} />
                      </td>
                    </tr>
                  );
                })}
                {waiters.length === 0 && (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No waiters registered. Add staff with the Waiter role.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  };

  const renderKitchenManagement = () => {
    const kitchenStaff = staff.filter(s => s.role === 'Kitchen');
    const activeOrders = orders.filter(o => o.status !== 'done');
    const completedOrders = orders.filter(o => o.status === 'done');
    const kitchenStaffNames = kitchenStaff.map(ks => ks.name);
    return (
      <section className="panel-view active">
        <div className="panel-header-flex" style={{ marginBottom: '24px' }}>
          <div className="panel-title-desc">
            <h2 className="panel-inner-title">Kitchen list</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', display: 'none' }}></p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-black" style={{ background: 'var(--orange-gradient)', borderColor: '#ff7a00', padding: '10px 18px', borderRadius: '8px', fontWeight: 700 }}
              onClick={() => openAddStaffModal('Kitchen')}>Add Kitchen Staff</button>
          </div>
        </div>
        <div className="admin-card-container">
          <div style={{ overflowX: 'auto' }}>
            <table className="menu-items-table">
              <thead>
                <tr>
                  <th>S.NO.</th>
                  <th>KITCHEN STAFF NAME</th>
                  <th>PHONE NUMBER</th>
                  <th>EMAIL ADDRESS</th>
                  <th>ASSIGNED TABLES</th>
                  <th style={{ textAlign: 'center' }}>ACTIVE ORDERS</th>
                  <th style={{ textAlign: 'center' }}>COMPLETED ORDERS</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {kitchenStaff.map((k, i) => {
                  const myOrders = activeOrders.filter(o => {
                    const chef = o.kitchenStaff || (kitchenStaffNames.length > 0 ? kitchenStaffNames[parseInt(o.id) % kitchenStaffNames.length] : 'Unassigned');
                    return chef === k.name;
                  });
                  const myCompletedOrders = completedOrders.filter(o => {
                    const chef = o.kitchenStaff || (kitchenStaffNames.length > 0 ? kitchenStaffNames[parseInt(o.id) % kitchenStaffNames.length] : 'Unassigned');
                    return chef === k.name;
                  });
                  const isActive = k.status === 'On Duty' || k.status === 'Active';
                  return (
                    <tr key={k.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: isActive ? 'rgba(255,122,0,0.1)' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <KitchenIcon size={14} color={isActive ? 'var(--primary)' : '#94a3b8'} />
                          </div>
                          <span style={{ fontWeight: 700 }}>{k.name}</span>
                        </div>
                      </td>
                      <td>{k.phone || 'No phone'}</td>
                      <td>{k.email || 'No email'}</td>
                      <td>
                        <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>None</span>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: isActive ? 'var(--primary)' : 'inherit' }}>{myOrders.length}</td>
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>{myCompletedOrders.length}</td>
                      <td>
                        <span className={isActive ? 'status-pill-active' : 'status-pill-disabled'}>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <IconBtn icon={<PencilIcon size={18} />} tooltip="Edit Staff" style={iconBtnEditStyle} onClick={() => openEditStaffModal(k)} />
                      </td>
                    </tr>
                  );
                })}
                {kitchenStaff.length === 0 && (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No kitchen staff registered. Add staff with the Kitchen role.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  };



  const renderWaiterReport = () => {
    const waiters = staff.filter(s => s.role === 'Waiter');
    const waiterNames = [...new Set(waiters.map(w => w.name))];
    const tableNums = [...new Set(tables.map(t => t.id.replace('T-', '')))];

    const resetFilters = () => {
      setWaiterFilterDateStart('');
      setWaiterFilterDateEnd('');
      setWaiterFilterName('All');
      setWaiterFilterTable('All');
      setWaiterFilterSource('All');
      setWaiterFilterPayMode('All');
      setWaiterFilterPayStatus('All');
      setWaiterFilterOrderStatus('All');
    };

    const handleOfflinePaymentSubmit = (e) => {
      e.preventDefault();
      if (!activeReportOfflinePaymentOrder) return;
      updateOrder(activeRestaurant.id, {
        ...activeReportOfflinePaymentOrder,
        billingStatus: 'paid',
        paymentMode: offlinePaymentType
      });
      addToast(`Offline payment of ₹${activeReportOfflinePaymentOrder.total} recorded via ${offlinePaymentType}!`);
      setActiveReportOfflinePaymentOrder(null);
    };

    const getTimelineTimes = (order) => {
      const baseTime = order.time || '12:00 PM';
      const match = baseTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) {
        return {
          received: baseTime,
          accepted: '12:05 PM',
          kitchen: '12:10 PM',
          ready: '12:25 PM',
          pickup: '12:28 PM',
          served: '12:30 PM',
          duration: '30 mins'
        };
      }
      const hrs = parseInt(match[1]);
      const mins = parseInt(match[2]);
      const ampm = match[3].toUpperCase();

      const formatTime = (offsetMins) => {
        let totalMins = hrs * 60 + mins + offsetMins;
        let h = Math.floor(totalMins / 60) % 12;
        if (h === 0) h = 12;
        let m = totalMins % 60;
        let period = ampm;
        if (Math.floor(totalMins / 60) >= 12 && ampm === 'AM') period = 'PM';
        if (Math.floor(totalMins / 60) >= 24 && ampm === 'PM') period = 'AM';
        return `${h}:${m.toString().padStart(2, '0')} ${period}`;
      };

      return {
        received: baseTime,
        accepted: formatTime(2),
        kitchen: formatTime(5),
        ready: formatTime(20),
        pickup: formatTime(23),
        served: formatTime(26),
        duration: '26 mins'
      };
    };

    // Filter orders
    const filteredOrders = orders.filter(o => {
      const oDate = o.date || '2026-06-10';
      if (waiterFilterDateStart && oDate < waiterFilterDateStart) return false;
      if (waiterFilterDateEnd && oDate > waiterFilterDateEnd) return false;

      if (waiterFilterName !== 'All') {
        if (waiterFilterName === 'Unassigned' && o.waiter !== 'Unassigned') return false;
        if (o.waiter !== waiterFilterName) return false;
      }

      if (waiterFilterTable !== 'All' && o.table !== waiterFilterTable) return false;

      const oSource = o.source || 'Dine-In';
      if (waiterFilterSource !== 'All' && oSource !== waiterFilterSource) return false;

      const oPayMode = o.paymentMode || (o.billingStatus === 'paid' ? 'Cash' : 'Pending');
      if (waiterFilterPayMode !== 'All' && oPayMode !== waiterFilterPayMode) return false;

      const oPayStatus = o.billingStatus === 'paid' ? 'Paid' : 'Unpaid';
      if (waiterFilterPayStatus !== 'All' && oPayStatus !== waiterFilterPayStatus) return false;

      if (waiterFilterOrderStatus !== 'All' && o.status.toLowerCase() !== waiterFilterOrderStatus.toLowerCase()) return false;

      return true;
    });

    return (
      <section className="panel-view active">
        {/* Header */}
        <div className="panel-header-flex" style={{ marginBottom: '24px' }}>
          <div className="panel-title-desc">
            <h2 className="panel-inner-title">Waiter Report</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', display: 'none' }}></p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline" style={{ padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }} onClick={() => addToast('Waiter Report Exported Successfully')}>Export Report</button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="admin-card-container" style={{
          marginBottom: '24px',
          borderLeft: '4px solid #ff7a00',
          background: 'linear-gradient(to right, #fffaf5, #ffffff)',
          boxShadow: '0 4px 20px rgba(255, 122, 0, 0.05)'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FilterIcon size={16} color="#ff7a00" />
            Waiter Filters
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Date From</label>
              <input type="date" className="admin-input" value={waiterFilterDateStart} onChange={e => setWaiterFilterDateStart(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Date To</label>
              <input type="date" className="admin-input" value={waiterFilterDateEnd} onChange={e => setWaiterFilterDateEnd(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Waiter</label>
              <select className="admin-input" value={waiterFilterName} onChange={e => setWaiterFilterName(e.target.value)}>
                <option value="All">All Waiters</option>
                <option value="Unassigned">Unassigned</option>
                {waiterNames.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Table</label>
              <select className="admin-input" value={waiterFilterTable} onChange={e => setWaiterFilterTable(e.target.value)}>
                <option value="All">All Tables</option>
                {tableNums.map(num => <option key={num} value={num}>Table {num}</option>)}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Order Source</label>
              <select className="admin-input" value={waiterFilterSource} onChange={e => setWaiterFilterSource(e.target.value)}>
                <option value="All">All Sources</option>
                <option value="Dine-In">Dine-In</option>
                <option value="Website">Website</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Payment Mode</label>
              <select className="admin-input" value={waiterFilterPayMode} onChange={e => setWaiterFilterPayMode(e.target.value)}>
                <option value="All">All Modes</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Payment Status</label>
              <select className="admin-input" value={waiterFilterPayStatus} onChange={e => setWaiterFilterPayStatus(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Order Status</label>
              <select className="admin-input" value={waiterFilterOrderStatus} onChange={e => setWaiterFilterOrderStatus(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              className="btn btn-outline"
              style={{
                fontSize: '13px',
                padding: '8px 16px',
                borderRadius: '6px',
                borderColor: '#e2e8f0',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#ff7a00';
                e.currentTarget.style.color = '#ff7a00';
                e.currentTarget.style.background = '#fff8f2';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.background = 'transparent';
              }}
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Report Table Card */}
        <div className="admin-card-container">
          <div style={{ overflowX: 'auto' }}>
            <table className="menu-items-table">
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>ORDER DATE</th>
                  <th>TABLE NUMBER</th>
                  <th>WAITER NAME</th>
                  <th>ORDER SOURCE</th>
                  <th>ORDER STATUS</th>
                  <th>PAYMENT MODE</th>
                  <th>PAYMENT STATUS</th>
                  <th>TOTAL AMOUNT</th>
                  <th style={{ textAlign: 'center' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(o => {
                  const isActive = o.status !== 'done';
                  const isPaid = o.billingStatus === 'paid';
                  const payMode = o.paymentMode || (isPaid ? 'Cash' : 'Pending');
                  return (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 700 }}>#ORD-{o.id}</td>
                      <td>{o.date || '2026-06-10'}</td>
                      <td>Table {o.table}</td>
                      <td style={{ fontWeight: 600 }}>{o.waiter}</td>
                      <td>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: (o.source === 'Website') ? '#eff6ff' : '#f1f5f9', color: (o.source === 'Website') ? '#2563eb' : '#475569' }}>
                          {o.source || 'Dine-In'}
                        </span>
                      </td>
                      <td>
                        <span className={isActive ? 'status-pill-disabled' : 'status-pill-active'} style={{ borderColor: o.status === 'new' ? '#ff7a00' : o.status === 'preparing' ? '#2563eb' : '#10b981', color: o.status === 'new' ? '#ff7a00' : o.status === 'preparing' ? '#2563eb' : '#10b981', background: o.status === 'new' ? '#fff7ed' : o.status === 'preparing' ? '#eff6ff' : '#ecfdf5' }}>
                          {o.status.toUpperCase()}
                        </span>
                      </td>
                      <td>{payMode}</td>
                      <td>
                        <span className={isPaid ? 'status-pill-active' : 'status-pill-disabled'}>
                          {isPaid ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700, color: isPaid ? '#16a34a' : 'inherit' }}>₹{o.total.toLocaleString('en-IN')}</td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'center' }}>
                          <button className="btn btn-outline" style={{ padding: '6px 10px', borderRadius: '6px' }} onClick={() => setActiveReportViewOrder(o)} title="View Timeline">
                            <EyeIcon size={14} color="var(--primary)" />
                          </button>
                          <button className="btn btn-outline" style={{ padding: '6px 10px', borderRadius: '6px', opacity: isPaid ? 0.5 : 1, cursor: isPaid ? 'not-allowed' : 'pointer' }} onClick={() => !isPaid && setActiveReportOfflinePaymentOrder(o)} disabled={isPaid} title="Offline Payment">
                            <CreditCardIcon size={14} color="var(--primary)" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>No matching report data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline Times Modal Popup */}
        {activeReportViewOrder && (
          <div className="order-view-modal-overlay" onClick={() => setActiveReportViewOrder(null)}>
            <div className="order-view-modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
              <button className="order-view-modal-close-btn" onClick={() => setActiveReportViewOrder(null)}>✕</button>
              <div className="order-view-modal-header">
                <div className="order-view-modal-title-row">
                  <h2 className="order-view-modal-title">Order Service Timeline</h2>
                  <span className="order-view-modal-id-badge">#ORD-{activeReportViewOrder.id}</span>
                </div>
              </div>
              <div className="order-view-modal-body" style={{ padding: '24px' }}>
                {(() => {
                  const times = getTimelineTimes(activeReportViewOrder);
                  const timelineItems = [
                    { label: 'Order Received Time', val: times.received },
                    { label: 'Order Accepted Time', val: times.accepted },
                    { label: 'Kitchen Assigned Time', val: times.kitchen },
                    { label: 'Food Ready Notification Time', val: times.ready },
                    { label: 'Food Pickup Time', val: times.pickup },
                    { label: 'Food Served Time', val: times.served },
                  ];
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '24px' }}>
                        <div style={{ position: 'absolute', left: '9px', top: '8px', bottom: '8px', width: '2px', background: 'var(--border)' }}></div>
                        {timelineItems.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-20px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)', border: '2px solid #fff' }}></div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{item.label}</span>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', fontFamily: 'monospace' }}>{item.val}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>Total Service Duration</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{times.duration}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Offline Payment Modal Popup */}
        {activeReportOfflinePaymentOrder && (
          <div className="order-view-modal-overlay" onClick={() => setActiveReportOfflinePaymentOrder(null)}>
            <div className="order-view-modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
              <button className="order-view-modal-close-btn" onClick={() => setActiveReportOfflinePaymentOrder(null)}>✕</button>
              <div className="order-view-modal-header">
                <div className="order-view-modal-title-row">
                  <h2 className="order-view-modal-title">Record Offline Payment</h2>
                  <span className="order-view-modal-id-badge">#ORD-{activeReportOfflinePaymentOrder.id}</span>
                </div>
              </div>
              <form onSubmit={handleOfflinePaymentSubmit} className="order-view-modal-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Order Amount</label>
                  <input type="text" className="admin-input" value={`₹${activeReportOfflinePaymentOrder.total}`} readOnly style={{ backgroundColor: 'var(--bg-tertiary)', fontWeight: 800, fontSize: '16px', color: '#16a34a' }} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Payment Type</label>
                  <select className="admin-input" value={offlinePaymentType} onChange={e => setOfflinePaymentType(e.target.value)}>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-black" style={{ background: 'var(--orange-gradient)', borderColor: '#ff7a00', color: '#fff', borderRadius: '8px', padding: '12px', fontWeight: 700, width: '100%', marginTop: '12px' }}>
                  Submit Payment
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    );
  };

  const renderKitchenReport = () => {
    const kitchenStaff = staff.filter(s => s.role === 'Kitchen');
    const kitchenStaffNames = [...new Set(kitchenStaff.map(k => k.name))];
    const allDishes = [...new Set(activeRestaurant?.menu?.map(m => m.name) || [])];

    const resetKitchenFilters = () => {
      setKitchenFilterDateStart('');
      setKitchenFilterDateEnd('');
      setKitchenFilterStaff('All');
      setKitchenFilterDish('All');
      setKitchenFilterPriority('All');
    };

    const getKitchenTimelineTimes = (order) => {
      const baseTime = order.time || '12:00 PM';
      const match = baseTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) {
        return {
          assigned: '12:02 PM',
          start: '12:04 PM',
          end: '12:18 PM',
          ready: '12:20 PM',
          pickup: '12:23 PM',
          prepDuration: '14 mins',
          pickupDelay: '3 mins'
        };
      }
      const hrs = parseInt(match[1]);
      const mins = parseInt(match[2]);
      const ampm = match[3].toUpperCase();

      const formatTime = (offsetMins) => {
        let totalMins = hrs * 60 + mins + offsetMins;
        let h = Math.floor(totalMins / 60) % 12;
        if (h === 0) h = 12;
        let m = totalMins % 60;
        let period = ampm;
        if (Math.floor(totalMins / 60) >= 12 && ampm === 'AM') period = 'PM';
        if (Math.floor(totalMins / 60) >= 24 && ampm === 'PM') period = 'AM';
        return `${h}:${m.toString().padStart(2, '0')} ${period}`;
      };

      return {
        assigned: formatTime(2),
        start: formatTime(4),
        end: formatTime(18),
        ready: formatTime(20),
        pickup: formatTime(23),
        prepDuration: '14 mins',
        pickupDelay: '3 mins'
      };
    };

    const getItemsText = (items) => {
      return items.map(item => `${item.name} (x${item.qty})`).join(', ');
    };

    const filteredOrders = orders.filter(o => {
      const oDate = o.date || '2026-06-10';
      if (kitchenFilterDateStart && oDate < kitchenFilterDateStart) return false;
      if (kitchenFilterDateEnd && oDate > kitchenFilterDateEnd) return false;

      const assignedChef = o.kitchenStaff || (kitchenStaffNames.length > 0 ? kitchenStaffNames[parseInt(o.id) % kitchenStaffNames.length] : 'Unassigned');
      if (kitchenFilterStaff !== 'All' && assignedChef !== kitchenFilterStaff) return false;

      if (kitchenFilterDish !== 'All') {
        const hasDish = o.items.some(item => item.name === kitchenFilterDish);
        if (!hasDish) return false;
      }

      const priority = o.priority || (o.notes ? 'Urgent' : 'Normal');
      if (kitchenFilterPriority !== 'All' && priority !== kitchenFilterPriority) return false;

      return true;
    });

    return (
      <section className="panel-view active">
        {/* Header */}
        <div className="panel-header-flex" style={{ marginBottom: '24px' }}>
          <div className="panel-title-desc">
            <h2 className="panel-inner-title">Kitchen Report</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Review kitchen preparation load, preparation duration, and delay details.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline" style={{ padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }} onClick={() => addToast('Kitchen Report Exported Successfully')}>Export Report</button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="admin-card-container" style={{
          marginBottom: '24px',
          borderLeft: '4px solid #ff7a00',
          background: 'linear-gradient(to right, #fffaf5, #ffffff)',
          boxShadow: '0 4px 20px rgba(255, 122, 0, 0.05)'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FilterIcon size={16} color="#ff7a00" />
            Kitchen Filters
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Date From</label>
              <input type="date" className="admin-input" value={kitchenFilterDateStart} onChange={e => setKitchenFilterDateStart(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Date To</label>
              <input type="date" className="admin-input" value={kitchenFilterDateEnd} onChange={e => setKitchenFilterDateEnd(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Kitchen Staff</label>
              <select className="admin-input" value={kitchenFilterStaff} onChange={e => setKitchenFilterStaff(e.target.value)}>
                <option value="All">All Staff</option>
                {kitchenStaffNames.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Dish</label>
              <select className="admin-input" value={kitchenFilterDish} onChange={e => setKitchenFilterDish(e.target.value)}>
                <option value="All">All Dishes</option>
                {allDishes.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Priority Level</label>
              <select className="admin-input" value={kitchenFilterPriority} onChange={e => setKitchenFilterPriority(e.target.value)}>
                <option value="All">All Priority Levels</option>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              className="btn btn-outline"
              style={{
                fontSize: '13px',
                padding: '8px 16px',
                borderRadius: '6px',
                borderColor: '#e2e8f0',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#ff7a00';
                e.currentTarget.style.color = '#ff7a00';
                e.currentTarget.style.background = '#fff8f2';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.background = 'transparent';
              }}
              onClick={resetKitchenFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Report Table Card */}
        <div className="admin-card-container">
          <div style={{ overflowX: 'auto' }}>
            <table className="menu-items-table">
              <thead>
                <tr>
                  <th>KOT NUMBER</th>
                  <th>ORDER ID</th>
                  <th>ITEMS (DISH)</th>
                  <th>TABLE NUMBER</th>
                  <th>WAITER NAME</th>
                  <th>KITCHEN STAFF NAME</th>
                  <th style={{ textAlign: 'center' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(o => {
                  const assignedChef = o.kitchenStaff || (kitchenStaffNames.length > 0 ? kitchenStaffNames[parseInt(o.id) % kitchenStaffNames.length] : 'Unassigned');
                  return (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 700 }}>#KOT-{o.id}</td>
                      <td style={{ fontWeight: 600 }}>#ORD-{o.id}</td>
                      <td style={{ whiteSpace: 'normal', minWidth: '220px' }}>{getItemsText(o.items)}</td>
                      <td>Table {o.table}</td>
                      <td style={{ fontWeight: 600 }}>{o.waiter}</td>
                      <td style={{ fontWeight: 600 }}>{assignedChef}</td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'center' }}>
                          <button className="btn btn-outline" style={{ padding: '6px 10px', borderRadius: '6px' }} onClick={() => setActiveKitchenReportViewOrder(o)} title="View Timeline">
                            <EyeIcon size={14} color="var(--primary)" />
                          </button>
                          <button className="btn btn-outline" style={{ padding: '6px 10px', borderRadius: '6px' }} onClick={() => setActiveKitchenReportItemOrder(o)} title="Item Details">
                            <CreditCardIcon size={14} color="var(--primary)" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>No matching kitchen report data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline Times Modal Popup */}
        {activeKitchenReportViewOrder && (
          <div className="order-view-modal-overlay" onClick={() => setActiveKitchenReportViewOrder(null)}>
            <div className="order-view-modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
              <button className="order-view-modal-close-btn" onClick={() => setActiveKitchenReportViewOrder(null)}>✕</button>
              <div className="order-view-modal-header">
                <div className="order-view-modal-title-row">
                  <h2 className="order-view-modal-title">Kitchen Service Timeline</h2>
                  <span className="order-view-modal-id-badge">#KOT-{activeKitchenReportViewOrder.id}</span>
                </div>
              </div>
              <div className="order-view-modal-body" style={{ padding: '24px' }}>
                {(() => {
                  const times = getKitchenTimelineTimes(activeKitchenReportViewOrder);
                  const timelineItems = [
                    { label: 'Kitchen Assigned Time', val: times.assigned },
                    { label: 'Preparation Start Time', val: times.start },
                    { label: 'Preparation End Time', val: times.end },
                    { label: 'Food Ready Time', val: times.ready },
                    { label: 'Waiter Pickup Time', val: times.pickup },
                  ];
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '24px' }}>
                        <div style={{ position: 'absolute', left: '9px', top: '8px', bottom: '8px', width: '2px', background: 'var(--border)' }}></div>
                        {timelineItems.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-20px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)', border: '2px solid #fff' }}></div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{item.label}</span>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', fontFamily: 'monospace' }}>{item.val}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>Preparation Duration</span>
                          <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{times.prepDuration}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>Pickup Delay Duration</span>
                          <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{times.pickupDelay}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Item Details Modal Popup */}
        {activeKitchenReportItemOrder && (
          <div className="order-view-modal-overlay" onClick={() => setActiveKitchenReportItemOrder(null)}>
            <div className="order-view-modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
              <button className="order-view-modal-close-btn" onClick={() => setActiveKitchenReportItemOrder(null)}>✕</button>
              <div className="order-view-modal-header">
                <div className="order-view-modal-title-row">
                  <h2 className="order-view-modal-title">Item Details</h2>
                  <span className="order-view-modal-id-badge">#ORD-{activeKitchenReportItemOrder.id}</span>
                </div>
              </div>
              <div className="order-view-modal-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeKitchenReportItemOrder.items.map((item, idx) => {
                  const menuItem = activeRestaurant?.menu?.find(m => m.name === item.name);
                  const category = menuItem ? menuItem.category : 'Main Course';
                  const priority = activeKitchenReportItemOrder.priority || (activeKitchenReportItemOrder.notes ? 'Urgent' : 'Normal');
                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: idx < activeKitchenReportItemOrder.items.length - 1 ? '1px dashed var(--border)' : 'none', paddingBottom: idx < activeKitchenReportItemOrder.items.length - 1 ? '20px' : '0' }}>
                      <div className="admin-form-group">
                        <label className="admin-form-label" style={{ fontSize: '13px', fontWeight: 800 }}>Dish Name</label>
                        <div className="admin-input" style={{ backgroundColor: 'var(--bg-tertiary)', fontWeight: 800, fontSize: '15px', color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{item.name}</span>
                          <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'rgba(255,122,0,0.1)', color: 'var(--primary)' }}>
                            {category}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="admin-form-group">
                          <label className="admin-form-label" style={{ fontSize: '13px', fontWeight: 800 }}>Quantity</label>
                          <div className="admin-input" style={{ fontWeight: 800, fontSize: '16px', color: '#16a34a', display: 'flex', alignItems: 'center' }}>
                            {item.qty}
                          </div>
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-form-label" style={{ fontSize: '13px', fontWeight: 800 }}>Priority Level</label>
                          <div className="admin-input" style={{ display: 'flex', alignItems: 'center' }}>
                            <span className={priority === 'Urgent' ? 'status-pill-disabled' : 'status-pill-active'} style={{
                              borderColor: priority === 'Urgent' ? '#ef4444' : '#10b981',
                              color: priority === 'Urgent' ? '#ef4444' : '#10b981',
                              background: priority === 'Urgent' ? '#fef2f2' : '#ecfdf5',
                              fontWeight: 800,
                              fontSize: '11px',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              margin: 0
                            }}>
                              {priority}
                            </span>
                          </div>
                        </div>
                      </div>

                      {activeKitchenReportItemOrder.notes && (
                        <div className="admin-form-group">
                          <label className="admin-form-label" style={{ fontSize: '13px', fontWeight: 800 }}>Special Instructions</label>
                          <div className="admin-input" style={{ backgroundColor: '#fff', borderLeft: '3px solid var(--primary)', fontSize: '13px', color: 'var(--text-main)', fontStyle: 'italic' }}>
                            {activeKitchenReportItemOrder.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  };

  const renderReports = () => {
    const totalRevenue = orders.filter(o => o.billingStatus === 'paid').reduce((s, o) => s + o.total, 0);
    const totalOrders = orders.length;
    const paidOrders = orders.filter(o => o.billingStatus === 'paid').length;
    const avgOrderValue = paidOrders > 0 ? Math.round(totalRevenue / paidOrders) : 0;
    const popularItem = (() => {
      const counts = {};
      orders.forEach(o => o.items.forEach(i => { counts[i.name] = (counts[i.name] || 0) + i.qty; }));
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      return sorted[0] ? `${sorted[0][0]} (${sorted[0][1]} orders)` : 'N/A';
    })();

    // Item Report data
    const itemStats = {};
    orders.forEach(o => {
      o.items.forEach(item => {
        if (!itemStats[item.name]) itemStats[item.name] = { qty: 0, revenue: 0 };
        itemStats[item.name].qty += item.qty;
        itemStats[item.name].revenue += item.price * item.qty;
      });
    });
    const itemReportData = Object.entries(itemStats)
      .map(([name, data]) => ({ name, qty: data.qty, revenue: data.revenue }))
      .sort((a, b) => b.revenue - a.revenue);

    // Table Report data
    const tableStats = {};
    orders.forEach(o => {
      const tKey = `Table ${o.table}`;
      if (!tableStats[tKey]) tableStats[tKey] = { orders: 0, revenue: 0 };
      tableStats[tKey].orders += 1;
      tableStats[tKey].revenue += o.total || 0;
    });
    const tableReportData = Object.entries(tableStats)
      .map(([name, data]) => ({ name, orders: data.orders, revenue: data.revenue }))
      .sort((a, b) => b.revenue - a.revenue);

    // Sales Report data (mock daily breakdown)
    const salesReportData = [
      { date: 'Today', orders: totalOrders, revenue: totalRevenue, avg: avgOrderValue },
      { date: 'Yesterday', orders: Math.max(0, totalOrders - 3), revenue: Math.max(0, totalRevenue - 800), avg: avgOrderValue + 15 },
      { date: '2 days ago', orders: Math.max(0, totalOrders - 1), revenue: Math.max(0, totalRevenue - 350), avg: avgOrderValue - 10 },
    ];

    // Customer Report data (derived from orders per table since no customer model)
    const customerStats = {};
    orders.forEach(o => {
      const custName = `Guest - Table ${o.table}`;
      if (!customerStats[custName]) customerStats[custName] = { visits: 0, spending: 0 };
      customerStats[custName].visits += 1;
      customerStats[custName].spending += o.total || 0;
    });
    const customerReportData = Object.entries(customerStats)
      .map(([name, data]) => ({ name, visits: data.visits, spending: data.spending }))
      .sort((a, b) => b.spending - a.spending);

    const thStyle = { padding: '12px 14px', textAlign: 'left' };
    const tdStyle = { padding: '12px 14px', fontSize: '13px', color: 'var(--text-main)', textAlign: 'left', borderBottom: '1px solid var(--border)' };

    return (
      <section className="panel-view active">
        <div className="panel-header-flex" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="panel-title-desc">
            <h2 className="panel-inner-title">Report list</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Provide operational and sales insights.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="date"
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                fontSize: '13px',
                color: 'var(--text-main)',
                background: '#ffffff',
                height: '38px',
                boxSizing: 'border-box',
                fontFamily: 'Outfit, sans-serif'
              }}
            />
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>to</span>
            <input
              type="date"
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                fontSize: '13px',
                color: 'var(--text-main)',
                background: '#ffffff',
                height: '38px',
                boxSizing: 'border-box',
                fontFamily: 'Outfit, sans-serif'
              }}
            />
            <button
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                fontSize: '13px',
                color: 'var(--text-main)',
                background: '#ffffff',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '38px',
                boxSizing: 'border-box',
                fontFamily: 'Outfit, sans-serif'
              }}
              onClick={() => addToast('Excel Report Exported Successfully')}
            >
              Export Excel
            </button>
            <button
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                fontSize: '13px',
                color: 'var(--text-main)',
                background: '#ffffff',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '38px',
                boxSizing: 'border-box',
                fontFamily: 'Outfit, sans-serif'
              }}
              onClick={() => addToast('PDF Report Exported Successfully')}
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Unified Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          {[
            { id: 'sales', icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            ), label: 'Sales Report' },
            { id: 'items', icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
              </svg>
            ), label: 'Item Report' },
            { id: 'tables', icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
              </svg>
            ), label: 'Table Report' },
            { id: 'customers', icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            ), label: 'Customer Report' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setReportTab(tab.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: reportTab === tab.id ? '#000' : 'transparent',
                color: reportTab === tab.id ? '#fff' : '#64748b',
                border: `1px solid ${reportTab === tab.id ? '#000' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Unified Clean Table Container */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <table className="menu-items-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            {reportTab === 'sales' && (
              <>
                <thead>
                  <tr>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Total Orders</th>
                    <th style={thStyle}>Revenue</th>
                    <th style={thStyle}>Avg Order Value</th>
                  </tr>
                </thead>
                <tbody>
                  {salesReportData.map((row, i) => (
                    <tr key={i} style={{ transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ ...tdStyle, fontWeight: 500 }}>{row.date}</td>
                      <td style={tdStyle}>{row.orders}</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#16a34a' }}>₹{row.revenue.toLocaleString('en-IN')}</td>
                      <td style={tdStyle}>₹{row.avg}</td>
                    </tr>
                  ))}
                  {salesReportData.length === 0 && (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>No sales data available.</td></tr>
                  )}
                </tbody>
              </>
            )}

            {reportTab === 'items' && (
              <>
                <thead>
                  <tr>
                    <th style={thStyle}>Item Name</th>
                    <th style={thStyle}>Quantity Sold</th>
                    <th style={thStyle}>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {itemReportData.map((row, i) => (
                    <tr key={i} style={{ transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ ...tdStyle, fontWeight: 500 }}>{row.name}</td>
                      <td style={tdStyle}>{row.qty}</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#16a34a' }}>₹{row.revenue.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  {itemReportData.length === 0 && (
                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>No item data available.</td></tr>
                  )}
                </tbody>
              </>
            )}

            {reportTab === 'tables' && (
              <>
                <thead>
                  <tr>
                    <th style={thStyle}>Table Number</th>
                    <th style={thStyle}>Orders Count</th>
                    <th style={thStyle}>Revenue Generated</th>
                  </tr>
                </thead>
                <tbody>
                  {tableReportData.map((row, i) => (
                    <tr key={i} style={{ transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ ...tdStyle, fontWeight: 500 }}>{row.name}</td>
                      <td style={tdStyle}>{row.orders}</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#16a34a' }}>₹{row.revenue.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  {tableReportData.length === 0 && (
                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>No table data available.</td></tr>
                  )}
                </tbody>
              </>
            )}

            {reportTab === 'customers' && (
              <>
                <thead>
                  <tr>
                    <th style={thStyle}>Customer Name</th>
                    <th style={thStyle}>Visits</th>
                    <th style={thStyle}>Spending</th>
                  </tr>
                </thead>
                <tbody>
                  {customerReportData.map((row, i) => (
                    <tr key={i} style={{ transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ ...tdStyle, fontWeight: 500 }}>{row.name}</td>
                      <td style={tdStyle}>{row.visits}</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#16a34a' }}>₹{row.spending.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  {customerReportData.length === 0 && (
                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>No customer data available.</td></tr>
                  )}
                </tbody>
              </>
            )}
          </table>
        </div>
      </section>
    );
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
            <li className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => { setActiveTab('overview'); setActivePage(null); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
              <a href="#">
                <DashboardIcon size={18} />
                <span>Dashboard</span>
              </a>
            </li>
          )}
          {isTabAllowed('saas') && (
            <li className={`sidebar-item ${activeTab === 'saas' ? 'active' : ''}`} onClick={() => { setActiveTab('saas'); setActivePage(null); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
              <a href="#">
                <TablesIcon size={18} />
                <span>Table Management</span>
              </a>
            </li>
          )}
          {isTabAllowed('qr') && (
            <li className={`sidebar-item ${activeTab === 'qr' ? 'active' : ''}`} onClick={() => { setActiveTab('qr'); setActivePage(null); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
              <a href="#">
                <QrIcon size={18} />
                <span>QR Code Management</span>
              </a>
            </li>
          )}
          {isTabAllowed('menu') && (
            <li className={`sidebar-item ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => { setActiveTab('menu'); setActivePage(null); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
              <a href="#">
                <MenuIcon size={18} />
                <span>Menu Management</span>
              </a>
            </li>
          )}
          {isTabAllowed('orders') && (
            <li className={`sidebar-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => { setActiveTab('orders'); setActivePage(null); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
              <a href="#">
                <OrdersIcon size={18} />
                <span>Order Management</span>
                {pendingOrdersCount > 0 && <span className="pulse-indicator" style={{ marginLeft: 'auto' }}></span>}
              </a>
            </li>
          )}
          {isTabAllowed('waiters') && (
            <li className={`sidebar-item has-dropdown ${['waiters', 'waiter-report'].includes(activeTab) ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsWaitersMenuOpen(!isWaitersMenuOpen); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
                <WaiterIcon size={18} />
                <span>Waiter Management</span>
                <span style={{ marginLeft: 'auto', transition: 'transform 0.2s', transform: isWaitersMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </a>
              <ul className={`sidebar-dropdown-menu ${isWaitersMenuOpen ? 'open' : ''}`}>
                <li>
                  <a href="#" className={`sidebar-sub-item ${activeTab === 'waiters' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('waiters'); setActivePage(null); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
                    Waiter List
                  </a>
                </li>
                <li>
                  <a href="#" className={`sidebar-sub-item ${activeTab === 'waiter-report' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('waiter-report'); setActivePage(null); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
                    Waiter Report
                  </a>
                </li>
              </ul>
            </li>
          )}
          {isTabAllowed('kitchen') && (
            <li className={`sidebar-item has-dropdown ${['kitchen', 'kitchen-report'].includes(activeTab) ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsKitchenMenuOpen(!isKitchenMenuOpen); setIsWaitersMenuOpen(false); setIsUsersMenuOpen(false); }}>
                <KitchenIcon size={18} />
                <span>Kitchen Management</span>
                <span style={{ marginLeft: 'auto', transition: 'transform 0.2s', transform: isKitchenMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </a>
              <ul className={`sidebar-dropdown-menu ${isKitchenMenuOpen ? 'open' : ''}`}>
                <li>
                  <a href="#" className={`sidebar-sub-item ${activeTab === 'kitchen' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('kitchen'); setActivePage(null); setIsWaitersMenuOpen(false); setIsUsersMenuOpen(false); }}>
                    Kitchen List
                  </a>
                </li>
                <li>
                  <a href="#" className={`sidebar-sub-item ${activeTab === 'kitchen-report' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('kitchen-report'); setActivePage(null); setIsWaitersMenuOpen(false); setIsUsersMenuOpen(false); }}>
                    Kitchen Report
                  </a>
                </li>
              </ul>
            </li>
          )}
          {isTabAllowed('users') && (
            <li className={`sidebar-item has-dropdown ${['roles', 'roles-add', 'users-list', 'users-add'].includes(activeTab) ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsUsersMenuOpen(!isUsersMenuOpen); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); }}>
                <UsersIcon size={18} />
                <span>Users</span>
                <span style={{ marginLeft: 'auto', transition: 'transform 0.2s', transform: isUsersMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </a>
              <ul className={`sidebar-dropdown-menu ${isUsersMenuOpen ? 'open' : ''}`}>
                <li>
                  <a href="#" className={`sidebar-sub-item ${['roles', 'roles-add'].includes(activeTab) ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('roles'); setActivePage(null); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); }}>
                    Roles & Permissions
                  </a>
                </li>
                <li>
                  <a href="#" className={`sidebar-sub-item ${['users-list', 'users-add'].includes(activeTab) ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('users-list'); setActivePage(null); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); }}>
                    User Lists
                  </a>
                </li>
              </ul>
            </li>
          )}
          {isTabAllowed('billing') && (
            <li className={`sidebar-item ${activeTab === 'billing' ? 'active' : ''}`} onClick={() => { setActiveTab('billing'); setActivePage(null); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
              <a href="#">
                <BillingIcon size={18} />
                <span>Billing</span>
              </a>
            </li>
          )}
          {isTabAllowed('reports') && (
            <li className={`sidebar-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => { setActiveTab('reports'); setActivePage(null); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
              <a href="#">
                <ReportsIcon size={18} />
                <span>Reports</span>
              </a>
            </li>
          )}
          {isTabAllowed('settings') && (
            <li className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { setActiveTab('settings'); setActivePage(null); setIsWaitersMenuOpen(false); setIsKitchenMenuOpen(false); setIsUsersMenuOpen(false); }}>
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
                {activeTab === 'orders' ? 'Order management' :
                  activeTab === 'waiter-report' ? 'Waiter management' :
                    activeTab === 'kitchen-report' ? 'Kitchen management' :
                      activeTab === 'saas' ? 'Table Management' :
                        activeTab === 'qr' ? 'QR Code Management' :
                          activeTab === 'menu' ? 'Menu management' :
                            activeTab === 'overview' ? 'Dashboard' :
                              activeTab === 'waiters' ? 'Waiter management' :
                                activeTab === 'kitchen' ? 'Kitchen management' :
                                  activeTab.includes('users') ? 'Users' :
                                    activeTab.includes('roles') ? 'Users' :
                                      activeTab}
              </h1>
              {activeTab !== 'orders' && <span className="header-subtitle-date">{dateTimeStr}</span>}
            </div>



            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '2px solid #ff7a00',
                    background: '#ffffff',
                    boxShadow: '0 2px 8px rgba(255,122,0,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    outline: 'none',
                    padding: 0
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(255,122,0,0.3)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.backgroundColor = '#fff7ed';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255,122,0,0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                >
                  <span style={{
                    color: '#ff7a00',
                    fontSize: '14px',
                    fontWeight: '800',
                    fontFamily: 'Outfit, sans-serif',
                    letterSpacing: '0.03em',
                    lineHeight: 1
                  }}>A</span>
                </button>
                {profileDropdownOpen && (
                  <>
                    <div
                      style={{ position: 'fixed', inset: 0, zIndex: 998 }}
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: '8px',
                      background: '#ffffff',
                      border: '1.5px solid #ff7a00',
                      borderRadius: '10px',
                      boxShadow: '0 8px 24px rgba(255,122,0,0.12)',
                      width: '115px',
                      zIndex: 999,
                      overflow: 'hidden',
                      animation: 'fadeIn 0.2s ease-out',
                      padding: '4px 0'
                    }}>
                      <button
                        onClick={() => {
                          setActiveTab('settings');
                          setActivePage(null);
                          setProfileDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: 'none',
                          background: 'none',
                          textAlign: 'left',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.2s',
                          fontFamily: 'Outfit, sans-serif'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = '#fff7ed';
                          e.currentTarget.style.color = '#ff7a00';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#334155';
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: 'none',
                          background: 'none',
                          textAlign: 'left',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          borderTop: '1px solid rgba(255,122,0,0.12)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.2s',
                          fontFamily: 'Outfit, sans-serif'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = '#fff7ed';
                          e.currentTarget.style.color = '#ff7a00';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#334155';
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
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
              {activeTab === 'qr' && renderQrManagement()}
              {activeTab === 'customers' && renderCustomerManagement()}
              {activeTab === 'waiters' && renderWaiterManagement()}
              {activeTab === 'waiter-report' && renderWaiterReport()}
              {activeTab === 'kitchen' && renderKitchenManagement()}
              {activeTab === 'kitchen-report' && renderKitchenReport()}
              {activeTab === 'reports' && renderReports()}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Order Status:</span>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      background: activeViewOrder.status === 'done' ? '#dcfce7' : activeViewOrder.status === 'ready' ? '#dbeafe' : activeViewOrder.status === 'preparing' ? '#fef3c7' : '#f1f5f9',
                      color: activeViewOrder.status === 'done' ? '#15803d' : activeViewOrder.status === 'ready' ? '#1d4ed8' : activeViewOrder.status === 'preparing' ? '#92400e' : '#475569'
                    }}>
                      {activeViewOrder.status === 'done' ? 'Completed' : activeViewOrder.status === 'new' ? 'New' : activeViewOrder.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Payment:</span>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      background: activeViewOrder.billingStatus === 'paid' ? '#dcfce7' : '#fef3c7',
                      color: activeViewOrder.billingStatus === 'paid' ? '#15803d' : '#92400e'
                    }}>
                      💰 {activeViewOrder.billingStatus === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
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
        {/* Generate QR Modal Popup */}
        {isGenerateQrOpen && (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={(e) => { if (e.target === e.currentTarget) setIsGenerateQrOpen(false); }}
          >
            <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--black)', fontFamily: 'Outfit, sans-serif' }}>Generate QR Code</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>Create a new dining table and generate its QR code.</p>
                </div>
                <button
                  onClick={() => { setIsGenerateQrOpen(false); setGenQrFormErrors({}); }}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', color: '#64748b' }}
                >✕</button>
              </div>
              {/* Modal Body */}
              <form onSubmit={(e) => {
                e.preventDefault();
                const errors = {};
                if (!genQrForm.id || !genQrForm.id.trim()) {
                  errors.id = "Table Number is required";
                }
                if (Object.keys(errors).length > 0) {
                  setGenQrFormErrors(errors);
                  return;
                }
                const cleanId = genQrForm.id.trim();
                const exists = (activeRestaurant?.tables || []).some(t => t.id.toLowerCase() === cleanId.toLowerCase());
                if (exists) {
                  setGenQrFormErrors({ id: "Table ID already exists!" });
                  return;
                }

                const success = addDiningTable(activeRestaurant.id, {
                  id: cleanId,
                  status: genQrForm.status || 'Free',
                  seats: 4
                });
                if (success) {
                  addToast('Table Created Successfully');
                  setIsGenerateQrOpen(false);
                } else {
                  setGenQrFormErrors({ id: "Table ID already exists!" });
                }
              }} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }} noValidate>

                {/* 1. Table Number */}
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '600', marginBottom: '6px', display: 'block' }}>Table Number</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={genQrForm.id || ''}
                    onChange={(e) => {
                      setGenQrForm({ ...genQrForm, id: e.target.value });
                      if (genQrFormErrors.id) {
                        setGenQrFormErrors({ ...genQrFormErrors, id: null });
                      }
                    }}
                    placeholder="e.g. T-06"
                    required
                  />
                  {genQrFormErrors.id && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{genQrFormErrors.id}</p>}
                </div>

                {/* 2. QR Code (Preview) */}
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '600', marginBottom: '6px', display: 'block' }}>QR Code</label>
                  <div style={{ display: 'flex', justifyContent: 'center', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1.5px dashed rgba(255,122,0,0.15)', boxShadow: '0 2px 10px rgba(255,122,0,0.04)' }}>
                    {genQrForm.id ? (
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&color=000000&bgcolor=FFFFFF&data=${encodeURIComponent(`http://${window.location.hostname}:3001/table/${genQrForm.id.trim()}`)}`}
                        alt="QR Code Preview"
                        style={{ width: '120px', height: '120px', display: 'block', borderRadius: '6px' }}
                      />
                    ) : (
                      <div style={{ width: '120px', height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', textAlign: 'center' }}>
                        <span>🍳</span>
                        <span style={{ marginTop: '8px' }}>Enter Table Number for preview</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. QR URL */}
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '600', marginBottom: '6px', display: 'block' }}>QR URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    readOnly
                    value={genQrForm.id ? `http://${window.location.hostname}:3001/table/${genQrForm.id.trim()}` : ''}
                    style={{ backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'not-allowed', fontSize: '12px' }}
                  />
                </div>

                {/* 4. Created Date */}
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '600', marginBottom: '6px', display: 'block' }}>Created Date</label>
                  <input
                    type="text"
                    className="admin-input"
                    readOnly
                    value={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    style={{ backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }}
                  />
                </div>

                {/* 5. Status */}
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '600', marginBottom: '6px', display: 'block' }}>Status</label>
                  <select
                    className="admin-input"
                    value={genQrForm.status || 'Free'}
                    onChange={(e) => setGenQrForm({ ...genQrForm, status: e.target.value })}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Free">Free</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Modal Footer */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => { setIsGenerateQrOpen(false); setGenQrFormErrors({}); }}
                    style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '8px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ background: 'var(--orange-gradient)', color: '#fff', border: 'none', fontWeight: '700', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    Generate QR Code
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Custom Delete Menu Item Modal */}
        {deleteMenuItemId && (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={(e) => { if (e.target === e.currentTarget) setDeleteMenuItemId(null); }}
          >
            <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: 0, overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--black)', fontFamily: 'Outfit, sans-serif' }}>Delete Menu Item</h3>
                <button
                  onClick={() => setDeleteMenuItemId(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', color: '#64748b' }}
                >✕</button>
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                  Are you sure you want to delete this menu item? This action is permanent and cannot be undone.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setDeleteMenuItemId(null)}
                    style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '8px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn"
                    style={{ background: '#ef4444', color: '#fff', border: 'none', fontWeight: '700', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}
                    onClick={() => {
                      deleteMenuItem(activeRestaurant.id, deleteMenuItemId);
                      addToast("Menu Item Deleted Successfully");
                      setDeleteMenuItemId(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 
