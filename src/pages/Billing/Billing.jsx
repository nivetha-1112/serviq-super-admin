import React, { useState, useEffect } from 'react';
import { useAppState } from '../../contexts/AppContext';

export default function Billing() {
  const { activeRestaurant, markBillAsPaid, addToast } = useAppState();

  const [selectedBillingTable, setSelectedBillingTable] = useState('');
  const [billingPaymentMethod, setBillingPaymentMethod] = useState('UPI');
  const [editBillModal, setEditBillModal] = useState({ isOpen: false, table: null, items: [] });
  const [billingSearch, setBillingSearch] = useState('');

  // Default select first billing table
  useEffect(() => {
    if (activeRestaurant?.billingData?.length > 0 && !selectedBillingTable) {
      setSelectedBillingTable(activeRestaurant.billingData[0].table);
    }
  }, [activeRestaurant, selectedBillingTable]);

  if (!activeRestaurant) return null;

  const { billingData = [], orders = [] } = activeRestaurant;

  const handleMarkAsPaid = () => {
    if (!selectedBillingTable) return;
    markBillAsPaid(activeRestaurant.id, selectedBillingTable);
    addToast(`Marked bill as paid for ${selectedBillingTable}!`);
  };

  const renderBilling = () => {

    const selectedBillData = billingData.find(b => b.table === selectedBillingTable) || { table: selectedBillingTable, orders: 0, total: 0, status: 'Paid' };

    // Find active orders for selected billing table to show details
    const billingNum = selectedBillingTable.replace('Table ', '');
    const activeTableOrders = orders.filter(o => (o.table === billingNum || parseInt(o.table) === parseInt(billingNum)) && o.billingStatus === 'unpaid');

    // Combine items from all unpaid orders of this table
    const billingItems = [];
    activeTableOrders.forEach(o => {
      o.items.forEach(item => {
        const exist = billingItems.find(x => x.name === item.name);
        if (exist) {
          exist.qty += item.qty;
          exist.amount += item.qty * item.price;
        } else {
          billingItems.push({ name: item.name, qty: item.qty, rate: item.price, amount: item.qty * item.price });
        }
      });
    });

    const taxRate = activeRestaurant.settings?.taxRate || 0.025; // split tax
    const serviceRate = activeRestaurant.settings?.serviceChargeRate !== undefined ? activeRestaurant.settings?.serviceChargeRate : 0.10; // default 10% if not set

    const subtotal = billingItems.reduce((acc, curr) => acc + curr.amount, 0);
    const taxAmt = parseFloat((subtotal * taxRate * 2).toFixed(2));
    const serviceAmt = parseFloat((subtotal * serviceRate).toFixed(2));
    const totalAmt = subtotal + taxAmt + serviceAmt;

    // Filters tables list by search
    let filteredBillingData = billingData;
    if (billingSearch) {
      filteredBillingData = filteredBillingData.filter(b => b.table.toLowerCase().includes(billingSearch.toLowerCase().trim()));
    }

    const getTableGuests = (tableLabel) => {
      const num = tableLabel.replace('Table ', '');
      const cleanId = num.length === 1 ? `T-0${num}` : `T-${num}`;
      const t = tables.find(x => x.id === cleanId);
      return t ? t.seats : 3;
    };

    const getTableDuration = (tableLabel) => {
      const num = parseInt(tableLabel.replace('Table ', '')) || 1;
      if (num === 1) return '45 mins';
      if (num === 5) return '12 mins';
      if (num === 12) return '1 hour';
      return '30 mins';
    };

    const isVegItem = (itemName) => {
      const menuItem = menu.find(m => m.name.toLowerCase() === itemName.toLowerCase());
      return menuItem ? menuItem.veg : !itemName.toLowerCase().includes('chicken') && !itemName.toLowerCase().includes('keema') && !itemName.toLowerCase().includes('fish');
    };

    const getItemOptions = (itemName) => {
      if (itemName.includes('Dosa') && !itemName.includes('Keema')) return 'Extra Butter, Sambar separate';
      if (itemName.includes('Coffee')) return 'Strong, Less Sugar';
      if (itemName.includes('Idli')) return 'Ghee Roast, Podi';
      return '';
    };

    // Find the latest order ID for this table
    const latestOrderId = activeTableOrders.length > 0 ? `#ORD-${activeTableOrders[0].id}` : 'N/A';

    return (
      <section className="panel-view active">
        <div className="billing-panel-grid-new">
          {/* Column 1: Active Tables List */}
          <div className="billing-tables-column-new">
            <div className="active-tables-title-row">
              <h3>Active Tables</h3>
              <span className="active-tables-badge-new">
                {billingData.filter(b => b.status !== 'Paid').length} ACTIVE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '4px', overflowX: 'auto', paddingBottom: '12px' }}>
              {filteredBillingData.map(b => {
                const isActive = selectedBillingTable === b.table;
                const isPaid = b.status === 'Paid';
                const guests = getTableGuests(b.table);
                const duration = getTableDuration(b.table);

                return (
                  <div
                    key={b.table}
                    onClick={() => setSelectedBillingTable(b.table)}
                    className={`billing-table-select-card-new ${isActive ? 'active' : ''} ${isPaid ? 'settled' : ''}`}
                    style={{ minWidth: '240px' }}
                  >
                    <div className="billing-table-card-top">
                      <span className="billing-table-name-new">{b.table}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`billing-table-badge-new ${b.status.toLowerCase()}`}>
                          {b.status.toUpperCase()}
                        </span>
                        {!isPaid && (
                          <button
                            className="btn btn-outline"
                            style={{ padding: '4px', borderRadius: '4px', fontSize: '12px', border: 'none', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              const tNum = b.table.replace('Table ', '');
                              const tableOrders = orders.filter(o => (o.table === tNum || parseInt(o.table) === parseInt(tNum)) && o.billingStatus === 'unpaid');
                              if (tableOrders.length > 0) {
                                setActiveEditOrder(tableOrders[0]);
                                setEditOrderForm({
                                  table: tableOrders[0].table,
                                  notes: tableOrders[0].notes || '',
                                  waiter: tableOrders[0].waiter || 'Unassigned'
                                });
                                setActivePage('order-edit-form');
                              } else {
                                addToast('No active orders to edit.');
                              }
                            }}
                            title="Edit Order Details"
                          >
                            ✏️
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="billing-table-card-mid">
                      <span>{guests} Guests</span>
                      <span>•</span>
                      <span>{isPaid ? 'Checkout' : `🕒 ${duration}`}</span>
                    </div>

                    <div className={`billing-table-card-bottom ${isPaid ? 'settled' : ''}`}>
                      ₹{b.total.toLocaleString('en-IN')}
                    </div>
                  </div>
                );
              })}

              {filteredBillingData.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No active tables found.
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Bill Summary Details */}
          <div className="billing-summary-card-new">
            <div>
              <div className="bill-summary-header-row-new">
                <div>
                  <h3>Bill Summary</h3>
                  <p>Order ID: {latestOrderId} • {selectedBillingTable}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn btn-outline"
                    style={{ padding: '8px 10px', borderRadius: '8px' }}
                    onClick={() => {
                      if (activeTableOrders.length > 0) {
                        setEditBillModal({ isOpen: true, table: selectedBillingTable, items: JSON.parse(JSON.stringify(billingItems)) });
                      } else {
                        addToast('No active orders to edit.');
                      }
                    }}
                    title="Edit Bill Items"
                  >
                    ✏️
                  </button>

                  <button
                    className="btn btn-outline"
                    style={{ padding: '8px 10px', borderRadius: '8px' }}
                    onClick={() => {
                      if (activeTableOrders.length > 0) {
                        if (window.confirm(`Are you sure you want to cancel the active orders for ${selectedBillingTable}?`)) {
                          activeTableOrders.forEach(o => deleteOrder(activeRestaurant.id, o.id));
                          addToast('Orders deleted successfully.');
                        }
                      } else {
                        addToast('No active orders to cancel.');
                      }
                    }}
                    title="Delete Active Orders"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <table className="bill-items-table-new">
                <thead>
                  <tr>
                    <th style={{ width: '55%' }}>ITEM DESCRIPTION</th>
                    <th style={{ textAlign: 'center', width: '12%' }}>QTY</th>
                    <th style={{ textAlign: 'right', width: '15%' }}>RATE</th>
                    <th style={{ textAlign: 'right', width: '18%' }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {billingItems.map((item, idx) => {
                    const isVeg = isVegItem(item.name);
                    const options = getItemOptions(item.name);
                    return (
                      <tr key={idx}>
                        <td>
                          <div className="item-name-cell-new">
                            <span className={`item-status-dot ${isVeg ? 'veg' : 'non-veg'}`}></span>
                            <div className="item-name-text-wrapper">
                              <span className="item-name-bold">{item.name}</span>
                              {options && <span className="item-desc-subtitle">{options}</span>}
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: 'center', fontWeight: '600' }}>{item.qty}</td>
                        <td style={{ textAlign: 'right', fontWeight: '500', color: 'var(--text-muted)' }}>
                          ₹{item.rate.toFixed(2)}
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--black)' }}>
                          ₹{item.amount.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}

                  {billingItems.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontWeight: 500 }}>
                        No unpaid items found. This bill has been settled.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {subtotal > 0 && (
              <div className="bill-receipt-summary-new">
                <div className="bill-receipt-row-new">
                  <span>Subtotal</span>
                  <strong style={{ color: 'var(--text-main)' }}>₹{subtotal.toFixed(2)}</strong>
                </div>
                <div className="bill-receipt-row-new">
                  <span>GST ({(taxRate * 100 * 2).toFixed(0)}%)</span>
                  <strong style={{ color: 'var(--text-main)' }}>₹{taxAmt.toFixed(2)}</strong>
                </div>
                <div className="bill-receipt-row-new">
                  <span>Service Charge ({(serviceRate * 100).toFixed(0)}%)</span>
                  <strong style={{ color: 'var(--text-main)' }}>₹{serviceAmt.toFixed(2)}</strong>
                </div>
                <div className="bill-receipt-row-new grand-total-row">
                  <span className="label">Grand Total</span>
                  <span className="val">₹{totalAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}
          </div>

          {/* Column 3: Payment details selection & Actions */}
          <div className="billing-payment-card-new">
            <div className="payment-header-new">
              <h3>Payment Method</h3>
              <p>Select preference for {selectedBillingTable}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'UPI', label: 'UPI / QR Code', icon: '🔳', desc: 'Instant digital payment' },
                { id: 'Card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                { id: 'Cash', label: 'Cash', icon: '💵', desc: 'Manual reconciliation' }
              ].map(method => {
                const isSelected = billingPaymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => {
                      if (subtotal > 0) setBillingPaymentMethod(method.id);
                    }}
                    className={`billing-pay-option-card-new ${isSelected ? 'active' : ''}`}
                    style={{ opacity: subtotal === 0 ? 0.6 : 1, cursor: subtotal === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    <div className="pay-option-icon-box">
                      <span style={{ fontSize: '18px' }}>{method.icon}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--black)' }}>{method.label}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{method.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="btn btn-black"
              onClick={handleMarkAsPaid}
              disabled={subtotal === 0}
              style={{
                width: '100%',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '700',
                borderRadius: '8px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: subtotal === 0 ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px rgba(255, 122, 0, 0.2)'
              }}
            >
              <span>✓</span> Mark as Paid
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-outline"
                onClick={() => addToast('Sending receipt print command...')}
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px' }}
              >
                🖨️ Print
              </button>
              <button
                className="btn btn-outline"
                onClick={() => addToast('Invoice sharing link generated!')}
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px' }}
              >
                🔗 Share
              </button>
            </div>

            <div className="billing-tip-box-new">
              💡 <strong>BILLING TIP</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: 'inherit', fontWeight: '500', lineHeight: 1.4, textAlign: 'left' }}>
                Ensure QR codes are generated per bill for faster reconciliation in daily reports.
              </p>
            </div>
          </div>
        </div>

        {editBillModal.isOpen && (
          <div className="modal-overlay">
            <div className="modal-card" style={{ maxWidth: '600px', padding: 0, overflow: 'hidden' }}>
              <div className="modal-header-flex" style={{ padding: '24px 24px 0 24px', borderBottom: 'none', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', background: 'none', WebkitTextFillColor: 'initial' }}>Edit Bill Items</h3>
                <button className="modal-close" style={{ background: 'none', border: 'none', fontSize: '20px' }} onClick={() => setEditBillModal({ isOpen: false, table: null, items: [] })}>✕</button>
              </div>
              <div style={{ padding: '0 24px 24px 24px', maxHeight: '60vh', overflowY: 'auto' }}>
                <table className="bill-items-table-new" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th style={{ textAlign: 'left', paddingBottom: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>ITEM NAME</th>
                      <th style={{ textAlign: 'center', paddingBottom: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>QTY</th>
                      <th style={{ textAlign: 'right', paddingBottom: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>RATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editBillModal.items.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: '12px 0' }}>
                          <input type="text" value={item.name} onChange={(e) => {
                            const newItems = [...editBillModal.items];
                            newItems[idx].name = e.target.value;
                            setEditBillModal({ ...editBillModal, items: newItems });
                          }} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px', background: 'var(--bg-primary)', color: 'var(--text-main)' }} />
                        </td>
                        <td style={{ padding: '12px 12px' }}>
                          <input type="number" min="1" value={item.qty} onChange={(e) => {
                            const newItems = [...editBillModal.items];
                            newItems[idx].qty = parseInt(e.target.value) || 1;
                            setEditBillModal({ ...editBillModal, items: newItems });
                          }} style={{ width: '60px', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px', textAlign: 'center', background: 'var(--bg-primary)', color: 'var(--text-main)' }} />
                        </td>
                        <td style={{ padding: '12px 0', textAlign: 'right' }}>
                          <input type="number" min="0" step="0.01" value={item.rate} onChange={(e) => {
                            const newItems = [...editBillModal.items];
                            newItems[idx].rate = parseFloat(e.target.value) || 0;
                            setEditBillModal({ ...editBillModal, items: newItems });
                          }} style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px', textAlign: 'right', background: 'var(--bg-primary)', color: 'var(--text-main)' }} />
                        </td>
                      </tr>
                    ))}
                    {editBillModal.items.length === 0 && (
                      <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No items to edit</td></tr>
                    )}
                  </tbody>
                </table>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setEditBillModal({ isOpen: false, table: null, items: [] })} style={{ padding: '10px 24px', fontSize: '14px', borderRadius: '8px' }}>Cancel</button>
                  <button type="button" className="btn" style={{ background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 700, padding: '10px 24px', fontSize: '14px', borderRadius: '8px' }} onClick={() => {
                    addToast('Bill items updated! (Simulated)');
                    setEditBillModal({ isOpen: false, table: null, items: [] });
                  }}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
  );
  };
  return renderBilling();
}
