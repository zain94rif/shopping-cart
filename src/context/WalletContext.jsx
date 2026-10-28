import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';

export const WalletContext = createContext();

const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(() => loadFromStorage('sc_wallet_balance', 100000));
  const [transactions, setTransactions] = useState(() => loadFromStorage('sc_wallet_transactions', [
    {
      id: 'txn_initial',
      type: 'topup',
      amount: 100000,
      description: 'Saldo awal (Initial balance)',
      date: new Date().toISOString(),
      balanceAfter: 100000,
    }
  ]));

  // Persist
  useEffect(() => {
    localStorage.setItem('sc_wallet_balance', JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('sc_wallet_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback((type, amount, description, newBalance) => {
    const txn = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type,
      amount,
      description,
      date: new Date().toISOString(),
      balanceAfter: newBalance,
    };
    setTransactions((prev) => [txn, ...prev]);
  }, []);

  const topUp = useCallback((amount) => {
    if (amount <= 0) return { success: false, message: 'Jumlah harus lebih dari 0' };
    const newBalance = balance + amount;
    setBalance(newBalance);
    addTransaction('topup', amount, `Top-up saldo Rp ${amount.toLocaleString()}`, newBalance);
    return { success: true, message: `Berhasil top-up Rp ${amount.toLocaleString()}` };
  }, [balance, addTransaction]);

  const deduct = useCallback((amount, description = 'Pembelian') => {
    if (amount <= 0) return { success: false, message: 'Jumlah harus lebih dari 0' };
    if (amount > balance) return { success: false, message: 'Saldo tidak mencukupi' };
    const newBalance = balance - amount;
    setBalance(newBalance);
    addTransaction('purchase', amount, description, newBalance);
    return { success: true, message: 'Pembayaran berhasil', newBalance };
  }, [balance, addTransaction]);

  const value = useMemo(() => ({
    balance,
    transactions,
    topUp,
    deduct,
  }), [balance, transactions, topUp, deduct]);

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
