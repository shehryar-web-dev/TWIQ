'use client';
import React from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, BarChart3, AlertTriangle } from 'lucide-react';

// Sample TASI data
const sampleTasiStocks = [
  { symbol: 'ARAMCO', name: 'Saudi Aramco', price: 28.50, change: 0.75, changePercent: 2.70, volume: 12500000, marketCap: 5700000000000, sector: 'Energy', signal: 'buy' },
  { symbol: 'SABIC', name: 'SABIC', price: 95.20, change: -1.30, changePercent: -1.35, volume: 8500000, marketCap: 356000000000, sector: 'Materials', signal: 'hold' },
  { symbol: 'STC', name: 'Saudi Telecom', price: 45.80, change: 2.15, changePercent: 4.93, volume: 6200000, marketCap: 91500000000, sector: 'Telecommunications', signal: 'strongBuy' },
  { symbol: 'ALRAJHI', name: 'Al Rajhi Bank', price: 78.90, change: -0.45, changePercent: -0.57, volume: 4200000, marketCap: 525000000000, sector: 'Banking', signal: 'buy' },
  { symbol: 'NCB', name: 'National Commercial Bank', price: 34.25, change: 1.20, changePercent: 3.63, volume: 3800000, marketCap: 137000000000, sector: 'Banking', signal: 'buy' },
  { symbol: 'MAADEN', name: 'Saudi Arabian Mining', price: 42.10, change: -2.80, changePercent: -6.24, volume: 2100000, marketCap: 157000000000, sector: 'Materials', signal: 'sell' },
  { symbol: 'STC', name: 'Saudi Electricity', price: 18.75, change: 0.35, changePercent: 1.90, volume: 1500000, marketCap: 75000000000, sector: 'Utilities', signal: 'hold' },
  { symbol: 'FITNESS', name: 'Fitness Time', price: 12.40, change: 0.80, changePercent: 6.90, volume: 800000, marketCap: 12400000000, sector: 'Consumer', signal: 'strongBuy' },
];

const sectorPerformance = [
  { sector: 'Banking', performance: 2.3, color: 'bg-emerald-500' },
  { sector: 'Energy', performance: 1.8, color: 'bg-blue-500' },
  { sector: 'Materials', performance: -0.5, color: 'bg-red-500' },
  { sector: 'Telecommunications', performance: 3.2, color: 'bg-emerald-500' },
  { sector: 'Utilities', performance: 0.8, color: 'bg-yellow-500' },
  { sector: 'Consumer', performance: 4.1, color: 'bg-emerald-500' },
];

const aiSignals = [
  { symbol: 'ARAMCO', signal: 'Strong Buy', confidence: 85, reason: 'Strong earnings growth expected' },
  { symbol: 'STC', signal: 'Buy', confidence: 78, reason: '5G expansion driving revenue' },
  { symbol: 'FITNESS', signal: 'Strong Buy', confidence: 92, reason: 'Post-pandemic recovery momentum' },
  { symbol: 'MAADEN', signal: 'Sell', confidence: 67, reason: 'Commodity price volatility' },
];

export default function TasiPage() {
  const { t } = useTranslation();

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'strongBuy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'buy': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'sell': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'strongSell': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSignalText = (signal: string) => {
    switch (signal) {
      case 'strongBuy': return t('pages.tasi.signals.strongBuy');
      case 'buy': return t('pages.tasi.signals.buy');
      case 'hold': return t('pages.tasi.signals.hold');
      case 'sell': return t('pages.tasi.signals.sell');
      case 'strongSell': return t('pages.tasi.signals.strongSell');
      default: return signal;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('pages.tasi.title')}</h1>
        <p className="text-muted-foreground">{t('pages.tasi.subtitle')}</p>
        <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">{t('pages.tasi.disclaimer')}</span>
          </div>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('pages.tasi.topGainers')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+4.1%</div>
            <p className="text-xs text-muted-foreground">FITNESS leading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('pages.tasi.topLosers')}</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-6.2%</div>
            <p className="text-xs text-muted-foreground">MAADEN declining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('pages.tasi.mostActive')}</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5M</div>
            <p className="text-xs text-muted-foreground">ARAMCO volume</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TASI Index</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11,247.50</div>
            <p className="text-xs text-emerald-600">+1.2% today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* TASI Stocks Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t('pages.tasi.title')} - {t('pages.tasi.mostActive')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('pages.tasi.table.symbol')}</TableHead>
                  <TableHead>{t('pages.tasi.table.name')}</TableHead>
                  <TableHead className="text-right">{t('pages.tasi.table.price')}</TableHead>
                  <TableHead className="text-right">{t('pages.tasi.table.change')}</TableHead>
                  <TableHead className="text-right">{t('pages.tasi.table.volume')}</TableHead>
                  <TableHead className="text-right">{t('pages.tasi.table.sector')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleTasiStocks.map((stock, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{stock.symbol}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{stock.name}</TableCell>
                    <TableCell className="text-right">SAR {stock.price}</TableCell>
                    <TableCell className={`text-right ${stock.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)
                    </TableCell>
                    <TableCell className="text-right">{(stock.volume / 1000000).toFixed(1)}M</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="text-xs">
                        {stock.sector}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sector Performance */}
        <Card>
          <CardHeader>
            <CardTitle>{t('pages.tasi.sectorPerformance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorPerformance.map((sector, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${sector.color}`} />
                    <span className="font-medium">{sector.sector}</span>
                  </div>
                  <div className={`font-semibold ${sector.performance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {sector.performance >= 0 ? '+' : ''}{sector.performance}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Trading Signals */}
      <Card>
        <CardHeader>
          <CardTitle>{t('pages.tasi.aiSignals')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {aiSignals.map((signal, i) => (
              <div key={i} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{signal.symbol}</span>
                  <Badge className={getSignalColor(signal.signal.toLowerCase().replace(' ', ''))}>
                    {getSignalText(signal.signal.toLowerCase().replace(' ', ''))}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Confidence: {signal.confidence}%
                </div>
                <div className="text-sm">
                  {signal.reason}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
