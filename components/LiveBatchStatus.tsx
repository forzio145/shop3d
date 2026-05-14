'use client';
import { useEffect, useState } from 'react';

export default function LiveBatchStatus() {
  const [stats, setStats] = useState({
    lotto: '#042',
    pezzoAttuale: 12,
    pezzoTotale: 20,
    consegnatiTotali: 142
  });

  useEffect(() => {
    // Logica deterministica per simulare il progresso senza database in tempo reale
    const updateStats = () => {
      const ora = new Date().getHours();
      const minuti = new Date().getMinutes();
      const giornoSettimana = new Date().getDay();
      
      // Il lotto cambia ogni settimana (simulato)
      const lottoBase = 42 + Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)) % 100;
      
      // Il progresso del pezzo dipende dall'ora del giorno (lavoro dalle 08:00 alle 20:00)
      let pezzo = 0;
      if (ora >= 8 && ora < 20) {
        // 12 ore di lavoro per 20 pezzi = ~1.6 pezzi l'ora
        pezzo = Math.floor(((ora - 8) * 60 + minuti) / (720 / 20)) + 1;
      } else if (ora >= 20) {
        pezzo = 20;
      } else {
        pezzo = 1;
      }

      // Totale consegnati: base + giorni dal 1 Gennaio 2026
      const inizioRiferimento = new Date('2026-01-01').getTime();
      const oggi = new Date().getTime();
      const giorniTrascorsi = Math.floor((oggi - inizioRiferimento) / (1000 * 60 * 60 * 24));
      const totali = 100 + giorniTrascorsi;

      setStats({
        lotto: `#${lottoBase.toString().padStart(3, '0')}`,
        pezzoAttuale: Math.min(pezzo, 20),
        pezzoTotale: 20,
        consegnatiTotali: totali
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 60000); // Aggiorna ogni minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-[60] animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800 p-3 rounded-2xl shadow-2xl flex items-center gap-4 max-w-[280px]">
        {/* Indicatore di stato animato */}
        <div className="relative flex items-center justify-center">
            <span className="absolute w-3 h-3 bg-amber-500 rounded-full animate-ping opacity-20"></span>
            <span className="relative w-2 h-2 bg-amber-500 rounded-full"></span>
        </div>

        <div className="flex flex-col">
            <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mb-0.5">
                Stato Produzione
            </p>
            <p className="text-xs text-neutral-200 font-medium leading-tight">
                Siamo al lavoro sul <span className="text-white">lotto {stats.lotto}</span>.
            </p>
            <p className="text-[10px] text-neutral-500 leading-tight mt-1">
                Pezzo n° {stats.pezzoAttuale} di {stats.pezzoTotale} in rifinitura • {stats.consegnatiTotali}+ opere consegnate
            </p>
        </div>
      </div>
    </div>
  );
}
