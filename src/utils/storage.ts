import { SavedItem } from '../types';

const STORAGE_KEY = 'nexaia_saved_content_v1';

export function getSavedItems(): SavedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading saved items from localStorage', e);
    return [];
  }
}

export function saveItem(item: Omit<SavedItem, 'id' | 'createdAt'>): SavedItem {
  const items = getSavedItems();
  const newItem: SavedItem = {
    ...item,
    id: 'saved_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...items];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving item to localStorage', e);
  }
  return newItem;
}

export function removeSavedItem(id: string): SavedItem[] {
  const items = getSavedItems();
  const updated = items.filter(item => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error removing item from localStorage', e);
  }
  return updated;
}

export function clearAllSavedItems(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing saved items', e);
  }
}
