'use client';

import { CartProvider } from '@/context/CartContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from 'react';

const paypalOptions = {
  clientId: "AR0Dkk2XZVYHok0Spgr-_icJxD5JTWR-SGmQ4QvIGfLwnJCBvTyxTAp44NHg3aXCyD7igGR7nnSwEFqd",
  currency: "EUR",
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <CartProvider>
        {children}
      </CartProvider>
    </PayPalScriptProvider>
  );
}
