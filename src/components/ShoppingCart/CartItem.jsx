import React from 'react';
import './CartItem.css';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h5 className="cart-item-name">{product.name}</h5>
        <div className="cart-item-meta">
          <span className="cart-item-price">Rp {product.price.toLocaleString()}</span>
          <span className="cart-item-subtotal">Subtotal: Rp {subtotal.toLocaleString()}</span>
        </div>
        <div className="cart-item-controls">
          <div className="quantity-controls">
            <button
              className="qty-btn"
              onClick={() => onUpdateQuantity(product.id, -1)}
              disabled={quantity <= 1}
              aria-label="Kurangi kuantitas"
            >
              -
            </button>
            <span className="qty-display">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => onUpdateQuantity(product.id, 1)}
              aria-label="Tambah kuantitas"
            >
              +
            </button>
          </div>
          <button
            className="remove-item-btn"
            onClick={() => onRemove(product.id)}
            aria-label={`Hapus ${product.name} dari keranjang`}
          >
            🗑️ Hapus
          </button>
        </div>
      </div>
    </div>
  );
};
