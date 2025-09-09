'use client';
import React from 'react';
import PremiumGrid from '@/features/premium/PremiumGrid';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function PremiumPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('pages.premium.title')}</h1>
        <p className="text-muted-foreground">{t('pages.premium.subtitle')}</p>
      </div>
      <PremiumGrid />
    </div>
  );
}
