'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { cart, total, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const paypalMeUsername = "TUOUSERNAME"; // SOSTITUISCI CON IL TUO USERNAME PAYPAL.ME
  const paymentLink = `https://www.paypal.me/${paypalMeUsername}/${total.toFixed(2)}EUR`;

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
              <div className="flex flex-col h-[calc(100%-80px)]">
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
                  <a 
                    href={paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#003087] hover:bg-[#00205b] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    <span>Paga con PayPal</span>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M7.09 19.349h2.385l1.528-7.798c.315-1.57.868-2.657 2.146-2.657.48 0 .862.062 1.25.187l-.482 2.508c-.28-.088-.568-.135-.858-.135-.37 0-.54.265-.632.747l-.92 4.675h2.385l-.484 2.463H11.23l-1.077 5.498H5.986l1.104-5.498H4.708l.484-2.463h2.385l-.487 2.463zm8.326-8.75c.423.454.71.97.86 1.543l.53-2.705c-.375-.125-.75-.187-1.25-.187-1.278 0-1.83 1.087-2.145 2.657l-1.528 7.798h2.384l.92-4.675c.092-.482.262-.747.632-.747.29 0 .578.047.858.135l.482-2.508c-.388-.125-.77-.187-1.25-.187-.45 0-.845.09-1.23.272l.485-2.463z" />
                    </svg>
                  </a>
                  <p className="text-[10px] text-neutral-500 text-center mt-3 leading-tight">
                    Pagamento sicuro tramite PayPal. 
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
