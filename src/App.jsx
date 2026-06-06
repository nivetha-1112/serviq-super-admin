import React from 'react';
import { useAppState } from './config/AppContext';
import Login from './pages/Login';
import Admin from './pages/Admin';
import CustomerSimulator from './pages/CustomerSimulator';

function AppContent() {
  const { currentUser } = useAppState();

  return (
    <div className="app-container">
      {/* 1. Login panel */}
      {!currentUser && <Login />}

      {/* 2. Restaurant Admin / Staff panel */}
      {currentUser && <Admin />}

      {/* 3. Customer Smartphone Simulator */}
      <CustomerSimulator />
    </div>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
