import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialRestaurantsData, initialState } from './initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Core database states
  const [restaurantsData, setRestaurantsData] = useState(initialRestaurantsData);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRestaurantId, setCurrentRestaurantId] = useState(null);
  const [isImpersonating, setIsImpersonating] = useState(false);
  
  // SaaS States
  const [saasSettings, setSaasSettings] = useState(initialState.saasSettings);
  const [saasPlans, setSaasPlans] = useState(initialState.saasPlans);
  const [saasAdmins, setSaasAdmins] = useState(initialState.saasAdmins);
  const [saasLogs, setSaasLogs] = useState(initialState.saasLogs);
  const [saasInvoices, setSaasInvoices] = useState(initialState.saasInvoices);
  
  // Active Tenant settings overrides / defaults
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState('#ff7a00');
  const [qrCustomizer, setQrCustomizer] = useState({ color: '#ff7a00', showLogo: true });

  // Customer Simulator States
  const [cart, setCart] = useState([]);
  const [activeCustomerTable, setActiveCustomerTable] = useState('01');
  const [activeCustomerOrder, setActiveCustomerOrder] = useState(null);

  // Active computed tenant info
  const activeRestaurant = currentRestaurantId ? restaurantsData[currentRestaurantId] : null;

  // Sync theme changes with body class and css variables
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', accentColor);
    document.documentElement.style.setProperty('--primary-light', accentColor + '15');
  }, [accentColor]);

  // Actions
  const login = (email, password, role) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // 1. Check SuperAdmin
    if (cleanEmail === 'superadmin@serviq.com' && password === 'super123') {
      const user = { name: 'SaaS Owner', email: cleanEmail, role: 'SuperAdmin' };
      setCurrentUser(user);
      setCurrentRestaurantId(null);
      setIsImpersonating(false);
      return { success: true, user };
    }

    // 2. Check Admin / staff
    for (let id in restaurantsData) {
      const rest = restaurantsData[id];
      
      // Check Tenant owner/admin
      if (rest.owner.toLowerCase() === cleanEmail && password === 'admin123') {
        if (rest.status === 'Suspended') {
          return { success: false, error: 'This restaurant account has been suspended by the platform administration.' };
        }
        const user = { name: rest.name + ' Admin', email: cleanEmail, role: 'Admin' };
        setCurrentUser(user);
        setCurrentRestaurantId(id);
        setIsImpersonating(false);
        // Load settings values
        if (rest.settings) {
          setAccentColor(rest.settings.accentColor || '#ff7a00');
          setDarkMode(rest.settings.darkMode || false);
        }
        return { success: true, user };
      }

      // Check Kitchen Login credentials
      if (cleanEmail === rest.kitchenLogin.email.toLowerCase() && password === rest.kitchenLogin.password) {
        if (rest.status === 'Suspended') {
          return { success: false, error: 'This restaurant account has been suspended by the platform administration.' };
        }
        const user = { name: 'Kitchen Station', email: cleanEmail, role: 'Kitchen' };
        setCurrentUser(user);
        setCurrentRestaurantId(id);
        setIsImpersonating(false);
        return { success: true, user };
      }

      // Check Staff credentials
      const staffMember = rest.staff.find(s => s.email.toLowerCase() === cleanEmail && s.password === password);
      if (staffMember) {
        if (rest.status === 'Suspended') {
          return { success: false, error: 'This restaurant account has been suspended by the administration.' };
        }
        const user = { name: staffMember.name, email: staffMember.email, role: staffMember.role };
        setCurrentUser(user);
        setCurrentRestaurantId(id);
        setIsImpersonating(false);
        return { success: true, user };
      }
    }

    return { success: false, error: 'Invalid email or password. Please try again.' };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRestaurantId(null);
    setIsImpersonating(false);
    setCart([]);
    setActiveCustomerOrder(null);
  };

  const addPlatformLog = (text) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSaasLogs(prev => [{ time: timeStr, text }, ...prev]);
  };

  const clearPlatformLogs = () => {
    setSaasLogs([]);
  };

  const impersonateRestaurant = (id) => {
    const rest = restaurantsData[id];
    if (!rest) return;
    
    // Switch to restaurant context
    setCurrentRestaurantId(id);
    setIsImpersonating(true);
    setCurrentUser({ name: rest.name + ' Admin', email: rest.email, role: 'Admin' });
    
    if (rest.settings) {
      setAccentColor(rest.settings.accentColor || '#ff7a00');
      setDarkMode(rest.settings.darkMode || false);
    }
  };

  const exitImpersonation = () => {
    setIsImpersonating(false);
    setCurrentRestaurantId(null);
    setCurrentUser({ name: 'SaaS Owner', email: 'superadmin@serviq.com', role: 'SuperAdmin' });
  };

  // Restaurant Admin actions
  const saveRestaurantSettings = (id, settings) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      
      const updatedRest = {
        ...rest,
        name: settings.name,
        settings: {
          ...rest.settings,
          ...settings
        }
      };

      // Handle table count resizing inside the hook
      let tables = [...(rest.tables || [])];
      const targetCount = settings.tablesCount;
      if (targetCount > tables.length) {
        for (let i = tables.length + 1; i <= targetCount; i++) {
          const displayId = i < 10 ? `0${i}` : i;
          tables.push({ id: `T-${displayId}`, status: 'Free', seats: 4 });
        }
      } else if (targetCount < tables.length) {
        tables = tables.slice(0, targetCount);
      }
      updatedRest.tables = tables;

      return {
        ...prev,
        [id]: updatedRest
      };
    });

    if (settings.accentColor) setAccentColor(settings.accentColor);
    setDarkMode(!!settings.darkMode);
  };

  const addMenuItem = (id, item) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      return {
        ...prev,
        [id]: {
          ...rest,
          menu: [...rest.menu, item]
        }
      };
    });
  };

  const updateMenuItem = (id, updatedItem) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      return {
        ...prev,
        [id]: {
          ...rest,
          menu: rest.menu.map(item => item.id === updatedItem.id ? updatedItem : item)
        }
      };
    });
  };

  const deleteMenuItem = (id, itemId) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      return {
        ...prev,
        [id]: {
          ...rest,
          menu: rest.menu.filter(item => item.id !== itemId)
        }
      };
    });
  };

  const addDiningTable = (id, table) => {
    let success = false;
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      
      // Check if table ID already exists
      if (rest.tables.some(t => t.id.toLowerCase() === table.id.toLowerCase())) {
        return prev;
      }
      
      success = true;
      return {
        ...prev,
        [id]: {
          ...rest,
          tables: [...rest.tables, table],
          settings: {
            ...rest.settings,
            tablesCount: rest.tables.length + 1
          }
        }
      };
    });
    return success;
  };

  const updateDiningTableSeats = (id, tableId, seats) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      return {
        ...prev,
        [id]: {
          ...rest,
          tables: rest.tables.map(t => t.id === tableId ? { ...t, seats } : t)
        }
      };
    });
  };

  const addStaff = (id, staffMember) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      return {
        ...prev,
        [id]: {
          ...rest,
          staff: [...rest.staff, staffMember]
        }
      };
    });
  };

  const updateStaff = (id, updatedStaff) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      return {
        ...prev,
        [id]: {
          ...rest,
          staff: rest.staff.map(s => s.id === updatedStaff.id ? updatedStaff : s)
        }
      };
    });
  };

  const deleteStaff = (id, staffId) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      return {
        ...prev,
        [id]: {
          ...rest,
          staff: rest.staff.filter(s => s.id !== staffId)
        }
      };
    });
  };

  const updateKitchenPassword = (id, password) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      return {
        ...prev,
        [id]: {
          ...rest,
          kitchenLogin: {
            ...rest.kitchenLogin,
            password
          }
        }
      };
    });
  };

  // Inbound Orders
  const updateOrderStatus = (id, orderId, nextStatus) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      
      const updatedOrders = rest.orders.map(order => {
        if (order.id === orderId) {
          const updated = { ...order, status: nextStatus };
          if (nextStatus === 'done') {
            updated.billingStatus = 'paid';
          }
          return updated;
        }
        return order;
      });

      // Update simulator order reference in real time
      if (activeCustomerOrder && activeCustomerOrder.id === orderId) {
        setActiveCustomerOrder(prevOrder => ({ ...prevOrder, status: nextStatus }));
      }

      return {
        ...prev,
        [id]: {
          ...rest,
          orders: updatedOrders
        }
      };
    });
  };

  const markBillAsPaid = (id, tableLabel) => {
    const rawNum = tableLabel.replace('Table ', '');
    const cleanTableId = rawNum.length === 1 ? `T-0${rawNum}` : `T-${rawNum}`;

    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;

      // Update billing status inside orders
      const updatedOrders = rest.orders.map(ord => {
        if (ord.table === rawNum || parseInt(ord.table) === parseInt(rawNum)) {
          return { ...ord, billingStatus: 'paid', status: 'done' };
        }
        return ord;
      });

      // Update billing list status
      const updatedBillingData = rest.billingData.map(b => {
        if (b.table === tableLabel) {
          return { ...b, status: 'Paid' };
        }
        return b;
      });

      // Free dining table status
      const updatedTables = rest.tables.map(t => {
        if (t.id === cleanTableId) {
          return { ...t, status: 'Free' };
        }
        return t;
      });

      return {
        ...prev,
        [id]: {
          ...rest,
          orders: updatedOrders,
          billingData: updatedBillingData,
          tables: updatedTables
        }
      };
    });
  };

  // SaaS Super Admin functions
  const addRestaurant = (rest) => {
    setRestaurantsData(prev => ({
      ...prev,
      [rest.id]: rest
    }));
    
    // Auto register platform admin reference
    setSaasAdmins(prev => [
      ...prev,
      {
        id: `ADM-${Date.now().toString().slice(-3)}`,
        name: rest.ownerName,
        email: rest.owner,
        phone: rest.phone,
        restaurantName: rest.name,
        role: 'Owner',
        status: rest.status,
        lastLogin: 'Never'
      }
    ]);
  };

  const deleteRestaurant = (id) => {
    setRestaurantsData(prev => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
    // Also remove associated admin if needed
    setSaasAdmins(prev => prev.filter(admin => admin.restaurantName !== restaurantsData[id]?.name));
  };

  const updateRestaurant = (id, updatedFields) => {
    setRestaurantsData(prev => {
      const rest = prev[id];
      if (!rest) return prev;
      return {
        ...prev,
        [id]: {
          ...rest,
          ...updatedFields,
          settings: {
            ...rest.settings,
            name: updatedFields.name || rest.name
          }
        }
      };
    });

    // Sync admin entry if email changes
    setSaasAdmins(prev => prev.map(admin => {
      const rest = restaurantsData[id];
      if (admin.restaurantName === rest?.name) {
        return {
          ...admin,
          name: updatedFields.ownerName || admin.name,
          email: updatedFields.owner || admin.email,
          phone: updatedFields.phone || admin.phone,
          restaurantName: updatedFields.name || admin.restaurantName,
          status: updatedFields.status || admin.status
        };
      }
      return admin;
    }));
  };

  const createAdmin = (admin) => {
    setSaasAdmins(prev => [...prev, admin]);
  };

  const updateAdmin = (id, updatedFields) => {
    setSaasAdmins(prev => prev.map(admin => admin.id === id ? { ...admin, ...updatedFields } : admin));
  };

  const resetAdminPassword = (id, newPassword) => {
    // In a real app this would call an API. We'll just log it.
    addPlatformLog(`Password reset for Admin ID ${id}`);
  };

  const addSaaSPlan = (plan) => {
    setSaasPlans(prev => [...prev, plan]);
  };

  const updateSaaSPlan = (planId, updatedPlan) => {
    setSaasPlans(prev => prev.map(p => p.id === planId ? updatedPlan : p));
  };

  const upgradeRestaurantPlan = (restId, planId) => {
    const plan = saasPlans.find(p => p.id === planId);
    if (!plan) return;

    setRestaurantsData(prev => {
      const rest = prev[restId];
      if (!rest) return prev;
      return {
        ...prev,
        [restId]: {
          ...rest,
          plan: plan.name
        }
      };
    });

    // Record invoice
    const now = new Date();
    const cleanDate = now.toISOString().split('T')[0];
    const newInvoice = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      restaurant: restaurantsData[restId]?.name || 'Restaurant',
      plan: plan.name,
      amount: plan.monthlyPrice,
      paymentMethod: 'Credit Card',
      date: cleanDate,
      paymentDate: cleanDate,
      dueDate: new Date(now.setMonth(now.getMonth() + 1)).toISOString().split('T')[0],
      status: 'Paid'
    };
    setSaasInvoices(prev => [newInvoice, ...prev]);
  };

  const generateInvoice = (invoice) => {
    setSaasInvoices(prev => [invoice, ...prev]);
  };

  const refundInvoice = (invoiceId) => {
    setSaasInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: 'Refunded' } : inv));
  };

  // Customer Simulator Placement
  const placeCustomerOrder = (notes) => {
    if (cart.length === 0 || !currentRestaurantId) return;

    const randomIdNum = Math.floor(800 + Math.random() * 100).toString();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let subtotal = 0;
    const orderItems = cart.map(cartItem => {
      subtotal += cartItem.price * cartItem.quantity;
      return {
        name: cartItem.name,
        qty: cartItem.quantity,
        price: cartItem.price
      };
    });

    // Access tax rate from active restaurant settings, default 5%
    const taxRate = activeRestaurant?.settings?.taxRate * 2 || 0.05; // CGST + SGST
    const tax = parseFloat((subtotal * taxRate).toFixed(2));
    const serviceCharge = parseFloat((subtotal * (activeRestaurant?.settings?.serviceChargeRate || 0)).toFixed(2));
    const total = parseFloat((subtotal + tax + serviceCharge).toFixed(2));

    const newOrder = {
      id: randomIdNum,
      table: activeCustomerTable,
      time: timeNow,
      timeAgo: '1 min ago',
      items: orderItems,
      notes: notes,
      subtotal: subtotal,
      tax: tax,
      charge: serviceCharge,
      total: total,
      status: 'new',
      billingStatus: 'unpaid'
    };

    setRestaurantsData(prev => {
      const rest = prev[currentRestaurantId];
      if (!rest) return prev;

      // Mark dining table as occupied
      const tableIdToSet = activeCustomerTable.length === 1 ? `T-0${activeCustomerTable}` : `T-${activeCustomerTable}`;
      const updatedTables = rest.tables.map(t => t.id === tableIdToSet ? { ...t, status: 'Occupied' } : t);

      // Add to billing data
      const cleanTableLabel = `Table ${activeCustomerTable}`;
      const billingIdx = rest.billingData.findIndex(b => b.table === cleanTableLabel);
      let updatedBillingData = [...rest.billingData];

      if (billingIdx !== -1) {
        updatedBillingData[billingIdx] = {
          ...updatedBillingData[billingIdx],
          orders: updatedBillingData[billingIdx].orders + 1,
          total: updatedBillingData[billingIdx].total + total,
          status: 'Unpaid'
        };
      } else {
        updatedBillingData.push({
          table: cleanTableLabel,
          orders: 1,
          total: total,
          status: 'Unpaid'
        });
      }

      return {
        ...prev,
        [currentRestaurantId]: {
          ...rest,
          orders: [...rest.orders, newOrder],
          tables: updatedTables,
          billingData: updatedBillingData
        }
      };
    });

    setActiveCustomerOrder(newOrder);
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        restaurantsData,
        currentUser,
        currentRestaurantId,
        isImpersonating,
        saasSettings,
        saasPlans,
        saasAdmins,
        saasLogs,
        saasInvoices,
        darkMode,
        accentColor,
        qrCustomizer,
        cart,
        activeCustomerTable,
        activeCustomerOrder,
        activeRestaurant,
        
        login,
        logout,
        addPlatformLog,
        clearPlatformLogs,
        impersonateRestaurant,
        exitImpersonation,
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
        refundInvoice,
        setDarkMode,
        setAccentColor,
        setQrCustomizer,
        setCart,
        setActiveCustomerTable,
        setActiveCustomerOrder,
        placeCustomerOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);
