import React, { useState, useEffect } from 'react';
import { useAppState } from '../../contexts/AppContext';

export default function Settings() {
  const { activeRestaurant, saveRestaurantSettings, accentColor, setDarkMode, addToast } = useAppState();

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

  useEffect(() => {
    if (activeRestaurant) {
      setSettingsForm({
        name: activeRestaurant.name || '',
        tagline: activeRestaurant.settings?.tagline || '',
        currency: activeRestaurant.settings?.currency || '₹',
        tablesCount: activeRestaurant.settings?.tablesCount || 5,
        taxRate: (activeRestaurant.settings?.taxRate || 0) * 2 * 100, // convert back to full percentage
        serviceChargeRate: (activeRestaurant.settings?.serviceChargeRate || 0) * 100,
        darkMode: activeRestaurant.darkMode || false,
        logo: activeRestaurant.settings?.logo || '',
        banner: activeRestaurant.settings?.banner || '',
        phone: activeRestaurant.settings?.phone || '',
        address: activeRestaurant.settings?.address || '',
        city: activeRestaurant.settings?.city || '',
        state: activeRestaurant.settings?.state || '',
        gstNumber: activeRestaurant.settings?.gstNumber || '',
        openingTime: activeRestaurant.settings?.openingTime || '08:00',
        closingTime: activeRestaurant.settings?.closingTime || '22:00',
        selfService: !!activeRestaurant.settings?.selfService,
        minOrderAmount: activeRestaurant.settings?.minOrderAmount || 0
      });
    }
  }, [activeRestaurant]);

  if (!activeRestaurant) return null;

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
            <span className="profile-card-icon" style={{ color: 'var(--black)' }}>
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
            <span className="profile-card-icon" style={{ color: 'var(--black)' }}>
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
  return renderSettings();
}
