import React, { useState } from 'react';
import { useAppState } from '../config/AppContext';

export default function Login() {
  const { login } = useAppState();
  const [role, setRole] = useState('superadmin'); // 'superadmin' or 'admin'
  const [email, setEmail] = useState('superadmin@serviq.com');
  const [password, setPassword] = useState('super123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleSwitch = (targetRole) => {
    setRole(targetRole);
    setErrorMsg('');
    if (targetRole === 'superadmin') {
      setEmail('superadmin@serviq.com');
      setPassword('super123');
    } else {
      setEmail('admin@saravana.com');
      setPassword('admin123');
    }
  };

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
        
        <h1 className="login-title">Serviq Admin</h1>
        <p className="login-subtitle">Sign in to your dashboard</p>
        
        {/* Login Role Toggle Buttons */}
        <div id="login-role-toggle" style={{ display: 'flex', gap: 0, marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', border: '1.5px solid var(--primary)', background: 'var(--primary-light)' }}>
          <button 
            type="button" 
            className={`login-role-btn ${role === 'superadmin' ? 'active' : ''}`}
            onClick={() => handleRoleSwitch('superadmin')}
            style={{ 
              flex: 1, 
              padding: '8px 10px', 
              fontSize: '12px', 
              fontWeight: 700, 
              border: 'none', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease', 
              background: role === 'superadmin' ? 'var(--primary)' : 'transparent', 
              color: role === 'superadmin' ? '#fff' : 'var(--primary)'
            }}
          >
            🛡️ Super Admin
          </button>
          <button 
            type="button" 
            className={`login-role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => handleRoleSwitch('admin')}
            style={{ 
              flex: 1, 
              padding: '8px 10px', 
              fontSize: '12px', 
              fontWeight: 700, 
              border: 'none', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease', 
              background: role === 'admin' ? 'var(--primary)' : 'transparent', 
              color: role === 'admin' ? '#fff' : 'var(--primary)'
            }}
          >
            👤 Admin
          </button>
        </div>

        {/* Demo Credentials - Super Admin */}
        {/* {role === 'superadmin' && (
          <div id="demo-creds-superadmin" style={{ backgroundColor: 'var(--primary-light)', border: '1px solid rgba(255, 122, 0, 0.2)', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '12px', textAlign: 'left', lineHeight: '1.4' }}>
            <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🔑</span> Super Admin Demo Login
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 8px', color: 'var(--text-main)' }}>
              <span><strong>Email:</strong></span>
              <span style={{ wordBreak: 'break-all' }}><code>superadmin@serviq.com</code></span>
              <span><strong>Password:</strong></span>
              <span style={{ wordBreak: 'break-all' }}><code>super123</code></span>
            </div>
          </div>
        )} */}

        {/* Demo Credentials - Admin */}
        {/* {role === 'admin' && (
          // <div id="demo-creds-admin" style={{ backgroundColor: 'var(--primary-light)', border: '1px solid rgba(255, 122, 0, 0.2)', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '12px', textAlign: 'left', lineHeight: '1.4' }}>
          //   <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 8px', color: 'var(--text-main)' }}>
          //     <span><strong>Tenant Admin:</strong></span>
          //     <span style={{ wordBreak: 'break-all' }}><code>admin@saravana.com</code> / <code>admin123</code></span>
          //     <span><strong>Kitchen Stn:</strong></span>
          //     <span style={{ wordBreak: 'break-all' }}><code>kitchen@saravana.com</code> / <code>kitchen123</code></span>
          //   </div>
          // </div>
        )} */}
        
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email" style={{textAlign:'left'}}>
              {role === 'superadmin' ? 'Super Admin Email' : 'Admin Email'}
            </label>
            <div className="input-icon-wrapper">
              <span className="input-icon">✉️</span>
              <input 
                type="email" 
                id="login-email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                placeholder={role === 'superadmin' ? 'superadmin@serviq.com' : 'admin@restaurant.com'} 
              />
            </div>
          </div>
          
          <div className="form-group" style={{ position: 'relative' }}>
            <div style={{ display: 'flex',  alignItems: 'center', marginBottom: '6px' }}>
              <label htmlFor="login-password" style={{ marginBottom: 0 }}>
                {role === 'superadmin' ? 'Super Admin Password' : 'Admin Password'}
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
                placeholder={role === 'superadmin' ? 'Enter super admin password' : 'Enter admin password'} 
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
            Login as {role === 'superadmin' ? 'Super Admin' : 'Admin'}
          </button>
        </form>

        <div className="login-card-footer-plan">
          Serviq SaaS · 4 Default Restaurants
        </div>
      </div>
    </div>
  );
}
