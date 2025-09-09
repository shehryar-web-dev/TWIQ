// Main exports for Solana wallet integration
export { SolanaWalletProvider } from './providers/SolanaWalletProvider';
export { WalletButton } from './components/WalletButton';
export { WalletModal } from './components/WalletModal';
export { WalletInfo } from './components/WalletInfo';
export { useSolanaWallet } from './hooks/useSolanaWallet';

// Re-export useful types from Solana wallet adapter
export type { 
  WalletAdapterNetwork 
} from '@solana/wallet-adapter-base';