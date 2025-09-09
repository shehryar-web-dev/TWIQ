"use client";
import React, { useMemo, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Filter,
  Loader2,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { useCoins } from "@/features/coins/hooks/useCoins";
import { CoinsQueryParams } from "@/features/coins/coins.types";
import { FilterModal } from "@/features/coins/components/FilterModal";
import {
  CoinsPagination,
  CoinsPaginationCompact,
} from "@/features/coins/components/CoinsPagination";

type Coin = {
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  change7d: number;
  mcap: number;
  vol24h: number;
  supply: number;
  exchange?: string;
  spark?: number[];
};

interface CoinsTableProps {
  data?: Coin[]; // Optional for backward compatibility
  useApi?: boolean; // Flag to enable API usage
}

export default function CoinsTable({
  data: propData,
  useApi = true,
}: CoinsTableProps) {
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [sort, setSort] = useState<"mcap" | "vol" | "price" | "change24h">(
    "mcap"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<CoinsQueryParams>({
    pageSize: 20,
    sortBy: "marketCap",
    sortOrder: "desc",
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQ(q);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [q]);

  // API query parameters
  const queryParams: CoinsQueryParams = useMemo(() => {
    const sortMapping = {
      mcap: "marketCap" as const,
      vol: "volUsd24h" as const,
      price: "price" as const,
      change24h: "priceChangePercent24h" as const,
    };

    return {
      ...filters,
      pageNum: currentPage,
      sortBy: sortMapping[sort],
      sortOrder: sortDirection,
      search: debouncedQ.trim() || undefined, // Add debounced search parameter
    };
  }, [filters, currentPage, sort, sortDirection, debouncedQ]);

  // Use API data or prop data
  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = useCoins(useApi ? queryParams : {});
  const data = useApi ? apiData?.coins || [] : propData || [];

  const filtered = useMemo(() => {
    if (!data.length) return [];

    // If using API, data is already filtered and sorted by the API
    if (useApi) return data;

    // Client-side filtering and sorting for prop data
    const f = data.filter((c) =>
      (c.name + c.symbol).toLowerCase().includes(q.toLowerCase())
    );

    // Client-side sorting for prop data
    const key = (c: Coin) =>
      sort === "mcap"
        ? c.mcap
        : sort === "vol"
        ? c.vol24h
        : sort === "price"
        ? c.price
        : c.change24h;
    return f.sort((a, b) => {
      const aVal = key(a);
      const bVal = key(b);
      return sortDirection === "desc" ? bVal - aVal : aVal - bVal;
    });
  }, [data, q, sort, sortDirection, useApi]);

  // Filter modal handlers
  const handleFilterApply = (newFilters: CoinsQueryParams) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const hasActiveFilters = () => {
    return Object.keys(filters).some((key) => {
      const value = filters[key as keyof CoinsQueryParams];
      return (
        value !== undefined &&
        value !== 20 &&
        value !== "marketCap" &&
        value !== "desc"
      );
    });
  };

  const handleQueryReset = () => {
    setFilters({
      pageSize: 20,
      sortBy: "marketCap",
      sortOrder: "desc",
    });
    setCurrentPage(1);
    setQ(""); // This will trigger a new API call with empty search
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate pagination info
  // Since API doesn't return totalItems, we'll use a simpler approach
  const hasMorePages = useApi
    ? data.length === (filters.pageSize || 20)
    : false;
  const totalItems = useApi
    ? currentPage * (filters.pageSize || 20) + (hasMorePages ? 1 : 0)
    : filtered.length;
  const totalPages = useApi
    ? hasMorePages
      ? currentPage + 1
      : currentPage
    : 1;

  const usd = (n: number) =>
    n >= 1e12
      ? `$${(n / 1e12).toFixed(2)}T`
      : n >= 1e9
      ? `$${(n / 1e9).toFixed(2)}B`
      : n >= 1e6
      ? `$${(n / 1e6).toFixed(2)}M`
      : `$${n.toLocaleString()}`;

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-3 w-3" />
    ) : (
      <TrendingDown className="h-3 w-3" />
    );
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-500" : "text-red-500";
  };

  const getChangeBgColor = (change: number) => {
    return change >= 0
      ? "bg-green-50 dark:bg-green-950/20"
      : "bg-red-50 dark:bg-red-950/20";
  };

  const handleSort = (newSort: typeof sort) => {
    if (sort === newSort) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSort(newSort);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (column: typeof sort) => {
    if (sort !== column)
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
    return sortDirection === "desc" ? (
      <TrendingDown className="h-4 w-4 text-primary" />
    ) : (
      <TrendingUp className="h-4 w-4 text-primary" />
    );
  };

  // We'll handle loading and error states within the main component
  // to keep search and filter sections visible

  return (
    <div>
      <Card className="p-3 sm:p-4 lg:p-6 rounded-2xl shadow-sm border-0 bg-card/50 backdrop-blur-sm">
        {/* Header Section - Responsive */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Title and Stats Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <h3 className="text-lg sm:text-xl font-bold">
                {t("pages.coins.table.coinPrices", "Coin Prices")}
              </h3>
              <Badge variant="secondary" className="text-xs w-fit">
                <span>
                  {filtered.length} {t("pages.coins.table.coins", "coins")}
                </span>
              </Badge>
            </div>
            {useApi && (
              <Button
                onClick={() => refetch()}
                variant="ghost"
                size="sm"
                className="gap-2 w-fit"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">{t("pages.coins.filters.refresh")}</span>
              </Button>
            )}
          </div>

          {/* Search and Filters Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                className="!pl-10 rounded-xl w-full bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                placeholder={t("pages.coins.table.searchPlaceholder")}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type={"search"}
              />
            </div>

            {/* Filter Buttons */}
            {useApi && (
              <div className="flex items-center gap-2 flex-shrink-0">
                {hasActiveFilters() && (
                  <Button
                    variant="outline"
                    onClick={handleQueryReset}
                    className="gap-2 bg-background/50 border-border/50 hover:bg-muted/50 text-red-600 hover:text-red-700 px-3"
                  >
                    <X className="h-4 w-4" />
                    <span className="hidden sm:inline">{t("pages.coins.filters.clear")}</span>
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setIsFilterModalOpen(true)}
                  className="gap-2 bg-background/50 border-border/50 hover:bg-muted/50 px-3"
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("pages.coins.filters.showFilters")}</span>
                  <span className="sm:hidden">{t("pages.coins.filters.filters")}</span>
                  {hasActiveFilters() && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                    >
                      !
                    </Badge>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-border/50">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b-2 bg-gray-50 dark:bg-muted/30">
                <TableHead className="font-bold text-gray-700 dark:text-muted-foreground w-16 bg-gray-100 dark:bg-muted/20 py-4">
                  #
                </TableHead>
                <TableHead className="font-bold text-gray-700 dark:text-muted-foreground min-w-[200px] bg-gray-100 dark:bg-muted/20 py-4">
                  Name
                </TableHead>
                <TableHead
                  className="text-right font-bold text-gray-700 dark:text-muted-foreground cursor-pointer hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-200 dark:hover:bg-muted/40 transition-colors min-w-[100px] bg-gray-100 dark:bg-muted/20 py-4"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center justify-end gap-2">
                    <span className="hidden sm:inline">Price</span>
                    <span className="sm:hidden">$</span>
                    {getSortIcon("price")}
                  </div>
                </TableHead>
                <TableHead
                  className="text-right font-bold text-gray-700 dark:text-muted-foreground cursor-pointer hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-200 dark:hover:bg-muted/40 transition-colors min-w-[80px] bg-gray-100 dark:bg-muted/20 py-4"
                  onClick={() => handleSort("change24h")}
                >
                  <div className="flex items-center justify-end gap-2">
                    <span className="hidden md:inline">24h</span>
                    <span className="md:hidden">24h</span>
                    {getSortIcon("change24h")}
                  </div>
                </TableHead>
                <TableHead className="text-right font-bold text-gray-700 dark:text-muted-foreground min-w-[80px] hidden lg:table-cell bg-gray-100 dark:bg-muted/20 py-4">
                  7d
                </TableHead>
                <TableHead
                  className="text-right font-bold text-gray-700 dark:text-muted-foreground cursor-pointer hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-200 dark:hover:bg-muted/40 transition-colors min-w-[120px] hidden md:table-cell bg-gray-100 dark:bg-muted/20 py-4"
                  onClick={() => handleSort("mcap")}
                >
                  <div className="flex items-center justify-end gap-2">
                    <span className="hidden lg:inline">Market Cap</span>
                    <span className="lg:hidden">Mkt Cap</span>
                    {getSortIcon("mcap")}
                  </div>
                </TableHead>
                <TableHead
                  className="text-right font-bold text-gray-700 dark:text-muted-foreground cursor-pointer hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-200 dark:hover:bg-muted/40 transition-colors min-w-[120px] hidden lg:table-cell bg-gray-100 dark:bg-muted/20 py-4"
                  onClick={() => handleSort("vol")}
                >
                  <div className="flex items-center justify-end gap-2">
                    Volume
                    {getSortIcon("vol")}
                  </div>
                </TableHead>
                <TableHead className="text-right font-bold text-gray-700 dark:text-muted-foreground min-w-[100px] hidden xl:table-cell bg-gray-100 dark:bg-muted/20 py-4">
                  Supply
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Loading State */}
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="w-full text-center py-8 sm:py-12 "
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center w-full">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span className="text-sm sm:text-lg font-medium">
                        {t("pages.coins.filters.loadingData")}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 sm:py-12">
                    <div className="flex flex-col items-center gap-4 justify-center w-full">
                      <AlertCircle className="h-8 w-8 sm:h-12 sm:w-12 text-red-500" />
                      <div className="text-center">
                        <h3 className="text-base sm:text-lg font-semibold mb-2">
                          {t("pages.coins.filters.failedToLoad")}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 px-4">
                          {error instanceof Error
                            ? error.message
                            : t("pages.coins.filters.failedToLoad")}
                        </p>
                        <Button
                          onClick={() => refetch()}
                          variant="outline"
                          className="gap-2"
                        >
                          <RefreshCw className="h-4 w-4" />
                          {t("pages.coins.filters.tryAgain")}
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data Rows */}
              {!isLoading &&
                !error &&
                filtered.map((c, index) => (
                   <TableRow
                     key={c.symbol}
                     className="hover:bg-gray-50 dark:hover:bg-muted/30 transition-colors border-b border-gray-200 dark:border-border/50"
                   >
                     {/* Rank */}
                     <TableCell className="font-medium text-gray-600 dark:text-muted-foreground w-16 py-4">
                       <div className="flex items-center gap-1">
                         <span className="text-sm font-semibold">#{c.rank}</span>
                         {c.rank <= 3 && (
                           <Badge
                             variant={c.rank === 1 ? "default" : "secondary"}
                             className="text-xs hidden sm:flex"
                           >
                             {c.rank === 1 ? "🥇" : c.rank === 2 ? "🥈" : "🥉"}
                           </Badge>
                         )}
                       </div>
                     </TableCell>

                     {/* Name */}
                     <TableCell className="font-medium min-w-[200px] py-4">
                       <div className="flex items-center gap-2 sm:gap-3">
                         <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0">
                           <span className="text-xs sm:text-sm font-bold text-primary">
                             {c.symbol.charAt(0)}
                           </span>
                         </div>
                         <div className="min-w-0 flex-1">
                           <div className="font-semibold text-sm sm:text-base truncate text-gray-900 dark:text-foreground">
                             {c.name}
                           </div>
                           <div className="text-xs text-gray-500 dark:text-muted-foreground uppercase font-medium">
                             {c.symbol}
                           </div>
                         </div>
                       </div>
                     </TableCell>

                     {/* Price */}
                     <TableCell className="text-right font-mono font-semibold min-w-[100px] py-4">
                       <div className="text-sm sm:text-base text-gray-900 dark:text-foreground">
                         {formatPrice(c.price)}
                       </div>
                     </TableCell>

                    {/* 24h Change */}
                    <TableCell className="text-right min-w-[80px] py-4">
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeBgColor(
                          c.change24h
                        )} ${getChangeColor(c.change24h)}`}
                      >
                        {getChangeIcon(c.change24h)}
                        {c.change24h >= 0 ? "+" : ""}
                        {c.change24h.toFixed(2)}%
                      </div>
                    </TableCell>

                    {/* 7d Change - Hidden on small screens */}
                    <TableCell className="text-right min-w-[80px] hidden lg:table-cell py-4">
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeBgColor(
                          c.change7d
                        )} ${getChangeColor(c.change7d)}`}
                      >
                        {getChangeIcon(c.change7d)}
                        {c.change7d >= 0 ? "+" : ""}
                        {c.change7d.toFixed(2)}%
                      </div>
                    </TableCell>

                     {/* Market Cap - Hidden on small screens */}
                     <TableCell className="text-right font-mono text-sm min-w-[120px] hidden md:table-cell py-4">
                       <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-foreground">
                         {usd(c.mcap)}
                       </div>
                     </TableCell>

                     {/* Volume - Hidden on small screens */}
                     <TableCell className="text-right font-mono text-sm text-gray-500 dark:text-muted-foreground min-w-[120px] hidden lg:table-cell py-4">
                       <div className="text-xs sm:text-sm">{usd(c.vol24h)}</div>
                     </TableCell>

                     {/* Supply - Hidden on small screens */}
                     <TableCell className="text-right font-mono text-sm text-gray-500 dark:text-muted-foreground min-w-[100px] hidden xl:table-cell py-4">
                       <div className="text-xs sm:text-sm">
                         {c.supply.toLocaleString()}
                       </div>
                     </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {!isLoading && !error && filtered.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="text-muted-foreground mb-2 text-sm sm:text-base">
              No coins found
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Try adjusting your search criteria
            </div>
          </div>
        )}
      </Card>

      {/* Filter Modal */}
      {useApi && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleFilterApply}
          currentFilters={filters}
          isLoading={isLoading}
        />
      )}

      {/* Pagination - Always show when using API */}
      {useApi && (
        <>
          {/* Desktop Pagination */}
          <div className="hidden md:block">
            <CoinsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={filters.pageSize || 20}
              onPageChange={handlePageChange}
              isLoading={isLoading}
              hasMorePages={hasMorePages}
            />
          </div>

          {/* Mobile Pagination */}
          <div className="md:hidden">
            <CoinsPaginationCompact
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={filters.pageSize || 20}
              onPageChange={handlePageChange}
              isLoading={isLoading}
              hasMorePages={hasMorePages}
            />
          </div>
        </>
      )}
    </div>
  );
}
