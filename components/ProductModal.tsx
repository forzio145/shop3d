'use client';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white text-2xl">✕</button>
        
        {product.immagini && product.immagini.length > 0 && (
          <img src={product.immagini[0]} alt={product.nome} className="w-full h-64 object-cover rounded-xl mb-6" />
        )}
        
        <span className="inline-block bg-neutral-800 text-neutral-300 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">{product.categoria}</span>
        <h2 className="text-3xl font-bold mb-2 text-white">{product.nome}</h2>
        <p className="text-2xl text-blue-400 font-bold mb-4">{product.prezzo.toFixed(2)} €</p>
        
        <p className="text-neutral-400 mb-4">{product.descrizione}</p>
        <p className="text-sm text-neutral-500 mb-6 font-mono">Dimensioni: {product.dimensioni_stampa}</p>
        
        <button 
          onClick={() => {
            addToCart(product);
            onClose();
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition transform active:scale-95"
        >
          Aggiungi al carrello
        </button>
      </div>
    </div>
  );
}
