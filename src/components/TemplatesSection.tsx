import React from 'react';
import { BookOpen, Sparkles, ArrowRight, Wand2, Check } from 'lucide-react';
import { BUSINESS_PRESETS } from '../data/fallbackData';
import { BusinessPreset } from '../types';

interface TemplatesSectionProps {
  onSelectPreset: (preset: BusinessPreset, service?: string) => void;
  onGoToGenerator: () => void;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({
  onSelectPreset,
  onGoToGenerator,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1122]/90 border border-violet-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Plantillas de Contenido por Negocio
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Modelos probados y adaptados al lenguaje real de cada sector. Selecciona cualquier servicio para cargar al instante su configuración óptima.
          </p>
        </div>

        <button
          onClick={onGoToGenerator}
          className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-violet-600/30 self-start md:self-auto"
        >
          <Wand2 className="w-4 h-4" />
          <span>Abrir Generador en Blanco</span>
        </button>
      </div>

      {/* Grid of Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BUSINESS_PRESETS.map((preset) => (
          <div
            key={preset.id}
            className="p-6 rounded-3xl bg-[#0B1122]/90 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2.5 rounded-2xl bg-[#070C18] border border-violet-900/30">
                    {preset.icon}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {preset.label}
                    </h3>
                    <span className="text-xs text-violet-400 font-medium">
                      Tono: {preset.defaultTone}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPreset(preset)}
                  className="px-3 py-1.5 rounded-xl bg-violet-950/60 hover:bg-violet-900/60 text-violet-300 hover:text-white border border-violet-800/40 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <span>Cargar sector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-4 italic">
                "{preset.tagline}"
              </p>

              <div className="space-y-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Servicios y campañas preconfiguradas:
                </span>
                <div className="space-y-1.5">
                  {preset.sampleServices.map((srv, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => onSelectPreset(preset, srv)}
                      className="w-full text-left p-2.5 rounded-xl bg-[#070C18] hover:bg-violet-950/40 border border-slate-800/80 hover:border-violet-700/40 transition-colors flex items-center justify-between group"
                    >
                      <span className="text-xs text-slate-300 group-hover:text-white transition-colors truncate pr-2">
                        • {srv}
                      </span>
                      <span className="text-[10px] text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity font-semibold shrink-0">
                        Usar servicio →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
              Público recomendado: {preset.defaultAudience}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
