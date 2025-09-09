'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface CoinsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
  hasMorePages?: boolean; // New prop to indicate if there are more pages
}

export function CoinsPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  isLoading = false,
  className = '',
  hasMorePages = false
}: CoinsPaginationProps) {
  const { t } = useTranslation();

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Always show pagination when using API
  // The component will handle disabled states appropriately

  return (
    <Card className={`rounded-2xl ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
        {/* Items Info */}
        <div className="text-sm text-gray-600 dark:text-muted-foreground order-2 sm:order-1">
          {t("pages.coins.pagination.page")} <span className="font-medium text-gray-900 dark:text-foreground">{currentPage}</span>
          {hasMorePages && (
            <span className="text-gray-500 dark:text-muted-foreground"> • {t("pages.coins.pagination.morePagesAvailable")}</span>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2 order-1 sm:order-2">
          {/* First Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || isLoading}
            className="h-9 w-9 p-0 hidden sm:flex"
          >
                  <ChevronsLeft className="h-5 w-5" />
                  <span className="sr-only">{t("pages.coins.pagination.firstPage")}</span>
          </Button>

          {/* Previous Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="h-9 w-9 p-0"
          >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">{t("pages.coins.pagination.previousPage")}</span>
          </Button>

          {/* Current Page Indicator */}
          <div className="flex items-center gap-1 mx-2">
            <span className="text-sm font-medium px-3 py-1 bg-muted rounded-md min-w-[2rem] text-center">
              {currentPage}
            </span>
          </div>

          {/* Next Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasMorePages || isLoading}
            className="h-9 w-9 p-0"
          >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">{t("pages.coins.pagination.nextPage")}</span>
          </Button>
        </div>

        {/* Page Size Info */}
        <div className="hidden lg:flex items-center gap-2 text-sm order-3">
          <span className="text-muted-foreground">
            {itemsPerPage} {t("pages.coins.pagination.perPage")}
          </span>
        </div>
      </div>
    </Card>
  );
}

// Compact version for mobile
export function CoinsPaginationCompact({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  isLoading = false,
  className = '',
  hasMorePages = false
}: CoinsPaginationProps) {
  const { t } = useTranslation();

  // Always show pagination when using API
  // The component will handle disabled states appropriately

  return (
    <Card className={`rounded-2xl ${className}`}>
      <div className="flex items-center justify-between gap-4 p-4">
        {/* Page Info */}
        <div className="text-sm text-gray-600 dark:text-muted-foreground">
          {t("pages.coins.pagination.page")} {currentPage}
          {hasMorePages && <span className="text-primary"> • {t("pages.coins.pagination.more")}</span>}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="h-9 w-9 p-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-1 mx-2">
            <span className="text-sm font-medium min-w-[2rem] text-center">
              {currentPage}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasMorePages || isLoading}
            className="h-9 w-9 p-0"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}