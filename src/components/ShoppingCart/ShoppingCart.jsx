import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './CartItem';
import './ShoppingCart.css';

export const ShoppingCart = ({
  isOpen,
  onClose,
  cart,
  totalPrice,
  walletBalance,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div 
        className={`cart-backdrop ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`cart-sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h3>Keranjang Belanja</h3>
          <button 
            className="cart-close-btn" 
            onClick={onClose}
            aria-label="Tutup keranjang"
          >
            &times;
          </button>
        </div>

        <div className="cart-sidebar-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <span className="cart-empty-icon">🛒</span>
              <p>Keranjang Anda masih kosong</p>
              <p className="cart-empty-sub">Silakan tambahkan produk favorit Anda</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-total-section">
              <span>Total Tagihan:</span>
              <span className="cart-total-price">Rp {totalPrice.toLocaleString()}</span>
            </div>
            {walletBalance !== undefined && (
              <div className="cart-wallet-info">
                <span>Saldo Wallet:</span>
                <span className={walletBalance < totalPrice ? 'insufficient-balance' : 'sufficient-balance'}>
                  Rp {walletBalance.toLocaleString()}
                </span>
              </div>
            )}
            <div className="cart-actions-column">
              <button 
                className="cart-checkout-btn" 
                onClick={handleGoToCheckout}
                disabled={cart.length === 0}
              >
                Halaman Checkout ➔
              </button>
              <button 
                className="cart-quickpay-btn" 
                onClick={onCheckout}
                disabled={cart.length === 0}
              >
                ⚡ Pembayaran Instan
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
