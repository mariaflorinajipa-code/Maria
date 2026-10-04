import React, { useState } from 'react';
import { Bookmark, Search, Trash2, Copy, Check, Download, FileText, Sparkles, Film, PenTool, Calendar, ArrowRight, AlertTriangle } from 'lucide-react';
import { SavedItem } from '../types';
import { copyToClipboard, downloadFile } from '../utils/clipboard';

interface SavedLibraryProps {
  items: SavedItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onGoToGenerator: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const SavedLibrary: React.FC<SavedLibraryProps> = ({
  items,
  onRemoveItem,
  onClearAll,
  onGoToGenerator,
  onShowToast,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesType = filterType === 'all' || item.itemType === filterType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCopyItem = async (item: SavedItem) => {
    let content = `📌 ${item.title.toUpperCase()}\n`;
    content += `Negocio: ${item.business} | Servicio: ${item.service}\n\n`;

    if (item.itemType === 'idea') {
      content += `Gancho: "${item.data.hook}"\n`;
      content += `Concepto: ${item.data.concept}\n`;
      content += `Consejo: ${item.data.tip}\n`;
    } else if (item.itemType === 'script') {
      content += `Duración: ${item.data.duration}\n`;
      content += `Gancho: "${item.data.hook}"\n\n`;
      item.data.scenes?.forEach((s: any, idx: number) => {
        content += `[Escena ${idx + 1} - ${s.time}]\nVisual: ${s.visual}\nAudio: "${s.audio}"\nTexto: "${s.onScreenText}"\n\n`;
      });
      content += `CTA: ${item.data.callToAction}\n\n`;
      content += `Pie de foto:\n${item.data.caption}\n\n${item.data.hashtags?.join(' ')}`;
    } else if (item.itemType === 'post') {
      content += `${item.data.headline}\n\n${item.data.body}\n\n${item.data.callToAction}\n\n`;
      const allTags = [...(item.data.hashtagsNiche || []), ...(item.data.hashtagsLocal || []), ...(item.data.hashtagsTrend || [])];
      content += allTags.join(' ');
    } else if (item.itemType === 'calendar') {
      item.data.forEach((w: any) => {
        content += `=== SEMANA ${w.week}: ${w.weekFocus} ===\n`;
        w.items?.forEach((i: any) => {
          content += `• ${i.day} (${i.format}): ${i.topic} - Gancho: "${i.hook}"\n`;
        });
        content += `\n`;
      });
    }

    const ok = await copyToClipboard(content);
    if (ok) {
      setCopiedId(item.id);
      onShowToast('¡Contenido guardado copiado al portapapeles!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleExportText = () => {
    if (items.length === 0) return;
    let full = `BIBLIOTECA DE CONTENIDOS GUARDADOS - NEXAIA STUDIO\n`;
    full += `Fecha de exportación: ${new Date().toLocaleDateString('es-ES')}\n`;
    full += `Total de elementos: ${items.length}\n`;
    full += `========================================================\n\n`;

    items.forEach((item, index) => {
      full += `[ITEM #${index + 1}] ${item.title} (${item.itemType.toUpperCase()})\n`;
      full += `Negocio: ${item.business} | Servicio: ${item.service}\n`;
      full += `Guardado: ${new Date(item.createdAt).toLocaleDateString('es-ES')}\n\n`;

      if (item.itemType === 'idea') {
        full += `Formato: ${item.data.format}\nGancho: "${item.data.hook}"\nConcepto: ${item.data.concept}\nConsejo: ${item.data.tip}\n`;
      } else if (item.itemType === 'script') {
        full += `Gancho: "${item.data.hook}"\nAudio: ${item.data.musicSuggestion}\n`;
        item.data.scenes?.forEach((s: any, sIdx: number) => {
          full += `  Escena ${sIdx + 1} (${s.time}):\n    Visual: ${s.visual}\n    Audio: "${s.audio}"\n    Texto: "${s.onScreenText}"\n`;
        });
        full += `CTA: ${item.data.callToAction}\nPie:\n${item.data.caption}\n${item.data.hashtags?.join(' ')}\n`;
      } else if (item.itemType === 'post') {
        full += `Titular: ${item.data.headline}\n\n${item.data.body}\n\nCTA: ${item.data.callToAction}\n`;
        const allTags = [...(item.data.hashtagsNiche || []), ...(item.data.hashtagsLocal || []), ...(item.data.hashtagsTrend || [])];
        full += `Hashtags: ${allTags.join(' ')}\n`;
      } else if (item.itemType === 'calendar') {
        item.data.forEach((w: any) => {
          full += `  Semana ${w.week}: ${w.weekFocus}\n`;
          w.items?.forEach((i: any) => {
            full += `    - ${i.day} [${i.format}]: ${i.topic}\n`;
          });
        });
      }

      full += `\n--------------------------------------------------------\n\n`;
    });

    downloadFile(`nexaia-contenidos-guardados.txt`, full, 'text/plain;charset=utf-8');
    onShowToast('Archivo de texto (.txt) descargado correctamente', 'success');
  };

  const handleExportJSON = () => {
    if (items.length === 0) return;
    const jsonStr = JSON.stringify(items, null, 2);
    downloadFile(`nexaia-backup-${Date.now()}.json`, jsonStr, 'application/json');
    onShowToast('Copia de seguridad en JSON descargada', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header and Bulk Actions */}
      <div className="p-6 rounded-3xl bg-[#0B1122]/90 border border-violet-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Bookmark className="w-5 h-5" />
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Mis Contenidos Guardados
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-600/30 text-violet-300 border border-violet-500/30">
              {items.length} elementos
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tu biblioteca personal de ideas, guiones y publicaciones lista para consultar cuando vayas a grabar o publicar.
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportText}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-violet-950/60 hover:bg-violet-900/60 text-violet-200 border border-violet-700/40 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-violet-400" />
              <span>Descargar TXT</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Exportar archivo JSON"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Exportar JSON</span>
            </button>

            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 border border-rose-800/40 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Vaciar todo</span>
            </button>
          </div>
        )}
      </div>

      {/* Confirmation modal for Clear All */}
      {showClearConfirm && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-600/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-rose-100 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="text-sm font-semibold">
              ¿Seguro que deseas eliminar todos los contenidos guardados? Esta acción no se puede deshacer.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onClearAll();
                setShowClearConfirm(false);
                onShowToast('Biblioteca vaciada con éxito', 'info');
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
            >
              Sí, eliminar todo
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      {items.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#0B1120] border border-violet-900/30">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por título, negocio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#070C18] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'idea', label: 'Ideas' },
              { id: 'script', label: 'Guiones Reels' },
              { id: 'post', label: 'Publicaciones' },
              { id: 'calendar', label: 'Calendarios' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  filterType === tab.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#0B1122]/60 border border-slate-800/80 max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-violet-950/60 border border-violet-800/50 flex items-center justify-center mx-auto mb-4 text-violet-400">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-bold text-xl text-white mb-2">
            No tienes contenidos guardados todavía
          </h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Genera ideas, guiones para Reels o textos para tus publicaciones y pulsa el botón de marcador <strong>Guardar</strong> para tenerlos aquí siempre a mano.
          </p>
          <button
            onClick={onGoToGenerator}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition-all flex items-center gap-2 mx-auto"
          >
            <span>Ir al generador de contenido</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-[#0B1122]/60 border border-slate-800">
          <p className="text-sm text-slate-400">
            No se han encontrado resultados para los filtros seleccionados.
          </p>
        </div>
      ) : (
        /* Items Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#0B1122]/90 border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-950 border border-violet-800/40 text-violet-300 flex items-center gap-1">
                      {item.itemType === 'idea' && <Sparkles className="w-3 h-3" />}
                      {item.itemType === 'script' && <Film className="w-3 h-3" />}
                      {item.itemType === 'post' && <PenTool className="w-3 h-3" />}
                      {item.itemType === 'calendar' && <Calendar className="w-3 h-3" />}
                      {item.itemType}
                    </span>

                    <span className="text-[11px] text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString('es-ES')}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-violet-300 mb-3">
                    {item.business} • <span className="text-slate-400">{item.service}</span>
                  </p>

                  {/* Preview Snippet */}
                  <div className="p-3 rounded-xl bg-[#070C18] border border-slate-850 text-xs text-slate-300 line-clamp-3 mb-4">
                    {item.itemType === 'idea' && `Gancho: "${item.data.hook}"`}
                    {item.itemType === 'script' && `Gancho: "${item.data.hook}" | ${item.data.duration}`}
                    {item.itemType === 'post' && item.data.headline}
                    {item.itemType === 'calendar' && `Calendario mensual de 4 semanas (${item.data.length} semanas)`}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-850 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyItem(item)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-violet-950/60 hover:bg-violet-900/60 text-violet-200 border border-violet-800/40 transition-colors flex items-center gap-1.5"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-violet-400" />}
                    <span>{isCopied ? '¡Copiado!' : 'Copiar'}</span>
                  </button>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    title="Eliminar de guardados"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
