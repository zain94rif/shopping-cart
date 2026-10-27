import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';

export const OrderContext = createContext();

const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => loadFromStorage('sc_orders', []));

  useEffect(() => {
    localStorage.setItem('sc_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = useCallback((cartItems, totalPrice, shippingAddress, paymentMethod = 'wallet') => {
    const order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
        icon: item.product.icon,
      })),
      totalPrice,
      shippingAddress,
      paymentMethod,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const updateOrderStatus = useCallback((orderId, status) => {
    if (!ORDER_STATUSES.includes(status)) return;
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    );
  }, []);

  const getOrderById = useCallback((orderId) => {
    return orders.find((order) => order.id === orderId);
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.totalPrice, 0);
  }, [orders]);

  const orderStats = useMemo(() => {
    const stats = { total: orders.length, pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 };
    orders.forEach((o) => {
      const key = o.status.toLowerCase();
      if (stats[key] !== undefined) stats[key]++;
    });
    return stats;
  }, [orders]);

  const value = useMemo(() => ({
    orders,
    orderStatuses: ORDER_STATUSES,
    createOrder,
    updateOrderStatus,
    getOrderById,
    totalRevenue,
    orderStats,
  }), [orders, createOrder, updateOrderStatus, getOrderById, totalRevenue, orderStats]);

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
