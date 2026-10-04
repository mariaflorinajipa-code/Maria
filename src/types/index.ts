export interface BusinessPreset {
  id: string;
  label: string;
  icon: string;
  defaultService: string;
  sampleServices: string[];
  defaultAudience: string;
  defaultTone: string;
  defaultCity?: string;
  tagline: string;
}

export interface GeneratorFormState {
  businessType: string;
  customBusiness: string;
  service: string;
  audience: string;
  tone: string;
  network: 'Instagram' | 'TikTok' | 'Ambas';
  city: string;
  extraNotes: string;
}

export interface IdeaItem {
  id: string;
  title: string;
  format: 'Reel' | 'Carrusel' | 'Post Estático' | 'Historias Interactivas' | string;
  hook: string;
  concept: string;
  goal: string;
  tip: string;
}

export interface ScriptScene {
  time: string;
  visual: string;
  audio: string;
  onScreenText: string;
}

export interface ScriptItem {
  id: string;
  title: string;
  duration: string;
  hook: string;
  musicSuggestion: string;
  scenes: ScriptScene[];
  callToAction: string;
  caption: string;
  hashtags: string[];
}

export interface PostItem {
  id: string;
  type: string;
  headline: string;
  body: string;
  callToAction: string;
  hashtagsNiche: string[];
  hashtagsLocal: string[];
  hashtagsTrend: string[];
}

export interface CalendarDayItem {
  id: string;
  day: string;
  format: string;
  topic: string;
  hook: string;
  objective: string;
  shortDescription: string;
  completed?: boolean;
}

export interface CalendarWeek {
  week: number;
  weekFocus: string;
  items: CalendarDayItem[];
}

export interface SavedItem {
  id: string;
  itemType: 'idea' | 'script' | 'post' | 'calendar';
  title: string;
  business: string;
  service: string;
  network: string;
  createdAt: string;
  data: any;
  notes?: string;
}

export type PlanTier = 'free' | 'gold' | 'premium';
export type BillingInterval = 'monthly' | 'yearly';

export interface SubscriptionPlan {
  id: PlanTier;
  name: string;
  badge?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  limitations?: string[];
  popular?: boolean;
  highlightColor: string;
  icon: string;
}

export interface UserSubscription {
  tier: PlanTier;
  interval: BillingInterval;
  activatedAt: string;
  renewsAt: string;
  businessName: string;
  generationsCount: number;
}

