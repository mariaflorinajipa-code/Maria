import React, { useState } from 'react';
import { Sparkles, Copy, Check, Bookmark, BookmarkCheck, Lightbulb, Share2, Tag, Compass } from 'lucide-react';
import { IdeaItem, GeneratorFormState } from '../types';
import { copyToClipboard } from '../utils/clipboard';

interface IdeasTabProps {
  ideas: IdeaItem[];
  formState: GeneratorFormState;
  onSaveIdea: (idea: IdeaItem) => void;
  isSaved: (id: string) => boolean;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const IdeasTab: React.FC<IdeasTabProps> = ({
  ideas,
  formState,
  onSaveIdea,
  isSaved,
  onShowToast,
}) => {
  const [filterFormat, setFilterFormat] = useState<string>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredIdeas = filterFormat === 'todos'
    ? ideas
    : ideas.filter((item) => item.format.toLowerCase().includes(filterFormat.toLowerCase()));

  const handleCopySingle = async (idea: IdeaItem) => {
    const text = `💡 IDEA DE PUBLICACIÓN: ${idea.title}
📱 Formato: ${idea.format}
🎯 Objetivo: ${idea.goal}

🔥 GANCHO INICIAL:
"${idea.hook}"

🎬 CONCEPTO Y QUÉ MOSTRAR:
${idea.concept}

💡 CONSEJO DE GRABACIÓN:
${idea.tip}

Creado con NexaIA Studio para ${formState.service}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(idea.id);
      onShowToast('¡Idea copiada al portapapeles!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleCopyAll = async () => {
    const fullText = ideas
      .map(
        (idea, idx) => `--- IDEA #${idx + 1}: ${idea.title} (${idea.format}) ---
Gancho: "${idea.hook}"
Concepto: ${idea.concept}
Objetivo: ${idea.goal}
Consejo: ${idea.tip}`
      )
      .join('\n\n');

    const ok = await copyToClipboard(`PAQUETE DE IDEAS PARA ${formState.service.toUpperCase()}\n\n` + fullText);
    if (ok) {
      onShowToast('¡Todas las 6 ideas se han copiado!', 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Filters and Copy All */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0B1120] border border-violet-900/30">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-violet-400" />
            Filtrar por formato:
          </span>
          {['todos', 'Reel', 'Carrusel', 'Post', 'Historias'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFilterFormat(fmt)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                filterFormat === fmt
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {fmt === 'todos' ? 'Todos los formatos' : fmt}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopyAll}
          className="text-xs font-semibold px-4 py-2 rounded-xl bg-violet-950/60 hover:bg-violet-900/60 text-violet-200 border border-violet-700/40 transition-colors flex items-center justify-center gap-2"
        >
          <Copy className="w-3.5 h-3.5 text-violet-400" />
          <span>Copiar las 6 ideas juntas</span>
        </button>
      </div>

      {/* Ideas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredIdeas.map((idea) => {
          const saved = isSaved(idea.id);
          const isCopied = copiedId === idea.id;

          return (
            <div
              key={idea.id}
              className="p-6 rounded-2xl bg-[#0B1122]/90 border border-violet-950/60 hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
            >
              <div>
                {/* Header with badges and actions */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {idea.format}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] text-slate-400 bg-slate-800/80 border border-slate-700/60">
                      🎯 {idea.goal}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopySingle(idea)}
                      title="Copiar idea"
                      className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-violet-600/30 border border-slate-700/60 hover:border-violet-500/40 transition-all"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => onSaveIdea(idea)}
                      title={saved ? 'Guardada en favoritos' : 'Guardar idea'}
                      className={`p-2 rounded-xl border transition-all ${
                        saved
                          ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white hover:bg-purple-600/20'
                      }`}
                    >
                      {saved ? <BookmarkCheck className="w-4 h-4 text-purple-400" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-white mb-3">
                  {idea.title}
                </h3>

                {/* Hook Box */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-violet-950/50 via-purple-950/30 to-[#0B1122] border border-violet-800/40 mb-3.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-violet-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    Gancho para detener el scroll:
                  </div>
                  <p className="text-sm font-semibold text-violet-100 italic">
                    "{idea.hook}"
                  </p>
                </div>

                {/* Concept */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <p className="leading-relaxed">
                    <span className="font-semibold text-slate-200">Qué mostrar: </span>
                    {idea.concept}
                  </p>
                </div>
              </div>

              {/* Tip footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-400 bg-slate-900/40 p-2.5 rounded-xl">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="text-slate-300">Consejo Pro:</strong> {idea.tip}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
