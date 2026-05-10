import { getProducts } from '@/lib/products';
import Link from 'next/link';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen p-4 md:p-8 bg-neutral-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Shop 3D</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-neutral-800 p-4 rounded-lg flex flex-col">
            {product.immagini && product.immagini.length > 0 && (
              <img src={product.immagini[0]} alt={product.nome} className="w-full h-48 object-cover rounded-md mb-4" />
            )}
            <h2 className="text-xl font-semibold mb-2">{product.nome}</h2>
            <p className="text-neutral-400 mb-4">{product.prezzo.toFixed(2)} €</p>
            <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
              Aggiungi al carrello
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
