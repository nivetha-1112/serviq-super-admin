import React from 'react';
import { useAppState } from '../contexts/AppContext';

export default function ToastContainer() {
  const { toasts } = useAppState();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast-message toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
          </div>
          <div className="toast-text">{toast.message}</div>
        </div>
      ))}
    </div>
  );
}
