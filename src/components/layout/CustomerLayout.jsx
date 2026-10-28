import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useWallet } from '../../hooks/useWallet';
import { useAuth } from '../../hooks/useAuth';
import { ShoppingCart } from '../ShoppingCart/ShoppingCart';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
import { Notification } from '../Notification/Notification';
import { useOrders } from '../../hooks/useOrders';
import './CustomerLayout.css';

export const CustomerLayout = () => {
  const navigate = useNavigate();
  const {
    cart, toasts, removeFromCart, updateQuantity, clearCart,
    totalQuantity, totalPrice, addToast, removeToast
  } = useCart();
  const { balance, deduct } = useWallet();
  const { user } = useAuth();
  const { createOrder } = useOrders();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false, title: '', message: '', confirmText: '', cancelText: '',
    onConfirm: () => {}, onCancel: () => {}
  });

  const closeDialog = () => setDialogConfig((prev) => ({ ...prev, isOpen: false }));

  const handleRemoveItemClick = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;
    setDialogConfig({
      isOpen: true,
      title: 'Hapus Produk',
      message: `Yakin ingin menghapus "${item.product.name}" dari keranjang?`,
      confirmText: 'Hapus',
      cancelText: 'Batal',
      onConfirm: () => { removeFromCart(productId); closeDialog(); addToast('Produk dihapus dari keranjang'); },
      onCancel: closeDialog
    });
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    if (totalPrice > balance) {
      addToast('Saldo tidak mencukupi! Silakan top-up terlebih dahulu.', 'error');
      return;
    }
    setDialogConfig({
      isOpen: true,
      title: 'Konfirmasi Checkout',
      message: `Total: Rp ${totalPrice.toLocaleString()}. Saldo wallet: Rp ${balance.toLocaleString()}. Lanjutkan checkout?`,
      confirmText: 'Bayar Sekarang',
      cancelText: 'Batal',
      onConfirm: () => {
        const result = deduct(totalPrice, `Pembayaran pesanan - Rp ${totalPrice.toLocaleString()}`);
        if (result.success) {
          createOrder(cart, totalPrice, user.address, 'wallet');
          clearCart();
          setIsCartOpen(false);
          closeDialog();
          addToast('Checkout berhasil! Pesanan telah dibuat.');
          navigate('/orders');
        } else {
          closeDialog();
          addToast(result.message, 'error');
        }
      },
      onCancel: closeDialog
    });
  };

  const navLinks = [
    { to: '/', label: 'Beranda', icon: '🏠' },
    { to: '/wishlist', label: 'Wishlist', icon: '❤️' },
    { to: '/orders', label: 'Pesanan', icon: '📦' },
    { to: '/wallet', label: 'Wallet', icon: '💰' },
    { to: '/profile', label: 'Profil', icon: '👤' },
  ];

  return (
    <div className="customer-layout">
      <header className="customer-header">
        <div className="customer-header-content">
          <NavLink to="/" className="brand-section" onClick={() => setMobileMenuOpen(false)}>
            <span className="brand-logo" role="img" aria-label="store-logo">🛍️</span>
            <h1>ShopCart</h1>
          </NavLink>

          <nav className={`customer-nav ${mobileMenuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-label">{link.label}</span>
              </NavLink>
            ))}
            <NavLink
              to="/admin"
              className="nav-link nav-link-admin"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="nav-icon">⚙️</span>
              <span className="nav-label">Admin</span>
            </NavLink>
          </nav>

          <div className="header-actions">
            <div className="wallet-badge-header">
              <span>💰</span>
              <span className="wallet-amount">Rp {balance.toLocaleString()}</span>
            </div>
            <button
              className="cart-trigger-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping cart. ${totalQuantity} items in cart.`}
            >
              <span>🛒</span>
              <span className="cart-badge">{totalQuantity}</span>
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      <main className="customer-main">
        <Outlet />
      </main>

      <footer className="customer-footer">
        <p>&copy; 2026 ShopCart. All rights reserved. Frontend-Only Simulation.</p>
      </footer>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        walletBalance={balance}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={handleRemoveItemClick}
        onCheckout={handleCheckoutClick}
      />

      <ConfirmationDialog
        isOpen={dialogConfig.isOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        confirmText={dialogConfig.confirmText}
        cancelText={dialogConfig.cancelText}
        onConfirm={dialogConfig.onConfirm}
        onCancel={dialogConfig.onCancel}
      />

      <Notification toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
