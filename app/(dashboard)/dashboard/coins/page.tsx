'use client';
import React from 'react';
import CoinsTable from '@/features/coins/components/CoinsTable';
import TickerCards from '@/features/coins/components/TickerCards';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { TrendingUp, BarChart3, Activity, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useCoins } from '@/features/coins/hooks/useCoins';

export default function CoinsPage() {
  const { t } = useTranslation();

  // Fetch coins data from API
  const { data: coinsData, isLoading } = useCoins({ pageSize: 20 });


  // Calculate market stats from API data
  const totalMarketCap = coinsData?.coins?.reduce((sum, coin) => sum + coin.marketCap, 0) || 0;
  const totalVolume24h = coinsData?.coins?.reduce((sum, coin) => sum + coin.volUsd24h, 0) || 0;
  const avgChange24h = coinsData?.coins?.reduce((sum, coin) => sum + coin.volUsdChange24h, 0) / (coinsData?.coins?.length || 1) || 0;

  const formatMarketCap = (mcap: number) => {
    if (mcap >= 1e12) {
      return `$${(mcap / 1e12).toFixed(2)}T`;
    } else if (mcap >= 1e9) {
      return `$${(mcap / 1e9).toFixed(2)}B`;
    } else if (mcap >= 1e6) {
      return `$${(mcap / 1e6).toFixed(2)}M`;
    } else {
      return `$${mcap.toLocaleString()}`;
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else {
      return `$${volume.toLocaleString()}`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {t('pages.coins.title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('pages.coins.subtitle')}
        </p>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-primary">{formatMarketCap(totalMarketCap)}</h3>
          <p className="text-muted-foreground">{t('pages.coins.marketOverview.totalMarketCap')}</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-center mb-4">
            <Activity className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-green-500">{formatVolume(totalVolume24h)}</h3>
          <p className="text-muted-foreground">{t('pages.coins.marketOverview.volume24h')}</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className={`text-2xl font-bold ${avgChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {avgChange24h >= 0 ? '+' : ''}{avgChange24h.toFixed(2)}%
          </h3>
          <p className="text-muted-foreground">{t('pages.coins.marketOverview.avgChange24h')}</p>
        </Card>
      </div>

      {/* Top Cryptocurrencies Ticker Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <DollarSign className="h-6 w-6 mr-2 text-primary" />
          {t('pages.coins.marketOverview.topCryptocurrencies')}
        </h2>
        <TickerCards useApi={true} />
      </div>

      {/* All Cryptocurrencies Table */}
      <div>
        <h2 className="text-2xl font-bold mb-6">{t('pages.coins.marketOverview.allCryptocurrencies')}</h2>
        <CoinsTable useApi={true} />
      </div>
    </div>
  );
}
