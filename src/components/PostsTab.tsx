import React, { useState } from 'react';
import { PenTool, Copy, Check, Bookmark, BookmarkCheck, Hash, Sparkles, MessageCircle } from 'lucide-react';
import { PostItem, GeneratorFormState } from '../types';
import { copyToClipboard } from '../utils/clipboard';

interface PostsTabProps {
  posts: PostItem[];
  formState: GeneratorFormState;
  onSavePost: (post: PostItem) => void;
  isSaved: (id: string) => boolean;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const PostsTab: React.FC<PostsTabProps> = ({
  posts,
  formState,
  onSavePost,
  isSaved,
  onShowToast,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedTagsId, setCopiedTagsId] = useState<string | null>(null);

  const getAllHashtags = (post: PostItem) => {
    return [...post.hashtagsNiche, ...post.hashtagsLocal, ...post.hashtagsTrend].join(' ');
  };

  const handleCopyFullPost = async (post: PostItem) => {
    const fullText = `${post.headline}

${post.body}

👉 ${post.callToAction}

.
.
.
${getAllHashtags(post)}`;

    const ok = await copyToClipboard(fullText);
    if (ok) {
      setCopiedId(post.id);
      onShowToast('¡Texto completo copiado listo para publicar!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleCopyHashtagsOnly = async (post: PostItem) => {
    const tags = getAllHashtags(post);
    const ok = await copyToClipboard(tags);
    if (ok) {
      setCopiedTagsId(post.id);
      onShowToast('¡Bloque de hashtags copiado al portapapeles!', 'success');
      setTimeout(() => setCopiedTagsId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-[#0B1120] border border-violet-900/30 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <PenTool className="w-4 h-4 text-violet-400" />
          <span>
            Textos persuasivos con estructura probada: <strong>Gancho inicial</strong> + <strong>Cuerpo de valor</strong> + <strong>Llamada a la acción</strong> + <strong>Hashtags segmentados</strong>.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post, idx) => {
          const saved = isSaved(post.id);
          const isCopied = copiedId === post.id;
          const isTagsCopied = copiedTagsId === post.id;

          return (
            <div
              key={post.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#0B1122]/90 border border-violet-900/40 shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold text-sm flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                      Tipo de publicación:
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                      {post.type}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleCopyFullPost(post)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/30 transition-all flex items-center gap-1.5"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? '¡Texto Copiado!' : 'Copiar texto completo'}</span>
                  </button>

                  <button
                    onClick={() => onSavePost(post)}
                    className={`p-2 rounded-xl border transition-all ${
                      saved
                        ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-purple-600/20'
                    }`}
                    title={saved ? 'Guardado en tu biblioteca' : 'Guardar publicación'}
                  >
                    {saved ? <BookmarkCheck className="w-4 h-4 text-purple-400" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Headline */}
              <div className="mt-5 p-4 rounded-xl bg-violet-950/40 border border-violet-800/40">
                <div className="text-[11px] font-bold uppercase tracking-wider text-violet-300 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  Primera línea (Gancho visual antes de "ver más"):
                </div>
                <p className="text-sm sm:text-base font-bold text-white">
                  {post.headline}
                </p>
              </div>

              {/* Body */}
              <div className="mt-4 p-5 rounded-2xl bg-[#060A14] border border-slate-800/90 text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                {post.body}
              </div>

              {/* Call to action */}
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-800/30 flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-emerald-300 block mb-0.5">
                    Llamada a la Acción (CTA para comentarios o mensajes):
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">
                    {post.callToAction}
                  </p>
                </div>
              </div>

              {/* Hashtags 3 columns/blocks */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Hash className="w-4 h-4 text-violet-400" />
                    Hashtags Recomendados (Estratégicamente segmentados):
                  </span>
                  <button
                    onClick={() => handleCopyHashtagsOnly(post)}
                    className="text-xs font-semibold text-violet-300 hover:text-white px-2.5 py-1 rounded-lg bg-violet-950/40 border border-violet-800/40 transition-colors flex items-center gap-1"
                  >
                    {isTagsCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isTagsCopied ? '¡Hashtags copiados!' : 'Copiar solo hashtags'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Nicho */}
                  <div className="p-3 rounded-xl bg-[#070C18] border border-slate-800">
                    <span className="text-[11px] font-semibold text-violet-400 block mb-2">
                      🎯 Específicos del Servicio
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {post.hashtagsNiche.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[11px] text-slate-300 bg-violet-950/30 px-2 py-0.5 rounded border border-violet-900/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Locales */}
                  <div className="p-3 rounded-xl bg-[#070C18] border border-slate-800">
                    <span className="text-[11px] font-semibold text-purple-400 block mb-2">
                      📍 Locales & Comunidad
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {post.hashtagsLocal.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[11px] text-slate-300 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-900/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tendencia */}
                  <div className="p-3 rounded-xl bg-[#070C18] border border-slate-800">
                    <span className="text-[11px] font-semibold text-pink-400 block mb-2">
                      ⚡ Descubrimiento / Virales
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {post.hashtagsTrend.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[11px] text-slate-300 bg-pink-950/30 px-2 py-0.5 rounded border border-pink-900/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
