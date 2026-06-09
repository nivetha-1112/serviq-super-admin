const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, 'src', 'pages', 'Admin.jsx');
const destPath = path.join(__dirname, 'src', 'pages', 'Orders', 'Orders.jsx');

const lines = fs.readFileSync(adminPath, 'utf8').split('\n');

const imports = `import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppContext';
import PageHeader from '../../components/PageHeader';
import { Badge } from '../../components/Badge';

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

`;

// Extract renderOrders (lines 491 to 704)
const renderOrdersLines = lines.slice(491, 704).join('\n').replace(/const renderOrders = \(\) => \{/, 'const renderOrders = () => {\n').replace(/return \(/, 'return (\n<>\n');

// order-edit-form (lines 2073 to 2249)
const editFormLines = lines.slice(2073, 2249).join('\n');

// order-view (lines 2830 to 2965)
const viewModalLines = lines.slice(2830, 2965).join('\n');

const finalReturn = `
  return (
    <>
      {(!activePage || activePage === 'order-view') && renderOrders()}
      {activePage === 'order-edit-form' && (
        <div style={{marginTop: '20px'}}>
          ${editFormLines}
        </div>
      )}
      {activePage === 'order-view' && activeViewOrder && (
        ${viewModalLines}
      )}
    </>
  );
}
`;

const result = imports + renderOrdersLines + finalReturn;
// fix the extra return in renderOrdersLines
const cleanResult = result.replace(/return \(\n<>\n/, 'return (').replace(/ {4}\);\n\n  };/, '  );\n  };');

fs.writeFileSync(destPath, cleanResult);
console.log('Orders.jsx created.');
