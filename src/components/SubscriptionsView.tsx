import React, { useState } from 'react';
import { Check, Sparkles, Crown, Zap, ShieldCheck, HelpCircle, ArrowRight, Star, Building2, Flame } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../utils/subscription';
import { BillingInterval, PlanTier, UserSubscription } from '../types';

interface SubscriptionsViewProps {
  currentSubscription: UserSubscription;
  onOpenCheckout: (plan: PlanTier, interval: BillingInterval) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const SubscriptionsView: React.FC<SubscriptionsViewProps> = ({
  currentSubscription,
  onOpenCheckout,
  onShowToast,
}) => {
  const [interval, setInterval] = useState<BillingInterval>(currentSubscription.interval || 'monthly');

  return (
    <div className="space-y-12 py-4">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Planes y Suscripciones NexaIA Studio</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Elige el paquete ideal para impulsar las redes de tu negocio
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Sin contratos de permanencia ni agencias costosas. Pasa de publicaciones esporádicas a un plan de contenidos diario y constante con nuestros paquetes <strong className="text-amber-400">Gold</strong> y <strong className="text-violet-400">Premium</strong>.
        </p>

        {/* Current status pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0B1122] border border-violet-800/40 text-xs">
          <span className="text-slate-400">Tu suscripción actual:</span>
          <span className="font-bold uppercase tracking-wider text-violet-300 px-2.5 py-0.5 rounded-full bg-violet-950 border border-violet-700/50">
            {currentSubscription.tier === 'free' ? 'Plan Gratuito' : currentSubscription.tier === 'gold' ? 'Paquete Gold 👑' : 'Paquete Premium 💎'}
          </span>
        </div>

        {/* Billing cycle toggle */}
        <div className="pt-2 flex items-center justify-center">
          <div className="bg-[#070C18] p-1.5 rounded-2xl border border-slate-800 flex items-center gap-2 shadow-inner">
            <button
              onClick={() => setInterval('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                interval === 'monthly'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setInterval('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                interval === 'yearly'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Facturación Anual</span>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                Ahorra 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = currentSubscription.tier === plan.id;
          const isGold = plan.id === 'gold';
          const isPremium = plan.id === 'premium';
          const price = interval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                isGold
                  ? 'bg-gradient-to-b from-[#13160F] via-[#0E1528] to-[#0A0F1D] border-2 border-amber-500/80 shadow-2xl shadow-amber-950/40 lg:-translate-y-2'
                  : isPremium
                  ? 'bg-gradient-to-b from-[#170E28] via-[#0E1528] to-[#0A0F1D] border-2 border-purple-500/80 shadow-2xl shadow-purple-950/40'
                  : 'bg-[#0B1122]/90 border border-slate-800'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className={`px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-lg ${
                      isGold
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 ring-2 ring-amber-300/30'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white ring-2 ring-violet-400/30'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl p-2 rounded-2xl bg-[#070C18] border border-slate-800">
                      {plan.icon}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-white">
                        {plan.name}
                      </h3>
                      <span className="text-xs text-slate-400">
                        {isGold ? 'Para negocios individuales' : isPremium ? 'Para negocios exigentes' : 'Para comenzar'}
                      </span>
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      Activo
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="pb-6 mb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white">
                      {price}€
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      / mes
                    </span>
                  </div>
                  {interval === 'yearly' && plan.monthlyPrice > 0 && (
                    <span className="text-[11px] text-amber-300 mt-1 block font-medium">
                      Facturado anualmente ({price * 12}€ al año)
                    </span>
                  )}
                  {interval === 'monthly' && plan.monthlyPrice > 0 && (
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Sin permanencia, cancelas cuando quieras
                    </span>
                  )}
                  {plan.monthlyPrice === 0 && (
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Gratis para siempre
                    </span>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                    Qué incluye este plan:
                  </span>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isGold
                            ? 'bg-amber-500/20 text-amber-400'
                            : isPremium
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}

                  {plan.limitations && plan.limitations.length > 0 && (
                    <div className="pt-2 space-y-2 border-t border-slate-800/80">
                      {plan.limitations.map((lim, lIdx) => (
                        <div key={lIdx} className="flex items-start gap-2 text-[11px] text-slate-500">
                          <span className="text-slate-600 shrink-0">•</span>
                          <span>{lim}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div>
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3.5 rounded-xl bg-slate-800 text-slate-400 font-semibold text-xs border border-slate-700 cursor-default flex items-center justify-center gap-2"
                  >
                    <span>Tu plan actual está activo</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenCheckout(plan.id, interval)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-xl ${
                      isGold
                        ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 hover:brightness-110 shadow-amber-500/20'
                        : isPremium
                        ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white hover:brightness-110 shadow-purple-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>{plan.id === 'free' ? 'Volver a Plan Gratuito' : `Activar ${plan.name}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison table */}
      <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#0B1122]/90 border border-violet-900/40 shadow-xl">
        <h3 className="font-heading font-bold text-xl text-white mb-2 text-center">
          Comparativa Rápida de Paquetes
        </h3>
        <p className="text-xs text-slate-400 text-center mb-6">
          Diseñados para adaptarse a la fase y tamaño de cada pequeño negocio.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Función / Capacidad</th>
                <th className="pb-3 font-semibold text-center">Gratuito</th>
                <th className="pb-3 font-semibold text-center text-amber-400">Paquete Gold 👑</th>
                <th className="pb-3 font-semibold text-center text-purple-400">Paquete Premium 💎</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 font-medium text-white">Generaciones de contenido</td>
                <td className="py-3 text-center text-slate-400">3 al día</td>
                <td className="py-3 text-center font-bold text-amber-400">Ilimitadas</td>
                <td className="py-3 text-center font-bold text-purple-400">Ilimitadas Prioritarias</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Guiones para Reels y TikTok</td>
                <td className="py-3 text-center text-slate-400">15-20 segundos</td>
                <td className="py-3 text-center text-emerald-400">15-60s con Storyboard</td>
                <td className="py-3 text-center text-emerald-400">15-60s + Tendencias</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Calendario Mensual Estratégico</td>
                <td className="py-3 text-center text-slate-400">Vista básica</td>
                <td className="py-3 text-center text-emerald-400">Descargable Markdown/TXT</td>
                <td className="py-3 text-center text-emerald-400">PDF Imprimible + Agenda</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Herramienta de Biografía para Instagram</td>
                <td className="py-3 text-center text-slate-600">—</td>
                <td className="py-3 text-center text-emerald-400">✓ Incluido</td>
                <td className="py-3 text-center text-emerald-400">✓ Incluido</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Respuestas a Reseñas y Mensajes (DM)</td>
                <td className="py-3 text-center text-slate-600">—</td>
                <td className="py-3 text-center text-slate-600">—</td>
                <td className="py-3 text-center text-emerald-400">✓ Incluido (Exclusivo)</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Gestión Multi-Negocio</td>
                <td className="py-3 text-center text-slate-400">1 perfil</td>
                <td className="py-3 text-center text-slate-400">1 perfil completo</td>
                <td className="py-3 text-center font-bold text-purple-400">Hasta 5 perfiles</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Soporte y Atención</td>
                <td className="py-3 text-center text-slate-400">Comunitario</td>
                <td className="py-3 text-center text-slate-200">Email prioritario</td>
                <td className="py-3 text-center font-bold text-purple-400">WhatsApp directo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0B1122]/90 border border-violet-900/40">
        <h3 className="font-heading font-bold text-xl text-white mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-violet-400" />
          Preguntas Frecuentes sobre las Suscripciones
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-[#070C18] border border-slate-800">
            <h4 className="font-bold text-white mb-1.5">
              ¿Hay permanencia obligatoria?
            </h4>
            <p className="text-slate-400 leading-relaxed">
              No, ninguna. Puedes cancelar o cambiar de plan en cualquier momento con un solo clic desde tu panel sin penalizaciones.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#070C18] border border-slate-800">
            <h4 className="font-bold text-white mb-1.5">
              ¿Qué diferencia hay entre Gold y Premium?
            </h4>
            <p className="text-slate-400 leading-relaxed">
              El paquete Gold es el favorito para negocios independientes que quieren publicar a diario. El paquete Premium añade gestión multinegocio (hasta 5 perfiles) y generador de respuestas a reseñas de clientes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#070C18] border border-slate-800">
            <h4 className="font-bold text-white mb-1.5">
              ¿Cómo se activa mi suscripción?
            </h4>
            <p className="text-slate-400 leading-relaxed">
              La activación es inmediata. Al confirmar tu paquete, todos los límites de generación se levantan al instante y se desbloquean las herramientas exclusivas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#070C18] border border-slate-800">
            <h4 className="font-bold text-white mb-1.5">
              ¿Puedo descargar facturas para mi negocio?
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Sí, los paquetes Gold y Premium incluyen recibos desglosados con CIF/NIF listos para deducir como gasto de marketing y comunicación de tu empresa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
