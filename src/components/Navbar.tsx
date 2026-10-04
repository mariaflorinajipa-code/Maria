import React, { useState } from 'react';
import { Sparkles, Bookmark, Calendar, Wand2, BookOpen, Menu, X, Rocket, Crown, Diamond } from 'lucide-react';
import { UserSubscription } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'generator' | 'calendar' | 'saved' | 'templates' | 'pricing';
  setActiveTab: (tab: 'home' | 'generator' | 'calendar' | 'saved' | 'templates' | 'pricing') => void;
  savedCount: number;
  currentSubscription: UserSubscription;
  onOpenGenerator: () => void;
  onOpenTemplates: () => void;
  onOpenPricing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  currentSubscription,
  onOpenGenerator,
  onOpenTemplates,
  onOpenPricing,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'generator' | 'calendar' | 'saved' | 'templates' | 'pricing') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const isGold = currentSubscription.tier === 'gold';
  const isPremium = currentSubscription.tier === 'premium';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-violet-900/30 bg-[#060A13]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:shadow-purple-500/50 transition-all duration-300 ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-violet-300 transition-colors">
                  Nexa<span className="text-violet-400">IA</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Studio
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Contenido para Pequeños Negocios
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0B1122]/70 p-1.5 rounded-2xl border border-violet-900/40">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleNavClick('generator')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'generator'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Generador</span>
            </button>

            <button
              onClick={() => handleNavClick('calendar')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'calendar'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-violet-400" />
              <span>Calendario</span>
            </button>

            <button
              onClick={() => handleNavClick('templates')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'templates'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-violet-400" />
              <span>Plantillas</span>
            </button>

            <button
              onClick={() => handleNavClick('saved')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative ${
                activeTab === 'saved'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-violet-400" />
              <span>Guardados</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-purple-500 text-white">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Plans / Subscriptions Tab */}
            <button
              onClick={() => handleNavClick('pricing')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'pricing'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : isGold
                  ? 'text-amber-300 bg-amber-950/40 border border-amber-500/30 hover:bg-amber-900/40'
                  : isPremium
                  ? 'text-purple-300 bg-purple-950/40 border border-purple-500/30 hover:bg-purple-900/40'
                  : 'text-amber-300 hover:text-white hover:bg-amber-500/10'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Planes & Suscripciones</span>
              {isGold && <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded">GOLD</span>}
              {isPremium && <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-purple-400 text-slate-950 rounded">PREMIUM</span>}
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Active Plan Pill */}
            <button
              onClick={onOpenPricing}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isGold
                  ? 'bg-amber-950/50 border-amber-500/40 text-amber-300 shadow-md shadow-amber-950/40'
                  : isPremium
                  ? 'bg-purple-950/50 border-purple-500/40 text-purple-300 shadow-md shadow-purple-950/40'
                  : 'bg-[#0B1122] border-slate-700/80 text-slate-300 hover:border-amber-500/40 hover:text-amber-300'
              }`}
            >
              <Crown className={`w-3.5 h-3.5 ${isGold ? 'text-amber-400' : isPremium ? 'text-purple-400' : 'text-slate-400'}`} />
              <span>
                {isGold ? 'Plan Gold Activo' : isPremium ? 'Plan Premium Activo' : 'Ver Paquetes'}
              </span>
            </button>

            <button
              onClick={onOpenGenerator}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs sm:text-sm font-semibold rounded-xl group bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 active:scale-95"
            >
              <span className="relative px-3.5 py-2 transition-all ease-in duration-150 bg-[#0B1122] rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-1.5 text-white">
                <Rocket className="w-3.5 h-3.5 text-violet-400 group-hover:text-white transition-colors" />
                <span>Crear contenido</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenPricing}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 border ${
                isGold
                  ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                  : isPremium
                  ? 'bg-purple-950/80 border-purple-500/50 text-purple-300'
                  : 'bg-violet-950/80 border-violet-700/50 text-violet-300'
              }`}
            >
              <Crown className="w-3 h-3 text-amber-400" />
              <span>{isGold ? 'Gold' : isPremium ? 'Premium' : 'Planes'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/60 border border-violet-900/40"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-violet-900/40 bg-[#080D1A]/95 px-4 pt-3 pb-5 space-y-2 backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 ${
              activeTab === 'home' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <span>🏠 Inicio</span>
          </button>
          <button
            onClick={() => handleNavClick('generator')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 ${
              activeTab === 'generator' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Wand2 className="w-4 h-4 text-violet-400" />
            <span>Generador de Contenido</span>
          </button>
          <button
            onClick={() => handleNavClick('calendar')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 ${
              activeTab === 'calendar' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4 text-violet-400" />
            <span>Calendario Mensual</span>
          </button>
          <button
            onClick={() => handleNavClick('templates')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 ${
              activeTab === 'templates' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4 text-violet-400" />
            <span>Plantillas por Negocio</span>
          </button>
          <button
            onClick={() => handleNavClick('saved')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
              activeTab === 'saved' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-4 h-4 text-violet-400" />
              <span>Biblioteca de Guardados</span>
            </div>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-purple-500 text-white">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activeTab === 'pricing'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-amber-300 bg-amber-950/40 border border-amber-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Paquetes Gold y Premium</span>
            </div>
            <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200">
              Ver Ofertas
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
