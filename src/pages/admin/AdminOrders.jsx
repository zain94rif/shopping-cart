import React, { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { useCart } from '../../hooks/useCart';
import './AdminOrders.css';

export const AdminOrders = () => {
  const { orders, orderStatuses, updateOrderStatus } = useOrders();
  const { addToast } = useCart();
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((o) =>
    filterStatus === 'All' ? true : o.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    addToast(`Status pesanan ${orderId} diubah menjadi ${newStatus}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="admin-orders-page">
      <div className="orders-mgmt-header">
        <div>
          <h2>📋 Manajemen Pesanan Pelanggan</h2>
          <p>Kelola, pantau, dan perbarui status pesanan pengiriman pelanggan.</p>
        </div>
      </div>

      <div className="orders-filter-row">
        <button
          className={`filter-btn ${filterStatus === 'All' ? 'active' : ''}`}
          onClick={() => setFilterStatus('All')}
        >
          Semua ({orders.length})
        </button>
        {orderStatuses.map((st) => {
          const count = orders.filter((o) => o.status.toLowerCase() === st.toLowerCase()).length;
          return (
            <button
              key={st}
              className={`filter-btn ${filterStatus.toLowerCase() === st.toLowerCase() ? 'active' : ''}`}
              onClick={() => setFilterStatus(st)}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      <div className="orders-table-wrapper">
        {filteredOrders.length === 0 ? (
          <div className="empty-orders-view">Tidak ada pesanan dengan filter ini.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID Pesanan</th>
                <th>Waktu</th>
                <th>Jumlah Item</th>
                <th>Total Tagihan</th>
                <th>Status</th>
                <th>Ubah Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord) => (
                <tr key={ord.id}>
                  <td className="font-mono">{ord.id}</td>
                  <td>
                    {new Date(ord.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>{ord.items.length} item</td>
                  <td>
                    <strong>Rp {ord.totalPrice.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span className={`status-pill ${ord.status.toLowerCase()}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                    >
                      {orderStatuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn-view-order"
                      onClick={() => setSelectedOrder(ord)}
                    >
                      👁️ Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Detail Pesanan */}
      {selectedOrder && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>Rincian Pesanan #{selectedOrder.id}</h3>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body order-detail-modal">
              <div className="detail-meta-box">
                <div>
                  <span className="meta-label">Tanggal:</span>{' '}
                  {new Date(selectedOrder.createdAt).toLocaleString('id-ID')}
                </div>
                <div>
                  <span className="meta-label">Status:</span>{' '}
                  <span className={`status-pill ${selectedOrder.status.toLowerCase()}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <span className="meta-label">Alamat Pengiriman:</span>{' '}
                  <p className="address-text">{selectedOrder.shippingAddress || 'Alamat standar'}</p>
                </div>
              </div>

              <h4>Daftar Barang Belanja:</h4>
              <div className="order-items-list">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="item-row">
                    <span className="item-icon">{item.icon || '🛍️'}</span>
                    <div className="item-details">
                      <strong>{item.name}</strong>
                      <span className="item-qty">
                        {item.quantity} x Rp {item.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="item-subtotal">
                      Rp {item.subtotal.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="detail-footer">
                <span>Total Akhir:</span>
                <h3>Rp {selectedOrder.totalPrice.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
