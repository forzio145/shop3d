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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-neutral-800 rounded-lg overflow-hidden cursor-pointer hover:bg-neutral-700 transition"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
                {product.immagini && product.immagini.length > 0 && (
                    <img 
                      src={product.immagini[0]} 
                      alt={product.nome} 
                      className="w-full h-full object-cover" 
                    />
                )}
            </div>
            <div className="p-2 md:p-3">
                <p className="text-sm md:text-base text-white line-clamp-2 mb-1">{product.nome}</p>
                <p className="text-sm md:text-lg font-bold text-white">{product.prezzo.toFixed(2)} €</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </main>
  );
}
