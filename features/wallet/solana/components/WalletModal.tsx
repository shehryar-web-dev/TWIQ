'use client';
import React, { useState, useEffect } from 'react';
import { useSolanaWallet } from '../hooks/useSolanaWallet';
import { Button } from '@/components/ui/button';
import { X, Wallet, ExternalLink, AlertCircle } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { wallets, selectWallet, connecting, connected } = useSolanaWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  useEffect(() => {
    if (connected) {
      onClose();
    }
  }, [connected, onClose]);

  const handleWalletSelect = async (walletName: string) => {
    try {
      setSelectedWallet(walletName);
      // selectWallet(walletName);
    } catch (error) {
      console.error('Failed to select wallet:', error);
      setSelectedWallet(null);
    }
  };

  const getWalletIcon = (walletName: string) => {
    // You can add specific wallet icons here
    switch (walletName.toLowerCase()) {
      case 'phantom':
        return '👻';
      case 'solflare':
        return '🔥';
      case 'backpack':
        return '🎒';
      case 'trust wallet':
        return '🛡️';
      default:
        return '👛';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-background border border-border rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Connect Wallet</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-6">
            Choose a wallet to connect to the Solana network
          </p>

          {/* Wallet List */}
          <div className="space-y-3">
            {wallets.map((wallet) => {
              const isSelected = selectedWallet === wallet.adapter.name;
              const isConnecting = connecting && isSelected;
              
              return (
                <button
                  key={wallet.adapter.name}
                  onClick={() => handleWalletSelect(wallet.adapter.name)}
                  disabled={connecting}
                  className={`
                    w-full flex items-center space-x-4 p-4 border border-border rounded-xl 
                    transition-all duration-200 hover:border-primary hover:shadow-md
                    ${isSelected ? 'border-primary bg-primary/5' : ''}
                    ${connecting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/50'}
                  `}
                >
                  {/* Wallet Icon */}
                  <div className="text-2xl">
                    {getWalletIcon(wallet.adapter.name)}
                  </div>

                  {/* Wallet Info */}
                  <div className="flex-1 text-left">
                    <div className="font-medium">{wallet.adapter.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {wallet.readyState === 'Installed' ? 'Installed' : 'Not Installed'}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    {isConnecting ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : wallet.readyState === 'Installed' ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    ) : (
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  New to Solana wallets?
                </div>
                <div className="text-blue-700 dark:text-blue-200">
                  We recommend installing{' '}
                  <a 
                    href="https://phantom.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    Phantom Wallet
                  </a>{' '}
                  for the best experience.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
