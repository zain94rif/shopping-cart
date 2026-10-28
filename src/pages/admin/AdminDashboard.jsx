import React from 'react';
import { useOrders } from '../../hooks/useOrders';
import { products } from '../../data/products';
import { useWallet } from '../../hooks/useWallet';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const { orders, totalRevenue, orderStats } = useOrders();
  const { balance } = useWallet();

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="admin-dashboard-page">
      <div className="dashboard-header">
        <div>
          <h2>📊 Ringkasan Dashboard</h2>
          <p>Pantau performa penjualan, pesanan, dan status operasional toko.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="stats-cards-grid">
        <div className="stat-card">
          <div className="stat-icon revenue-icon">💰</div>
          <div className="stat-data">
            <span className="stat-label">Total Pendapatan</span>
            <h3 className="stat-value">Rp {totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders-icon">📦</div>
          <div className="stat-data">
            <span className="stat-label">Total Pesanan</span>
            <h3 className="stat-value">{orderStats.total} Pesanan</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products-icon">🛍️</div>
          <div className="stat-data">
            <span className="stat-label">Total Produk Aktif</span>
            <h3 className="stat-value">{products.length} Item</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending-icon">⏳</div>
          <div className="stat-data">
            <span className="stat-label">Pesanan Perlu Diproses</span>
            <h3 className="stat-value">{orderStats.pending} Pesanan</h3>
          </div>
        </div>
      </div>

      {/* Status Breakdown & Details */}
      <div className="dashboard-split">
        <div className="panel recent-orders-panel">
          <div className="panel-header">
            <h3>Pesanan Terbaru</h3>
          </div>
          {recentOrders.length === 0 ? (
            <div className="empty-panel">Belum ada pesanan yang masuk.</div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID Pesanan</th>
                    <th>Item</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((ord) => (
                    <tr key={ord.id}>
                      <td className="font-mono">{ord.id}</td>
                      <td>{ord.items.length} produk</td>
                      <td>Rp {ord.totalPrice.toLocaleString()}</td>
                      <td>
                        <span className={`status-pill ${ord.status.toLowerCase()}`}>
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="panel status-breakdown-panel">
          <div className="panel-header">
            <h3>Status Distribusi Pesanan</h3>
          </div>
          <div className="status-bars">
            <div className="status-row">
              <div className="status-label-group">
                <span>Pending</span>
                <strong>{orderStats.pending}</strong>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill pending"
                  style={{ width: `${orderStats.total ? (orderStats.pending / orderStats.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="status-row">
              <div className="status-label-group">
                <span>Processing</span>
                <strong>{orderStats.processing}</strong>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill processing"
                  style={{ width: `${orderStats.total ? (orderStats.processing / orderStats.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="status-row">
              <div className="status-label-group">
                <span>Shipped</span>
                <strong>{orderStats.shipped}</strong>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill shipped"
                  style={{ width: `${orderStats.total ? (orderStats.shipped / orderStats.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="status-row">
              <div className="status-label-group">
                <span>Delivered</span>
                <strong>{orderStats.delivered}</strong>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill delivered"
                  style={{ width: `${orderStats.total ? (orderStats.delivered / orderStats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
