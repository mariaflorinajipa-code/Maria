import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Wand2,
  Film,
  Calendar as CalendarIcon,
  PenTool,
  Bookmark,
  Share2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Info,
  RefreshCw,
  Sliders,
  ChevronRight,
  Heart,
  UserCheck,
  Crown,
  Diamond,
  MessageSquare,
  Building2,
  Lock,
} from 'lucide-react';

import {
  GeneratorFormState,
  BusinessPreset,
  IdeaItem,
  ScriptItem,
  PostItem,
  CalendarWeek,
  SavedItem,
  PlanTier,
  BillingInterval,
  UserSubscription,
} from './types';

import {
  BUSINESS_PRESETS,
  generateFallbackIdeas,
  generateFallbackScripts,
  generateFallbackPosts,
  generateFallbackCalendar,
} from './data/fallbackData';

import { getSavedItems, saveItem, removeSavedItem, clearAllSavedItems } from './utils/storage';
import { getStoredSubscription, updatePlan } from './utils/subscription';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GeneratorForm } from './components/GeneratorForm';
import { IdeasTab } from './components/IdeasTab';
import { ScriptsTab } from './components/ScriptsTab';
import { PostsTab } from './components/PostsTab';
import { CalendarTab } from './components/CalendarTab';
import { SavedLibrary } from './components/SavedLibrary';
import { TemplatesSection } from './components/TemplatesSection';
import { SubscriptionsView } from './components/SubscriptionsView';
import { CheckoutModal } from './components/CheckoutModal';
import { BioOptimizerModal } from './components/BioOptimizerModal';
import { ReviewResponderModal } from './components/ReviewResponderModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'home' | 'generator' | 'calendar' | 'saved' | 'templates' | 'pricing'>('home');
  const [resultSubTab, setResultSubTab] = useState<'ideas' | 'scripts' | 'posts' | 'calendar'>('ideas');

  // Subscription state
  const [subscription, setSubscription] = useState<UserSubscription>(getStoredSubscription());
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<PlanTier>('gold');
  const [checkoutInterval, setCheckoutInterval] = useState<BillingInterval>('monthly');

  // Gold & Premium exclusive tools modals
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Form state
  const [formState, setFormState] = useState<GeneratorFormState>({
    businessType: 'peluqueria',
    customBusiness: '',
    service: 'Balayage iluminador & Tratamiento de Brillo',
    audience: 'Mujeres y jóvenes locales que buscan cuidar su cabello con resultados naturales',
    tone: 'Cercano y profesional',
    network: 'Ambas',
    city: 'mi ciudad',
    extraNotes: '',
  });

  // Generated results
  const [ideas, setIdeas] = useState<IdeaItem[]>([]);
  const [scripts, setScripts] = useState<ScriptItem[]>([]);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [calendar, setCalendar] = useState<CalendarWeek[]>([]);

  // Generation status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(false);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  // Saved items
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Future account modal / roadmap info
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  // Initial load
  useEffect(() => {
    const loadedSaved = getSavedItems();
    setSavedItems(loadedSaved);
    setSubscription(getStoredSubscription());

    // Initial pre-filled content
    const initialIdeas = generateFallbackIdeas(formState);
    const initialScripts = generateFallbackScripts(formState);
    const initialPosts = generateFallbackPosts(formState);
    const initialCalendar = generateFallbackCalendar(formState);

    setIdeas(initialIdeas);
    setScripts(initialScripts);
    setPosts(initialPosts);
    setCalendar(initialCalendar);
    setHasGenerated(true);
    setIsAiGenerated(false);
  }, []);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Subscription actions
  const handleOpenCheckout = (tier: PlanTier, interval: BillingInterval) => {
    setCheckoutPlan(tier);
    setCheckoutInterval(interval);
    setCheckoutModalOpen(true);
  };

  const handleConfirmSubscription = (tier: PlanTier, interval: BillingInterval, businessName: string) => {
    const updated = updatePlan(tier, interval, businessName);
    setSubscription(updated);
    setCheckoutModalOpen(false);

    if (tier === 'gold') {
      addToast('🎉 ¡Paquete Gold activado con éxito! Generaciones ilimitadas y herramientas Pro listas.', 'success');
    } else if (tier === 'premium') {
      addToast('💎 ¡Paquete Premium activado! Acceso total a multinegocio, respuestas a reseñas y soporte prioritario.', 'success');
    } else {
      addToast('Has cambiado al Plan Gratuito.', 'info');
    }
  };

  // Generation handler
  const handleGenerate = async () => {
    setIsLoading(true);
    setGenerationNotice(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'all',
          ...formState,
        }),
      });

      const result = await response.json();

      if (response.ok && result?.success && result?.data) {
        const d = result.data;
        if (d.ideas && Array.isArray(d.ideas) && d.ideas.length > 0) setIdeas(d.ideas);
        if (d.scripts && Array.isArray(d.scripts) && d.scripts.length > 0) setScripts(d.scripts);
        if (d.posts && Array.isArray(d.posts) && d.posts.length > 0) setPosts(d.posts);
        if (d.calendar && Array.isArray(d.calendar) && d.calendar.length > 0) setCalendar(d.calendar);

        setIsAiGenerated(true);
        setHasGenerated(true);
        addToast('¡Contenido generado exitosamente con Gemini AI!', 'success');
      } else {
        useFallbackGeneration('No se pudo conectar con la IA en este momento. Se han cargado ejemplos prácticos contextualizados para tu negocio.');
      }
    } catch (err) {
      console.warn('Backend request failed or offline, using robust fallback:', err);
      useFallbackGeneration('Modo demostración rápido activado con contenidos completos para tu sector.');
    } finally {
      setIsLoading(false);
      setActiveTab('generator');
      const el = document.getElementById('resultados-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const useFallbackGeneration = (notice: string) => {
    const fallbackIdeas = generateFallbackIdeas(formState);
    const fallbackScripts = generateFallbackScripts(formState);
    const fallbackPosts = generateFallbackPosts(formState);
    const fallbackCal = generateFallbackCalendar(formState);

    setIdeas(fallbackIdeas);
    setScripts(fallbackScripts);
    setPosts(fallbackPosts);
    setCalendar(fallbackCal);

    setIsAiGenerated(false);
    setHasGenerated(true);
    setGenerationNotice(notice);
    addToast('Contenido contextual generado listo para usar', 'info');
  };

  const handleSelectPreset = (preset: BusinessPreset, specificService?: string) => {
    setFormState({
      businessType: preset.id,
      customBusiness: '',
      service: specificService || preset.defaultService,
      audience: preset.defaultAudience,
      tone: preset.defaultTone,
      network: 'Ambas',
      city: 'mi ciudad',
      extraNotes: '',
    });

    const fallbackIdeas = generateFallbackIdeas({
      ...formState,
      businessType: preset.id,
      service: specificService || preset.defaultService,
    });
    const fallbackScripts = generateFallbackScripts({
      ...formState,
      businessType: preset.id,
      service: specificService || preset.defaultService,
    });
    const fallbackPosts = generateFallbackPosts({
      ...formState,
      businessType: preset.id,
      service: specificService || preset.defaultService,
    });
    const fallbackCal = generateFallbackCalendar({
      ...formState,
      businessType: preset.id,
      service: specificService || preset.defaultService,
    });

    setIdeas(fallbackIdeas);
    setScripts(fallbackScripts);
    setPosts(fallbackPosts);
    setCalendar(fallbackCal);
    setHasGenerated(true);

    setActiveTab('generator');
    addToast(`Cargada plantilla de ${preset.label}`, 'info');

    setTimeout(() => {
      const el = document.getElementById('formulario-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLoadRandomExample = () => {
    const randomPreset = BUSINESS_PRESETS[Math.floor(Math.random() * (BUSINESS_PRESETS.length - 1))];
    const randomService = randomPreset.sampleServices[Math.floor(Math.random() * randomPreset.sampleServices.length)];
    handleSelectPreset(randomPreset, randomService);
  };

  // Save Item Handlers
  const handleSaveIdea = (idea: IdeaItem) => {
    const item = saveItem({
      itemType: 'idea',
      title: idea.title,
      business: formState.businessType,
      service: formState.service,
      network: formState.network,
      data: idea,
    });
    setSavedItems((prev) => [item, ...prev]);
    addToast('Idea guardada en tu biblioteca', 'success');
  };

  const handleSaveScript = (script: ScriptItem) => {
    const item = saveItem({
      itemType: 'script',
      title: script.title,
      business: formState.businessType,
      service: formState.service,
      network: formState.network,
      data: script,
    });
    setSavedItems((prev) => [item, ...prev]);
    addToast('Guion de Reel guardado en tu biblioteca', 'success');
  };

  const handleSavePost = (post: PostItem) => {
    const item = saveItem({
      itemType: 'post',
      title: post.type + ': ' + post.headline.substring(0, 30) + '...',
      business: formState.businessType,
      service: formState.service,
      network: formState.network,
      data: post,
    });
    setSavedItems((prev) => [item, ...prev]);
    addToast('Publicación y hashtags guardados', 'success');
  };

  const handleSaveCalendar = (calData: CalendarWeek[]) => {
    const item = saveItem({
      itemType: 'calendar',
      title: `Calendario Mensual - ${formState.service}`,
      business: formState.businessType,
      service: formState.service,
      network: formState.network,
      data: calData,
    });
    setSavedItems((prev) => [item, ...prev]);
    addToast('Calendario mensual guardado en tu biblioteca', 'success');
  };

  const handleRemoveSaved = (id: string) => {
    const updated = removeSavedItem(id);
    setSavedItems(updated);
    addToast('Elemento eliminado de guardados', 'info');
  };

  const handleClearAllSaved = () => {
    clearAllSavedItems();
    setSavedItems([]);
  };

  const isItemSaved = (id: string) => {
    return savedItems.some((s) => s.data?.id === id || s.id === id);
  };

  const isCalendarSaved = () => {
    return savedItems.some((s) => s.itemType === 'calendar' && s.service === formState.service);
  };

  const isGold = subscription.tier === 'gold';
  const isPremium = subscription.tier === 'premium';
  const hasPaidPlan = isGold || isPremium;

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Checkout Modal */}
      <CheckoutModal
        planTier={checkoutPlan}
        interval={checkoutInterval}
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onConfirm={handleConfirmSubscription}
      />

      {/* Gold & Premium Tool: Bio Optimizer */}
      <BioOptimizerModal
        isOpen={bioModalOpen}
        onClose={() => setBioModalOpen(false)}
        businessType={formState.businessType}
        service={formState.service}
        city={formState.city}
        onShowToast={addToast}
      />

      {/* Premium Exclusive Tool: Review Responder */}
      <ReviewResponderModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        service={formState.service}
        onShowToast={addToast}
      />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedItems.length}
        currentSubscription={subscription}
        onOpenGenerator={() => {
          setActiveTab('generator');
          setTimeout(() => {
            const el = document.getElementById('formulario-anchor');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
        onOpenTemplates={() => setActiveTab('templates')}
        onOpenPricing={() => setActiveTab('pricing')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            <Hero
              onStartCreating={() => {
                setActiveTab('generator');
                setTimeout(() => {
                  const el = document.getElementById('formulario-anchor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              onSelectPreset={handleSelectPreset}
              onOpenPricing={() => setActiveTab('pricing')}
            />
          </div>
        )}

        {/* VIEW 2: GENERATOR */}
        {activeTab === 'generator' && (
          <div className="space-y-8">
            {/* Subscription Banner inside Generator */}
            <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all shadow-lg ${
              isGold
                ? 'bg-gradient-to-r from-[#171408] via-[#0E1528] to-[#0A0F1D] border-amber-500/40 text-amber-200'
                : isPremium
                ? 'bg-gradient-to-r from-[#170E28] via-[#0E1528] to-[#0A0F1D] border-purple-500/40 text-purple-200'
                : 'bg-[#0B1122]/90 border-violet-900/40 text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border ${
                  isGold
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : isPremium
                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                    : 'bg-violet-950/60 border-violet-800/40 text-violet-300'
                }`}>
                  {isGold ? '👑' : isPremium ? '💎' : '🌱'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">
                      {isGold ? 'Paquete Gold Activo' : isPremium ? 'Paquete Premium Activo' : 'Plan Gratuito Activo'}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/10 text-white">
                      {hasPaidPlan ? 'Generaciones Ilimitadas' : '3 gen/día'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {hasPaidPlan
                      ? `Negocio registrado: "${subscription.businessName}". Herramientas avanzadas desbloqueadas.`
                      : '¿Quieres crear sin límites y desbloquear optimizadores de biografía y respuestas?'}
                  </p>
                </div>
              </div>

              {/* Action buttons depending on tier */}
              <div className="flex flex-wrap items-center gap-2 self-end md:self-auto">
                {hasPaidPlan && (
                  <button
                    onClick={() => setBioModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Optimizador de Biografías</span>
                  </button>
                )}

                {isPremium && (
                  <button
                    onClick={() => setReviewModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Respuestas a Reseñas & DMs</span>
                  </button>
                )}

                {!hasPaidPlan && (
                  <button
                    onClick={() => setActiveTab('pricing')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Subir a Gold o Premium</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Form Container */}
            <div id="formulario-anchor" className="scroll-mt-24">
              <GeneratorForm
                formState={formState}
                setFormState={setFormState}
                onGenerate={handleGenerate}
                isLoading={isLoading}
                onLoadExample={handleLoadRandomExample}
              />
            </div>

            {/* Notice if in fallback/demo mode */}
            {generationNotice && (
              <div className="p-4 rounded-2xl bg-violet-950/40 border border-violet-800/40 text-violet-200 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
                <Info className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold text-white block mb-0.5">
                    Modo de demostración inteligente activo
                  </span>
                  <p className="text-slate-300 leading-relaxed">{generationNotice}</p>
                </div>
              </div>
            )}

            {/* Results Section */}
            <div id="resultados-anchor" className="scroll-mt-24 space-y-6">
              {/* Results Navigation Bar */}
              <div className="p-4 rounded-3xl bg-[#0B1122]/90 border border-violet-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-lg text-white">
                        Resultados para: <span className="text-violet-400">{formState.service}</span>
                      </h3>
                      {isAiGenerated ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
                          IA Gemini
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-950/60 text-violet-300 border border-violet-700/40">
                          Plantilla Optimizada
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">
                      Sector: {BUSINESS_PRESETS.find((p) => p.id === formState.businessType)?.label || formState.businessType} • Red: {formState.network}
                    </span>
                  </div>
                </div>

                {/* Sub-tabs selector */}
                <div className="flex flex-wrap items-center gap-1.5 bg-[#070C18] p-1.5 rounded-2xl border border-slate-800">
                  <button
                    onClick={() => setResultSubTab('ideas')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      resultSubTab === 'ideas'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ideas ({ideas.length})</span>
                  </button>

                  <button
                    onClick={() => setResultSubTab('scripts')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      resultSubTab === 'scripts'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Guiones Reels ({scripts.length})</span>
                  </button>

                  <button
                    onClick={() => setResultSubTab('posts')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      resultSubTab === 'posts'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Textos & Tags ({posts.length})</span>
                  </button>

                  <button
                    onClick={() => setResultSubTab('calendar')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      resultSubTab === 'calendar'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>Calendario (4 sem)</span>
                  </button>
                </div>
              </div>

              {/* Sub-tab content view */}
              <div className="pt-2">
                {resultSubTab === 'ideas' && (
                  <IdeasTab
                    ideas={ideas}
                    formState={formState}
                    onSaveIdea={handleSaveIdea}
                    isSaved={isItemSaved}
                    onShowToast={addToast}
                  />
                )}

                {resultSubTab === 'scripts' && (
                  <ScriptsTab
                    scripts={scripts}
                    formState={formState}
                    onSaveScript={handleSaveScript}
                    isSaved={isItemSaved}
                    onShowToast={addToast}
                  />
                )}

                {resultSubTab === 'posts' && (
                  <PostsTab
                    posts={posts}
                    formState={formState}
                    onSavePost={handleSavePost}
                    isSaved={isItemSaved}
                    onShowToast={addToast}
                  />
                )}

                {resultSubTab === 'calendar' && (
                  <CalendarTab
                    calendar={calendar}
                    formState={formState}
                    onSaveCalendar={handleSaveCalendar}
                    isSaved={isCalendarSaved()}
                    onShowToast={addToast}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: FULL CALENDAR DEDICATED VIEW */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <CalendarTab
              calendar={calendar}
              formState={formState}
              onSaveCalendar={handleSaveCalendar}
              isSaved={isCalendarSaved()}
              onShowToast={addToast}
            />
          </div>
        )}

        {/* VIEW 4: SAVED LIBRARY */}
        {activeTab === 'saved' && (
          <SavedLibrary
            items={savedItems}
            onRemoveItem={handleRemoveSaved}
            onClearAll={handleClearAllSaved}
            onGoToGenerator={() => setActiveTab('generator')}
            onShowToast={addToast}
          />
        )}

        {/* VIEW 5: TEMPLATES BY SECTOR */}
        {activeTab === 'templates' && (
          <TemplatesSection
            onSelectPreset={handleSelectPreset}
            onGoToGenerator={() => setActiveTab('generator')}
          />
        )}

        {/* VIEW 6: SUBSCRIPTION PLANS & PACKAGES */}
        {activeTab === 'pricing' && (
          <SubscriptionsView
            currentSubscription={subscription}
            onOpenCheckout={handleOpenCheckout}
            onShowToast={addToast}
          />
        )}
      </main>

      {/* Account Info Modal */}
      {showAccountInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0B1122] border border-violet-900/60 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Suscripciones Gold y Premium
                </h3>
                <span className="text-xs text-violet-400">
                  Plan actual: {subscription.tier.toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Disfruta de generaciones ilimitadas, descarga en formatos avanzados y herramientas exclusivas para optimizar tu presencia en Instagram y TikTok.
            </p>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setShowAccountInfo(false);
                  setActiveTab('pricing');
                }}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Ver todos los planes y paquetes
              </button>
              <button
                onClick={() => setShowAccountInfo(false)}
                className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/80 bg-[#04070F] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-xs">
                N
              </div>
              <span className="font-heading font-bold text-sm text-white">
                NexaIA Studio
              </span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span>Creador de contenido para pequeños negocios en español</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <button
              onClick={() => setActiveTab('pricing')}
              className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Planes Gold & Premium</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className="text-slate-400 hover:text-violet-300 transition-colors"
            >
              Plantillas por Sector
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className="text-slate-400 hover:text-violet-300 transition-colors"
            >
              Guardados ({savedItems.length})
            </button>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-500">
            Diseñado para Instagram y TikTok • Paquetes Gold y Premium listos para producción
          </div>
        </div>
      </footer>
    </div>
  );
}
