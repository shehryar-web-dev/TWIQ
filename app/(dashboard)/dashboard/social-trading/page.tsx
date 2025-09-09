'use client';
import React from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, Copy, Star, Activity, DollarSign, Target, Zap } from 'lucide-react';

export default function SocialTradingPage() {
  const { t } = useTranslation();

  // Sample traders data
  const topTraders = [
    {
      id: 1,
      name: 'CryptoWhale',
      avatar: '🐋',
      followers: 1247,
      winRate: 78.5,
      totalTrades: 342,
      pnl: 125000,
      pnlPercent: 45.2,
      favoriteToken: 'SOL',
      isFollowing: false,
      riskLevel: 'medium',
      strategies: ['Momentum', 'Breakout'],
      lastTrade: '2 hours ago'
    },
    {
      id: 2,
      name: 'DeFiMaster',
      avatar: '⚡',
      followers: 892,
      winRate: 82.1,
      totalTrades: 156,
      pnl: 89000,
      pnlPercent: 67.8,
      favoriteToken: 'ETH',
      isFollowing: true,
      riskLevel: 'low',
      strategies: ['DCA', 'HODL'],
      lastTrade: '1 hour ago'
    },
    {
      id: 3,
      name: 'MemeKing',
      avatar: '👑',
      followers: 2156,
      winRate: 65.3,
      totalTrades: 89,
      pnl: 45000,
      pnlPercent: 23.4,
      favoriteToken: 'PEPE',
      isFollowing: false,
      riskLevel: 'high',
      strategies: ['Meme', 'Pump'],
      lastTrade: '30 minutes ago'
    },
    {
      id: 4,
      name: 'TechTrader',
      avatar: '💻',
      followers: 634,
      winRate: 71.2,
      totalTrades: 278,
      pnl: 67000,
      pnlPercent: 34.6,
      favoriteToken: 'BTC',
      isFollowing: true,
      riskLevel: 'medium',
      strategies: ['Swing', 'Technical'],
      lastTrade: '4 hours ago'
    }
  ];

  const copyTradingStats = {
    totalCopied: 23,
    totalProfit: 12500,
    successRate: 68.5,
    activeCopies: 8
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return 'Low Risk';
      case 'medium': return 'Medium Risk';
      case 'high': return 'High Risk';
      default: return risk;
    }
  };

  const handleFollow = (traderId: number) => {
    // Toggle follow status
    console.log('Follow/unfollow trader:', traderId);
  };

  const handleCopyTrade = (traderId: number) => {
    // Start copying trader
    console.log('Start copying trader:', traderId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('pages.socialTrading.title')}</h1>
        <p className="text-muted-foreground">{t('pages.socialTrading.subtitle')}</p>
      </div>

      {/* Copy Trading Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Copy className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{copyTradingStats.totalCopied}</div>
                <div className="text-sm text-muted-foreground">Traders Copied</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              <div>
                <div className="text-2xl font-bold">${copyTradingStats.totalProfit.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Profit</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{copyTradingStats.successRate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{copyTradingStats.activeCopies}</div>
                <div className="text-sm text-muted-foreground">Active Copies</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="traders">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="traders">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {t('pages.socialTrading.topTraders')}
            </div>
          </TabsTrigger>
          <TabsTrigger value="copyTrading">
            <div className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              {t('pages.socialTrading.copyTrading')}
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Top Traders Tab */}
        <TabsContent value="traders">
          <div className="grid gap-6">
            {topTraders.map((trader) => (
              <Card key={trader.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{trader.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{trader.name}</h3>
                          <Badge className={getRiskColor(trader.riskLevel)}>
                            {getRiskText(trader.riskLevel)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{trader.followers.toLocaleString()} followers</span>
                          <span>•</span>
                          <span>{trader.totalTrades} trades</span>
                          <span>•</span>
                          <span>Last trade: {trader.lastTrade}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {trader.strategies.map((strategy, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {strategy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">
                        +{trader.pnlPercent}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${trader.pnl.toLocaleString()} PnL
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {trader.winRate}% win rate
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Favorite:</span>
                      <Badge variant="outline">{trader.favoriteToken}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={trader.isFollowing ? "default" : "outline"}
                        onClick={() => handleFollow(trader.id)}
                      >
                        {trader.isFollowing ? (
                          <>
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            Following
                          </>
                        ) : (
                          <>
                            <Star className="h-4 w-4 mr-1" />
                            Follow
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleCopyTrade(trader.id)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Copy Trading Tab */}
        <TabsContent value="copyTrading">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Active Copy Trades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trader</TableHead>
                      <TableHead>Strategy</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Profit/Loss</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">DeFiMaster</TableCell>
                      <TableCell>DCA</TableCell>
                      <TableCell>$1,000</TableCell>
                      <TableCell className="text-emerald-600">+$234.50</TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Stop</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TechTrader</TableCell>
                      <TableCell>Swing</TableCell>
                      <TableCell>$500</TableCell>
                      <TableCell className="text-red-600">-$45.20</TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Stop</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Copy Trading Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">+12.5%</div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">Active Copies</div>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">68.5%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
