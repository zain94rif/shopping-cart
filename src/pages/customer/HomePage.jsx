import React, { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, categories, getCategoryMeta } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import './HomePage.css';

export const HomePage = () => {
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isPending, startTransition] = useTransition();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.nameZh.includes(searchQuery);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (value) => {
    startTransition(() => setSearchQuery(value));
  };

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h2 className="hero-title">Temukan Produk <span className="hero-highlight">Terbaik</span></h2>
          <p className="hero-subtitle">Belanja gadget & aksesoris premium dengan harga terjangkau</p>
        </div>
        <div className="hero-deco">🛒✨🎉</div>
      </section>

      {/* Search & Filter */}
      <section className="filter-section">
        <div className="search-container">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search products"
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => handleSearchChange('')} aria-label="Clear search">
                &times;
              </button>
            )}
          </div>
        </div>

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? '🏷️ Semua' : cat}
            </button>
          ))}
        </div>
      </section>

      {isPending && <p className="loading-text">Memfilter produk...</p>}

      {/* Product Grid */}
      <section className="products-section">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <span className="no-products-icon">🔍</span>
            <h3>Produk tidak ditemukan</h3>
            <p>Coba kata kunci atau kategori lain</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const { gradient } = getCategoryMeta(product.category);
              const inCart = isInCart(product.id);
              const inWishlist = isInWishlist(product.id);

              return (
                <div className="product-card" key={product.id}>
                  <div className="product-image-wrapper" style={{ background: gradient }}
                       onClick={() => navigate(`/product/${product.id}`)}
                       role="button" tabIndex={0} aria-label={`View ${product.name}`}
                  >
                    <span className="product-image-icon">{product.icon}</span>
                    {product.stock <= 5 && (
                      <span className="stock-badge low">Stok Terbatas</span>
                    )}
                    <button
                      className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      {inWishlist ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h4 className="product-title" onClick={() => navigate(`/product/${product.id}`)}
                        role="button" tabIndex={0}
                    >
                      {product.name}
                    </h4>
                    <div className="product-rating">
                      {'⭐'.repeat(Math.floor(product.rating))}
                      <span className="rating-number">{product.rating}</span>
                    </div>
                    <div className="product-footer">
                      <span className="product-price">Rp {product.price.toLocaleString()}</span>
                      <button
                        className={`add-to-cart-btn ${inCart ? 'in-cart' : ''}`}
                        onClick={() => addToCart(product)}
                      >
                        {inCart ? '✓ Di Keranjang' : '+ Keranjang'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
