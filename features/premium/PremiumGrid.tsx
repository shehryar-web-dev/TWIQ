'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, TrendingUp, Bell, Shield, Globe, MessageSquare } from 'lucide-react';
export default function PremiumGrid(){
  const items = [
    { t:'Trend Prediction AI', d:'ML models on historical OHLCV for momentum pivots.', i:<TrendingUp className='h-5 w-5'/> },
    { t:'Sentiment Analysis', d:'Twitter/X, Reddit, Google Trends scoring.', i:<Globe className='h-5 w-5'/> },
    { t:'Smart Signals', d:'Breakouts, surges, whale tracking alerts.', i:<Bell className='h-5 w-5'/> },
    { t:'Risk & Portfolio Reports', d:'Exposure, VaR, drawdown, portfolio health.', i:<Shield className='h-5 w-5'/> },
    { t:'AI Chat Advisor', d:'Decoding hidden market signals.', i:<MessageSquare className='h-5 w-5'/> },
    { t:'News Impact Detection', d:'Real-time news analysis on token prices.', i:<Sparkles className='h-5 w-5'/> },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((c,i)=>(
        <div key={i} className="card p-4 flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl border border-border flex items-center justify-center">{c.i}</div>
          <div><div className="font-semibold">{c.t}</div><div className="text-sm text-muted-foreground">{c.d}</div></div>
        </div>
      ))}
    </div>
  );
}
