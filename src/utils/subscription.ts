import { SubscriptionPlan, UserSubscription, PlanTier, BillingInterval } from '../types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Plan Gratuito',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Perfecto para probar la plataforma y crear tus primeras publicaciones.',
    icon: '🌱',
    highlightColor: 'from-slate-700 to-slate-800',
    features: [
      '3 generaciones de contenido al día',
      'Ideas para publicaciones estándar',
      'Guiones cortos para Reels (15-20s)',
      'Guardado de hasta 5 elementos',
      'Exportación en texto simple',
    ],
    limitations: [
      'Sin herramienta de Biografía ni Respuestas a Reseñas',
      'Sin gestión de múltiples negocios',
      'Sin descarga en PDF imprimible',
    ],
  },
  {
    id: 'gold',
    name: 'Paquete Gold',
    badge: 'MÁS POPULAR',
    popular: true,
    monthlyPrice: 19,
    yearlyPrice: 15, // 180€/año
    description: 'Diseñado para salones, tiendas, restaurantes y gimnasios que quieren publicar a diario.',
    icon: '👑',
    highlightColor: 'from-amber-500 via-yellow-500 to-amber-600',
    features: [
      'Generaciones de contenido ILIMITADAS',
      'Guiones completos de Reels y TikTok (15 a 60s)',
      'Bloques de hashtags geolocalizados y de tendencia',
      'Calendario mensual completo de 4 semanas',
      'Optimizador de Biografías para Instagram y TikTok',
      'Biblioteca de guardados sin límite de capacidad',
      'Exportación a Markdown, TXT y JSON en 1 clic',
      'Insignia Gold oficial de negocio verificado',
      'Soporte prioritario por correo electrónico',
    ],
  },
  {
    id: 'premium',
    name: 'Paquete Premium',
    badge: 'MÁXIMA POTENCIA',
    monthlyPrice: 39,
    yearlyPrice: 29, // 348€/año
    description: 'Para negocios con alta actividad, múltiples locales o que ofrecen varios servicios especializados.',
    icon: '💎',
    highlightColor: 'from-purple-500 via-violet-600 to-indigo-600',
    features: [
      'Todo lo incluido en el Paquete Gold',
      'Multi-Negocio: Gestiona hasta 5 marcas o locales distintos',
      'Generador de Respuestas a Reseñas de Google y DMs',
      'Exportador imprimible de agenda mensual en PDF limpio',
      'Prioridad máxima de respuesta con IA Gemini',
      'Guía mensual de tendencias de audio en TikTok e Instagram',
      'Copia de seguridad en la nube de todas tus campañas',
      'Atención personalizada prioritaria por WhatsApp',
    ],
  },
];

const STORAGE_KEY = 'nexaia_user_subscription_v1';

export const DEFAULT_SUBSCRIPTION: UserSubscription = {
  tier: 'free',
  interval: 'monthly',
  activatedAt: new Date().toISOString(),
  renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  businessName: 'Mi Negocio Local',
  generationsCount: 1,
};

export function getStoredSubscription(): UserSubscription {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SUBSCRIPTION;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading subscription from localStorage:', err);
    return DEFAULT_SUBSCRIPTION;
  }
}

export function saveStoredSubscription(sub: UserSubscription): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sub));
  } catch (err) {
    console.error('Error saving subscription to localStorage:', err);
  }
}

export function updatePlan(tier: PlanTier, interval: BillingInterval, businessName?: string): UserSubscription {
  const current = getStoredSubscription();
  const updated: UserSubscription = {
    ...current,
    tier,
    interval,
    activatedAt: new Date().toISOString(),
    renewsAt: new Date(Date.now() + (interval === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
    businessName: businessName || current.businessName,
  };
  saveStoredSubscription(updated);
  return updated;
}
