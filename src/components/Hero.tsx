import React from 'react';
import { Sparkles, ArrowRight, Wand2, Film, Calendar, CheckCircle2, ShieldCheck, Flame, ChevronRight } from 'lucide-react';
import { BUSINESS_PRESETS } from '../data/fallbackData';
import { BusinessPreset } from '../types';

interface HeroProps {
  onStartCreating: () => void;
  onSelectPreset: (preset: BusinessPreset) => void;
  onOpenPricing?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCreating, onSelectPreset, onOpenPricing }) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-purple-700/20 via-violet-600/15 to-indigo-800/10 blur-[130px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-violet-600/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge & Promo banner */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs sm:text-sm font-medium shadow-inner shadow-violet-500/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Creador de contenido para Instagram y TikTok</span>
            </div>
            {onOpenPricing && (
              <button
                onClick={onOpenPricing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/25 transition-all cursor-pointer"
              >
                <span>👑 Paquetes Gold & Premium</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 rounded font-extrabold">NUEVO</span>
              </button>
            )}
          </div>

          {/* Main Title */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Nexa<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">IA</span> Studio
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            La herramienta definitiva para que peluquerías, salones de estética, restaurantes, tiendas de ropa, gimnasios y negocios locales creen contenido profesional para redes en minutos, sin bloqueos creativos ni agencias caras.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartCreating}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 border border-purple-400/30"
            >
              <Wand2 className="w-5 h-5 text-purple-200" />
              <span>Crear contenido</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#negocios"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#0F172A]/80 hover:bg-[#1E293B] text-slate-200 hover:text-white font-semibold text-base border border-slate-700/60 hover:border-violet-500/40 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Ver ejemplos por negocio</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Trust points */}
          <div className="mt-10 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-8 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Guiones de Reels con tiempos exactos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Textos listos para copiar y publicar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Calendario mensual de 4 semanas</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
              <span>100% en español y sin tarjeta bancaria</span>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0E1528] to-[#0A0F1D] border border-violet-900/30 hover:border-violet-500/50 transition-all duration-300 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">1. Ideas de Publicaciones</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Propuestas categorizadas en Reels, carruseles y publicaciones con ganchos diseñados para detener el scroll.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0E1528] to-[#0A0F1D] border border-violet-900/30 hover:border-violet-500/50 transition-all duration-300 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">2. Guiones Reels (15-30s)</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Desglose segundo a segundo con ganchos iniciales, textos en pantalla, voz en off y llamada a la acción final.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0E1528] to-[#0A0F1D] border border-violet-900/30 hover:border-violet-500/50 transition-all duration-300 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">3. Textos & Hashtags</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Textos persuasivos para promociones y consejos, acompañados de bloques de hashtags de nicho, locales y de tendencia.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0E1528] to-[#0A0F1D] border border-violet-900/30 hover:border-violet-500/50 transition-all duration-300 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">4. Calendario Mensual</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Estructura estratégica de 4 semanas para publicar de manera constante sin agobios ni falta de tiempo.
            </p>
          </div>
        </div>

        {/* Quick Business Selection Section */}
        <div id="negocios" className="mt-20 pt-10 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Elige tu sector</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
              ¿Qué tipo de negocio quieres promocionar hoy?
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Haz clic en cualquiera para cargar una plantilla lista y probar el generador en 1 segundo:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUSINESS_PRESETS.slice(0, 6).map((preset) => (
              <div
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="p-5 rounded-2xl bg-[#0B1122]/90 border border-slate-800 hover:border-violet-500/60 hover:bg-[#101830] transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-violet-950/40 border border-violet-800/30 group-hover:scale-110 transition-transform">
                      {preset.icon}
                    </span>
                    <span className="text-xs font-semibold text-violet-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Probar ahora <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-white group-hover:text-violet-300 transition-colors">
                    {preset.label}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {preset.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[200px] text-slate-300">
                    Ej: {preset.sampleServices[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
