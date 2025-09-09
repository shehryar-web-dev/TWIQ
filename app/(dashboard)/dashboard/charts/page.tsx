'use client';
import React from 'react';
import PriceMomentumChart from '@/features/charts/PriceMomentumChart';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function ChartsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('pages.charts.title')}</h1>
        <p className="text-muted-foreground">{t('pages.charts.subtitle')}</p>
      </div>
      <PriceMomentumChart />
    </div>
  );
}
