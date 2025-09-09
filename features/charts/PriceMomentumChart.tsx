'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const series = Array.from({length: 40}).map((_,i)=>({t:`T${i}`, btc:60000+Math.sin(i/4)*1200+i*8, eth:3000+Math.cos(i/5)*80+i*2, sol:150+Math.sin(i/6)*12+i*0.6}));

export default function PriceMomentumChart(){
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Price & Momentum</CardTitle>
        <CardDescription>Dummy intraday series (BTC/ETH/SOL)</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="t" hide /><YAxis hide /><Tooltip />
            <Area type="monotone" dataKey="btc" strokeWidth={2} fillOpacity={0.2}/>
            <Area type="monotone" dataKey="eth" strokeWidth={2} fillOpacity={0.15}/>
            <Area type="monotone" dataKey="sol" strokeWidth={2} fillOpacity={0.15}/>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
