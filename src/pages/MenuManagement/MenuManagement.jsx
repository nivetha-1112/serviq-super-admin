import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppContext';
import PageHeader from '../../components/PageHeader';
import { PencilIcon, TrashIcon } from '../../components/Icons';

export default function MenuManagement() {
  const { activeRestaurant, updateMenuItem, addMenuItem, addToast } = useAppState();

  const [menuCategory, setMenuCategory] = useState('All Items');
  const [menuSearch, setMenuSearch] = useState('');
  const [menuSort, setMenuSort] = useState('name');

  const [activePage, setActivePage] = useState(null);
  const [menuForm, setMenuForm] = useState({ id: null, name: '', desc: '', price: '', category: 'Starters', image: '', veg: true, available: true });

  if (!activeRestaurant) return null;

  const { menu = [] } = activeRestaurant;

  const handleMenuSubmit = (e) => {
    e.preventDefault();
    if (menuForm.id) {
      updateMenuItem(activeRestaurant.id, {
        ...menuForm,
        price: parseFloat(menuForm.price) || 0
      });
      addToast('Menu Item Updated Successfully');
    } else {
      addMenuItem(activeRestaurant.id, {
        id: 'menu-' + Date.now(),
        name: menuForm.name,
        desc: menuForm.desc,
        price: parseFloat(menuForm.price) || 0,
        category: menuForm.category,
        image: menuForm.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
        available: true
      });
      addToast('Menu Item Created Successfully');
    }
    setActivePage(null);
  };

  const openAddMenuModal = () => {
    setMenuForm({ id: null, name: '', desc: '', price: '', category: 'Starters', image: '', veg: true, available: true });
    setActivePage('menu-form');
  };

  const openEditMenuModal = (item) => {
    setMenuForm({ ...item });
    setActivePage('menu-form');
  };

  const handleDeleteMenu = (itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      const updatedMenu = activeRestaurant.menu.filter(m => m.id !== itemId);
      activeRestaurant.menu = updatedMenu;
      // Note: Ideally call context action like deleteMenuItem
      addToast('Menu Item Deleted Successfully');
    }
  };

  const renderMenu = () => {
    // Unique categories from current menu items
    const categoriesList = ['All Items', 'Starters', 'Rice Meals', 'Tiffin', 'Rotis', 'Desserts', 'Drinks'];

    let filteredMenu = menu;
    if (menuCategory !== 'All Items') {
      filteredMenu = filteredMenu.filter(item => item.category === menuCategory);
    }
    if (menuSearch) {
      filteredMenu = filteredMenu.filter(item => item.name.toLowerCase().includes(menuSearch.toLowerCase()));
    }

    // Sort
    filteredMenu = [...filteredMenu].sort((a, b) => {
      if (menuSort === 'name') return a.name.localeCompare(b.name);
      if (menuSort === 'price-asc') return a.price - b.price;
      if (menuSort === 'price-desc') return b.price - a.price;
      return 0;
    });

    return (
      <section className="panel-view active">
        {/* Title flex box */}
        <div className="panel-header-flex" style={{ marginBottom: '24px', alignItems: 'flex-start' }}>
          <div className="panel-title-desc">
            <h2 className="panel-inner-title" style={{ fontSize: '26px', fontWeight: 800 }}>Menus list</h2>
            <p className="panel-inner-desc" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff7a00', display: 'inline-block' }}></span>
              {menu.length} items actively listed
            </p>
          </div>
          <button
            className="btn btn-black"
            onClick={openAddMenuModal}
            style={{
              background: 'var(--orange-gradient)',
              borderColor: '#ff7a00',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700
            }}
          >
            ➕ Add New Item
          </button>
        </div>

        {/* Categories Horizontal Pills */}
        <div className="menu-categories-horizontal-pills">
          {categoriesList.map(cat => {
            const displayName = cat === 'All Items' ? 'All' : cat;
            const isActive = menuCategory === cat;
            return (
              <button
                key={cat}
                className={`menu-category-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => setMenuCategory(cat)}
              >
                {displayName}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Filters */}
        <div className="menu-search-sort-row" style={{ justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sort by</span>
            <select
              value={menuSort}
              onChange={(e) => setMenuSort(e.target.value)}
              style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-main)' }}
            >
              <option value="name">Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 3-Column Premium Card Grid */}
        <div className="menu-items-grid-premium">
          {filteredMenu.map(item => {
            // Determine bestseller / popular / trending tag labels
            const getTagLabel = (menuItem) => {
              if (menuItem.bestseller) return { text: 'BESTSELLER', type: 'bestseller' };
              if (menuItem.price < 50) return { text: 'POPULAR', type: 'popular' };
              return { text: 'TRENDING', type: 'trending' };
            };
            const tag = getTagLabel(item);

            // Mock update time based on price or ID length
            const getUpdateTime = (menuItem) => {
              const lastDigit = menuItem.id.slice(-1);
              if (['1', '3', '5'].includes(lastDigit)) return 'Updated 2h ago';
              if (['0', '2', '4'].includes(lastDigit)) return 'Updated 5h ago';
              return 'Updated 1d ago';
            };
            const updateTime = getUpdateTime(item);

            return (
              <div key={item.id} className="menu-item-card-exact">
                {/* Dish Cover Image */}
                <div className="menu-item-card-image-box">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-item-card-img-tag"
                    />
                  ) : (
                    <div className="menu-item-card-img-fallback">🍴</div>
                  )}

                  {/* Gradient bottom shadow overlay */}
                  <div className="menu-item-card-img-overlay"></div>

                  {/* Floating Price tag */}
                  <span className="menu-item-card-price-float">₹{item.price}</span>

                  {/* Veg / Non-Veg Badge */}
                  <div className="menu-item-card-veg-badge-wrapper">
                    <span className={`menu-item-card-veg-badge ${item.veg ? 'veg' : 'non-veg'}`}>
                      <span className="veg-badge-dot"></span>
                      {item.veg ? 'VEG' : 'NON-VEG'}
                    </span>
                  </div>

                  {/* Floating Edit & Delete circular actions */}
                  <div className="menu-item-card-actions-floating">
                    <button
                      className="menu-item-card-action-btn-circle btn-edit"
                      title="Edit"
                      onClick={() => openEditMenuModal(item)}
                    >
                      <PencilIcon size={14} />
                    </button>
                    <button
                      className="menu-item-card-action-btn-circle btn-delete"
                      title="Delete"
                      onClick={() => handleDeleteMenu(item.id)}
                    >
                      <TrashIcon size={14} />
                    </button>
                  </div>
                </div>

                {/* Content Box */}
                <div className="menu-item-card-content-box">
                  <span className="menu-item-card-cat-label">{item.category}</span>
                  <h3 className="menu-item-card-title-exact">{item.name}</h3>
                  <p className="menu-item-card-desc-exact">
                    {item.desc || 'No description provided.'}
                  </p>

                  <div className="menu-item-card-divider"></div>

                  <div className="menu-item-card-footer-row">
                    <span className="menu-item-card-update-time">{updateTime}</span>
                    <span className={`menu-item-card-tag-badge tag-${tag.type}`}>
                      {tag.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredMenu.length === 0 && (
            <div className="menu-items-empty">
              No menu dishes found.
            </div>
          )}
        </div>
      </section>
    );
  };
  return (
    <>
      {(!activePage) && renderMenu()}
      {activePage === 'menu-form' && (
        <div style={{ marginTop: '20px' }}>

          <section>
            <div style={{ width: '100%' }}>
              <PageHeader subtitle={menuForm.id ? 'Modify menu item details' : 'Create a new dish for the menu'} />
              <div style={sty.pageCard}>
                <form onSubmit={handleMenuSubmit} style={{ width: '100%' }}>
                  {/* Hidden File Input */}
                  <input
                    id="menu-item-image-file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setMenuForm({ ...menuForm, image: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ display: 'none' }}
                  />

                  <div className="menu-form-grid">
                    {/* Left Column: Image Uploader */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Item Image</label>
                      <div
                        className="menu-item-image-uploader"
                        onClick={() => document.getElementById('menu-item-image-file').click()}
                      >
                        {menuForm.image ? (
                          <>
                            <img src={menuForm.image} alt={menuForm.name || 'Dish preview'} />
                            <div className="menu-item-image-uploader-overlay">
                              📷 Change Photo
                            </div>
                          </>
                        ) : (
                          <div className="menu-item-image-uploader-placeholder">
                            <span className="icon">🍳</span>
                            <span className="text">Upload Dish Photo</span>
                            <span className="subtext">Supports JPG, JPEG, PNG, GIF</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Form Fields */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Item Name</label>
                          <input
                            type="text"
                            value={menuForm.name}
                            onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                            required
                            placeholder="e.g. Chicken Biryani"
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Category</label>
                            <select
                              value={menuForm.category}
                              onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                              required
                            >
                              <option value="Starters">Starters</option>
                              <option value="Rice Meals">Rice Meals</option>
                              <option value="Tiffin">Tiffin</option>
                              <option value="Rotis">Rotis</option>
                              <option value="Desserts">Desserts</option>
                              <option value="Drinks">Drinks</option>
                            </select>
                          </div>

                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Price (₹)</label>
                            <input
                              type="number"
                              value={menuForm.price}
                              onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                              required
                              placeholder="320"
                            />
                          </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>Description</label>
                          <textarea
                            rows="4"
                            value={menuForm.desc}
                            onChange={(e) => setMenuForm({ ...menuForm, desc: e.target.value })}
                            placeholder="Provide a delicious description of this menu item..."
                            style={{ resize: 'none' }}
                          ></textarea>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                        <button type="button" className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => setActivePage(null)}>Cancel</button>
                        <button type="submit" className="btn btn-black" style={{ padding: '10px 24px' }}> Save Changes</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>


        </div>
      )}
    </>
  );
}
