import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';

export const AuthContext = createContext();

const DEFAULT_USER = {
  name: 'Pelanggan',
  email: 'pelanggan@email.com',
  phone: '08123456789',
  address: 'Jl. Contoh No. 123, Jakarta Selatan',
  avatar: '👤',
  joinDate: new Date().toISOString(),
};

const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadFromStorage('sc_user', DEFAULT_USER));
  const [wishlist, setWishlist] = useState(() => loadFromStorage('sc_wishlist', []));

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('sc_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sc_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  }, []);

  const addToWishlist = useCallback((productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  const value = useMemo(() => ({
    user,
    wishlist,
    updateProfile,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  }), [user, wishlist, updateProfile, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
