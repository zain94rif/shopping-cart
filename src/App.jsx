import React, { useState, useTransition } from 'react';
import './App.css';
import { CartProvider } from './context/CartContext';
import { useCart } from './hooks/useCart';
import { products } from './data/products';
import { SearchBox } from './components/SearchBox/SearchBox';
import { ProductList } from './components/ProductList/ProductList';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import { ConfirmationDialog } from './components/ConfirmationDialog/ConfirmationDialog';
import { Notification } from './components/Notification/Notification';

function CartApp() {
  const {
    cart,
    toasts,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalQuantity,
    totalPrice,
    addToast,
    removeToast
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    onCancel: () => {}
  });

  // Derived filtered products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Search Input with useTransition for performance
  const handleSearchChange = (value) => {
    startTransition(() => {
      setSearchQuery(value);
    });
  };

  const closeDialog = () => {
    setDialogConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Open dialog for item removal confirmation
  const handleRemoveItemClick = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;

    setDialogConfig({
      isOpen: true,
      title: '確認移除商品 (Remove Product)',
      message: `您確定要將 "${item.product.name}" 從購物車中移除嗎？ (Are you sure you want to remove this item?)`,
      confirmText: '確認移除 (Remove)',
      cancelText: '取消 (Cancel)',
      onConfirm: () => {
        removeFromCart(productId);
        closeDialog();
        addToast('Product removed from cart');
      },
      onCancel: closeDialog
    });
  };

  // Open dialog for checkout confirmation
  const handleCheckoutClick = () => {
    if (cart.length === 0) return;

    setDialogConfig({
      isOpen: true,
      title: '確認結帳 (Confirm Checkout)',
      message: `總金額為 NT$ ${totalPrice.toLocaleString()}。確認要結帳嗎？ (Are you sure you want to checkout?)`,
      confirmText: '確認 (Confirm)',
      cancelText: '取消 (Cancel)',
      onConfirm: () => {
        clearCart();
        setIsCartOpen(false);
        closeDialog();
        addToast('Checkout successful');
      },
      onCancel: closeDialog
    });
  };

  return (
    <div className="app-container">
      {/* Header section */}
      <header className="header">
        <div className="header-content">
          <div className="brand-section">
            <span className="brand-logo" role="img" aria-label="store-logo">🛍️</span>
            <h1>精品商店 (Elite Shop)</h1>
          </div>
          <button 
            className="cart-trigger-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open shopping cart. ${totalQuantity} items in cart.`}
          >
            <span>🛒 購物車</span>
            <span className="cart-badge">{totalQuantity}</span>
          </button>
        </div>
      </header>

      {/* Main shopping grid */}
      <main className="main-content">
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {isPending && <p style={{ textAlign: 'center', color: '#ff6b6b', marginBottom: '20px' }}>篩選中...</p>}
        <ProductList 
          products={filteredProducts} 
          onAddToCart={(product) => {
            const { addToCart } = useCart(); // fetch dynamic
          }}
          // wait, let's pass down useCart direct call from our hook
        />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 精品商店. All rights reserved. Frontend-Only Simulation.</p>
      </footer>

      {/* Sidebar Shopping Cart */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={handleRemoveItemClick}
        onCheckout={handleCheckoutClick}
      />

      {/* Confirmation Dialog Modal */}
      <ConfirmationDialog
        isOpen={dialogConfig.isOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        confirmText={dialogConfig.confirmText}
        cancelText={dialogConfig.cancelText}
        onConfirm={dialogConfig.onConfirm}
        onCancel={dialogConfig.onCancel}
      />

      {/* Toast Notification Container */}
      <Notification toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

// Wrap in provider
export default function App() {
  return (
    <CartProvider>
      <CartAppWrapper />
    </CartProvider>
  );
}

// Inner helper to avoid useCart hook context error inside App
function CartAppWrapper() {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    cart,
    toasts,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalQuantity,
    totalPrice,
    addToast,
    removeToast
  } = useCart();

  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    onCancel: () => {}
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (value) => {
    startTransition(() => {
      setSearchQuery(value);
    });
  };

  const closeDialog = () => {
    setDialogConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleRemoveItemClick = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;

    setDialogConfig({
      isOpen: true,
      title: '確認移除商品 (Remove Product)',
      message: `您確定要將 "${item.product.name}" 從購物車中移除嗎？ (Are you sure you want to remove this item?)`,
      confirmText: '確認移除 (Remove)',
      cancelText: '取消 (Cancel)',
      onConfirm: () => {
        removeFromCart(productId);
        closeDialog();
        addToast('Product removed from cart');
      },
      onCancel: closeDialog
    });
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;

    setDialogConfig({
      isOpen: true,
      title: '確認結帳 (Confirm Checkout)',
      message: `總金額為 NT$ ${totalPrice.toLocaleString()}。確認要結帳嗎？ (Are you sure you want to checkout?)`,
      confirmText: '確認 (Confirm)',
      cancelText: '取消 (Cancel)',
      onConfirm: () => {
        clearCart();
        setIsCartOpen(false);
        closeDialog();
        addToast('Checkout successful');
      },
      onCancel: closeDialog
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="brand-section">
            <span className="brand-logo" role="img" aria-label="store-logo">🛍️</span>
            <h1>精品商店 (Elite Shop)</h1>
          </div>
          <button 
            className="cart-trigger-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open shopping cart. ${totalQuantity} items in cart.`}
          >
            <span>🛒 購物車</span>
            <span className="cart-badge">{totalQuantity}</span>
          </button>
        </div>
      </header>

      <main className="main-content">
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {isPending && <p style={{ textAlign: 'center', color: '#ff6b6b', marginBottom: '20px' }}>篩選中...</p>}
        <ProductList 
          products={filteredProducts} 
          onAddToCart={addToCart}
        />
      </main>

      <footer className="footer">
        <p>&copy; 2026 精品商店. All rights reserved. Frontend-Only Simulation.</p>
      </footer>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={handleRemoveItemClick}
        onCheckout={handleCheckoutClick}
      />

      <ConfirmationDialog
        isOpen={dialogConfig.isOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        confirmText={dialogConfig.confirmText}
        cancelText={dialogConfig.cancelText}
        onConfirm={dialogConfig.onConfirm}
        onCancel={dialogConfig.onCancel}
      />

      <Notification toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
