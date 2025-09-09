'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Button from './ui/button';
import { Sparkles, TrendingUp, Bell, Shield, Globe, MessageSquare } from 'lucide-react';

export default function SidebarAI() {
  const features = [
    { title: 'Trend Prediction AI', desc: 'ML models on historical OHLCV for momentum pivots.', icon: <TrendingUp className="h-5 w-5" /> },
    { title: 'Sentiment Analysis', desc: 'Twitter/X, Reddit, Google Trends scoring.', icon: <Globe className="h-5 w-5" /> },
    { title: 'Smart Signals', desc: 'Breakouts, surges, whale tracking alerts.', icon: <Bell className="h-5 w-5" /> },
    { title: 'Risk & Portfolio Reports', desc: 'Exposure, VaR, drawdown, portfolio health.', icon: <Shield className="h-5 w-5" /> },
    { title: 'AI Chat Advisor', desc: 'Decoding hidden market signals.', icon: <MessageSquare className="h-5 w-5" /> },
    { title: 'News Impact Detection', desc: 'Real-time news analysis on token prices.', icon: <Sparkles className="h-5 w-5" /> },
  ];
  return (
    <aside className="xl:sticky xl:top-20">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>AI Tools & Predictive Analytics</CardTitle>
          <CardDescription>
            Advanced trend forecasting, sentiment scoring, and event impact detection with instant alerts:
            breakouts, momentum surges, and whale tracking.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {features.map((f, i) => (
            <div key={i} className="border border-border rounded-xl p-3 flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl border border-border flex items-center justify-center">{f.icon}</div>
              <div>
                <div className="font-medium">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.desc}</div>
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
            <span className="badge">Breakouts</span>
            <span className="badge">Momentum surges</span>
            <span className="badge">Whale tracking</span>
          </div>
          <Button className="rounded-2xl w-full mt-2">Unlock Premium</Button>
        </CardContent>
      </Card>
    </aside>
  );
}
