import React from 'react';
import './ProductCard.css';

const getCategoryMeta = (category) => {
  switch (category) {
    case 'Audio':
      return { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '🎧' };
    case 'Wearables':
      return { gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)', icon: '⌚' };
    default:
      return { gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '💻' };
  }
};

export const ProductCard = ({ product, onAddToCart }) => {
  const { gradient, icon } = getCategoryMeta(product.category);

  return (
    <div className="product-card">
      <div className="product-image-wrapper" style={{ background: gradient }}>
        <span className="product-image-icon" role="img" aria-label={product.category}>
          {icon}
        </span>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h4 className="product-title">{product.name}</h4>
        <div className="product-footer">
          <span className="product-price">NT$ {product.price.toLocaleString()}</span>
          <button 
            className="add-to-cart-btn" 
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
};
