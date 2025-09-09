'use client';
import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Search, Shield, Lock } from 'lucide-react';

export default function RugCheckerPage() {
  const { t } = useTranslation();
  const [contractAddress, setContractAddress] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Sample analysis result
  const sampleAnalysis = {
    contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    riskLevel: 'low',
    score: 85,
    checks: {
      liquidityLocked: { passed: true, details: 'Liquidity locked for 2 years' },
      ownerRenounced: { passed: true, details: 'Ownership renounced' },
      verifiedContract: { passed: true, details: 'Contract verified on Etherscan' },
      honeypotCheck: { passed: true, details: 'No honeypot detected' },
      mintFunction: { passed: false, details: 'Mint function present - potential risk' },
      burnFunction: { passed: true, details: 'Burn function available' }
    },
    warnings: [
      'Mint function detected - tokens can be created indefinitely',
      'Low liquidity compared to market cap'
    ],
    recommendations: [
      'Monitor for unusual minting activity',
      'Consider waiting for more liquidity before investing'
    ]
  };

  const handleAnalyze = () => {
    if (!contractAddress) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult(sampleAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskText = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return t('pages.rugChecker.lowRisk');
      case 'medium': return t('pages.rugChecker.mediumRisk');
      case 'high': return t('pages.rugChecker.highRisk');
      default: return riskLevel;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('pages.rugChecker.title')}</h1>
        <p className="text-muted-foreground">{t('pages.rugChecker.subtitle')}</p>
      </div>

      {/* Analysis Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t('pages.rugChecker.checkToken')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t('pages.rugChecker.contractAddress')}
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="0x..."
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!contractAddress || isAnalyzing}
                  className="px-6"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Analyze
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Risk Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                {t('pages.rugChecker.analysisResults')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold mb-2">{analysisResult.score}/100</div>
                  <div className="text-sm text-muted-foreground">Security Score</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <Badge className={getRiskColor(analysisResult.riskLevel)}>
                    {getRiskText(analysisResult.riskLevel)}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-2">Risk Level</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold mb-2">
                    {Object.values(analysisResult.checks).filter((check: any) => check.passed).length}/
                    {Object.keys(analysisResult.checks).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Checks Passed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Checks */}
          <Card>
            <CardHeader>
              <CardTitle>Security Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analysisResult.checks).map(([key, check]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      {check.passed ? (
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <div className="font-medium">
                          {t(`pages.rugChecker.checks.${key}`)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {check.details}
                        </div>
                      </div>
                    </div>
                    <Badge variant={check.passed ? "default" : "destructive"}>
                      {check.passed ? 'Passed' : 'Failed'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warnings and Recommendations */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Warnings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="h-5 w-5" />
                  Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysisResult.warnings.map((warning: string, i: number) => (
                    <div key={i} className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <div className="text-sm">{warning}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Shield className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysisResult.recommendations.map((recommendation: string, i: number) => (
                    <div key={i} className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="text-sm">{recommendation}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Rug Check Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-600">✅ Safe Indicators</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Liquidity locked for extended periods</li>
                <li>• Ownership renounced</li>
                <li>• Verified contract source code</li>
                <li>• No mint function</li>
                <li>• Active community and development</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">⚠️ Red Flags</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Unlocked liquidity</li>
                <li>• Anonymous team</li>
                <li>• Unverified contract</li>
                <li>• High token supply with mint function</li>
                <li>• Suspicious token distribution</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
