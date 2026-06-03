import React from 'react';
import { useAppState } from './config/AppContext';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import Admin from './pages/Admin';
import CustomerSimulator from './pages/CustomerSimulator';

function AppContent() {
  const { currentUser } = useAppState();

  return (
    <div className="app-container">
      {/* 1. Login panel */}
      {!currentUser && <Login />}

      {/* 2. Super Admin panel */}
      {currentUser && currentUser.role === 'SuperAdmin' && <SuperAdmin />}

      {/* 3. Restaurant Admin / Staff panel */}
      {currentUser && currentUser.role !== 'SuperAdmin' && <Admin />}

      {/* 4. Customer Smartphone Simulator */}
      <CustomerSimulator />
    </div>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
