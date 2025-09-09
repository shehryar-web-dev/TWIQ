'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n/useTranslation';

export function TopTradersCard({ rows = [] }:{ rows?: any[] }) {
  const { t } = useTranslation();
  const short = (a:string)=> a.length>10?`${a.slice(0,4)}...${a.slice(-4)}`:a;
  const usd=(n:number)=> n>=1e9?`$${(n/1e9).toFixed(2)}B`:n>=1e6?`$${(n/1e6).toFixed(2)}M`:`$${n.toLocaleString()}`;
  
  return (
    <div className="card rounded-2xl p-4">
      <div className="text-sm font-semibold mb-2">{t('pages.solanaDex.topTraders')}</div>
      <div className="grid gap-3">
        {rows.map((trader, i)=>(
          <div key={i} className="border border-border rounded-xl p-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium">{short(trader.wallet)}</div>
              <div className="text-xs text-muted-foreground">
                {t('pages.solanaDex.trader.favorite')}: {trader.fav} • {t('pages.solanaDex.trader.trades')} {trader.trades} • {t('pages.solanaDex.trader.winRate')} {trader.win}%
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-semibold ${trader.pnl24h>=0?'text-emerald-600':'text-red-600'}`}>{trader.pnl24h>=0?'+':''}{usd(Math.abs(trader.pnl24h))}</div>
              <div className="text-xs text-muted-foreground">Vol {usd(trader.volume)}</div>
            </div>
            <Button size="sm" className="rounded-xl" variant="secondary">{t('pages.solanaDex.trader.follow')}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
