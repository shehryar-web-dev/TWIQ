// API Response Types
export interface CoinData {
  symbol: string;
  price: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  volUsd24h: number;
  volUsdChange24h: number;
  volUsdChangePercent24h: number;
  buyVolUsd24h: number;
  sellVolUsd24h: number;
  flowsUsd24h: number;
  priceChange12h: number;
  priceChangePercent12h: number;
  volUsd12h: number;
  volUsdChange12h: number;
  volUsdChangePercent12h: number;
  buyVolUsd12h: number;
  sellVolUsd12h: number;
  flowsUsd12h: number;
  priceChange4h: number;
  priceChangePercent4h: number;
  volUsd4h: number;
  volUsdChange4h: number;
  volUsdChangePercent4h: number;
  buyVolUsd4h: number;
  sellVolUsd4h: number;
  flowsUsd4h: number;
  priceChange1h: number;
  priceChangePercent1h: number;
  volUsd1h: number;
  volUsdChange1h: number;
  volUsdChangePercent1h: number;
  buyVolUsd1h: number;
  sellVolUsd1h: number;
  flowsUsd1h: number;
  priceChange1w: number;
  priceChangePercent1w: number;
  volUsd1w: number;
  volUsdChange1w: number;
  volUsdChangePercent1w: number;
  buyVolUsd1w: number;
  sellVolUsd1w: number;
  flowsUsd1w: number;
  priceChange15m: number;
  priceChangePercent15m: number;
  volUsd15m: number;
  buyVolUsd15m: number;
  sellVolUsd15m: number;
  flowsUsd15m: number;
  volUsdChange15m: number;
  volUsdChangePercent15m: number;
  priceChange30m: number;
  priceChangePercent30m: number;
  volUsd30m: number;
  volUsdChange30m: number;
  volUsdChangePercent30m: number;
  priceChange5m: number;
  priceChangePercent5m: number;
  volUsd5m: number;
  volUsdChange5m: number;
  volUsdChangePercent5m: number;
  marketCap: number;
}

export interface ApiResponse {
  success: boolean;
  data: {
    code: string;
    msg: string;
    data: CoinData[];
    success: boolean;
  };
  pagination: {
    pageNum: number;
    pageSize: number;
    timestamp: string;
    filters: Record<string, any>;
    totalItems?: number;
    totalPages?: number;
  };
}

// Component Types (for backward compatibility)
export interface Coin {
  rank: number;
  name: string;
  symbol: string;
  price: number;
  volUsdChange24h: number;

  marketCap: number;
  volUsd24h: number;
  supply: number;
  exchange?: string;
  spark?: number[];
}

export interface TickerData {
  symbol: string;
  name: string;
  price: number;
  volUsdChange24h: number;
  marketCap: number;
  volUsd24h: number;
  icon: string;
}

// API Query Parameters
export interface CoinsQueryParams {
  pageNum?: number;
  pageSize?: number;
  search?: string;
  minMarketCap?: number;
  maxMarketCap?: number;
  minVolume24h?: number;
  maxVolume24h?: number;
  minPrice?: number;
  maxPrice?: number;
  minPriceChange24h?: number;
  maxPriceChange24h?: number;
  sortBy?: "marketCap" | "volUsd24h" | "price" | "priceChangePercent24h";
  sortOrder?: "asc" | "desc";
}
