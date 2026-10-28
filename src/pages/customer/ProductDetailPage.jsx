import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, getCategoryMeta } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useAuth();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="page-empty">
        <span>❌</span>
        <h3>Produk tidak ditemukan</h3>
        <button className="btn-primary" onClick={() => navigate('/')}>Kembali ke Beranda</button>
      </div>
    );
  }

  const { gradient } = getCategoryMeta(product.category);
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  // Suggest related products
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Kembali</button>

      <div className="detail-grid">
        <div className="detail-image" style={{ background: gradient }}>
          <span className="detail-icon">{product.icon}</span>
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h2 className="detail-name">{product.name}</h2>
          <p className="detail-name-zh">{product.nameZh}</p>

          <div className="detail-rating">
            {'⭐'.repeat(Math.floor(product.rating))}
            <span>{product.rating} / 5.0</span>
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-stock">
            <span className={`stock-indicator ${product.stock <= 5 ? 'low' : 'ok'}`}>
              {product.stock <= 5 ? '⚠️' : '✅'}
            </span>
            <span>Stok: {product.stock} unit tersedia</span>
          </div>

          <div className="detail-price-section">
            <span className="detail-price">Rp {product.price.toLocaleString()}</span>
          </div>

          <div className="detail-actions">
            <button
              className={`btn-primary detail-cart-btn ${inCart ? 'in-cart' : ''}`}
              onClick={() => addToCart(product)}
            >
              {inCart ? '✓ Sudah di Keranjang' : '🛒 Tambah ke Keranjang'}
            </button>
            <button
              className={`btn-outline detail-wish-btn ${inWishlist ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              {inWishlist ? '❤️ Di Wishlist' : '🤍 Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section">
          <h3>Produk Terkait</h3>
          <div className="related-grid">
            {related.map((p) => {
              const meta = getCategoryMeta(p.category);
              return (
                <div
                  key={p.id}
                  className="related-card"
                  onClick={() => navigate(`/product/${p.id}`)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="related-image" style={{ background: meta.gradient }}>
                    <span>{p.icon}</span>
                  </div>
                  <div className="related-info">
                    <h4>{p.name}</h4>
                    <span className="related-price">Rp {p.price.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
