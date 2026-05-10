'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

export function CartButton() {
    const { cart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(true)} className="relative p-2 text-white hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{cart.length}</span>}
            </button>
            {isOpen && <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        </>
    );
}

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, total, removeFromCart } = useCart();
  const groupedItems = cart.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id);
    if (existing) { existing.quantity += 1; } else { acc.push({ ...item, quantity: 1 }); }
    return acc;
  }, [] as (typeof cart[0] & { quantity: number })[]);

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm" onClick={onClose}>
        <div className="absolute right-0 top-0 h-[100vh] w-full max-w-sm bg-neutral-900 shadow-2xl text-white border-l border-neutral-800 overflow-y-auto custom-scrollbar" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Il tuo carrello</h2>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white p-2">✕</button>
                </div>
                {cart.length === 0 ? <p className="text-neutral-500 text-center mt-10">Il carrello è vuoto.</p> : (
                    <div className="space-y-6">
                        <ul className="space-y-4">
                            {groupedItems.map((item) => (
                                <li key={item.id} className="flex justify-between items-center border-b border-neutral-800 pb-2">
                                    <div><p className="font-medium">{item.nome}</p><p className="text-sm text-neutral-400">{item.quantity} x {item.prezzo.toFixed(2)} €</p></div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 text-sm">Rimuovi</button>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4 border-t border-neutral-800 space-y-4">
                            <div className="flex justify-between text-lg font-bold"><span>Totale:</span><span>{total.toFixed(2)} €</span></div>
                            <PayPalButtons
                                style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                                createOrder={(data, actions) => actions.order.create({ intent: "CAPTURE", purchase_units: [{ amount: { currency_code: "EUR", value: total.toFixed(2) } }] })}
                                onApprove={async () => alert("Pagamento completato!")}
                                onError={() => alert("Pagamento fallito.")}
                            />
                            <p className="text-[10px] text-neutral-500 text-center leading-tight">Diritto di recesso 14 giorni (D.Lgs. 206/2005).</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
