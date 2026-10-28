import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './ProfilePage.css';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>👤 Profil Pengguna</h2>
        <p>Kelola informasi kontak dan alamat pengiriman Anda.</p>
      </div>

      {isSaved && (
        <div className="profile-alert success">
          ✅ Profil berhasil diperbarui!
        </div>
      )}

      <div className="profile-card">
        <div className="profile-user-summary">
          <div className="avatar-box">
            <span className="user-avatar">{user?.avatar || '👤'}</span>
          </div>
          <div className="user-meta">
            <h3>{user?.name || 'Pelanggan'}</h3>
            <p>{user?.email || 'email@example.com'}</p>
            <span className="join-badge">Member sejak 2026</span>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Nomor Telepon / WhatsApp</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Alamat Pengiriman Utama</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap pengiriman paket..."
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save-profile">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
