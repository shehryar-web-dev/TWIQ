'use client';
import { useTheme } from '@/components/providers/ThemeProvider';
import { translations, t, TranslationKeys } from './index';

export function useTranslation() {
  const { language } = useTheme();
  const currentTranslations = translations[language];

  return {
    t: (key: string, fallback?: string) => t(currentTranslations, key, fallback),
    language,
    translations: currentTranslations as TranslationKeys,
  };
}
