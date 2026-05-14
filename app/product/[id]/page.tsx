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
          <h1 className="text-3xl md:text-4xl font-bold mb-1">{product.nome}</h1>
          
          {/* Lotto di produzione dinamico */}
          <p className="text-xs md:text-sm text-neutral-500 font-medium mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
            Lotto di produzione corrente: #{product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString().padStart(3, '0')}
          </p>

          <p className="text-2xl font-bold mb-6 text-white">{product.prezzo.toFixed(2)} €</p>
          <p className="mb-2 text-neutral-400 text-sm">Dimensioni: {product.dimensioni_stampa}</p>
          <div className="mb-8 text-neutral-300 leading-relaxed">{product.descrizione}</div>
          
          <div className="flex flex-col gap-4">
            <button className="w-full md:w-max bg-white text-black py-4 px-10 rounded-full font-bold hover:scale-[1.02] transition active:scale-[0.98]">
              Acquista ora
            </button>

            {/* Banner Tempi di Produzione */}
            <div className="bg-neutral-800/50 border border-neutral-700/30 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-neutral-400 mt-0.5">✧</span>
              <p className="text-xs md:text-sm text-neutral-400 leading-snug">
                <span className="text-neutral-200 font-medium">Artigianato premium:</span> produzione e rifinitura <span className="italic">Glass-Smooth</span> richiedono 3-5 giorni lavorativi prima della spedizione.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
