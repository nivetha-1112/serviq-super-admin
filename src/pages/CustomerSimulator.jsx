import React, { useState, useEffect } from 'react';
import { useAppState } from '../config/AppContext';

export default function CustomerSimulator() {
  const {
    activeRestaurant,
    cart,
    setCart,
    activeCustomerTable,
    setActiveCustomerTable,
    activeCustomerOrder,
    placeCustomerOrder,
    setActiveCustomerOrder
  } = useAppState();

  const [simScreen, setSimScreen] = useState('landing'); // landing, menu, cart, confirm
  const [searchVal, setSearchVal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Items');

  // Popup Modal for adding to cart
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [modalNotes, setModalNotes] = useState('');

  // Synchronize screen state if an order is in progress or completed
  useEffect(() => {
    if (activeCustomerOrder) {
      setSimScreen('confirm');
    }
  }, [activeCustomerOrder]);

  if (!activeRestaurant) {
    return null;
  }

  const { name: storeName, settings = {}, menu = [], tables = [] } = activeRestaurant;

  // Simulator debug selector handler
  const handleTableChange = (e) => {
    setActiveCustomerTable(e.target.value);
    setCart([]);
    setActiveCustomerOrder(null);
    setSimScreen('landing');
  };

  const handleStartOrdering = () => {
    setSimScreen('menu');
  };

  // Add to cart modal triggers
  const handleOpenItemModal = (item) => {
    setModalItem(item);
    setModalQty(1);
    setModalNotes('');
    setIsItemModalOpen(true);
  };

  const handleAddToCartSubmit = (e) => {
    e.preventDefault();
    if (!modalItem) return;

    const existingIndex = cart.findIndex(c => c.id === modalItem.id && c.notes === modalNotes);
    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += modalQty;
      setCart(updatedCart);
    } else {
      setCart([...cart, {
        id: modalItem.id,
        name: modalItem.name,
        price: modalItem.price,
        quantity: modalQty,
        notes: modalNotes
      }]);
    }
    setIsItemModalOpen(false);
    setModalItem(null);
  };

  // Cart actions
  const adjustCartQty = (idx, amount) => {
    const updated = [...cart];
    updated[idx].quantity += amount;
    if (updated[idx].quantity <= 0) {
      updated.splice(idx, 1);
    }
    setCart(updated);
  };

  // Calculations
  const taxRate = settings.taxRate || 0.025; // 2.5% CGST + 2.5% SGST
  const serviceRate = settings.serviceChargeRate || 0;
  
  const cartQtySum = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAmt = parseFloat((subtotal * taxRate * 2).toFixed(2));
  const serviceAmt = parseFloat((subtotal * serviceRate).toFixed(2));
  const totalAmt = subtotal + taxAmt + serviceAmt;

  const handleConfirmOrder = () => {
    if (cart.length === 0) return;
    placeCustomerOrder(modalNotes);
    setCart([]);
    setSimScreen('confirm');
  };

  // Filter menu
  const menuCategories = ['All Items', ...new Set(menu.map(i => i.category))];
  let filteredMenu = menu;
  if (selectedCategory !== 'All Items') {
    filteredMenu = filteredMenu.filter(item => item.category === selectedCategory);
  }
  if (searchVal) {
    filteredMenu = filteredMenu.filter(item => item.name.toLowerCase().includes(searchVal.toLowerCase()));
  }

  // Tracking steps UI highlight helpers
  const getStepClass = (stepName) => {
    if (!activeCustomerOrder) return '';
    const status = activeCustomerOrder.status; // new, preparing, ready, done
    
    const stepsOrder = ['new', 'preparing', 'ready', 'done'];
    const currentStepIdx = stepsOrder.indexOf(status);
    const targetStepIdx = stepsOrder.indexOf(stepName);

    if (currentStepIdx >= targetStepIdx) {
      return 'active';
    }
    return '';
  };

  return (
    <aside className="simulator-panel collapsed" id="simulator-panel">
      <div className="simulator-header">
        <div className="simulator-title">
          📱 <span>Customer Simulator</span>
        </div>
        <button 
          className="btn" 
          onClick={() => document.getElementById('simulator-panel')?.classList.add('collapsed')}
          style={{ background: 'transparent', color: 'white', fontSize: '18px', padding: 0 }}
        >
          ✕
        </button>
      </div>

      {/* Simulator debug controls */}
      <div className="simulator-controls" style={{ padding: '10px 16px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <label htmlFor="cust-select-table-sim" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)', marginBottom: 0 }}>Simulate Table:</label>
        <select 
          id="cust-select-table-sim" 
          value={activeCustomerTable} 
          onChange={handleTableChange}
          style={{ padding: '4px 8px', fontSize: '12px', width: 'auto', maxWidth: '120px', height: '30px', borderRadius: '4px' }}
        >
          {tables.map(t => {
            const rawNum = t.id.replace('T-', '');
            return <option key={t.id} value={rawNum}>Table {rawNum}</option>;
          })}
        </select>
      </div>

      <div className="phone-mockup-wrapper">
        <div className="phone-device">
          <div className="phone-notch"></div>
          
          {/* iOS Status Bar */}
          <div className="phone-status-bar">
            <span className="status-time">9:41 AM</span>
            <span className="status-icons">
              <svg width="14" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle' }}><rect x="1" y="16" width="3" height="4" rx="0.5"/><rect x="6" y="12" width="3" height="8" rx="0.5"/><rect x="11" y="8" width="3" height="12" rx="0.5"/><rect x="16" y="4" width="3" height="16" rx="0.5"/><rect x="21" y="0" width="3" height="20" rx="0.5"/></svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginLeft: '3px' }}><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
              <svg width="18" height="10" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginLeft: '3px' }}><rect x="1" y="1" width="18" height="10" rx="2" ry="2"></rect><line x1="23" y1="4" x2="23" y2="8"></line><rect x="3" y="3" width="11" height="6" rx="1" ry="1" fill="currentColor"></rect></svg>
            </span>
          </div>
          
          <div className="phone-screen" id="phone-screen-viewport">
            
            {/* SCREEN 1: LANDING */}
            {simScreen === 'landing' && (
              <div className="customer-view active cust-landing" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="cust-logo-crossed-box" style={{ border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px', margin: '16px auto 20px auto', overflow: 'hidden', borderRadius: '12px' }}>
                  <img src={settings.logo || activeRestaurant.logo || "/logo.png"} alt="Logo" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                </div>

                <div className="cust-landing-welcome-sub">Welcome to</div>
                <h2 className="cust-landing-title">{storeName}</h2>
                <p className="cust-landing-tagline">{settings.tagline || 'Scan · Order · Enjoy'}</p>
                
                <div className="cust-landing-divider"></div>

                <div className="cust-table-card">
                  <div className="cust-table-card-label">YOUR TABLE</div>
                  <div className="cust-table-card-number">Table {activeCustomerTable}</div>
                  <div className="cust-table-card-sub">Assigned via QR Code</div>
                </div>

                <div className="cust-info-banner">
                  <span className="cust-info-icon">ℹ️</span>
                  <span className="cust-info-text">Menu and order will be linked to this table.</span>
                </div>

                {settings.selfService === false ? (
                  <div style={{ marginTop: 'auto', marginBottom: '20px', padding: '12px 14px', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '10px', textAlign: 'center', color: '#991b1b', fontSize: '11px', fontWeight: 600, lineHeight: 1.4 }}>
                    ⚠️ Self-Service digital ordering is currently disabled for this restaurant. Please place your order directly with the waitstaff.
                  </div>
                ) : (
                  <button className="btn-black-full" onClick={handleStartOrdering} style={{ marginTop: 'auto', marginBottom: '20px' }}>
                    Start Ordering
                  </button>
                )}
                <div className="cust-landing-footer" style={{ fontSize: '10px', color: '#94a3b8' }}>Powered by Serviq</div>
              </div>
            )}

            {/* SCREEN 2: DIGITAL MENU */}
            {simScreen === 'menu' && (
              <div className="customer-view active" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="cust-menu-header-dark" style={{
                  backgroundImage: (settings.banner || activeRestaurant.banner) ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(${settings.banner || activeRestaurant.banner})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <div className="header-top-row">
                    <div className="table-info-orange">
                      <span className="pin-icon">📍</span>
                      <span>Table T-{activeCustomerTable}</span>
                    </div>
                    {cart.length > 0 && (
                      <button className="cust-header-cart-btn" onClick={() => setSimScreen('cart')}>
                        <span className="cart-icon">🛒</span>
                        <span>Cart</span>
                        <span className="cart-badge-count">{cartQtySum}</span>
                      </button>
                    )}
                  </div>
                  
                  <h2 className="brand-title-white">{storeName}</h2>
                  <p className="brand-subtitle-grey">{settings.tagline || 'Scan, order, enjoy!'}</p>
                  
                  <div className="cust-menu-search-dark">
                    <span className="search-icon-dark">🔍</span>
                    <input 
                      type="text" 
                      placeholder="Search dishes..."
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                    />
                  </div>

                  <div className="cust-menu-categories-dark">
                    {menuCategories.map(cat => (
                      <button 
                        key={cat} 
                        className={`category-pill-sim ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                          background: selectedCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          marginRight: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cust-menu-list-wrapper" style={{ flex: 1, overflowY: 'auto' }}>
                  <div className="cust-category-title-strip" style={{ textTransform: 'uppercase' }}>
                    {selectedCategory} - {filteredMenu.length} items
                  </div>
                  <div className="cust-menu-list">
                    {filteredMenu.map(item => (
                      <div key={item.id} className="cust-menu-card" style={{ display: 'flex', padding: '10px', borderBottom: '1px solid #e2e8f0', background: 'white', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: item.veg ? '#16a34a' : '#dc2626' }}>
                              {item.veg ? '🟢 Veg' : '🔴 Non-Veg'}
                            </span>
                            {item.bestseller && <span style={{ backgroundColor: '#fef3c7', color: '#d97706', fontSize: '9px', fontWeight: 'bold', padding: '1px 4px', borderRadius: '4px' }}>★ Bestseller</span>}
                          </div>
                          <h4 style={{ fontSize: '14px', margin: '4px 0', color: 'var(--black)' }}>{item.name}</h4>
                          <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</div>
                          <strong style={{ fontSize: '13px', color: 'var(--black)' }}>₹{item.price}</strong>
                        </div>
                        <div style={{ textAlign: 'right', marginLeft: '10px' }}>
                          <button 
                            className="btn btn-black" 
                            onClick={() => handleOpenItemModal(item)}
                            style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '16px' }}
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    ))}
                    {filteredMenu.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>No items found.</div>
                    )}
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="cust-cart-bar-sticky" style={{ display: 'block' }}>
                    <button className="cust-cart-trigger" onClick={() => setSimScreen('cart')}>
                      <span className="cart-quantity-circle">{cartQtySum}</span>
                      <span className="cart-text-center">View Cart</span>
                      <span className="cart-total-price">₹{subtotal.toFixed(2)}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SCREEN 3: CART PREVIEW */}
            {simScreen === 'cart' && (
              <div className="customer-view active" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="cust-menu-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                  <button className="btn" onClick={() => setSimScreen('menu')} style={{ background: 'transparent', fontSize: '14px', padding: 0, fontWeight: 700 }}>⬅️ Menu</button>
                  <span style={{ fontWeight: 700 }}>Review Cart</span>
                  <span style={{ width: '24px' }}></span>
                </div>

                <div className="cust-cart-screen" style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                  <div className="cust-cart-items">
                    {cart.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed #e2e8f0' }}>
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: '13px', display: 'block' }}>{item.name}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>₹{item.price} each</span>
                          {item.notes && <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>📝 {item.notes}</div>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button className="qty-btn" onClick={() => adjustCartQty(idx, -1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', fontSize: '14px', cursor: 'pointer' }}>-</button>
                          <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{item.quantity}</span>
                          <button className="qty-btn" onClick={() => adjustCartQty(idx, 1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', fontSize: '14px', cursor: 'pointer' }}>+</button>
                        </div>
                      </div>
                    ))}
                    {cart.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>Your cart is empty.</div>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <>
                      <div className="cust-bill-summary" style={{ backgroundColor: '#fafafa', borderRadius: '8px', padding: '12px', marginTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                          <span>Items Subtotal:</span>
                          <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                          <span>GST Tax ({(taxRate * 100 * 2).toFixed(1)}%):</span>
                          <span>₹{taxAmt.toFixed(2)}</span>
                        </div>
                        {serviceAmt > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                            <span>Service Charge ({(serviceRate * 100).toFixed(1)}%):</span>
                            <span>₹{serviceAmt.toFixed(2)}</span>
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '14px', borderTop: '1px solid #e2e8f0', paddingTop: '8px', marginTop: '8px' }}>
                          <span>Estimated Total:</span>
                          <span>₹{totalAmt.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: '16px' }}>
                        <label style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>Kitchen instructions / notes:</label>
                        <textarea 
                          rows="2" 
                          placeholder="e.g. Less spicy, no onions, etc." 
                          value={modalNotes}
                          onChange={(e) => setModalNotes(e.target.value)}
                          style={{ fontSize: '12px', padding: '8px', width: '100%', boxSizing: 'border-box' }}
                        ></textarea>
                      </div>

                      {settings.minOrderAmount > 0 && subtotal < settings.minOrderAmount ? (
                        <div style={{ marginTop: '15px' }}>
                          <div style={{ padding: '8px 10px', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', color: '#92400e', fontSize: '11px', fontWeight: 600, marginBottom: '8px', textAlign: 'center', lineHeight: 1.4 }}>
                            ⚠️ Minimum order amount is {settings.currency || '₹'}{settings.minOrderAmount}. Please add {settings.currency || '₹'}{(settings.minOrderAmount - subtotal).toFixed(2)} more to place order.
                          </div>
                          <button className="btn btn-primary" disabled style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 700, opacity: 0.5, cursor: 'not-allowed' }}>
                            🚀 Confirm & Place Order
                          </button>
                        </div>
                      ) : (
                        <button className="btn btn-primary" onClick={handleConfirmOrder} style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 700, marginTop: '15px' }}>
                          🚀 Confirm & Place Order
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* SCREEN 4: ORDER TRACKING & STEP SYNC */}
            {simScreen === 'confirm' && (
              <div className="customer-view active cust-confirm-screen" style={{ display: 'flex', flexDirection: 'column', padding: '20px', textAlign: 'center' }}>
                <div className="track-icon-container" style={{ fontSize: '32px', margin: '20px 0 10px 0' }}>
                  {activeCustomerOrder?.status === 'done' ? '🍽️' : '🔥'}
                </div>
                <h2 style={{ fontSize: '18px', margin: '0 0 6px 0' }}>
                  {activeCustomerOrder?.status === 'done' ? 'Enjoy Your Meal!' : 'Order Placed successfully!'}
                </h2>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>Order ID: #{activeCustomerOrder?.id}</p>
                <div className="cust-table-tag" style={{ margin: '0 auto 15px auto' }}>Table {activeCustomerTable}</div>

                <div style={{ backgroundColor: 'var(--primary-light)', width: '100%', borderRadius: '8px', padding: '10px', fontSize: '12px', marginBottom: '20px' }}>
                  {activeCustomerOrder?.status === 'done' ? 'Billing status: Settled' : 'Estimated Wait Time: 15 - 20 mins'}
                </div>

                <div className="tracking-steps" style={{ textAlign: 'left', margin: '15px 0' }}>
                  <div className={`track-step ${getStepClass('new')}`}>
                    <div className="track-step-dot">
                      <div className="track-step-line"></div>
                    </div>
                    <div className="track-step-info">
                      <span className="track-step-title">Order Received</span>
                      <span className="track-step-desc">Sent to kitchen for approval</span>
                    </div>
                  </div>
                  
                  <div className={`track-step ${getStepClass('preparing')}`}>
                    <div className="track-step-dot">
                      <div className="track-step-line"></div>
                    </div>
                    <div className="track-step-info">
                      <span className="track-step-title">Preparing in Kitchen</span>
                      <span className="track-step-desc">Chefs are preparing your meal</span>
                    </div>
                  </div>

                  <div className={`track-step ${getStepClass('ready')}`}>
                    <div className="track-step-dot">
                      <div className="track-step-line"></div>
                    </div>
                    <div className="track-step-info">
                      <span className="track-step-title">Ready to Serve</span>
                      <span className="track-step-desc">Waitstaff is delivering to table</span>
                    </div>
                  </div>

                  <div className={`track-step ${getStepClass('done')}`}>
                    <div className="track-step-dot"></div>
                    <div className="track-step-info">
                      <span className="track-step-title">Delivered & Served</span>
                      <span className="track-step-desc">Enjoy your delicious food!</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="btn btn-outline" 
                  onClick={() => {
                    setActiveCustomerOrder(null);
                    setSimScreen('menu');
                  }} 
                  style={{ width: '100%', fontSize: '12px', marginTop: 'auto' }}
                >
                  📋 Order More Items
                </button>
              </div>
            )}

            {/* POPUP SUB-MODAL FOR CUSTOMER DISH */}
            {isItemModalOpen && modalItem && (
              <div className="cust-modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1100 }}>
                <form onSubmit={handleAddToCartSubmit} className="cust-modal-content" style={{ background: '#fff', padding: '16px', borderRadius: '8px', width: '85%' }}>
                  <div className="modal-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '16px', margin: 0 }}>{modalItem.name}</h3>
                    <span className="modal-close" onClick={() => { setIsItemModalOpen(false); setModalItem(null); }} style={{ cursor: 'pointer' }}>✕</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '12px', lineHeight: 1.4 }}>{modalItem.desc || 'Freshly prepared hot dish.'}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px' }}>Price:</span>
                    <strong style={{ color: 'var(--primary)', fontSize: '15px' }}>₹{modalItem.price}</strong>
                  </div>

                  <div style={{ margin: '12px 0' }}>
                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>Select Quantity:</label>
                    <div className="cust-quantity-control" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button type="button" className="qty-btn" onClick={() => modalQty > 1 && setModalQty(modalQty - 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', fontSize: '16px' }}>-</button>
                      <span style={{ fontWeight: 700, fontSize: '15px' }}>{modalQty}</span>
                      <button type="button" className="qty-btn" onClick={() => setModalQty(modalQty + 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', fontSize: '16px' }}>+</button>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '10px', display: 'block', marginBottom: '4px' }}>Special Instructions:</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Extra spicy, sauce separate..." 
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      style={{ fontSize: '11px', padding: '6px' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', fontWeight: 700, borderRadius: '8px' }}>
                    Add to Cart • ₹{modalItem.price * modalQty}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </aside>
  );
}
