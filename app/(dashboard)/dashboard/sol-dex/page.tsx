'use client';
import React from 'react';
import { TopTradersCard } from '@/features/solana-dex/TopTradersCard';
import { TrendingPairsTable } from '@/features/solana-dex/TrendingPairsTable';
import { WhaleTape } from '@/features/solana-dex/WhaleTape';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function SolDexPage() {
  const { t } = useTranslation();
  
  const sampleTraders = [
    { wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', fav: 'SOL', trades: 1247, win: 73, pnl24h: 125000, volume: 2500000 },
    { wallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', fav: 'RAY', trades: 892, win: 68, pnl24h: -45000, volume: 1800000 },
    { wallet: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1', fav: 'JUP', trades: 1563, win: 71, pnl24h: 89000, volume: 3200000 },
    { wallet: '2AQdpHJ2JpcEgPiATUXjQxA8JXXKy8SXLNQGq6yBvSfJ', fav: 'ORCA', trades: 567, win: 65, pnl24h: 23000, volume: 950000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('pages.solanaDex.title')}</h1>
        <p className="text-muted-foreground">{t('pages.solanaDex.subtitle')}</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <TopTradersCard rows={sampleTraders} />
        <WhaleTape />
      </div>
      
      <TrendingPairsTable />
    </div>
  );
}
