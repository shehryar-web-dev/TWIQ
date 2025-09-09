'use client';
import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Plus, Settings, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

export default function NotificationsPage() {
  const { t } = useTranslation();
  const [contractAddress, setContractAddress] = useState('');
  const [marketCapMin, setMarketCapMin] = useState('');
  const [marketCapMax, setMarketCapMax] = useState('');

  // Sample notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    newTokens: true,
    memeTokens: true,
    lowMcap: false,
    volumeSpikes: true,
    priceAlerts: true,
    whaleActivity: false,
  });

  const sampleAlerts = [
    {
      id: 1,
      type: 'newToken',
      title: 'New Token Launched',
      description: 'PEPE2.0 launched with $2.5M liquidity',
      time: '2 minutes ago',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'memeToken',
      title: 'Meme Token Alert',
      description: 'DOGEKILLER trending on Twitter',
      time: '15 minutes ago',
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'volumeSpike',
      title: 'Volume Spike Detected',
      description: 'SHIB volume increased 300% in 1 hour',
      time: '1 hour ago',
      priority: 'high',
      read: true
    },
    {
      id: 4,
      type: 'priceAlert',
      title: 'Price Alert',
      description: 'BTC reached $45,000 target',
      time: '2 hours ago',
      priority: 'low',
      read: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddContract = () => {
    if (!contractAddress) return;
    // Add contract to watchlist
    console.log('Adding contract:', contractAddress);
    setContractAddress('');
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('pages.notifications.title')}</h1>
        <p className="text-muted-foreground">{t('pages.notifications.subtitle')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alert Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {t('pages.notifications.alertSettings')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t('pages.notifications.newTokens')}</div>
                  <div className="text-sm text-muted-foreground">Get notified about new token launches</div>
                </div>
                <Switch
                  checked={notificationSettings.newTokens}
                  onCheckedChange={(value) => handleSettingChange('newTokens', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t('pages.notifications.memeTokens')}</div>
                  <div className="text-sm text-muted-foreground">Alert for trending meme tokens</div>
                </div>
                <Switch
                  checked={notificationSettings.memeTokens}
                  onCheckedChange={(value) => handleSettingChange('memeTokens', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Low Market Cap Tokens</div>
                  <div className="text-sm text-muted-foreground">Notify about low MCAP opportunities</div>
                </div>
                <Switch
                  checked={notificationSettings.lowMcap}
                  onCheckedChange={(value) => handleSettingChange('lowMcap', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Volume Spikes</div>
                  <div className="text-sm text-muted-foreground">Alert for unusual volume activity</div>
                </div>
                <Switch
                  checked={notificationSettings.volumeSpikes}
                  onCheckedChange={(value) => handleSettingChange('volumeSpikes', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Price Alerts</div>
                  <div className="text-sm text-muted-foreground">Get notified when price targets are hit</div>
                </div>
                <Switch
                  checked={notificationSettings.priceAlerts}
                  onCheckedChange={(value) => handleSettingChange('priceAlerts', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Whale Activity</div>
                  <div className="text-sm text-muted-foreground">Track large wallet movements</div>
                </div>
                <Switch
                  checked={notificationSettings.whaleActivity}
                  onCheckedChange={(value) => handleSettingChange('whaleActivity', value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Cap Range */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {t('pages.notifications.marketCapRange')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Minimum Market Cap</label>
                <Input
                  placeholder="e.g., 1000000"
                  value={marketCapMin}
                  onChange={(e) => setMarketCapMin(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Maximum Market Cap</label>
                <Input
                  placeholder="e.g., 10000000"
                  value={marketCapMax}
                  onChange={(e) => setMarketCapMax(e.target.value)}
                />
              </div>
              <Button className="w-full">
                Save Market Cap Range
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Contract Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {t('pages.notifications.customAlerts')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t('pages.notifications.addContract')}
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="0x..."
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddContract} disabled={!contractAddress}>
                  Add Contract
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Add specific token contracts to monitor for price movements, volume spikes, and other activities.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 border border-border rounded-lg ${
                  !alert.read ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <Badge className={getPriorityColor(alert.priority)}>
                        {alert.priority}
                      </Badge>
                      {!alert.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {alert.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {alert.type === 'newToken' && <TrendingUp className="h-4 w-4 text-emerald-600" />}
                    {alert.type === 'volumeSpike' && <AlertCircle className="h-4 w-4 text-orange-600" />}
                    {alert.type === 'priceAlert' && <DollarSign className="h-4 w-4 text-blue-600" />}
                    {alert.type === 'memeToken' && <Bell className="h-4 w-4 text-purple-600" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Alerts Today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">New Tokens</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
