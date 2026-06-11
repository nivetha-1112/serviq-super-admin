import React, { useState, useEffect } from 'react';
import { useAppState } from '../../contexts/AppContext';
import PageHeader from '../../components/PageHeader';

const sty = {
  pageCard: { background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
};

export default function Tables() {
  const { activeRestaurant, addDiningTable, updateDiningTableSeats, updateDiningTable, deleteDiningTable, setActiveCustomerTable, setCart, addToast } = useAppState();

  const [selectedTableId, setSelectedTableId] = useState('');
  const [addTableForm, setAddTableForm] = useState({ id: '', seats: 4, waiter: '' });
  const [draftSeats, setDraftSeats] = useState(4);
  const [draftStatus, setDraftStatus] = useState('Free');
  const [draftWaiter, setDraftWaiter] = useState('');
  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    if (activeRestaurant?.tables?.length > 0 && !selectedTableId) {
      setSelectedTableId(activeRestaurant.tables[0].id);
    }
  }, [activeRestaurant, selectedTableId]);

  useEffect(() => {
    if (activeRestaurant?.tables) {
      const current = activeRestaurant.tables.find(t => t.id === selectedTableId);
      if (current) {
        setDraftSeats(current.seats || 4);
        setDraftStatus(current.status || 'Free');
        setDraftWaiter(current.waiter || '');
      }
    }
  }, [selectedTableId, activeRestaurant]);

  if (!activeRestaurant) return null;

  const { tables = [], orders = [] } = activeRestaurant;

  const handleAddTableSubmit = (e) => {
    e.preventDefault();
    if (!addTableForm.id) return;
    const cleanId = addTableForm.id.trim();
    const success = addDiningTable(activeRestaurant.id, {
      id: cleanId,
      status: 'Free',
      seats: parseInt(addTableForm.seats) || 4
    });
    if (success) {
      addToast('Table Created Successfully');
      setActivePage(null);
    } else {
      addToast('Table ID already exists!');
    }
  };

  const handleSeatsUpdate = (val) => {
    const seats = parseInt(val) || 4;
    updateDiningTableSeats(activeRestaurant.id, selectedTableId, seats);
  };

  const launchSimulatorTable = (tId) => {
    const rawNum = tId.replace('T-', '');
    setActiveCustomerTable(rawNum);
    setCart([]);

    // Open simulator panel
    const simPanel = document.getElementById('simulator-panel');
    if (simPanel) simPanel.classList.remove('collapsed');
  };

  const renderTables = () => {

    const currentTable = tables.find(t => t.id === selectedTableId) || { id: selectedTableId, status: 'Free', seats: 4 };

    return (
      <section className="panel-view active">
        {/* Header Row */}
        <div className="panel-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="panel-inner-title" style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: 'var(--black)', fontFamily: 'Outfit, sans-serif' }}>Dining Tables & QR Management</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn-bell-mock" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', color: 'var(--black)', padding: '6px' }}>
              🔔
            </button>
            <button
              className="btn"
              onClick={() => { setAddTableForm({ id: '', seats: 4, waiter: '' }); setActivePage('table-form'); }}
              style={{ background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              + Add Dining Table
            </button>
          </div>
        </div>

        {/* Top: 5-column Dining Table Cards */}
        <div className="tables-row-grid-new">
          {tables.map(table => {
            const isSelected = selectedTableId === table.id;
            const isOccupied = table.status.toLowerCase() === 'occupied';
            return (
              <div
                key={table.id}
                className={`table-card-new ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedTableId(table.id);
                }}
              >
                {isSelected && <div className="table-card-checkmark-badge">✓</div>}

                <div className="table-card-header-new">
                  <span className={`table-card-id-box-new ${isOccupied ? 'occupied' : ''}`}>
                    {table.id}
                  </span>
                  <span className={`table-card-status-new ${isOccupied ? 'occupied' : 'free'}`}>
                    <span className="status-dot-new"></span>
                    {table.status.toUpperCase()}
                  </span>
                </div>

                <div className="table-card-body-new" style={{ color: isOccupied ? 'var(--black)' : 'var(--success)' }}>
                  <svg width="50" height="34" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 16C6 14.8954 6.89543 14 8 14H52C53.1046 14 54 14.8954 54 16V18C54 19.1046 53.1046 20 52 20H8C6.89543 20 6 19.1046 6 18V16Z" fill="currentColor" />
                    <rect x="16" y="20" width="4" height="14" rx="1" fill="currentColor" />
                    <rect x="40" y="20" width="4" height="14" rx="1" fill="currentColor" />
                    <path d="M12 34H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                  </svg>
                </div>

                {table.waiter && (
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', textAlign: 'center', marginBottom: '8px' }}>
                    Waiter: {table.waiter}
                  </div>
                )}

                <div className="table-card-footer-new">
                  <span>Capacity: {table.seats || 4}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Details Grid */}
        <div className="tables-details-split-new">
          {/* Column 1: QR Preview */}
          <div className="qr-preview-card-new">
            <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: 'var(--black)', fontFamily: 'Outfit, sans-serif' }}>QR Preview</h3>

            <div className="qr-dashed-container-new">
              <div className="qr-slate-box-new" style={{ backgroundColor: '#9aaaba' }}>
                <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://${window.location.hostname}:3001/table/${currentTable.id}`}
                    alt={`QR code for Table ${currentTable.id}`}
                    style={{ width: '100%', height: '100%' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="qr-active-badge-new">
                ACTIVE: {currentTable.id}
              </div>
            </div>

            <button
              className="btn"
              onClick={() => launchSimulatorTable(currentTable.id)}
              style={{
                width: '100%',
                background: '#eaeef2',
                color: '#334155',
                border: 'none',
                fontWeight: '750',
                fontSize: '13px',
                padding: '12px 20px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: 'auto',
                cursor: 'pointer'
              }}
            >
              🚀 Open in Customer Simulator
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-outline"
                onClick={() => addToast('Sending QR template to printer...')}
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                🖨️ Print Sticker
              </button>
              <button
                className="btn btn-outline"
                onClick={() => addToast('SVG QR sticker generated & downloaded!')}
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                📥 Download SVG
              </button>
            </div>
          </div>

          {/* Column 2: Selected Table Details Form */}
          <div className="table-details-card-new">
            <div className="table-details-header-new">
              <div>
                <h3>Table {currentTable.id} Details</h3>
                <p>Update seating and availability for this table.</p>
              </div>
              <div className="table-details-header-right-new">
                {currentTable.status.toLowerCase() === 'occupied' && (
                  <span>Active Since: 11:45 AM</span>
                )}
                <button
                  className="btn-trash-mock"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete Table ${currentTable.id}?`)) {
                      deleteDiningTable(activeRestaurant.id, currentTable.id);
                      addToast('Table Deleted Successfully');
                      const remaining = tables.filter(t => t.id !== currentTable.id);
                      if (remaining.length > 0) {
                        setSelectedTableId(remaining[0].id);
                      }
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ef4444',
                    fontSize: '18px',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Delete Table"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="divider-new"></div>

            <div>
              <div className="details-section-label-new">Seating Capacity</div>
              <div className="capacity-control-new">
                <button
                  type="button"
                  className="capacity-btn-new"
                  onClick={() => setDraftSeats(prev => Math.max(1, prev - 1))}
                >
                  −
                </button>
                <span className="capacity-value-new">{draftSeats}</span>
                <button
                  type="button"
                  className="capacity-btn-new"
                  onClick={() => setDraftSeats(prev => Math.min(12, prev + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <div className="details-section-label-new">Current Status</div>
              <div className="status-segmented-control-new">
                <div
                  className={`status-segment-new ${draftStatus === 'Free' ? 'active free' : ''}`}
                  onClick={() => setDraftStatus('Free')}
                >
                  FREE
                </div>
                <div
                  className={`status-segment-new ${draftStatus === 'Occupied' ? 'active occupied' : ''}`}
                  onClick={() => setDraftStatus('Occupied')}
                >
                  OCCUPIED
                </div>
              </div>
            </div>

            <div className="divider-new"></div>

            <div>
              <div className="details-section-label-new">Assigned Waiter (Optional)</div>
              <select
                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', backgroundSize: '14px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer' }}
                value={draftWaiter}
                onChange={(e) => setDraftWaiter(e.target.value)}
              >
                <option value="">Select Waiter...</option>
                <option value="Arjun K.">Arjun K.</option>
                <option value="Priya M.">Priya M.</option>
                <option value="Rahul S.">Rahul S.</option>
                <option value="Anita D.">Anita D.</option>
                <option value="Vikram S.">Vikram S.</option>
              </select>
            </div>

            <div className="divider-new"></div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setDraftSeats(currentTable.seats || 4);
                  setDraftStatus(currentTable.status || 'Free');
                  setDraftWaiter(currentTable.waiter || '');
                }}
                style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '8px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  updateDiningTable(activeRestaurant.id, currentTable.id, { seats: draftSeats, status: draftStatus, waiter: draftWaiter });
                  addToast('Table Updated Successfully');
                }}
                style={{
                  padding: '10px 24px',
                  fontSize: '13px',
                  borderRadius: '8px',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </section>
  );
  };

  return (
    <>
      {(!activePage) && renderTables()}
      {activePage === 'table-form' && (
        <div style={{marginTop: '20px'}}>
                
        <section>
          <div style={{ width: '100%' }}>
            <PageHeader subtitle="Create a new physical dining table with capacity" />
            <div style={sty.pageCard}>
              <form onSubmit={handleAddTableSubmit} style={{ width: '100%' }}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Table Number / ID</label>
                  <input
                    type="text"
                    value={addTableForm.id}
                    onChange={(e) => setAddTableForm({ ...addTableForm, id: e.target.value })}
                    placeholder="e.g. T-06"
                    required
                  />
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Recommended format: T-XX (e.g. T-06, T-07)</p>
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>Seating Capacity</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={addTableForm.seats}
                    onChange={(e) => setAddTableForm({ ...addTableForm, seats: parseInt(e.target.value) || 4 })}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>Assigned Waiter (Optional)</label>
                  <select
                    style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', backgroundSize: '14px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer' }}
                    value={addTableForm.waiter || ''}
                    onChange={(e) => setAddTableForm({ ...addTableForm, waiter: e.target.value })}
                  >
                    <option value="">Select Waiter...</option>
                    <option value="Arjun K.">Arjun K.</option>
                    <option value="Priya M.">Priya M.</option>
                    <option value="Rahul S.">Rahul S.</option>
                    <option value="Anita D.">Anita D.</option>
                    <option value="Vikram S.">Vikram S.</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => setActivePage(null)}>Cancel</button>
                  <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}>💾 Create Table</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      );
        </div>
      )}
    </>
  );
}
