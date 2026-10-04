import React from 'react';
import { Sparkles, Wand2, RefreshCw, MapPin, Users, Volume2, Share2, HelpCircle } from 'lucide-react';
import { GeneratorFormState, BusinessPreset } from '../types';
import { BUSINESS_PRESETS, TONE_OPTIONS, AUDIENCE_SUGGESTIONS } from '../data/fallbackData';

interface GeneratorFormProps {
  formState: GeneratorFormState;
  setFormState: React.Dispatch<React.SetStateAction<GeneratorFormState>>;
  onGenerate: () => void;
  isLoading: boolean;
  onLoadExample: () => void;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  formState,
  setFormState,
  onGenerate,
  isLoading,
  onLoadExample,
}) => {
  const currentPreset = BUSINESS_PRESETS.find((p) => p.id === formState.businessType);

  const handleBusinessTypeChange = (preset: BusinessPreset) => {
    setFormState((prev) => ({
      ...prev,
      businessType: preset.id,
      service: preset.defaultService,
      audience: prev.audience || preset.defaultAudience,
      tone: prev.tone || preset.defaultTone,
    }));
  };

  const handleServiceSelect = (serviceText: string) => {
    setFormState((prev) => ({ ...prev, service: serviceText }));
  };

  const handleAudienceSelect = (audienceText: string) => {
    setFormState((prev) => ({ ...prev, audience: audienceText }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.service.trim()) return;
    onGenerate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0B1120]/90 rounded-3xl border border-violet-900/40 p-5 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-3">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Wand2 className="w-5 h-5" />
            </span>
            Configura tu negocio y campaña
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Indica los datos clave para generar ideas, guiones, textos y calendario 100% personalizados.
          </p>
        </div>

        <button
          type="button"
          onClick={onLoadExample}
          className="text-xs font-semibold text-violet-300 hover:text-white px-3.5 py-2 rounded-xl bg-violet-950/40 hover:bg-violet-900/40 border border-violet-800/40 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5 text-violet-400" />
          <span>Cargar ejemplo rápido</span>
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {/* 1. Tipo de Negocio */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2.5">
            1. Tipo de Negocio <span className="text-violet-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {BUSINESS_PRESETS.map((preset) => {
              const isSelected = formState.businessType === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleBusinessTypeChange(preset)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-violet-600/30 to-purple-600/10 border-violet-400 text-white shadow-md shadow-violet-950/50 ring-1 ring-violet-400/50'
                      : 'bg-[#0E1528]/60 border-slate-800/90 text-slate-300 hover:bg-[#141E38] hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl mb-1.5">{preset.icon}</span>
                  <span className="text-xs font-semibold leading-tight line-clamp-2">
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>

          {formState.businessType === 'otro' && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Escribe el tipo de negocio (ej: Taller mecánico, Floristería, Academia de idiomas...)"
                value={formState.customBusiness}
                onChange={(e) => setFormState((prev) => ({ ...prev, customBusiness: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070C18] border border-violet-500/40 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          )}
        </div>

        {/* 2. Servicio o Producto */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-200">
              2. Servicio o producto específico a promocionar <span className="text-violet-400">*</span>
            </label>
            <span className="text-[11px] text-slate-400">Sé específico para mejores resultados</span>
          </div>

          <input
            type="text"
            required
            placeholder="Ej: Balayage iluminador, Menú degustación de fin de semana, Plan mensual de entrenamiento..."
            value={formState.service}
            onChange={(e) => setFormState((prev) => ({ ...prev, service: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-[#070C18] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          />

          {/* Sugerencias de servicios */}
          {currentPreset && currentPreset.sampleServices && currentPreset.sampleServices.length > 0 && (
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium text-slate-400 mr-1">Sugerencias rápidas:</span>
              {currentPreset.sampleServices.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleServiceSelect(sample)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-violet-950/40 hover:bg-violet-900/60 border border-violet-800/40 text-violet-300 hover:text-white transition-colors"
                >
                  + {sample}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Público Objetivo & Ciudad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-violet-400" />
                3. Público objetivo
              </label>
            </div>
            <input
              type="text"
              placeholder="Ej: Jóvenes de 20 a 35 años, Vecinos del barrio, Familias..."
              value={formState.audience}
              onChange={(e) => setFormState((prev) => ({ ...prev, audience: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#070C18] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <div className="mt-2 flex flex-wrap gap-1">
              {AUDIENCE_SUGGESTIONS.slice(0, 2).map((aud, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAudienceSelect(aud)}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  {aud.substring(0, 32)}...
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-violet-400" />
              Ciudad o Barrio (para hashtags locales)
            </label>
            <input
              type="text"
              placeholder="Ej: Madrid Centro, Valencia, Sevilla, Mi Barrio..."
              value={formState.city}
              onChange={(e) => setFormState((prev) => ({ ...prev, city: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#070C18] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Ayuda a generar hashtags geolocalizados para atraer clientes de tu zona.
            </span>
          </div>
        </div>

        {/* 4. Tono & Red Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-violet-400" />
              4. Tono de comunicación
            </label>
            <div className="grid grid-cols-1 gap-2">
              <select
                value={formState.tone}
                onChange={(e) => setFormState((prev) => ({ ...prev, tone: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070C18] border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t.id} value={t.label} className="bg-[#0B1120]">
                    {t.label} - {t.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-violet-400" />
              5. Red Social Principal
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Instagram', 'TikTok', 'Ambas'] as const).map((net) => {
                const isSelected = formState.network === net;
                return (
                  <button
                    key={net}
                    type="button"
                    onClick={() => setFormState((prev) => ({ ...prev, network: net }))}
                    className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 border-violet-400 text-white shadow-md'
                        : 'bg-[#0E1528]/60 border-slate-800 text-slate-300 hover:bg-[#141E38]'
                    }`}
                  >
                    {net === 'Instagram' ? '📸 Instagram' : net === 'TikTok' ? '🎵 TikTok' : '⚡ Ambas'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Notas extra (opcional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Detalles adicionales (opcional)
          </label>
          <input
            type="text"
            placeholder="Ej: Queremos destacar que abrimos los domingos, o que usamos productos veganos..."
            value={formState.extraNotes}
            onChange={(e) => setFormState((prev) => ({ ...prev, extraNotes: e.target.value }))}
            className="w-full px-4 py-2 rounded-xl bg-[#070C18] border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || !formState.service.trim()}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-base shadow-xl flex items-center justify-center gap-3 transition-all duration-300 ${
              isLoading || !formState.service.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.01] active:scale-[0.99] border border-violet-400/40 cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-violet-300" />
                <span>Generando contenido con IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-purple-200" />
                <span>Generar Ideas, Guiones, Textos y Calendario</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
