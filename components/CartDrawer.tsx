'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { cart, total, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Group items to show quantities
  const groupedItems = cart.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, [] as (typeof cart[0] & { quantity: number })[]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg z-50 transition"
      >
        🛒 Carrello ({cart.length})
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-neutral-900 p-6 shadow-2xl text-white transform transition-transform border-l border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Il tuo carrello</h2>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-neutral-500 text-center mt-10">Il carrello è vuoto.</p>
            ) : (
              <div className="flex flex-col h-[calc(100%-120px)]">
                <ul className="flex-grow overflow-y-auto space-y-4">
                  {groupedItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b border-neutral-800 pb-2">
                      <div>
                        <p className="font-medium">{item.nome}</p>
                        <p className="text-sm text-neutral-400">{item.quantity} x {item.prezzo.toFixed(2)} €</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 text-sm">Rimuovi</button>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-neutral-800">
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Totale:</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                    Procedi al pagamento
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
