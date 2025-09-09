'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n/useTranslation';

const sampleWhales = [
  { wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', action: 'Bought', token: 'SOL', amount: 50000, price: 98.45, time: '2m ago' },
  { wallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', action: 'Sold', token: 'RAY', amount: 250000, price: 2.34, time: '5m ago' },
  { wallet: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1', action: 'Bought', token: 'JUP', amount: 1000000, price: 0.89, time: '8m ago' },
  { wallet: '2AQdpHJ2JpcEgPiATUXjQxA8JXXKy8SXLNQGq6yBvSfJ', action: 'Sold', token: 'ORCA', amount: 150000, price: 3.21, time: '12m ago' },
  { wallet: '6W8r7A9fG7C4b5D3E2F1G9H8I7J6K5L4M3N2O1P0Q9R8', action: 'Bought', token: 'SRM', amount: 800000, price: 0.45, time: '15m ago' },
];

export function WhaleTape() {
  const { t } = useTranslation();
  const usd = (amount: number, price: number) => `$${(amount * price).toLocaleString()}`;
  const short = (wallet: string) => `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>{t('pages.solanaDex.whaleActivity')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sampleWhales.map((whale, i) => (
          <div key={i} className="flex items-center justify-between p-3 border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${whale.action === 'Bought' ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <div>
                <div className="text-sm font-medium">
                  {whale.action === 'Bought' ? t('pages.solanaDex.whale.bought') : t('pages.solanaDex.whale.sold')} {whale.amount.toLocaleString()} {whale.token}
                </div>
                <div className="text-xs text-muted-foreground">{short(whale.wallet)} • {whale.time}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{usd(whale.amount, whale.price)}</div>
              <div className="text-xs text-muted-foreground">@ ${whale.price}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}