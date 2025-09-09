import { useQuery } from '@tanstack/react-query';
import { getCoinsData, transformCoinData } from '../services/api';
import { CoinsQueryParams, TickerData } from '../coins.types';

export function useCoins(params: CoinsQueryParams = {}) {
  return useQuery({
    queryKey: ['coins', params],
    queryFn: () => getCoinsData(params),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
    select: (data) => {
      if (data.success && data.data?.data) {
        return {
          coins: transformCoinData(data.data.data),
          pagination: data.pagination,
          success: data.success
        };
      }
      return {
        coins: [],
        pagination: data.pagination,
        success: false
      };
    }
  });
}

export function useTickerData(params: CoinsQueryParams = {}) {
  const { data, isLoading, error } = useCoins({ ...params, pageSize: 3 });
  
  const tickerData: TickerData[] = data?.coins?.slice(0, 3).map((coin, index) => ({
    symbol: coin.symbol,
    name: coin.name,
    price: coin.price,
    volUsdChange24h: coin.volUsdChange24h,
    marketCap: coin.marketCap,
    volUsd24h: coin.volUsd24h,
    icon: getCoinIcon(coin.symbol)
  })) || [];

  return {
    data: tickerData,
    isLoading,
    error
  };
}

// Helper function to get coin icon
function getCoinIcon(symbol: string): string {
  const coinIcons: Record<string, string> = {
    'BTC': '₿',
    'ETH': 'Ξ',
    'XRP': 'X',
    'BNB': 'B',
    'SOL': '◎',
    'DOGE': 'Ð',
    'TRX': 'T',
    'ADA': '₳',
    'HYPE': 'H',
    'LINK': 'L',
    'SUI': 'S',
    'BCH': 'B',
    'XLM': '★',
    'AVAX': 'A',
    'WBTC': '₿',
    'HBAR': 'H',
    'LEO': 'L',
    'CRO': 'C',
    'LTC': 'Ł',
    'TON': 'T'
  };
  return coinIcons[symbol] || symbol.charAt(0);
}
