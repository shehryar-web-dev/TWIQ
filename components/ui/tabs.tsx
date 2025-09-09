'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
type TabsCtx = { value: string; setValue: (v: string) => void };
const Ctx = createContext<TabsCtx | null>(null);
export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [value, setValue] = useState(defaultValue);
  return <Ctx.Provider value={{ value, setValue }}>{children}</Ctx.Provider>;
}
export const TabsList = ({ children, className = '' }: { children: ReactNode; className?: string; }) => (
  <div className={`inline-flex gap-2 border border-border rounded-2xl p-1 ${className}`}>{children}</div>
);
export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(Ctx); if (!ctx) return null;
  const active = ctx.value === value;
  return (
    <button onClick={() => ctx.setValue(value)} className={`px-3 py-1 rounded-2xl text-sm ${active ? 'bg-primary text-white' : 'bg-muted'}`}>
      {children}
    </button>
  );
}
export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(Ctx); if (!ctx || ctx.value !== value) return null;
  return <div className="mt-3">{children}</div>;
}
