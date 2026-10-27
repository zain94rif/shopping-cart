import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Notification } from '../Notification/Notification';
import { useCart } from '../../hooks/useCart';
import './AdminLayout.css';

export const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toasts, removeToast } = useCart();

  const navLinks = [
    { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
    { to: '/admin/products', label: 'Produk', icon: '📦' },
    { to: '/admin/orders', label: 'Pesanan', icon: '📋' },
    { to: '/admin/customers', label: 'Pelanggan', icon: '👥' },
  ];

  return (
    <div className={`admin-layout ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <NavLink to="/" className="admin-brand">
            <span className="admin-brand-icon">🛍️</span>
            {!sidebarCollapsed && <span className="admin-brand-text">ShopCart Admin</span>}
          </NavLink>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="admin-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">{link.icon}</span>
              {!sidebarCollapsed && <span className="admin-nav-label">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <NavLink to="/" className="admin-nav-link back-to-store">
            <span className="admin-nav-icon">🏪</span>
            {!sidebarCollapsed && <span className="admin-nav-label">Kembali ke Toko</span>}
          </NavLink>
        </div>
      </aside>

      <div className="admin-content-wrapper">
        <header className="admin-topbar">
          <h2 className="admin-topbar-title">Admin Panel</h2>
          <div className="admin-topbar-actions">
            <span className="admin-avatar">👨‍💼</span>
          </div>
        </header>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>

      <Notification toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
