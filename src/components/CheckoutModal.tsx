import React, { useState } from 'react';
import { X, Crown, ShieldCheck, Check, ArrowRight, Sparkles, Building2, CreditCard } from 'lucide-react';
import { BillingInterval, PlanTier } from '../types';
import { SUBSCRIPTION_PLANS } from '../utils/subscription';

interface CheckoutModalProps {
  planTier: PlanTier;
  interval: BillingInterval;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tier: PlanTier, interval: BillingInterval, businessName: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  planTier,
  interval,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planTier) || SUBSCRIPTION_PLANS[1];
  const [selectedInterval, setSelectedInterval] = useState<BillingInterval>(interval);
  const [businessName, setBusinessName] = useState('Mi Negocio Local');
  const [email, setEmail] = useState('contacto@minegocio.com');
  const [isProcessing, setIsProcessing] = useState(false);

  const isGold = plan.id === 'gold';
  const isPremium = plan.id === 'premium';
  const price = selectedInterval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  const totalPrice = selectedInterval === 'yearly' ? price * 12 : price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm(plan.id, selectedInterval, businessName);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0B1122] border border-violet-800/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border shadow-lg ${
              isGold
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : isPremium
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            {plan.icon}
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl text-white">
              Activar {plan.name}
            </h3>
            <span className="text-xs text-slate-400">
              {isGold ? 'Acceso Ilimitado & Herramientas Pro' : isPremium ? 'Multinegocio & Funciones Exclusivas' : 'Plan Básico'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Interval Toggle */}
          <div className="p-1 bg-[#070C18] rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedInterval('monthly')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                selectedInterval === 'monthly'
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mensual ({plan.monthlyPrice}€/mes)
            </button>
            <button
              type="button"
              onClick={() => setSelectedInterval('yearly')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                selectedInterval === 'yearly'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Anual ({plan.yearlyPrice}€/mes - Ahorra 20%)
            </button>
          </div>

          {/* Business Details */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nombre de tu negocio o marca:
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ej: Salón Bellas Artes, Restaurante El Puerto..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070C18] border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correo electrónico para avisos:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070C18] border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-4 rounded-2xl bg-[#070C18] border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Suscripción {plan.name} ({selectedInterval === 'yearly' ? 'Anual' : 'Mensual'}):</span>
              <span className="font-semibold text-white">{price}€ / mes</span>
            </div>
            {selectedInterval === 'yearly' && (
              <div className="flex justify-between text-emerald-400 text-[11px]">
                <span>Descuento anual aplicado (20%):</span>
                <span>-{(plan.monthlyPrice - plan.yearlyPrice) * 12}€</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-800/80 flex justify-between font-bold text-sm text-white">
              <span>Total a pagar:</span>
              <span className={isGold ? 'text-amber-400' : 'text-purple-400'}>
                {totalPrice}€
              </span>
            </div>
          </div>

          {/* Demo info note */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-violet-950/40 border border-violet-800/30 text-[11px] text-violet-200">
            <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <p>
              <strong>Activación instantánea:</strong> Tu paquete se habilitará de forma inmediata en la aplicación para comenzar a generar sin límites.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
              isGold
                ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 hover:brightness-110 shadow-amber-500/30'
                : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white hover:brightness-110 shadow-purple-600/40'
            }`}
          >
            {isProcessing ? (
              <span>Activando {plan.name}...</span>
            ) : (
              <>
                <span>Confirmar y Activar {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
