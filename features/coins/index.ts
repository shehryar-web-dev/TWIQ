// Components
export { default as CoinsTable } from '@/features/coins/components/CoinsTable';
export { default as TickerCards } from '@/features/coins/components/TickerCards';

// Hooks
export { useCoins, useTickerData } from '@/features/coins/hooks/useCoins';

// Services
export { getCoinsData, transformCoinData } from './services/api';

// Types
export type { 
  CoinData, 
  ApiResponse, 
  Coin, 
  TickerData, 
  CoinsQueryParams 
} from './coins.types';
