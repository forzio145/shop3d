'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/lib/products';

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => setCart([...cart, product]);
  const removeFromCart = (productId: string) => setCart(cart.filter(item => item.id !== productId));
  const total = cart.reduce((sum, item) => sum + Number(item.prezzo), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
