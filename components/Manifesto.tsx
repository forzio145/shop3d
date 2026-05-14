export default function Manifesto() {
  return (
    <section className="bg-neutral-900 border-t border-neutral-800 py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Icona minimale raffinata - Simbolo di precisione/cerchio */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center">
            <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
          </div>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-neutral-100 mb-8 italic tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
          Artigianato, non industria.
        </h2>

        <div className="space-y-6 text-neutral-400 text-lg md:text-xl leading-relaxed font-light">
          <p>
            Produciamo in piccoli lotti per garantire a ogni pezzo la nostra finitura <span className="text-neutral-200 font-medium italic">Glass-Smooth</span>. 
          </p>
          <p>
            Il tuo ordine non viene preso da uno scaffale polveroso; è realizzato artigianalmente apposta per te. 
            Questo significa che le scorte sono limitate e ogni lotto è unico.
          </p>
        </div>

        {/* Accento sobrio - Linea sottile */}
        <div className="mt-12 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-neutral-700 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
