import React from 'react';
import { CartItem } from './CartItem';
import './ShoppingCart.css';

export const ShoppingCart = ({
  isOpen,
  onClose,
  cart,
  totalPrice,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  return (
    <>
      <div 
        className={`cart-backdrop ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`cart-sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h3>購物車 (Shopping Cart)</h3>
          <button 
            className="cart-close-btn" 
            onClick={onClose}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="cart-sidebar-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <span className="cart-empty-icon">🛒</span>
              <p>您的購物車是空的</p>
              <p className="cart-empty-sub">Your cart is empty</p>
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
              <span>總計 (Total):</span>
              <span className="cart-total-price">NT$ {totalPrice.toLocaleString()}</span>
            </div>
            <button 
              className="cart-checkout-btn" 
              onClick={onCheckout}
              disabled={cart.length === 0}
            >
              結帳 (Checkout)
            </button>
          </div>
        )}
      </div>
    </>
  );
};
