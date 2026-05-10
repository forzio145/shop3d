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
        className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl w-[90vw] max-w-3xl max-h-[90vh] shadow-2xl relative animate-in fade-in zoom-in duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pulsante Chiudi Sticky */}
        <button 
            onClick={onClose} 
            className="sticky top-0 self-end text-neutral-400 hover:text-white text-2xl z-10 bg-neutral-900 rounded-full p-1"
        >
            ✕
        </button>
        
        {/* Contenitore Scrollabile */}
        <div className="overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid md:grid-cols-2 gap-8 mt-2">
            {/* Colonna Sinistra */}
            <div className="flex flex-col gap-4">
                {product.immagini && product.immagini.length > 0 && (
                <img src={product.immagini[0]} alt={product.nome} className="w-full h-64 md:h-80 object-cover rounded-xl" />
                )}
                <span className="inline-block bg-neutral-800 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">
                    {product.categoria}
                </span>
                <p className="text-2xl text-white font-bold">{product.prezzo.toFixed(2)} €</p>
            </div>

            {/* Colonna Destra */}
            <div className="flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">{product.nome}</h2>
                <div className="text-neutral-300 mb-6 whitespace-pre-wrap leading-relaxed flex-grow">
                    {product.descrizione}
                </div>
                
                <button 
                onClick={() => {
                    addToCart(product);
                    onClose();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition transform active:scale-95 text-lg mt-auto"
                >
                Aggiungi al carrello
                </button>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
