import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';
import './OrderHistoryPage.css';

export const OrderHistoryPage = () => {
  const { orders } = useOrders();

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <span className="status-tag tag-delivered">Selesai (Delivered)</span>;
      case 'shipped':
        return <span className="status-tag tag-shipped">Dikirim (Shipped)</span>;
      case 'processing':
        return <span className="status-tag tag-processing">Diproses (Processing)</span>;
      case 'cancelled':
        return <span className="status-tag tag-cancelled">Dibatalkan (Cancelled)</span>;
      default:
        return <span className="status-tag tag-pending">Menunggu (Pending)</span>;
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>📦 Riwayat Pesanan</h2>
        <p>Lihat status dan riwayat semua transaksi belanja Anda.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <span className="empty-icon">🛒</span>
          <h3>Belum ada pesanan</h3>
          <p>Anda belum pernah melakukan pemesanan. Mulai berbelanja sekarang!</p>
          <Link to="/" className="btn-explore">Mulai Belanja</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div className="order-meta">
                  <span className="order-id">ID: {order.id}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </span>
                </div>
                <div className="order-status-wrapper">
                  {getStatusBadge(order.status)}
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item-row">
                      <span className="item-icon">{item.icon || '🛍️'}</span>
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-sub">
                          {item.quantity} x Rp {item.price.toLocaleString()}
                        </span>
                      </div>
                      <span className="item-total">
                        Rp {item.subtotal.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-shipping-info">
                  <strong>📍 Alamat Pengiriman:</strong>
                  <p>{order.shippingAddress || 'Alamat default pelanggan'}</p>
                </div>
              </div>

              <div className="order-card-footer">
                <div className="payment-info">
                  Metode: <span className="badge-pay">ShopCart Wallet 💰</span>
                </div>
                <div className="total-amount">
                  <span>Total Pembayaran:</span>
                  <h4>Rp {order.totalPrice.toLocaleString()}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
