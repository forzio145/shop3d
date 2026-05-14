'use client';
import { getProducts, Product } from '@/lib/products';
import { useEffect, useState } from 'react';
import ProductModal from '@/components/ProductModal';
import { CartButton } from '@/components/CartDrawer';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-sm p-4 md:p-8 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold flex-1 text-left md:text-center md:absolute md:left-0 md:right-0">Shop 3D</h1>
        <div className="z-50">
          <CartButton />
        </div>
      </header>

      <section className="px-4 py-12 md:py-24 flex flex-col items-center text-center max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Design che rispetta <br className="hidden md:block" /> 
          <span className="text-neutral-500 italic">il futuro.</span>
        </h2>
        <p className="text-neutral-400 text-lg md:text-xl mb-10 max-w-2xl">
          Produciamo in serie limitate. Nessun magazzino, nessuno spreco. 
          Ogni oggetto è realizzato con cura solo quando lo desideri.
        </p>
        <a 
          href="#prodotti" 
          className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform duration-200"
        >
          Esplora il catalogo
        </a>
      </section>

      <div id="prodotti" className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 pt-4">

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
                <p className="text-sm md:text-lg text-white line-clamp-2 mb-1">{product.nome}</p>
                <p className="text-sm md:text-xl font-bold text-white">{product.prezzo.toFixed(2)} €</p>
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
