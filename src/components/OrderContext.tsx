'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderTime: Date;
  estimatedTime?: number; // in minutes
  customerName?: string;
  customerPhone?: string;
  tableNumber?: string;
  specialInstructions?: string;
}

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (items: OrderItem[], customerInfo: {
    name?: string;
    phone?: string;
    tableNumber?: string;
    specialInstructions?: string;
  }) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getCurrentOrder: () => Order | null;
  clearCurrentOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const generateOrderId = (): string => {
    return 'ORD-' + Date.now().toString(36).toUpperCase();
  };

  const calculateEstimatedTime = (items: OrderItem[]): number => {
    // Base time + time per item (simulated)
    const baseTime = 15; // 15 minutes base
    const timePerItem = items.reduce((total, item) => total + (item.quantity * 2), 0);
    return Math.min(baseTime + timePerItem, 45); // Max 45 minutes
  };

  const placeOrder = (
    items: OrderItem[], 
    customerInfo: {
      name?: string;
      phone?: string;
      tableNumber?: string;
      specialInstructions?: string;
    }
  ): string => {
    const orderId = generateOrderId();
    const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const estimatedTime = calculateEstimatedTime(items);

    const newOrder: Order = {
      id: orderId,
      items,
      totalAmount,
      status: 'confirmed',
      orderTime: new Date(),
      estimatedTime,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      tableNumber: customerInfo.tableNumber,
      specialInstructions: customerInfo.specialInstructions,
    };

    setOrders(prev => [...prev, newOrder]);
    setCurrentOrder(newOrder);

    // Simulate order status progression
    setTimeout(() => updateOrderStatus(orderId, 'preparing'), 2000);
    setTimeout(() => updateOrderStatus(orderId, 'ready'), estimatedTime * 60 * 1000 * 0.8); // 80% of estimated time
    
    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
    
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const getCurrentOrder = (): Order | null => {
    return currentOrder;
  };

  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      currentOrder,
      placeOrder,
      updateOrderStatus,
      getOrderById,
      getCurrentOrder,
      clearCurrentOrder,
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}