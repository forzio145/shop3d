'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function CartDrawer() {
  const { cart, total, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

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
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-neutral-900 p-6 shadow-2xl text-white transform transition-transform border-l border-neutral-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Il tuo carrello</h2>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-neutral-500 text-center mt-10">Il carrello è vuoto.</p>
            ) : (
              <div className="flex flex-col flex-grow overflow-hidden">
                <ul className="flex-grow overflow-y-auto space-y-4 custom-scrollbar pr-2">
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
                
                <div className="mt-4 pt-4 border-t border-neutral-800 flex-shrink-0">
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Totale:</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>

                  <PayPalButtons
                    style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: { value: total.toFixed(2) },
                        }],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      alert("Pagamento completato! Riceverai una email di conferma.");
                    }}
                    onError={(err) => {
                      alert("Pagamento fallito, riprova.");
                    }}
                  />

                  <p className="text-[10px] text-neutral-500 text-center mt-3 leading-tight">
                    Hai diritto di recesso entro 14 giorni dalla ricezione 
                    ai sensi del D.Lgs. 206/2005 (Codice del Consumo).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
