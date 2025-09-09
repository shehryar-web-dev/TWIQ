'use client';
import React from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Coins, 
  BarChart3, 
  Building2, 
  Activity, 
  Shield, 
  Bell, 
  Copy, 
  Crown, 
  Users,
  TrendingUp,
  Zap,
  Target,
  Globe,
  Lock,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const { t } = useTranslation();

  // Feature categories
  const freeFeatures = [
    {
      id: 'coins',
      title: t('navigation.coins'),
      description: 'Real-time cryptocurrency prices and market data',
      icon: Coins,
      href: '/dashboard/coins',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 'charts',
      title: t('navigation.charts'),
      description: 'Advanced price charts and technical analysis',
      icon: BarChart3,
      href: '/dashboard/charts',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 'tasi',
      title: t('navigation.tasi'),
      description: 'Saudi stock market analysis with AI insights',
      icon: Building2,
      href: '/dashboard/tasi',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800'
    },
    {
      id: 'solanaDex',
      title: t('navigation.solanaDex'),
      description: 'Solana DEX analytics and whale tracking',
      icon: Activity,
      href: '/dashboard/sol-dex',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    }
  ];

  const premiumFeatures = [
    {
      id: 'rugChecker',
      title: t('navigation.rugChecker'),
      description: 'Analyze token contracts for security risks',
      icon: Shield,
      href: '/dashboard/rug-checker',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      isPremium: true
    },
    {
      id: 'notifications',
      title: t('navigation.notifications'),
      description: 'Smart alerts for new tokens and opportunities',
      icon: Bell,
      href: '/dashboard/notifications',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      isPremium: true
    },
    {
      id: 'socialTrading',
      title: t('navigation.socialTrading'),
      description: 'Follow top traders and copy their strategies',
      icon: Copy,
      href: '/dashboard/social-trading',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      isPremium: true
    },
    {
      id: 'premium',
      title: t('navigation.premium'),
      description: 'AI-powered trading insights and analytics',
      icon: Crown,
      href: '/dashboard/premium',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
      isPremium: true
    }
  ];

  const adminFeatures = [
    {
      id: 'admin',
      title: t('navigation.admin'),
      description: 'Manage users, subscriptions, and platform settings',
      icon: Users,
      href: '/dashboard/admin',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 dark:bg-gray-900/20',
      borderColor: 'border-gray-200 dark:border-gray-800',
      isAdmin: true
    }
  ];

  const FeatureCard = ({ feature, showLock = false }: { feature: any, showLock?: boolean }) => {
    const Icon = feature.icon;
    return (
      <Link href={feature.href}>
        <Card className={`group hover:shadow-lg transition-all duration-200 cursor-pointer ${feature.bgColor} ${feature.borderColor} border-2`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${feature.bgColor}`}>
                <Icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              {showLock && (
                <div className="flex items-center gap-1">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs">
                    Premium
                  </Badge>
                </div>
              )}
              {feature.isAdmin && (
                <Badge variant="outline" className="text-xs">
                  Admin
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {feature.description}
            </p>
            <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all">
              <span>Explore</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">TWiQ Platform</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced cryptocurrency and stock market analytics with AI-powered insights, 
          social trading, and comprehensive risk analysis tools.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4 text-blue-500" />
            <span>Multi-Language</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Secure</span>
          </div>
        </div>
      </div>

      {/* Free Features */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Core Features</h2>
          <Badge variant="outline">Free</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {freeFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>

      {/* Premium Features */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Premium Features</h2>
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {premiumFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} showLock={true} />
          ))}
        </div>
      </section>

      {/* Admin Features */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Administration</h2>
          <Badge variant="outline">Admin Only</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of traders using TWiQ's advanced analytics and AI-powered insights 
              to make smarter investment decisions.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="px-8">
                <Coins className="h-4 w-4 mr-2" />
                Start Trading
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
