'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Modal from '@/components/ui/modal';
import {
  X,
  Filter,
  DollarSign,
  TrendingUp,
  BarChart3,
  RefreshCw,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { CoinsQueryParams } from '../coins.types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: CoinsQueryParams) => void;
  currentFilters: CoinsQueryParams;
  isLoading?: boolean;
}

export function FilterModal({ 
  isOpen, 
  onClose, 
  onApply, 
  currentFilters, 
  isLoading = false 
}: FilterModalProps) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<CoinsQueryParams>(currentFilters);

  const handleFilterChange = (key: keyof CoinsQueryParams, value: string) => {
    // Allow empty string, decimal values, and negative values
  
        setFilters(prev => ({ ...prev, [key]: value }));
      }

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      pageSize: 20,
      sortBy: 'marketCap',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = () => {
    return Object.keys(filters).some(key => {
      const value = filters[key as keyof CoinsQueryParams];
      return value !== undefined && value !== 20 && value !== 'marketCap' && value !== 'desc';
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Advanced Filters"
      size="xl"
     
    >
      <div className="space-y-6">
        {/* Active Filters Indicator */}
        {hasActiveFilters() && (
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-gray-900 dark:text-foreground">Active Filters</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-7 px-2 text-xs text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground"
            >
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          </div>
        )}
          {/* Market Cap Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-gray-900 dark:text-foreground">
              <BarChart3 className="h-4 w-4 text-primary" />
              Market Cap Range
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-foreground">Min Market Cap ($)</label>
                <Input
                  type="number"
                  placeholder="e.g., 1,000,000,000"
                  min={0}
                  value={filters.minMarketCap || ''}
                  onChange={(e) => handleFilterChange('minMarketCap', e.target.value)}
                  className="bg-white dark:bg-background/50 border-gray-300 dark:border-border/50 focus:border-primary/50 focus:ring-primary/20 text-gray-900 dark:text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-foreground">Max Market Cap ($)</label>
                <Input
                  type="number"
                  placeholder="e.g., 100,000,000,000"
                  min={0}
                  value={filters.maxMarketCap || ''}
                  onChange={(e) => handleFilterChange('maxMarketCap', e.target.value)}
                  className="bg-white dark:bg-background/50 border-gray-300 dark:border-border/50 focus:border-primary/50 focus:ring-primary/20 text-gray-900 dark:text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Volume Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-gray-900 dark:text-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              24h Volume Range
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-foreground">Min Volume 24h ($)</label>
                <Input
                  type="number"
                  placeholder="e.g., 1,000,000"
                  min={0}
                  value={filters.minVolume24h || ''}
                  onChange={(e) => handleFilterChange('minVolume24h', e.target.value)}
                  className="bg-white dark:bg-background/50 border-gray-300 dark:border-border/50 focus:border-primary/50 focus:ring-primary/20 text-gray-900 dark:text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-foreground">Max Volume 24h ($)</label>
                <Input
                  type="number"
                  placeholder="e.g., 1,000,000,000"
                  min={0}
                  value={filters.maxVolume24h || ''}
                  onChange={(e) => handleFilterChange('maxVolume24h', e.target.value)}
                  className="bg-white dark:bg-background/50 border-gray-300 dark:border-border/50 focus:border-primary/50 focus:ring-primary/20 text-gray-900 dark:text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-gray-900 dark:text-foreground">
              <DollarSign className="h-4 w-4 text-primary" />
              Price Range
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-foreground">Min Price ($)</label>
                <Input
                  type="number"
                  placeholder="e.g., 0.01"
                  min={0}
                  step="0.01"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="bg-white dark:bg-background/50 border-gray-300 dark:border-border/50 focus:border-primary/50 focus:ring-primary/20 text-gray-900 dark:text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-foreground">Max Price ($)</label>
                <Input
                  type="number"
                  placeholder="e.g., 100,000"
                  min={0}
                  step="0.01"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="bg-white dark:bg-background/50 border-gray-300 dark:border-border/50 focus:border-primary/50 focus:ring-primary/20 text-gray-900 dark:text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Price Change Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-gray-900 dark:text-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              24h Price Change Range (%)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-foreground">Min 24h Change (%)</label>
                <Input
                  type="number"
                  placeholder="e.g., -50"
                  min={0}
                  step="0.01"
                  value={filters.minPriceChange24h || ''}
                  onChange={(e) => handleFilterChange('minPriceChange24h', e.target.value)}
                  className="bg-white dark:bg-background/50 border-gray-300 dark:border-border/50 focus:border-primary/50 focus:ring-primary/20 text-gray-900 dark:text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-foreground">Max 24h Change (%)</label>
                <Input
                  type="number"
                  placeholder="e.g., 100"
                  min={0}
                  step="0.01"
                  value={filters.maxPriceChange24h || ''}
                  onChange={(e) => handleFilterChange('maxPriceChange24h', e.target.value)}
                  className="bg-white dark:bg-background/50 border-gray-300 dark:border-border/50 focus:border-primary/50 focus:ring-primary/20 text-gray-900 dark:text-foreground"
                />
              </div>
            </div>
          </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-border/50">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-700 dark:text-foreground border-gray-300 dark:border-border/50 hover:bg-gray-50 dark:hover:bg-muted/50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={isLoading}
            className="gap-2 bg-primary hover:bg-primary/90 text-black dark:text-white"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Apply Filters
          </Button>
        </div>
      </div>
    </Modal>
  );
}
