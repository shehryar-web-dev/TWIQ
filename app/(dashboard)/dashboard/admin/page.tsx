'use client';
import React from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, CreditCard, BarChart3, Settings, Crown, DollarSign, TrendingUp, Activity } from 'lucide-react';

export default function AdminPage() {
  const { t } = useTranslation();

  // Sample data
  const subscriptions = [
    { id: 1, user: 'user@example.com', plan: 'Premium', status: 'active', amount: 29.99, startDate: '2024-01-15', endDate: '2024-02-15' },
    { id: 2, user: 'trader@example.com', plan: 'Pro', status: 'active', amount: 99.99, startDate: '2024-01-10', endDate: '2024-02-10' },
    { id: 3, user: 'crypto@example.com', plan: 'Basic', status: 'expired', amount: 9.99, startDate: '2023-12-01', endDate: '2024-01-01' },
    { id: 4, user: 'investor@example.com', plan: 'Premium', status: 'cancelled', amount: 29.99, startDate: '2023-11-15', endDate: '2023-12-15' },
  ];

  const users = [
    { id: 1, email: 'user@example.com', name: 'John Doe', status: 'active', joinDate: '2024-01-15', lastActive: '2024-01-20', plan: 'Premium' },
    { id: 2, email: 'trader@example.com', name: 'Jane Smith', status: 'active', joinDate: '2024-01-10', lastActive: '2024-01-20', plan: 'Pro' },
    { id: 3, email: 'crypto@example.com', name: 'Mike Johnson', status: 'inactive', joinDate: '2023-12-01', lastActive: '2024-01-01', plan: 'Basic' },
    { id: 4, email: 'investor@example.com', name: 'Sarah Wilson', status: 'banned', joinDate: '2023-11-15', lastActive: '2023-12-15', plan: 'Premium' },
  ];

  const analytics = {
    totalUsers: 1247,
    activeSubscriptions: 892,
    monthlyRevenue: 45678.90,
    conversionRate: 12.5,
    churnRate: 3.2,
    avgSessionDuration: '24m 15s',
    topFeatures: ['Rug Checker', 'TASI Analysis', 'AI Signals', 'Social Trading']
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'expired': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'banned': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Pro': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Premium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Basic': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('pages.admin.title')}</h1>
        <p className="text-muted-foreground">{t('pages.admin.subtitle')}</p>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{analytics.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-emerald-600" />
              <div>
                <div className="text-2xl font-bold">{analytics.activeSubscriptions}</div>
                <div className="text-sm text-muted-foreground">Active Subscriptions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">${analytics.monthlyRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Monthly Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="subscriptions">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subscriptions">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              {t('pages.admin.subscriptions')}
            </div>
          </TabsTrigger>
          <TabsTrigger value="users">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {t('pages.admin.users')}
            </div>
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {t('pages.admin.analytics')}
            </div>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {t('pages.admin.settings')}
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.user}</TableCell>
                      <TableCell>
                        <Badge className={getPlanColor(sub.plan)}>
                          {sub.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sub.status)}>
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${sub.amount}</TableCell>
                      <TableCell>{sub.startDate}</TableCell>
                      <TableCell>{sub.endDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPlanColor(user.plan)}>
                          {user.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="destructive">Ban</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Churn Rate</span>
                    <span className="font-semibold">{analytics.churnRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Session Duration</span>
                    <span className="font-semibold">{analytics.avgSessionDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-semibold">{analytics.conversionRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.topFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Subscription Plans</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Basic</span>
                      </div>
                      <div className="text-2xl font-bold">$9.99</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Premium</span>
                      </div>
                      <div className="text-2xl font-bold">$29.99</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Pro</span>
                      </div>
                      <div className="text-2xl font-bold">$99.99</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">System Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span>API Services: Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span>Database: Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span>Notification Service: Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span>AI Services: Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
