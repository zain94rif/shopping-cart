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
          <span className="cart-item-price">NT$ {product.price.toLocaleString()}</span>
          <span className="cart-item-subtotal">小計: NT$ {subtotal.toLocaleString()}</span>
        </div>
        <div className="cart-item-controls">
          <div className="quantity-controls">
            <button
              className="qty-btn"
              onClick={() => onUpdateQuantity(product.id, -1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="qty-display">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => onUpdateQuantity(product.id, 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            className="remove-item-btn"
            onClick={() => onRemove(product.id)}
            aria-label={`Remove ${product.name} from cart`}
          >
            🗑️ 移除
          </button>
        </div>
      </div>
    </div>
  );
};
