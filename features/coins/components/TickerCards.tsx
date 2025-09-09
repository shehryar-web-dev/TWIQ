'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useTickerData } from '@/features/coins/hooks/useCoins';

interface TickerData {
  symbol: string;
  name: string;
  price: number;
  volUsdChange24h: number;
  marketCap: number;
  volUsd24h: number;
  icon: string;
}

interface TickerCardsProps {
  data?: TickerData[]; // Optional for backward compatibility
  useApi?: boolean; // Flag to enable API usage
}

const TickerCards: React.FC<TickerCardsProps> = ({ data: propData, useApi = true }) => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState<string>('');

  // Use API data or prop data
  const { data: apiData, isLoading, error } = useTickerData();
  const data = useApi ? apiData : (propData || []);

  // Fix hydration mismatch by setting time only on client
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-muted" />
                <div>
                  <div className="h-4 w-16 bg-muted rounded mb-2" />
                  <div className="h-3 w-12 bg-muted rounded" />
                </div>
              </div>
              <div className="text-right">
                <div className="h-6 w-20 bg-muted rounded mb-2" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-3 w-16 bg-muted rounded" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 col-span-full">
          <div className="flex items-center justify-center py-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <span className="text-sm text-muted-foreground">
                {t('pages.coins.tickerCards.failedToLoad')} 
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if(!price) return '--';
    if (price >= 1) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

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

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {data && data.map((coin) => (
        <Card key={coin.symbol} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {coin.symbol.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{coin.symbol}</h3>
                <p className="text-sm text-muted-foreground">{coin.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{formatPrice(coin.price)}</div>
                <div className="flex items-center space-x-1">
                  {getChangeIcon(coin.volUsdChange24h)}
                  <span className={`text-sm font-medium ${getChangeColor(coin.volUsdChange24h)}`}>
                    {coin.volUsdChange24h >= 0 ? '+' : ''}{coin.volUsdChange24h?.toFixed(2)}%
                  </span>
                </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t('pages.coins.tickerCards.marketCap')}</span>
              </div>
              <span className="text-sm font-medium">{formatMarketCap(coin.marketCap)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t('pages.coins.tickerCards.volume24h')}</span>
              </div>
              <span className="text-sm font-medium">{formatVolume(coin.volUsd24h)}</span>
            </div>

           
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t('pages.coins.tickerCards.lastUpdated')}</span>
              <span className="text-xs text-muted-foreground">
                {currentTime || '--:--:--'}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TickerCards;
