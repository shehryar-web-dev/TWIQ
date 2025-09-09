"use client";
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
// import {
//   PhantomWalletAdapter,
//   SolflareWalletAdapter,
//   TrustWalletAdapter,
// } from "@solana/wallet-adapter-wallets";

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";

interface SolanaWalletProviderProps {
  children: React.ReactNode;
}

export function SolanaWalletProvider({ children }: SolanaWalletProviderProps) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
console.log("endpoint", endpoint);
  // const wallets = useMemo(
  //   () => [
  //     new PhantomWalletAdapter(),
  //     new SolflareWalletAdapter(),
  //     new TrustWalletAdapter(),
  //   ],
  //   [network]
  // );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          {children}
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
