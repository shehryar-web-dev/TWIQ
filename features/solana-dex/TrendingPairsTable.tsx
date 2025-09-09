'use client';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/lib/i18n/useTranslation';

const samplePairs = [
  { pair: 'SOL/USDC', price: 98.45, change24h: -1.25, volume: 2100000000, liquidity: 45000000 },
  { pair: 'RAY/USDC', price: 2.34, change24h: 5.67, volume: 850000000, liquidity: 12000000 },
  { pair: 'JUP/USDC', price: 0.89, change24h: 12.34, volume: 450000000, liquidity: 8500000 },
  { pair: 'ORCA/USDC', price: 3.21, change24h: -2.45, volume: 320000000, liquidity: 6500000 },
  { pair: 'SRM/USDC', price: 0.45, change24h: 8.90, volume: 180000000, liquidity: 4200000 },
];

export function TrendingPairsTable() {
  const { t } = useTranslation();
  const usd = (n: number) => n >= 1e9 ? `$${(n/1e9).toFixed(2)}B` : n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : `$${n.toLocaleString()}`;
  
  return (
    <div className="card p-4 rounded-2xl">
      <div className="text-lg font-semibold mb-3">{t('pages.solanaDex.trendingPairs')}</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('pages.solanaDex.table.pair')}</TableHead>
            <TableHead className="text-right">{t('pages.solanaDex.table.price')}</TableHead>
            <TableHead className="text-right">{t('pages.solanaDex.table.change24h')}</TableHead>
            <TableHead className="text-right">{t('pages.solanaDex.table.volume')}</TableHead>
            <TableHead className="text-right">{t('pages.solanaDex.table.liquidity')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {samplePairs.map((pair, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{pair.pair}</TableCell>
              <TableCell className="text-right">${pair.price}</TableCell>
              <TableCell className={`text-right ${pair.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {pair.change24h >= 0 ? '+' : ''}{pair.change24h.toFixed(2)}%
              </TableCell>
              <TableCell className="text-right">{usd(pair.volume)}</TableCell>
              <TableCell className="text-right">{usd(pair.liquidity)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}