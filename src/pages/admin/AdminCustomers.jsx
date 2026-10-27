import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import { useOrders } from '../../hooks/useOrders';
import './AdminCustomers.css';

export const AdminCustomers = () => {
  const { user } = useAuth();
  const { balance } = useWallet();
  const { orders } = useOrders();

  // In this client-side simulated architecture, we represent the active user profile as well as simulated historical users
  const customerList = [
    {
      id: 'CUST-001',
      name: user?.name || 'Pelanggan Toko',
      email: user?.email || 'pelanggan@email.com',
      phone: user?.phone || '08123456789',
      address: user?.address || 'Jl. Contoh No. 123, Jakarta Selatan',
      balance: balance,
      totalOrders: orders.length,
      status: 'Aktif',
      joinDate: 'Januari 2026',
    },
    {
      id: 'CUST-002',
      name: 'Budi Santoso',
      email: 'budi.santoso@example.com',
      phone: '081399887766',
      address: 'Jl. Merdeka No. 45, Bandung',
      balance: 45000,
      totalOrders: 3,
      status: 'Aktif',
      joinDate: 'Februari 2026',
    },
    {
      id: 'CUST-003',
      name: 'Siti Rahmawati',
      email: 'siti.rahma@example.com',
      phone: '082155443322',
      address: 'Jl. Sudirman Kav. 9, Surabaya',
      balance: 120000,
      totalOrders: 6,
      status: 'Aktif',
      joinDate: 'Maret 2026',
    }
  ];

  return (
    <div className="admin-customers-page">
      <div className="customers-header">
        <div>
          <h2>👥 Data Pelanggan Terdaftar</h2>
          <p>Informasi akun pelanggan, riwayat keaktifan, dan saldo dompet.</p>
        </div>
      </div>

      <div className="customers-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Pelanggan</th>
              <th>Nama & Kontak</th>
              <th>Alamat</th>
              <th>Saldo Dompet</th>
              <th>Total Transaksi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((cust) => (
              <tr key={cust.id}>
                <td className="font-mono">{cust.id}</td>
                <td>
                  <strong>{cust.name}</strong>
                  <div className="sub-contact">{cust.email}</div>
                  <div className="sub-contact">{cust.phone}</div>
                </td>
                <td className="address-col">{cust.address}</td>
                <td>
                  <strong className="wallet-text">Rp {cust.balance.toLocaleString()}</strong>
                </td>
                <td>{cust.totalOrders} Pesanan</td>
                <td>
                  <span className="badge-active-cust">{cust.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
