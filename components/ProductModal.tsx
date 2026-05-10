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
        className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl w-full max-w-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white text-2xl z-10">✕</button>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Colonna Sinistra: Immagine */}
          <div className="flex flex-col gap-4">
            {product.immagini && product.immagini.length > 0 && (
              <img src={product.immagini[0]} alt={product.nome} className="w-full h-80 object-cover rounded-xl" />
            )}
            <div className="bg-neutral-800 p-4 rounded-xl">
                <p className="text-sm text-neutral-400 mb-1">Dimensioni</p>
                <p className="text-white font-mono">{product.dimensioni_stampa}</p>
            </div>
          </div>

          {/* Colonna Destra: Info */}
          <div className="flex flex-col">
            <span className="inline-block bg-neutral-800 text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider w-max">
                {product.categoria}
            </span>
            <h2 className="text-3xl font-bold mb-2 text-white">{product.nome}</h2>
            <p className="text-3xl text-white font-bold mb-6">{product.prezzo.toFixed(2)} €</p>
            
            <div className="text-neutral-400 mb-8 whitespace-pre-line leading-relaxed flex-grow">
                {product.descrizione}
            </div>
            
            <button 
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition transform active:scale-95 text-lg"
            >
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
