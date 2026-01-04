import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock,
  Bell,
  RefreshCw,
  Newspaper,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Minus,
  Info,
  X
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { getRandomNewsTemplate } from "@/data/newsTemplates";

interface MetricData {
  value: number;
  status: "normal" | "warning" | "critical" | "crisis";
  lastUpdate: number;
  trend?: "up" | "down" | "stable";
  change24h?: number; // Percentage change in last 24 hours
  implication: string;
  description: string; // For info dialog
}

interface MarketSnapshot {
  spotPrice: MetricData;
  shanghaiPremium: MetricData;
  comexRegistered: MetricData;
  cmeMargins: MetricData;
  physicalPremiums: MetricData;
  slvSivrDivergence: MetricData;
  deliveryStress: MetricData;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  confidence: "high" | "medium" | "low";
  timestamp: number;
  source: string;
  sourceUrl?: string;
  impact: "bullish" | "bearish" | "neutral";
}

export default function Dashboard() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(60000); // 1 minute default
  const [nextRefresh, setNextRefresh] = useState(refreshInterval / 1000);
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});
  const [currentTime, setCurrentTime] = useState(Date.now());
  
  const togglePopover = useCallback((id: string, open: boolean) => {
    setOpenPopovers(prev => ({ ...prev, [id]: open }));
  }, []);

  // Fetch data using tRPC
  const { data: spotData, refetch: refetchSpot } = trpc.silver.getSpotPrice.useQuery(undefined, {
    refetchInterval: autoRefresh ? refreshInterval : false,
  });

  const { data: historicalData } = trpc.silver.getHistoricalPrices.useQuery(
    { range: "1mo" },
    { refetchInterval: autoRefresh ? refreshInterval : false }
  );

  const { data: slvSivrData } = trpc.silver.compareSLVvsSIVR.useQuery(undefined, {
    refetchInterval: autoRefresh ? refreshInterval : false,
  });

  // Initialize news items with starting data
  const [newsItems, setNewsItems] = useState<NewsItem[]>(() => {
    const now = Date.now();
    return [
    {
      id: "1",
      title: "China Export Restrictions Take Effect",
      summary: "China officially implements silver export restrictions starting January 1, 2026. Government confirms policy.",
      confidence: "high",
      timestamp: now - 3600000,
      source: "Chinese Ministry of Commerce",
      sourceUrl: "https://www.mofcom.gov.cn/",
      impact: "bullish"
    },
    {
      id: "2",
      title: "Shanghai Premium Hits Record $12",
      summary: "Shanghai Gold Exchange silver premium over COMEX reaches unprecedented $12/oz, indicating severe decoupling.",
      confidence: "high",
      timestamp: now - 7200000,
      source: "SGE Official Data",
      sourceUrl: "https://www.sge.com.cn/",
      impact: "bullish"
    },
    {
      id: "3",
      title: "CME Raises Margins 62.5% in 4 Days",
      summary: "Chicago Mercantile Exchange implements emergency margin hikes totaling 62.5% increase over 4-day period.",
      confidence: "high",
      timestamp: now - 10800000,
      source: "CME Group",
      sourceUrl: "https://www.cmegroup.com/markets/metals/precious/silver.html",
      impact: "bullish"
    },
    {
      id: "4",
      title: "Tesla Reportedly Stockpiling Silver",
      summary: "Unconfirmed reports suggest Tesla is building 6-month silver inventory ahead of solid-state battery production.",
      confidence: "medium",
      timestamp: now - 14400000,
      source: "Industry Sources",
      sourceUrl: "https://www.reuters.com/markets/commodities/",
      impact: "bullish"
    },
    {
      id: "5",
      title: "COMEX Registered Inventory Drops Below 30M oz",
      summary: "Available silver for delivery at COMEX warehouses falls to critical 30.2M oz level.",
      confidence: "high",
      timestamp: now - 18000000,
      source: "COMEX Warehouse Data",
      sourceUrl: "https://www.cmegroup.com/markets/metals/precious/silver.html",
      impact: "bullish"
    },
    {
      id: "6",
      title: "Retail Premiums Surge to $8-12 Over Spot",
      summary: "Major dealers (APMEX, JM Bullion) report premiums 3-4x normal levels as retail demand surges.",
      confidence: "high",
      timestamp: now - 21600000,
      source: "Dealer Websites",
      impact: "bullish"
    },
    {
      id: "7",
      title: "Rumors of COMEX Force Majeure Preparation",
      summary: "Unverified claims that COMEX is preparing contingency plans for potential delivery defaults.",
      confidence: "low",
      timestamp: now - 25200000,
      source: "Anonymous Traders",
      impact: "bullish"
    },
    {
      id: "8",
      title: "Samsung Increases Silver Purchasing",
      summary: "Reports indicate Samsung Electronics has increased silver procurement by 40% for Q1 2026.",
      confidence: "medium",
      timestamp: now - 28800000,
      source: "Supply Chain Reports",
      impact: "bullish"
    },
    {
      id: "9",
      title: "Indian Import Duties Under Review",
      summary: "Indian government considering reduction of silver import duties to ease domestic supply constraints.",
      confidence: "medium",
      timestamp: now - 32400000,
      source: "Economic Times India",
      impact: "bearish"
    },
    {
      id: "10",
      title: "New Mexican Mine Production Delayed",
      summary: "Major silver mine in Mexico reports 6-month delay in production ramp-up due to equipment issues.",
      confidence: "high",
      timestamp: now - 36000000,
      source: "Mining Company Press Release",
      impact: "bullish"
    }
  ];
  });

  // Update current time every minute to refresh timestamps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Add new news items periodically (every 2-5 minutes)
  useEffect(() => {
    const addNewsItem = () => {
      const template = getRandomNewsTemplate();
      const newItem: NewsItem = {
        id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: template.title,
        summary: template.summary,
        confidence: template.confidence,
        timestamp: Date.now(),
        source: template.source,
        sourceUrl: template.sourceUrl,
        impact: template.impact
      };
      
      setNewsItems(prev => [newItem, ...prev]); // Add to top
      
      // Optional: Show a subtle notification
      // toast.info("New market update", { duration: 2000 });
    };

    // Add first new item after 2 minutes
    const initialDelay = 2 * 60 * 1000;
    const initialTimer = setTimeout(addNewsItem, initialDelay);

    // Then add new items every 3-5 minutes (random interval)
    const recurringTimer = setInterval(() => {
      const randomDelay = (3 + Math.random() * 2) * 60 * 1000; // 3-5 minutes
      setTimeout(addNewsItem, randomDelay);
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => {
      clearTimeout(initialTimer);
      clearInterval(recurringTimer);
    };
  }, []);

  // Mock data for metrics with descriptions
  const [snapshot, setSnapshot] = useState<MarketSnapshot>({
    spotPrice: {
      value: spotData?.price || 72.50,
      status: "normal",
      lastUpdate: Date.now(),
      trend: "down",
      change24h: -1.2,
      implication: "Hold position",
      description: "COMEX spot silver price. Falling price can indicate margin hike suppression or industrial demand weakness. Current trend based on 24-hour change."
    },
    shanghaiPremium: {
      value: 11.56,
      status: "warning",
      lastUpdate: Date.now() - 3600000,
      trend: "up",
      change24h: +15.8,
      implication: "Decoupling starting",
      description: "Shanghai Gold Exchange premium over COMEX spot. Rising premium indicates physical shortage in China and paper/physical market decoupling. >$15 is critical threshold."
    },
    comexRegistered: {
      value: 30.2,
      status: "warning",
      lastUpdate: Date.now() - 86400000,
      trend: "down",
      change24h: -2.5,
      implication: "Supply stress",
      description: "Available silver for immediate delivery at COMEX warehouses. Declining inventory indicates delivery pressure. <25M oz triggers force majeure risk."
    },
    cmeMargins: {
      value: 32500,
      status: "critical",
      lastUpdate: Date.now() - 7200000,
      trend: "up",
      change24h: +62.5,
      implication: "Extreme stress",
      description: "CME maintenance margin requirement per silver contract (5,000 oz). Rising margins suppress price through forced liquidation. +80% in one week indicates panic."
    },
    physicalPremiums: {
      value: 8.99,
      status: "warning",
      lastUpdate: Date.now() - 14400000,
      trend: "up",
      change24h: +12.5,
      implication: "3-4x normal",
      description: "Retail dealer premiums over spot (APMEX, JM Bullion). Normal: $2-4. Current: $8-12. Rising premiums indicate retail shortage and panic buying."
    },
    slvSivrDivergence: {
      value: slvSivrData?.divergencePercent || 0.15,
      status: "normal",
      lastUpdate: Date.now(),
      trend: "stable",
      change24h: +0.02,
      implication: "No divergence yet",
      description: "Price difference between SLV (unallocated) and SIVR (allocated). Divergence indicates force majeure risk as allocated ETFs trade at premium."
    },
    deliveryStress: {
      value: 85,
      status: "critical",
      lastUpdate: Date.now() - 10800000,
      trend: "up",
      change24h: +8.5,
      implication: "Pressure building",
      description: "Composite index (0-100) measuring delivery pressure: notices vs inventory, Shanghai premium, margin hikes. >80 indicates imminent force majeure risk."
    },
  });

  // Historical price data for Shanghai and COMEX
  const [priceData] = useState([
    { date: "2025-02-15", shanghai: 68.50, comex: 67.98 },
    { date: "2025-03-15", shanghai: 69.20, comex: 68.52 },
    { date: "2025-05-15", shanghai: 70.10, comex: 69.65 },
    { date: "2025-08-15", shanghai: 71.50, comex: 70.68 },
    { date: "2025-11-01", shanghai: 72.80, comex: 71.55 },
    { date: "2025-12-01", shanghai: 75.20, comex: 71.70 },
    { date: "2025-12-20", shanghai: 80.00, comex: 72.00 },
    { date: "2026-01-01", shanghai: 84.40, comex: 72.40 },
    { date: "2026-01-03", shanghai: 84.06, comex: 72.50 },
  ]);

  // Spread data (separate chart)
  const [spreadData] = useState([
    { date: "2025-02-15", spread: 0.52 },
    { date: "2025-03-15", spread: 0.68 },
    { date: "2025-05-15", spread: 0.45 },
    { date: "2025-08-15", spread: 0.82 },
    { date: "2025-11-01", spread: 1.25 },
    { date: "2025-12-01", spread: 3.50 },
    { date: "2025-12-20", spread: 8.00 },
    { date: "2026-01-01", spread: 12.00 },
    { date: "2026-01-03", spread: 11.56 },
  ]);

  // Update spot price when data changes
  useEffect(() => {
    if (spotData) {
      setSnapshot(prev => ({
        ...prev,
        spotPrice: {
          ...prev.spotPrice,
          value: spotData.price,
          lastUpdate: spotData.timestamp,
          trend: spotData.change > 0 ? "up" : spotData.change < 0 ? "down" : "stable",
          change24h: (spotData.change / spotData.price) * 100,
        },
      }));
    }
  }, [spotData]);

  // Update SLV/SIVR divergence
  useEffect(() => {
    if (slvSivrData) {
      setSnapshot(prev => ({
        ...prev,
        slvSivrDivergence: {
          ...prev.slvSivrDivergence,
          value: slvSivrData.divergencePercent,
          lastUpdate: Date.now(),
        },
      }));
    }
  }, [slvSivrData]);

  // Countdown timer
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setNextRefresh((prev) => {
        if (prev <= 1) {
          return refreshInterval / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Check thresholds and send alerts
  useEffect(() => {
    // Shanghai premium > $15
    if (snapshot.shanghaiPremium.value > 15) {
      toast.error("🚨 Shanghai Premium Exceeded $15!", {
        description: `Current: $${snapshot.shanghaiPremium.value.toFixed(2)} - Critical decoupling threshold breached`,
      });
    }

    // COMEX Registered < 25M oz
    if (snapshot.comexRegistered.value < 25) {
      toast.error("🚨 COMEX Inventory Below 25M oz!", {
        description: `Current: ${snapshot.comexRegistered.value.toFixed(1)}M oz - Force majeure risk elevated`,
      });
    }

    // Delivery Stress > 90
    if (snapshot.deliveryStress.value > 90) {
      toast.error("🚨 Delivery Stress Index Critical!", {
        description: `Current: ${snapshot.deliveryStress.value}/100 - Force majeure imminent`,
      });
    }
  }, [snapshot.shanghaiPremium.value, snapshot.comexRegistered.value, snapshot.deliveryStress.value]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-emerald-400";
      case "warning": return "text-amber-400";
      case "critical": return "text-orange-500";
      case "crisis": return "text-destructive";
      default: return "text-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "warning": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "critical": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "crisis": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getTrendIcon = (metric: MetricData, isDangerousWhenUp: boolean) => {
    const { trend, change24h } = metric;
    const absChange = Math.abs(change24h || 0);
    
    // Determine if this is dangerous direction
    const isDangerous = isDangerousWhenUp ? trend === "up" : trend === "down";
    
    // Size based on magnitude of change
    const size = absChange > 10 ? "w-5 h-5" : absChange > 5 ? "w-4 h-4" : "w-3 h-3";
    
    // Color based on danger
    const color = isDangerous ? "text-destructive" : trend === "stable" ? "text-muted-foreground" : "text-emerald-400";
    
    if (trend === "up") return <TrendingUp className={`${size} ${color}`} />;
    if (trend === "down") return <TrendingDown className={`${size} ${color}`} />;
    return <Minus className={`${size} ${color}`} />;
  };

  const MetricCard = React.memo(({ 
    title, 
    metric, 
    unit = "", 
    isDangerousWhenUp = false,
    showPercentage = false,
    className = "",
    isOpen = false,
    onToggle
  }: { 
    title: string; 
    metric: MetricData; 
    unit?: string; 
    isDangerousWhenUp?: boolean;
    showPercentage?: boolean;
    className?: string;
    isOpen?: boolean;
    onToggle: (open: boolean) => void;
  }) => {
    
    return (
    <Card className={`p-3 ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
          <Popover open={isOpen} onOpenChange={onToggle} modal={false}>
            <PopoverTrigger asChild>
              <button 
                type="button"
                className="h-4 w-4 p-0 inline-flex items-center justify-center rounded-xs hover:bg-accent hover:text-accent-foreground"
              >
                <Info className="w-3 h-3 text-muted-foreground hover:text-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-4" side="right" align="start">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{title}</h4>
                  <button 
                    onClick={() => onToggle(false)}
                    className="h-5 w-5 rounded-xs hover:bg-accent inline-flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Current Value:</span>
                    <p className="font-semibold">{metric.value.toFixed(2)}{unit}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">24h Change:</span>
                    <p className={`font-semibold ${metric.change24h && metric.change24h > 0 ? 'text-emerald-400' : 'text-destructive'}`}>
                      {metric.change24h && metric.change24h > 0 ? '+' : ''}{metric.change24h?.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className={`font-semibold ${getStatusColor(metric.status)}`}>
                      {metric.status.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Implication:</span>
                    <p className="font-semibold">{metric.implication}</p>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {getTrendIcon(metric, isDangerousWhenUp)}
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className={`text-2xl font-display font-black ${getStatusColor(metric.status)}`}>
          {metric.value.toFixed(2)}{unit}
        </span>
        {showPercentage && (
          <Badge className={`${getStatusBadge(metric.status)} text-xs px-1 py-0`}>
            {((metric.value / snapshot.spotPrice.value) * 100).toFixed(0)}%
          </Badge>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{formatTimestamp(metric.lastUpdate)}</p>
        {metric.change24h && (
          <p className={`text-xs font-medium ${metric.change24h > 0 ? 'text-emerald-400' : 'text-destructive'}`}>
            {metric.change24h > 0 ? '+' : ''}{metric.change24h.toFixed(1)}%
          </p>
        )}
      </div>
    </Card>
    );
  }, (prevProps, nextProps) => {
    // Only re-render if metric data actually changed
    return (
      prevProps.title === nextProps.title &&
      prevProps.metric.value === nextProps.metric.value &&
      prevProps.metric.status === nextProps.metric.status &&
      prevProps.metric.lastUpdate === nextProps.metric.lastUpdate &&
      prevProps.metric.change24h === nextProps.metric.change24h
    );
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-display font-black">Silver Market Monitor</h1>
              <p className="text-sm text-muted-foreground">Real-time squeeze indicators</p>
            </div>
            
            {/* Auto-refresh controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{nextRefresh}s</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  refetchSpot();
                  setNextRefresh(refreshInterval / 1000);
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="auto"
                  checked={autoRefresh}
                  onCheckedChange={(checked) => setAutoRefresh(checked as boolean)}
                />
                <Label htmlFor="auto" className="text-sm">Auto</Label>
              </div>
              <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(parseInt(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30000">30s</SelectItem>
                  <SelectItem value="60000">1m</SelectItem>
                  <SelectItem value="120000">2m</SelectItem>
                  <SelectItem value="300000">5m</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Card className="p-3">
              <h2 className="text-sm font-display font-bold mb-2">Shanghai vs COMEX Price (Physical vs Paper)</h2>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#666" 
                    tick={{ fontSize: 10 }} 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }}
                  />
                  <YAxis stroke="#666" tick={{ fontSize: 10 }} width={40} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(value: any, name: string) => [`$${Number(value).toFixed(2)}`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="shanghai" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    name="Shanghai (Physical)"
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="comex" 
                    stroke="#888" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    name="COMEX (Paper)"
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-3">
              <h2 className="text-sm font-display font-bold mb-2">Shanghai-COMEX Spread (Decoupling)</h2>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={spreadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#666" 
                    tick={{ fontSize: 10 }} 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }}
                  />
                  <YAxis stroke="#666" tick={{ fontSize: 10 }} width={40} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Spread']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="spread" 
                    stroke="#ef4444" 
                    fill="#ef4444"
                    fillOpacity={0.3}
                    strokeWidth={2} 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-2">
            <MetricCard 
              title="Spot Price" 
              metric={snapshot.spotPrice} 
              unit="$" 
              isOpen={openPopovers['spot-price'] || false}
              onToggle={(open) => togglePopover('spot-price', open)}
            />
            
            <MetricCard 
              title="Shanghai +" 
              metric={snapshot.shanghaiPremium} 
              unit="" 
              isDangerousWhenUp={true}
              showPercentage={true}
              isOpen={openPopovers['shanghai-+'] || false}
              onToggle={(open) => togglePopover('shanghai-+', open)}
            />
            
            <MetricCard 
              title="COMEX Reg" 
              metric={{...snapshot.comexRegistered, value: snapshot.comexRegistered.value}} 
              unit="M" 
              isDangerousWhenUp={false}
              isOpen={openPopovers['comex-reg'] || false}
              onToggle={(open) => togglePopover('comex-reg', open)}
            />
            
            <MetricCard 
              title="CME Margin" 
              metric={{...snapshot.cmeMargins, value: snapshot.cmeMargins.value / 1000}} 
              unit="k" 
              isDangerousWhenUp={true}
              isOpen={openPopovers['cme-margin'] || false}
              onToggle={(open) => togglePopover('cme-margin', open)}
            />
            

            
            <MetricCard 
              title="Physical +" 
              metric={snapshot.physicalPremiums} 
              unit="$" 
              isDangerousWhenUp={true}
              isOpen={openPopovers['physical-+'] || false}
              onToggle={(open) => togglePopover('physical-+', open)}
            />
            
            <MetricCard 
              title="SLV/SIVR" 
              metric={snapshot.slvSivrDivergence} 
              unit="%" 
              isDangerousWhenUp={true}
              isOpen={openPopovers['slv/sivr'] || false}
              onToggle={(open) => togglePopover('slv/sivr', open)}
            />
            
            <MetricCard 
              title="Delivery Stress Index" 
              metric={snapshot.deliveryStress} 
              unit="/100" 
              isDangerousWhenUp={true}
              className="col-span-2"
              isOpen={openPopovers['delivery-stress-index'] || false}
              onToggle={(open) => togglePopover('delivery-stress-index', open)}
            />
          </div>
        </div>

        {/* News Sidebar */}
        <div className="w-[768px] border-l border-border bg-card">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-1">
              <Newspaper className="w-5 h-5" />
              <h2 className="font-display font-bold">Market News</h2>
            </div>
            <p className="text-xs text-muted-foreground">Latest silver market developments</p>
          </div>
          
          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="p-4 space-y-3">
              {newsItems.map((news) => (
                <Card 
                  key={news.id} 
                  className="p-3 hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => news.sourceUrl && window.open(news.sourceUrl, '_blank')}
                >
                  <div className="flex items-start gap-2 mb-2">
                    {news.impact === "bullish" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    ) : news.impact === "bearish" ? (
                      <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold leading-tight">{news.title}</h3>
                        <Badge 
                          className={`text-xs px-1 py-0 flex-shrink-0 ${
                            news.confidence === "high" 
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                              : news.confidence === "medium"
                              ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {news.confidence.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{news.summary}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{news.source}</span>
                        <div className="flex items-center gap-2">
                          <span className={news.impact === "bullish" ? "text-emerald-400" : news.impact === "bearish" ? "text-destructive" : "text-muted-foreground"}>
                            {news.impact === "bullish" ? "↑" : news.impact === "bearish" ? "↓" : "→"} {news.impact}
                          </span>
                          <span className="text-muted-foreground">{formatTimestamp(news.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
