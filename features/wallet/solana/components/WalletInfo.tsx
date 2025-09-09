'use client';
import React from 'react';
import { useSolanaWallet } from '../hooks/useSolanaWallet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Copy, ExternalLink } from 'lucide-react';

export function WalletInfo() {
  const { connected, address, wallet } = useSolanaWallet();

  if (!connected || !address) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No wallet connected</p>
        </CardContent>
      </Card>
    );
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      // You can add toast notification here
      console.log('Address copied to clipboard');
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  const openInExplorer = () => {
    window.open(`https://solscan.io/account/${address}`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Wallet</label>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{wallet?.adapter?.name || 'Unknown'}</Badge>
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-green-600">Connected</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Address</label>
          <div className="mt-1 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              {/* <code className="text-sm font-mono">{formatAddress(address, 6)}</code> */}
              <div className="flex gap-2">
                <button
                  onClick={copyAddress}
                  className="p-1 hover:bg-background rounded transition-colors"
                  title="Copy address"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={openInExplorer}
                  className="p-1 hover:bg-background rounded transition-colors"
                  title="View on Solscan"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Full address: <code className="break-all">{address}</code>
        </div>
      </CardContent>
    </Card>
  );
}
