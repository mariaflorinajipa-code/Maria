import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, Copy, Check, Bookmark, BookmarkCheck, Download, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { CalendarWeek, CalendarDayItem, GeneratorFormState } from '../types';
import { copyToClipboard, downloadFile } from '../utils/clipboard';

interface CalendarTabProps {
  calendar: CalendarWeek[];
  formState: GeneratorFormState;
  onSaveCalendar: (calendar: CalendarWeek[]) => void;
  isSaved: boolean;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const CalendarTab: React.FC<CalendarTabProps> = ({
  calendar,
  formState,
  onSaveCalendar,
  isSaved,
  onShowToast,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleComplete = (itemId: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const displayedWeeks = selectedWeek === 'all'
    ? calendar
    : calendar.filter((w) => w.week === selectedWeek);

  const totalPosts = calendar.reduce((acc, w) => acc + w.items.length, 0);
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = totalPosts > 0 ? Math.round((completedCount / totalPosts) * 100) : 0;

  const handleCopyCalendar = async () => {
    let text = `📅 CALENDARIO MENSUAL DE CONTENIDOS - NEXAIA STUDIO\n`;
    text += `Negocio: ${formState.businessType} | Servicio: ${formState.service}\n`;
    text += `Red: ${formState.network} | Tono: ${formState.tone}\n\n`;

    calendar.forEach((w) => {
      text += `=== SEMANA ${w.week}: ${w.weekFocus.toUpperCase()} ===\n`;
      w.items.forEach((item) => {
        text += `• ${item.day} [${item.format}] (${item.objective}): ${item.topic}\n`;
        text += `  Gancho: "${item.hook}"\n`;
        text += `  Detalle: ${item.shortDescription}\n\n`;
      });
      text += `\n`;
    });

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      onShowToast('¡Calendario mensual completo copiado!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadMarkdown = () => {
    let md = `# 📅 Calendario Mensual de Contenido - NexaIA Studio\n\n`;
    md += `**Negocio:** ${formState.businessType}  \n`;
    md += `**Servicio:** ${formState.service}  \n`;
    md += `**Red Social:** ${formState.network}  \n\n`;

    calendar.forEach((w) => {
      md += `## 🌟 Semana ${w.week}: ${w.weekFocus}\n\n`;
      md += `| Día | Formato | Objetivo | Tema / Título | Gancho |\n`;
      md += `|---|---|---|---|---|\n`;
      w.items.forEach((item) => {
        md += `| **${item.day}** | ${item.format} | ${item.objective} | ${item.topic} | *"${item.hook}"* |\n`;
      });
      md += `\n`;
    });

    downloadFile(`calendario-mensual-${formState.businessType || 'negocio'}.md`, md, 'text/markdown;charset=utf-8');
    onShowToast('Calendario descargado como Markdown (.md)', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header and Progress Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0B1122]/90 border border-violet-900/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Calendar className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-xl text-white">
              Planificación Mensual (4 Semanas)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {totalPosts} publicaciones estratégicas distribuidas con coherencia para no agobiarte.
          </p>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-3 bg-[#070C18] p-3 rounded-2xl border border-slate-800 self-stretch sm:self-auto justify-between sm:justify-start">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Progreso del mes:</span>
            <span className="text-xs font-bold text-violet-300">
              {completedCount} de {totalPosts} publicados
            </span>
          </div>
          <div className="w-16 bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-500 to-emerald-400 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Week Selector & Export Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0B1120] border border-violet-900/30">
        {/* Week filter pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedWeek('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedWeek === 'all'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Mes Completo
          </button>
          {[1, 2, 3, 4].map((wk) => (
            <button
              key={wk}
              onClick={() => setSelectedWeek(wk)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedWeek === wk
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Semana {wk}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleCopyCalendar}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-violet-950/60 hover:bg-violet-900/60 text-violet-200 border border-violet-700/40 transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-violet-400" />}
            <span>{copied ? '¡Copiado!' : 'Copiar texto'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Descargar archivo Markdown"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span>Descargar .md</span>
          </button>

          <button
            onClick={() => onSaveCalendar(calendar)}
            className={`p-2 rounded-xl border transition-all ${
              isSaved
                ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isSaved ? 'Calendario guardado' : 'Guardar calendario'}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-purple-400" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Calendar Weeks Display */}
      <div className="space-y-6">
        {displayedWeeks.map((week) => (
          <div
            key={week.week}
            className="p-6 rounded-3xl bg-[#0B1122]/90 border border-violet-900/40 shadow-xl space-y-4"
          >
            {/* Week Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-violet-600 text-white">
                  Semana {week.week}
                </span>
                <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                  {week.weekFocus}
                </h4>
              </div>
              <span className="text-xs text-slate-400">
                {week.items.length} publicaciones programadas
              </span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {week.items.map((item) => {
                const isDone = Boolean(completedItems[item.id]);

                return (
                  <div
                    key={item.id}
                    onClick={() => toggleComplete(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isDone
                        ? 'bg-[#09111E]/70 border-emerald-500/40 opacity-75'
                        : 'bg-[#070C18] border-slate-800 hover:border-violet-500/40 hover:bg-[#0A1020]'
                    }`}
                  >
                    <div>
                      {/* Top Day & Objective */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="text-slate-400 hover:text-emerald-400 transition-colors"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-600" />
                            )}
                          </button>
                          <span className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {item.day}
                          </span>
                        </div>

                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-violet-950/60 border border-violet-800/40 text-violet-300">
                          {item.format}
                        </span>
                      </div>

                      {/* Topic */}
                      <h5 className={`font-semibold text-xs sm:text-sm mb-2 ${isDone ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                        {item.topic}
                      </h5>

                      {/* Hook Box */}
                      <div className="p-2.5 rounded-xl bg-violet-950/30 border border-violet-900/30 mb-2">
                        <span className="text-[10px] font-bold text-violet-400 block mb-0.5">
                          Gancho:
                        </span>
                        <p className="text-xs text-violet-200 italic font-medium">
                          "{item.hook}"
                        </p>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.shortDescription}
                      </p>
                    </div>

                    {/* Bottom Objective */}
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Objetivo:</span>
                      <span className="font-semibold text-slate-300">
                        {item.objective}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
