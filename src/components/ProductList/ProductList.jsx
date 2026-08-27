import React from 'react';
import { ProductCard } from './ProductCard';
import './ProductList.css';

export const ProductList = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <span className="no-products-icon">🔍</span>
        <h3>找不到商品 (No products found)</h3>
        <p>請嘗試其他搜尋關鍵字</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
