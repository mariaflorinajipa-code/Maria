import React, { useState } from 'react';
import { Film, Clock, Music, MessageSquare, Copy, Check, Bookmark, BookmarkCheck, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { ScriptItem, GeneratorFormState } from '../types';
import { copyToClipboard } from '../utils/clipboard';

interface ScriptsTabProps {
  scripts: ScriptItem[];
  formState: GeneratorFormState;
  onSaveScript: (script: ScriptItem) => void;
  isSaved: (id: string) => boolean;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const ScriptsTab: React.FC<ScriptsTabProps> = ({
  scripts,
  formState,
  onSaveScript,
  isSaved,
  onShowToast,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCaptionId, setCopiedCaptionId] = useState<string | null>(null);

  const handleCopyFullScript = async (script: ScriptItem) => {
    const scenesText = script.scenes
      .map(
        (scene, i) => `[ESCENA ${i + 1} | ${scene.time}]
👁️ Visual: ${scene.visual}
🎙️ Voz / Audio: "${scene.audio}"
📱 Texto en pantalla: "${scene.onScreenText}"`
      )
      .join('\n\n');

    const full = `🎬 GUION REEL/TIKTOK (${script.duration}): ${script.title}
🎵 Audio sugerido: ${script.musicSuggestion}

🔥 GANCHO INICIAL (0-3s):
"${script.hook}"

⏱️ DESGLOSE DE ESCENAS:
${scenesText}

📢 LLAMADA A LA ACCIÓN (CTA):
${script.callToAction}

📝 PIE DE VÍDEO (CAPTION):
${script.caption}

🏷️ HASHTAGS:
${script.hashtags.join(' ')}

Generado con NexaIA Studio para ${formState.service}`;

    const ok = await copyToClipboard(full);
    if (ok) {
      setCopiedId(script.id);
      onShowToast('¡Guion completo copiado con éxito!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleCopyCaptionOnly = async (script: ScriptItem) => {
    const text = `${script.caption}\n\n${script.hashtags.join(' ')}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedCaptionId(script.id);
      onShowToast('¡Texto y hashtags del vídeo copiados!', 'success');
      setTimeout(() => setCopiedCaptionId(null), 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-4 rounded-2xl bg-[#0B1120] border border-violet-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-violet-400" />
          <span>
            Guiones optimizados para retención de audiencia en <strong className="text-white">Instagram Reels</strong> y <strong className="text-white">TikTok</strong> (15 a 30 segundos).
          </span>
        </div>
        <span className="text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
          💡 Consejo: Graba siempre en formato vertical (9:16)
        </span>
      </div>

      <div className="space-y-8">
        {scripts.map((script, idx) => {
          const saved = isSaved(script.id);
          const isFullCopied = copiedId === script.id;
          const isCaptionCopied = copiedCaptionId === script.id;

          return (
            <div
              key={script.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#0B1122]/90 border border-violet-900/40 shadow-2xl relative overflow-hidden"
            >
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/40 text-violet-300 font-bold text-sm flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                      {script.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 text-violet-300">
                        <Clock className="w-3.5 h-3.5" />
                        {script.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Music className="w-3.5 h-3.5 text-purple-400" />
                        {script.musicSuggestion}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleCopyFullScript(script)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/30 transition-all flex items-center gap-1.5"
                  >
                    {isFullCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isFullCopied ? '¡Copiado!' : 'Copiar guion completo'}</span>
                  </button>

                  <button
                    onClick={() => onSaveScript(script)}
                    className={`p-2 rounded-xl border transition-all ${
                      saved
                        ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-purple-600/20'
                    }`}
                    title={saved ? 'Guardado en tu biblioteca' : 'Guardar guion'}
                  >
                    {saved ? <BookmarkCheck className="w-4 h-4 text-purple-400" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Gancho Inicial (0-3s) */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-violet-950/70 via-purple-900/30 to-[#0F172A] border border-violet-500/40">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    Gancho de entrada (0 a 3 segundos):
                  </span>
                  <span className="text-[11px] font-semibold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/40">
                    Crucial para evitar que deslicen
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white italic">
                  "{script.hook}"
                </p>
              </div>

              {/* Scene by Scene Timeline */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-violet-400" />
                  Desglose de Escenas y Tomas:
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {script.scenes.map((scene, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-2xl bg-[#070C18] border border-slate-800/90 hover:border-violet-900/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-violet-950 border border-violet-700/50 text-violet-300">
                          ⏱️ {scene.time}
                        </span>
                        <span className="text-[11px] text-slate-400">Escena {sIdx + 1}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        {/* Visual */}
                        <div className="bg-[#0B1122] p-3 rounded-xl border border-slate-800">
                          <span className="font-semibold text-slate-400 block mb-1 text-[11px]">
                            👁️ Lo que se ve (Cámara):
                          </span>
                          <p className="text-slate-200 leading-relaxed">{scene.visual}</p>
                        </div>

                        {/* Audio / Voiceover */}
                        <div className="bg-[#0B1122] p-3 rounded-xl border border-slate-800">
                          <span className="font-semibold text-slate-400 block mb-1 text-[11px]">
                            🎙️ Lo que se dice (Voz en off):
                          </span>
                          <p className="text-violet-200 italic leading-relaxed">"{scene.audio}"</p>
                        </div>

                        {/* On-screen text */}
                        <div className="bg-[#0B1122] p-3 rounded-xl border border-slate-800">
                          <span className="font-semibold text-slate-400 block mb-1 text-[11px]">
                            📱 Texto en pantalla (Overlay):
                          </span>
                          <p className="text-amber-200 font-medium leading-relaxed">
                            "{scene.onScreenText}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-5 p-3.5 rounded-xl bg-violet-950/30 border border-violet-800/40 flex items-start gap-2.5">
                <span className="text-lg">📢</span>
                <div>
                  <span className="text-xs font-bold text-violet-300 block mb-0.5">
                    Llamada a la Acción Final (CTA):
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">
                    {script.callToAction}
                  </p>
                </div>
              </div>

              {/* Caption & Hashtags Block */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-violet-400" />
                    Descripción del vídeo (Pie de foto listo para publicar):
                  </span>
                  <button
                    onClick={() => handleCopyCaptionOnly(script)}
                    className="text-xs font-semibold text-violet-300 hover:text-white px-2.5 py-1 rounded-lg bg-violet-950/40 border border-violet-800/40 transition-colors flex items-center gap-1"
                  >
                    {isCaptionCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCaptionCopied ? '¡Texto copiado!' : 'Copiar solo pie de foto'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#060A14] border border-slate-800 text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                  {script.caption}
                </div>

                {/* Hashtags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {script.hashtags.map((tag, tagI) => (
                    <span
                      key={tagI}
                      className="text-[11px] font-medium text-violet-300 bg-violet-950/40 px-2.5 py-1 rounded-lg border border-violet-800/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
