import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useWallet } from '../../hooks/useWallet';
import { useAuth } from '../../hooks/useAuth';
import { useOrders } from '../../hooks/useOrders';
import './CheckoutPage.css';

export const CheckoutPage = () => {
  const { cart, totalPrice, clearCart, addToast } = useCart();
  const { balance, deduct } = useWallet();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [recipientName, setRecipientName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <span>🛒</span>
        <h3>Keranjang belanja Anda kosong</h3>
        <p>Silakan pilih produk terlebih dahulu sebelum melakukan checkout.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Belanja Sekarang
        </button>
      </div>
    );
  }

  const handlePay = (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      addToast('Alamat pengiriman harus diisi!', 'error');
      return;
    }

    if (totalPrice > balance) {
      addToast('Saldo dompet tidak mencukupi untuk melakukan pembayaran!', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const result = deduct(totalPrice, `Pembayaran pesanan checkout - Rp ${totalPrice.toLocaleString()}`);
      if (result.success) {
        createOrder(cart, totalPrice, shippingAddress, 'wallet');
        clearCart();
        addToast('Pembayaran berhasil! Pesanan Anda segera diproses.');
        navigate('/orders');
      } else {
        addToast(result.message, 'error');
        setIsProcessing(false);
      }
    }, 600);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h2>🛍️ Checkout Pesanan</h2>
        <p>Periksa rincian belanja dan konfirmasi pembayaran Anda.</p>
      </div>

      <div className="checkout-grid">
        {/* Form Details */}
        <div className="checkout-card form-section">
          <h3>📍 Informasi Pengiriman</h3>
          <form id="checkout-form" onSubmit={handlePay}>
            <div className="form-group">
              <label>Nama Penerima</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Nomor Telepon</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Alamat Lengkap</label>
              <textarea
                rows="3"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
              />
            </div>

            <div className="payment-method-box">
              <h4>Metode Pembayaran</h4>
              <div className="method-item active">
                <span className="method-icon">💰</span>
                <div className="method-meta">
                  <strong>ShopCart Pay (Saldo Wallet)</strong>
                  <span>Saldo Anda: Rp {balance.toLocaleString()}</span>
                </div>
                {totalPrice > balance && (
                  <span className="badge-insufficient">Saldo Kurang</span>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="checkout-card summary-section">
          <h3>Ringkasan Pesanan</h3>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.product.id} className="summary-item">
                <span className="summary-icon">{item.product.icon || '🛍️'}</span>
                <div className="summary-info">
                  <span className="summary-name">{item.product.name}</span>
                  <span className="summary-qty">{item.quantity} x Rp {item.product.price.toLocaleString()}</span>
                </div>
                <span className="summary-subtotal">
                  Rp {(item.quantity * item.product.price).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-calc">
            <div className="calc-row">
              <span>Subtotal Produk</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>
            <div className="calc-row">
              <span>Biaya Pengiriman</span>
              <span className="free-shipping">GRATIS</span>
            </div>
            <div className="calc-row total">
              <span>Total Pembayaran</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="btn-submit-pay"
            disabled={isProcessing || totalPrice > balance}
          >
            {isProcessing
              ? 'Memproses Pembayaran...'
              : totalPrice > balance
              ? 'Saldo Tidak Cukup (Top Up Dulu)'
              : `Bayar Sekarang (Rp ${totalPrice.toLocaleString()})`}
          </button>

          {totalPrice > balance && (
            <button
              type="button"
              className="btn-redirect-wallet"
              onClick={() => navigate('/wallet')}
            >
              Isi Saldo Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
