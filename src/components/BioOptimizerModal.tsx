import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Crown, Instagram, Smartphone } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface BioOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessType: string;
  service: string;
  city: string;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const BioOptimizerModal: React.FC<BioOptimizerModalProps> = ({
  isOpen,
  onClose,
  businessType,
  service,
  city,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const bios = [
    {
      style: 'Cercana y de Confianza',
      tag: 'Ideal para fidelizar vecinos',
      text: `✨ Cuidamos de ti y de tu estilo${city ? ` en ${city}` : ''}\n📍 Especialistas en ${service}\n☕ Trato cercano, sin prisas y con mucho mimo\n👇 Reserva tu cita o pregúntanos por privado:`,
      linkText: 'linktr.ee/tu-negocio-reserva',
    },
    {
      style: 'Profesional y de Autoridad',
      tag: 'Para destacar calidad y técnica',
      text: `🏆 Resultados impecables y asesoramiento personalizado\n🌿 Expertos en ${service}\n📍 Visítanos${city ? ` en ${city}` : ''} | Lunes a Sábado\n📩 Escríbenos por DM para consultas`,
      linkText: 'tudominio.com/carta-servicios',
    },
    {
      style: 'Promocional y de Conversión',
      tag: 'Enfocada en reservas directas',
      text: `⚡ Tu espacio de referencia para ${service}\n🎁 1ª Valoración personalizada sin compromiso\n📍 Ubicación privilegiada${city ? ` en ${city}` : ''}\n👇 Pulsa abajo para ver agenda disponible:`,
      linkText: 'wa.me/34XXXXXXXXX?text=Hola!QuieroInformacion',
    },
  ];

  const handleCopyBio = async (text: string, idx: number) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedIdx(idx);
      onShowToast('¡Biografía copiada al portapapeles!', 'success');
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0B1122] border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-white">
                  Optimizador de Biografías (Instagram y TikTok)
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Herramienta Gold
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tu perfil es tu escaparate: convierte visitantes en clientes en menos de 3 segundos.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto py-5 space-y-4 pr-1">
          {bios.map((bio, idx) => {
            const isCopied = copiedIdx === idx;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#070C18] border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-white">
                      {bio.style}
                    </span>
                    <span className="text-[11px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 font-medium">
                      {bio.tag}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B1122] border border-slate-800/80 text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans mb-3">
                    {bio.text}
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-2">
                    <span className="text-violet-400 font-semibold">Enlace en bio sugerido:</span>
                    <span className="text-slate-300 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {bio.linkText}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleCopyBio(bio.text, idx)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? '¡Copiada!' : 'Copiar biografía'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-850 flex justify-between items-center text-xs text-slate-400">
          <span>Recuerda añadir el enlace de WhatsApp o tu web en tu perfil.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
