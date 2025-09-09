'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { 
  Coins, 
  BarChart3, 
  Crown, 
  Activity, 
  Sun, 
  Moon, 
  Globe,
  Menu,
  X,
  Building2,
  Shield,
  Bell,
  Users,
  Copy,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';
import { WalletButton } from '@/features/wallet/solana';

export default function Header() {
  const { theme, toggleTheme, language, toggleLanguage } = useTheme();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Main navigation - most important features
  const mainNavigation = [
    { name: t('navigation.coins'), href: '/dashboard/coins', icon: Coins, isPremium: false, isAdmin: false },
    { name: t('navigation.charts'), href: '/dashboard/charts', icon: BarChart3, isPremium: false, isAdmin: false },
    { name: t('navigation.tasi'), href: '/dashboard/tasi', icon: Building2, isPremium: false, isAdmin: false },
    { name: t('navigation.solanaDex'), href: '/dashboard/sol-dex', icon: Activity, isPremium: false, isAdmin: false },
  ];

  // Additional features in dropdown
  const additionalFeatures = [
    { name: t('navigation.rugChecker'), href: '/dashboard/rug-checker', icon: Shield, isPremium: true, isAdmin: false },
    { name: t('navigation.notifications'), href: '/dashboard/notifications', icon: Bell, isPremium: true, isAdmin: false },
    { name: t('navigation.socialTrading'), href: '/dashboard/social-trading', icon: Copy, isPremium: true, isAdmin: false },
    { name: t('navigation.premium'), href: '/dashboard/premium', icon: Crown, isPremium: true, isAdmin: false },
    { name: t('navigation.admin'), href: '/dashboard/admin', icon: Users, isPremium: false, isAdmin: true },
  ];

  const allNavigation = [...mainNavigation, ...additionalFeatures];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard/coins" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-xl">TWiQ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          
          {/* More Features Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span>More</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            {isMoreMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-lg shadow-lg z-50">
                <div className="p-2">
                  {additionalFeatures.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(item.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{item.name}</span>
                        {item.isPremium && (
                          <Crown className="h-3 w-3 text-amber-500" />
                        )}
                        {item.isAdmin && (
                          <Users className="h-3 w-3 text-gray-500" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Wallet Button - Always visible */}
          <WalletButton variant="outline" size="sm" />

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="sr-only">{t('ui.switchToEnglish')}</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            {theme === 'light' ? <Moon className="h-3 w-3 sm:h-4 sm:w-4" /> : <Sun className="h-3 w-3 sm:h-4 sm:w-4" />}
            <span className="sr-only">{t('ui.switchToDarkMode')}</span>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-8 w-8 sm:h-9 sm:w-9 p-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-3 w-3 sm:h-4 sm:w-4" /> : <Menu className="h-3 w-3 sm:h-4 sm:w-4" />}
            <span className="sr-only">{t('ui.toggleMenu')}</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4">
            <div className="space-y-1">
              {allNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{item.name}</span>
                    {item.isPremium && (
                      <Crown className="h-3 w-3 text-amber-500" />
                    )}
                    {item.isAdmin && (
                      <Users className="h-3 w-3 text-gray-500" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
