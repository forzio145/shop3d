'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { cart, total, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-blue-600 p-2 rounded-full text-white z-50"
      >
        🛒 ({cart.length})
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-80 bg-neutral-900 p-6 shadow-xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Carrello</h2>
            {cart.length === 0 ? (
              <p>Il carrello è vuoto.</p>
            ) : (
              <>
                <ul className="mb-4">
                  {cart.map((item, index) => (
                    <li key={index} className="flex justify-between mb-2">
                      {item.nome} - {item.prezzo.toFixed(2)} €
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500">x</button>
                    </li>
                  ))}
                </ul>
                <p className="font-bold">Totale: {total.toFixed(2)} €</p>
              </>
            )}
            <button onClick={() => setIsOpen(false)} className="mt-4 w-full bg-neutral-700 py-2 rounded">Chiudi</button>
          </div>
        </div>
      )}
    </>
  );
}
