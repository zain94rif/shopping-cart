import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import './WalletPage.css';

export const WalletPage = () => {
  const { balance, transactions, topUp } = useWallet();
  const [customAmount, setCustomAmount] = useState('');
  const [notification, setNotification] = useState(null);

  const presetAmounts = [20000, 50000, 100000, 200000, 500000];

  const handleTopUp = (amount) => {
    if (!amount || amount <= 0) {
      setNotification({ type: 'error', text: 'Masukkan jumlah top-up yang valid!' });
      return;
    }
    const res = topUp(amount);
    if (res.success) {
      setNotification({ type: 'success', text: res.message });
      setCustomAmount('');
    } else {
      setNotification({ type: 'error', text: res.message });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="wallet-page">
      <div className="wallet-header">
        <h2>💰 Saldo & Dompet Digital</h2>
        <p>Kelola saldo wallet, lakukan pengisian dana, dan pantau riwayat transaksi Anda.</p>
      </div>

      {notification && (
        <div className={`wallet-alert ${notification.type}`}>
          {notification.type === 'success' ? '✅' : '⚠️'} {notification.text}
        </div>
      )}

      <div className="wallet-grid">
        {/* Balance Card */}
        <div className="wallet-card balance-card">
          <div className="card-top">
            <span className="card-chip">💳</span>
            <span className="card-brand">ShopCart Pay</span>
          </div>
          <div className="card-body">
            <span className="balance-label">Total Saldo Aktif</span>
            <h1 className="balance-value">Rp {balance.toLocaleString()}</h1>
          </div>
          <div className="card-bottom">
            <span>Status: Aktif</span>
            <span>Instan & Aman 🔒</span>
          </div>
        </div>

        {/* Top-up Action Card */}
        <div className="wallet-card topup-card">
          <h3>⚡ Isi Saldo (Top Up)</h3>
          <p className="topup-desc">Pilih nominal cepat atau masukkan jumlah sesuai kebutuhan Anda:</p>

          <div className="preset-buttons">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                className="preset-btn"
                onClick={() => handleTopUp(amt)}
              >
                + Rp {amt.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="custom-topup-form">
            <label htmlFor="custom-amount">Nominal Kustom (Rp)</label>
            <div className="custom-input-group">
              <span className="prefix">Rp</span>
              <input
                id="custom-amount"
                type="number"
                min="1000"
                step="1000"
                placeholder="cth. 150000"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
              <button
                className="btn-topup-submit"
                onClick={() => handleTopUp(Number(customAmount))}
                disabled={!customAmount || Number(customAmount) <= 0}
              >
                Isi Saldo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="transactions-section">
        <h3>📜 Riwayat Transaksi Saldo</h3>
        {transactions.length === 0 ? (
          <div className="empty-transactions">Belum ada riwayat transaksi.</div>
        ) : (
          <div className="transactions-table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th>Jenis</th>
                  <th>Jumlah</th>
                  <th>Sisa Saldo</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => {
                  const isTopUp = txn.type === 'topup';
                  return (
                    <tr key={txn.id}>
                      <td className="txn-date">
                        {new Date(txn.date).toLocaleString('id-ID', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </td>
                      <td className="txn-desc">{txn.description}</td>
                      <td>
                        <span className={`txn-badge ${isTopUp ? 'badge-in' : 'badge-out'}`}>
                          {isTopUp ? 'Top Up' : 'Pengeluaran'}
                        </span>
                      </td>
                      <td className={`txn-amount ${isTopUp ? 'positive' : 'negative'}`}>
                        {isTopUp ? '+' : '-'} Rp {txn.amount.toLocaleString()}
                      </td>
                      <td className="txn-balance">
                        Rp {txn.balanceAfter !== undefined ? txn.balanceAfter.toLocaleString() : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
