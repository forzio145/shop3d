'use client';
import { getProducts, Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import ProductModal from '@/components/ProductModal';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-neutral-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Shop 3D</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-neutral-800 p-4 rounded-lg flex flex-col cursor-pointer hover:bg-neutral-700 transition"
            onClick={() => setSelectedProduct(product)}
          >
            {product.immagini && product.immagini.length > 0 && (
              <div className="w-full h-[280px] bg-neutral-700 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                <img 
                  src={product.immagini[0]} 
                  alt={product.nome} 
                  className="w-full h-full object-contain" 
                />
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">{product.nome}</h2>
            <p className="text-neutral-400 mb-4">{product.prezzo.toFixed(2)} €</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
            >
              Aggiungi al carrello
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </main>
  );
}
