import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SolanaWalletProvider } from "@/features/wallet/solana";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "TWiQ Frontend",
  description: "Dashboard-only Next app (frontend only).",
};

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SolanaWalletProvider>
        <QueryProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>{children}</main>
          </div>
        </QueryProvider>
      </SolanaWalletProvider>
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
