import React from 'react';
import { useAppState } from './contexts/AppContext';
import Login from './pages/Login';
import Admin from './pages/Admin';
import CustomerSimulator from './pages/CustomerSimulator';
import ToastContainer from './components/ToastContainer';

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
      
      {/* 4. Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
