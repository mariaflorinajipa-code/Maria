import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Star, MessageSquare, ShieldCheck, HeartHandshake } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface ReviewResponderModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const ReviewResponderModal: React.FC<ReviewResponderModalProps> = ({
  isOpen,
  onClose,
  service,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const templates = [
    {
      id: 'five-star',
      title: 'Respuesta a Reseña de 5 Estrellas ⭐⭐⭐⭐⭐',
      badge: 'Fidelización',
      response: `¡Muchísimas gracias por tus amables palabras y por tu confianza! ❤️ Para todo nuestro equipo es un auténtico placer atenderte y saber que tu experiencia con nuestro servicio de ${service} ha sido de diez. ¡Nos vemos muy pronto de nuevo por aquí!`,
    },
    {
      id: 'critical',
      title: 'Respuesta a Reseña Crítica o Constructiva',
      badge: 'Resolución y Calma',
      response: `Hola. Lamentamos sinceramente que tu última experiencia no haya estado a la altura de lo que siempre buscamos ofrecer. Cuidamos cada detalle al máximo y nos tomamos tu opinión muy en serio para mejorar. Por favor, escríbenos directamente por privado o llámanos para que podamos revisar tu caso y darte una solución a tu medida. ¡Queremos escucharte!`,
    },
    {
      id: 'dm-price',
      title: 'Respuesta a DM de Instagram/TikTok: "¿Cuánto cuesta?"',
      badge: 'Conversión por Privado',
      response: `¡Hola! 👋 ¡Qué alegría que nos escribas! El servicio de ${service} parte desde tarifas muy accesibles, pero nos gusta personalizarlo según lo que exactamente necesitas para darte el mejor presupuesto cerrado sin sorpresas. ¿Te gustaría que te contemos los detalles o prefieres que te reservemos un hueco para valorarlo en persona sin compromiso? ¡Quedamos a tu disposición! ✨`,
    },
  ];

  const handleCopy = async (id: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(id);
      onShowToast('¡Plantilla de respuesta copiada!', 'success');
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0B1122] border border-purple-500/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-white">
                  Respuestas Profesionales a Reseñas y DMs
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Exclusivo Premium
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Protege tu reputación online y convierte preguntas en clientes satisfechos.
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

        {/* Templates list */}
        <div className="overflow-y-auto py-5 space-y-4 pr-1">
          {templates.map((tpl) => {
            const isCopied = copiedKey === tpl.id;
            return (
              <div
                key={tpl.id}
                className="p-4 rounded-2xl bg-[#070C18] border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-white">
                      {tpl.title}
                    </span>
                    <span className="text-[10px] text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40 font-semibold">
                      {tpl.badge}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B1122] border border-slate-800/80 text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans mb-3">
                    {tpl.response}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleCopy(tpl.id, tpl.response)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors flex items-center gap-1.5 shadow-md shadow-violet-600/30"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? '¡Copiado!' : 'Copiar respuesta'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-850 flex justify-between items-center text-xs text-slate-400">
          <span>Úsalo en Google Maps / My Business, WhatsApp Business o Instagram DM.</span>
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
