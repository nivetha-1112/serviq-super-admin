import React, { useState } from 'react';
import { useAppState } from '../contexts/AppContext';

export default function Login() {
  const { login } = useAppState();
  const [role] = useState('admin'); // Only 'admin' role is exposed now
  const [email, setEmail] = useState('admin@saravana.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = login(email, password, role);
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid credentials');
    }
  };

  return (
    <div id="login-view" className="login-container">
      <div className="login-card">
        {/* Logo container */}
        <div className="login-logo-crossed-box" style={{ border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', margin: '0 auto 18px auto', overflow: 'hidden' }}>
          <img src="/logo.png" alt="Serviq Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
        </div>
        
        <h1 className="login-title">Serviq Admin Panel</h1>
        <p className="login-subtitle">Sign in to your restaurant dashboard</p>
        
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email" style={{textAlign:'left'}}>
              Admin Email
            </label>
            <div className="input-icon-wrapper">
              <span className="input-icon">✉️</span>
              <input 
                type="email" 
                id="login-email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                placeholder="admin@restaurant.com" 
              />
            </div>
          </div>
          
          <div className="form-group" style={{ position: 'relative' }}>
            <div style={{ display: 'flex',  alignItems: 'center', marginBottom: '6px' }}>
              <label htmlFor="login-password" style={{ marginBottom: 0 }}>
                Admin Password
              </label>
            </div>
            <div className="input-icon-wrapper" style={{ position: 'relative' }}>
              <span className="input-icon">🔒</span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="login-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="Enter admin password" 
                style={{ paddingRight: '40px' }} 
              />
              <span 
                id="toggle-password-btn" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none', fontSize: '14px' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>
          
          <div className="form-row-remember">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                id="remember-me" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark-box"></span>
              Remember me
            </label>
          </div>
          
          {errorMsg && (
            <div id="login-error" style={{ color: 'var(--danger)', fontSize: '13px', marginBottom: '15px', display: 'block', textAlign: 'left' }}>
              ❌ {errorMsg}
            </div>
          )}
          
          <button type="submit" className="btn btn-black" style={{ width: '100%', marginTop: '10px' }}>
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
}
