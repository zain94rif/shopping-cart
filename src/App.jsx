import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { OrderProvider } from './context/OrderContext';

// Customer Layout & Pages
import { CustomerLayout } from './components/layout/CustomerLayout';
import { HomePage } from './pages/customer/HomePage';
import { ProductDetailPage } from './pages/customer/ProductDetailPage';
import { WalletPage } from './pages/customer/WalletPage';
import { WishlistPage } from './pages/customer/WishlistPage';
import { OrderHistoryPage } from './pages/customer/OrderHistoryPage';
import { ProfilePage } from './pages/customer/ProfilePage';
import { CheckoutPage } from './pages/customer/CheckoutPage';

// Admin Layout & Pages
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WalletProvider>
          <OrderProvider>
            <CartProvider>
              <Routes>
                {/* Customer Storefront Routes */}
                <Route path="/" element={<CustomerLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="product/:id" element={<ProductDetailPage />} />
                  <Route path="wallet" element={<WalletPage />} />
                  <Route path="wishlist" element={<WishlistPage />} />
                  <Route path="orders" element={<OrderHistoryPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                </Route>

                {/* Admin Dashboard Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminCustomers />} />
                </Route>

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </CartProvider>
          </OrderProvider>
        </WalletProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
