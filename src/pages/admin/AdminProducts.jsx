import React, { useState } from 'react';
import { products as initialProducts, categories } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import './AdminProducts.css';

export const AdminProducts = () => {
  const [productList, setProductList] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { addToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    nameZh: '',
    price: '',
    category: categories[0] || 'Accessories',
    stock: '',
    icon: '📦',
    description: '',
  });

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      nameZh: '',
      price: '',
      category: categories[0] || 'Accessories',
      stock: '',
      icon: '📦',
      description: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      nameZh: p.nameZh || '',
      price: p.price,
      category: p.category,
      stock: p.stock,
      icon: p.icon,
      description: p.description,
    });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      addToast('Produk berhasil dihapus');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProductList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
              }
            : p
        )
      );
      addToast('Produk berhasil diperbarui');
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: 5.0,
      };
      setProductList((prev) => [newProduct, ...prev]);
      addToast('Produk baru berhasil ditambahkan');
    }
    setModalOpen(false);
  };

  return (
    <div className="admin-products-page">
      <div className="products-mgmt-header">
        <div>
          <h2>📦 Manajemen Produk</h2>
          <p>Tambah, perbarui, dan kontrol stok katalog produk toko.</p>
        </div>
        <button className="btn-add-product" onClick={openAddModal}>
          + Tambah Produk Baru
        </button>
      </div>

      <div className="search-bar-row">
        <input
          type="text"
          placeholder="Cari nama produk atau kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search-input"
        />
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td className="product-icon-cell">{item.icon}</td>
                <td>
                  <strong>{item.name}</strong>
                  <div className="sub-zh">{item.nameZh}</div>
                </td>
                <td>
                  <span className="cat-badge">{item.category}</span>
                </td>
                <td>Rp {item.price.toLocaleString()}</td>
                <td>
                  <span className={`stock-badge ${item.stock <= 5 ? 'low' : ''}`}>
                    {item.stock} unit
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => openEditModal(item)}
                      title="Edit Produk"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item.id)}
                      title="Hapus Produk"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Nama Produk</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nama Alternatif (Zh/Opsional)</label>
                  <input
                    type="text"
                    value={formData.nameZh}
                    onChange={(e) => setFormData({ ...formData, nameZh: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Emoji / Icon</label>
                  <input
                    type="text"
                    required
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Harga (Rp)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Stok</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Simpan Perubahan' : 'Tambahkan Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
