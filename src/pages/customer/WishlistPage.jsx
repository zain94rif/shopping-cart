import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { products, getCategoryMeta } from '../../data/products';
import './WishlistPage.css';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useAuth();
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h2>❤️ Wishlist Saya</h2>
        <p>Daftar produk impian yang Anda simpan untuk dibeli nanti.</p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="empty-wishlist">
          <span className="empty-icon">💔</span>
          <h3>Wishlist masih kosong</h3>
          <p>Jelajahi produk kami dan klik ikon hati untuk menyimpannya di sini.</p>
          <Link to="/" className="btn-explore">Jelajahi Produk</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistProducts.map((product) => {
            const { gradient } = getCategoryMeta(product.category);
            const inCart = isInCart(product.id);

            return (
              <div key={product.id} className="wishlist-card">
                <button
                  className="remove-wish-btn"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Hapus dari wishlist"
                >
                  ✕
                </button>

                <div
                  className="wishlist-img-box"
                  style={{ background: gradient }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <span className="wishlist-icon">{product.icon}</span>
                </div>

                <div className="wishlist-details">
                  <span className="wishlist-category">{product.category}</span>
                  <h4
                    className="wishlist-title"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h4>
                  <div className="wishlist-price">
                    Rp {product.price.toLocaleString()}
                  </div>

                  <div className="wishlist-actions">
                    <button
                      className={`btn-add-cart ${inCart ? 'in-cart' : ''}`}
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
    </div>
  );
};
