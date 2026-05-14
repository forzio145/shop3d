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
          
          <div className="flex flex-col gap-6">
            <button className="w-full md:w-max bg-white text-black py-4 px-10 rounded-full font-bold hover:scale-[1.02] transition active:scale-[0.98]">
              Acquista ora
            </button>

            {/* Banner di Valore Artigianale */}
            <div className="py-6 border-y border-neutral-800/50 flex flex-col items-center text-center">
              <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-amber-600/70 font-bold mb-2">
                Garanzia del Produttore
              </p>
              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-sm">
                Ogni pezzo è rifinito a mano: attendi <span className="text-neutral-200 font-medium">{product.tempi_produzione} giorni</span> per la finitura <span className="italic">Glass-Smooth</span> prima della spedizione.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
