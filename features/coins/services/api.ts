import { api } from "@/lib/apiClient";
import { ApiResponse, CoinsQueryParams, CoinData } from "../coins.types";

export async function getCoinsData(params: CoinsQueryParams = {}): Promise<ApiResponse> {
  const queryParams = new URLSearchParams();
  
  // Add pagination
  if (params.pageNum) queryParams.append('pageNum', params.pageNum.toString());
  if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  
  // Add search
  if (params.search) queryParams.append('search', params.search);
  
  // Add filters
  if (params.minMarketCap !== undefined) queryParams.append('minMarketCap', params.minMarketCap.toString());
  if (params.maxMarketCap !== undefined) queryParams.append('maxMarketCap', params.maxMarketCap.toString());
  if (params.minVolume24h !== undefined) queryParams.append('minVolume24h', params.minVolume24h.toString());
  if (params.maxVolume24h !== undefined) queryParams.append('maxVolume24h', params.maxVolume24h.toString());
  if (params.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
  if (params.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
  if (params.minPriceChange24h !== undefined) queryParams.append('minPriceChange24h', params.minPriceChange24h.toString());
  if (params.maxPriceChange24h !== undefined) queryParams.append('maxPriceChange24h', params.maxPriceChange24h.toString());
  
  // Add sorting
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

  const queryString = queryParams.toString();
  const url = `/coinglass/spot${queryString ? `?${queryString}` : ''}`;

  return await api
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.error('Error fetching coins data:', err);
      throw err;
    });
}

// Helper function to transform API data to component format
export function transformCoinData(apiData: CoinData[], startRank = 1): any[] {
  return apiData.map((coin, index) => ({
    rank: startRank + index,
    name: getCoinName(coin.symbol),
    symbol: coin.symbol,
    price: coin.price,
    change24h: coin.priceChangePercent24h,
    change7d: coin.priceChangePercent1w,
    mcap: coin.marketCap,
    vol24h: coin.volUsd24h,
    supply: Math.round(coin.marketCap / coin.price), // Approximate supply
    exchange: 'Multiple',
    spark: generateSparklineData(coin.price, coin.priceChangePercent24h),
    // Add the correct field names for TickerData
    volUsdChange24h: coin.volUsdChangePercent24h,
    volUsd24h: coin.volUsd24h,
    marketCap: coin.marketCap
  }));
}

// Helper function to get coin name from symbol
function getCoinName(symbol: string): string {
  const coinNames: Record<string, string> = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'XRP': 'XRP',
    'BNB': 'BNB',
    'SOL': 'Solana',
    'DOGE': 'Dogecoin',
    'TRX': 'TRON',
    'ADA': 'Cardano',
    'HYPE': 'HYPE',
    'LINK': 'Chainlink',
    'SUI': 'Sui',
    'BCH': 'Bitcoin Cash',
    'XLM': 'Stellar',
    'AVAX': 'Avalanche',
    'WBTC': 'Wrapped Bitcoin',
    'HBAR': 'Hedera',
    'LEO': 'LEO Token',
    'CRO': 'Cronos',
    'LTC': 'Litecoin',
    'TON': 'Toncoin'
  };
  return coinNames[symbol] || symbol;
}

// Helper function to generate sparkline data
function generateSparklineData(price: number, changePercent: number): number[] {
  const points = 7;
  const variation = Math.abs(changePercent) / 100;
  const basePrice = price / (1 + changePercent / 100);
  
  return Array.from({ length: points }, (_, i) => {
    const randomVariation = (Math.random() - 0.5) * variation * 0.1;
    const trend = (i / (points - 1)) * (changePercent / 100);
    return basePrice * (1 + trend + randomVariation);
  });
}
