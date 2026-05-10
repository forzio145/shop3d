import { getProductById } from '@/lib/product-detail';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-neutral-900 text-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          {product.immagini && product.immagini.length > 0 && (
            <img src={product.immagini[0]} alt={product.nome} className="w-full rounded-lg" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.nome}</h1>
          <p className="text-xl mb-4">{product.prezzo.toFixed(2)} €</p>
          <p className="mb-2 text-neutral-300">Dimensioni: {product.dimensioni_stampa}</p>
          <p className="mb-6">{product.descrizione}</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition">
            Acquista
          </button>
        </div>
      </div>
    </main>
  );
}
