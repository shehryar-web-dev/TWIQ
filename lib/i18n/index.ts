import enTranslations from './translations/en.json';
import arTranslations from './translations/ar.json';

export type Language = 'en' | 'ar';

export const translations = {
  en: enTranslations,
  ar: arTranslations,
} as const;

export type TranslationKeys = typeof enTranslations;

// Helper function to get nested translation values
export function getNestedTranslation(
  obj: any,
  path: string
): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

// Translation function
export function t(
  translations: TranslationKeys,
  key: string,
  fallback?: string
): string {
  const value = getNestedTranslation(translations, key);
  return value || fallback || key;
}
