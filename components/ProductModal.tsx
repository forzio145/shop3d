'use client';
import { useState } from 'react';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState(product.immagini?.[0] || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4b5563 #1f2937;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 3px; }
      `}</style>
      
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-[90vw] max-w-3xl max-h-[90vh] shadow-2xl relative animate-in fade-in zoom-in duration-300 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pulsante Chiudi Sticky */}
        <div className="sticky top-0 z-20 bg-neutral-900 flex justify-end p-4">
            <button 
                onClick={onClose} 
                className="text-neutral-400 hover:text-white text-2xl"
            >
                ✕
            </button>
        </div>
        
        {/* Contenitore centrale scrollabile */}
        <div className="overflow-y-auto flex-grow px-6 pb-6 custom-scrollbar">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Colonna Sinistra */}
                <div className="flex flex-col gap-4">
                    <img src={mainImage} alt={product.nome} className="w-full h-80 object-cover rounded-xl" />
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {product.immagini?.map((img, idx) => (
                            <button key={idx} onClick={() => setMainImage(img)} className="flex-shrink-0">
                                <img src={img} alt={`Thumb ${idx}`} className={`w-16 h-16 object-cover rounded-lg border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Colonna Destra */}
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold mb-2 text-white">{product.nome}</h2>
                    <span className="inline-block bg-neutral-800 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max mb-3">
                        {product.categoria}
                    </span>
                    <p className="text-2xl text-white font-bold mb-6">{product.prezzo.toFixed(2)} €</p>
                    <div className="text-neutral-300 whitespace-pre-wrap leading-relaxed">
                        {product.descrizione}
                    </div>
                </div>
            </div>
        </div>

        {/* Bottone Carrello Sticky */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-900 sticky bottom-0">
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
  );
}
