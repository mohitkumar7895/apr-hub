import { DollarSign, ShoppingCart, Users, TrendingUp, Eye, MousePointer, Target, Zap } from 'lucide-react';

// Generate user-specific seed based on user ID/email for consistent data
const getUserSeed = (userId) => {
  if (!userId) return 0;
  let hash = 0;
  const str = userId.toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Generate random data for different time ranges with user-specific variations
const generateData = (timeRange, userId = null) => {
  const seed = getUserSeed(userId);
  const userMultiplier = 0.8 + (seed % 40) / 100; // 0.8 to 1.2 multiplier
  // Base values with user-specific variations (keep as numbers, format later)
  const baseValues = {
    last7days: { 
      revenue: Math.round(24568 * userMultiplier), 
      orders: Math.round(1234 * userMultiplier), 
      aov: parseFloat((124.50 * userMultiplier).toFixed(2)), 
      conversion: parseFloat((3.2 + (seed % 10) / 10).toFixed(1)),
      returningCustomerRate: parseFloat((25 + (seed % 20)).toFixed(1)),
      impressions: Math.round(125000 * userMultiplier),
      purchasesFromAds: Math.round(456 * userMultiplier)
    },
    last30days: { 
      revenue: Math.round(85690 * userMultiplier), 
      orders: Math.round(4321 * userMultiplier), 
      aov: parseFloat((128.75 * userMultiplier).toFixed(2)), 
      conversion: parseFloat((3.5 + (seed % 10) / 10).toFixed(1)),
      returningCustomerRate: parseFloat((28 + (seed % 20)).toFixed(1)),
      impressions: Math.round(450000 * userMultiplier),
      purchasesFromAds: Math.round(1890 * userMultiplier)
    },
    last90days: { 
      revenue: Math.round(245600 * userMultiplier), 
      orders: Math.round(12890 * userMultiplier), 
      aov: parseFloat((132.20 * userMultiplier).toFixed(2)), 
      conversion: parseFloat((3.8 + (seed % 10) / 10).toFixed(1)),
      returningCustomerRate: parseFloat((32 + (seed % 20)).toFixed(1)),
      impressions: Math.round(1350000 * userMultiplier),
      purchasesFromAds: Math.round(5670 * userMultiplier)
    }
  };

  const base = baseValues[timeRange];
  
  // Generate trends based on time range with user-specific variations
  const trendVariation = (seed % 20) / 10 - 1; // -1 to +1 variation
  const trends = {
    last7days: { 
      revenue: 12.5 + trendVariation, 
      orders: 8.2 + trendVariation, 
      aov: 4.1 + trendVariation, 
      conversion: -2.1 + trendVariation,
      returningCustomerRate: 5.2 + trendVariation,
      impressions: 15.3 + trendVariation,
      purchasesFromAds: 12.8 + trendVariation
    },
    last30days: { 
      revenue: 15.3 + trendVariation, 
      orders: 12.1 + trendVariation, 
      aov: 6.2 + trendVariation, 
      conversion: 1.5 + trendVariation,
      returningCustomerRate: 8.5 + trendVariation,
      impressions: 18.7 + trendVariation,
      purchasesFromAds: 15.2 + trendVariation
    },
    last90days: { 
      revenue: 22.8 + trendVariation, 
      orders: 18.5 + trendVariation, 
      aov: 8.9 + trendVariation, 
      conversion: 4.2 + trendVariation,
      returningCustomerRate: 12.3 + trendVariation,
      impressions: 25.4 + trendVariation,
      purchasesFromAds: 22.1 + trendVariation
    }
  };

  const trend = trends[timeRange];

  return {
    metrics: [
      {
        id: 1,
        title: 'Total Revenue',
        value: `$${base.revenue.toLocaleString()}`,
        trend: trend.revenue,
        icon: DollarSign,
        bgColor: 'bg-green-500'
      },
      {
        id: 2,
        title: 'Orders',
        value: base.orders.toLocaleString(),
        trend: trend.orders,
        icon: ShoppingCart,
        bgColor: 'bg-blue-500'
      },
      {
        id: 3,
        title: 'AOV',
        value: `$${base.aov.toFixed(2)}`,
        trend: trend.aov,
        icon: TrendingUp,
        bgColor: 'bg-purple-500'
      },
      {
        id: 4,
        title: 'Conversion Rate',
        value: `${base.conversion}%`,
        trend: trend.conversion,
        icon: MousePointer,
        bgColor: 'bg-orange-500'
      },
      {
        id: 5,
        title: 'Returning Customer Rate',
        value: `${base.returningCustomerRate}%`,
        trend: parseFloat(trend.returningCustomerRate.toFixed(1)),
        icon: Users,
        bgColor: 'bg-indigo-500'
      },
      {
        id: 6,
        title: 'Ad Spend',
        value: `$${Math.round(base.revenue * 0.35).toLocaleString()}`,
        trend: parseFloat((trend.revenue * 0.8).toFixed(1)),
        icon: DollarSign,
        bgColor: 'bg-red-500'
      },
      {
        id: 7,
        title: 'ROAS',
        value: `${(2.5 + (seed % 20) / 10).toFixed(1)}x`,
        trend: parseFloat((trend.revenue * 0.4).toFixed(1)),
        icon: TrendingUp,
        bgColor: 'bg-emerald-500'
      },
      {
        id: 8,
        title: 'Impressions',
        value: base.impressions.toLocaleString(),
        trend: parseFloat(trend.impressions.toFixed(1)),
        icon: Eye,
        bgColor: 'bg-amber-500'
      },
      {
        id: 9,
        title: 'CTR',
        value: `${(1.5 + (seed % 15) / 10).toFixed(1)}%`,
        trend: parseFloat((trend.impressions * 0.3).toFixed(1)),
        icon: Target,
        bgColor: 'bg-cyan-500'
      },
      {
        id: 10,
        title: 'Purchases from Ads',
        value: base.purchasesFromAds.toLocaleString(),
        trend: parseFloat(trend.purchasesFromAds.toFixed(1)),
        icon: Zap,
        bgColor: 'bg-pink-500'
      }
    ],
    charts: [
      {
        id: 1,
        title: 'Sales Over Time',
        type: 'line',
        data: generateChartData(timeRange, ['sales', 'revenue']),
        lines: [
          { dataKey: 'sales', stroke: '#8884d8' },
          { dataKey: 'revenue', stroke: '#82ca9d' }
        ]
      },
      {
        id: 2,
        title: 'Top Products',
        type: 'bar',
        data: generateProductData(timeRange),
        bars: [
          { dataKey: 'sales', fill: '#8884d8' }
        ]
      },
      {
        id: 3,
        title: 'Ad Spend vs ROAS',
        type: 'line',
        data: generateAdData(timeRange),
        lines: [
          { dataKey: 'spend', stroke: '#ff7300' },
          { dataKey: 'roas', stroke: '#387908' }
        ]
      },
      {
        id: 4,
        title: 'Campaign Performance',
        type: 'bar',
        data: generateCampaignData(timeRange),
        bars: [
          { dataKey: 'clicks', fill: '#8884d8' },
          { dataKey: 'conversions', fill: '#82ca9d' }
        ]
      }
    ]
  };
};

// Generate different chart data based on time range
const generateChartData = (timeRange, keys) => {
  const periods = {
    last7days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    last30days: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    last90days: ['Month 1', 'Month 2', 'Month 3']
  };

  const multipliers = {
    last7days: 1,
    last30days: 4,
    last90days: 12
  };

  const multiplier = multipliers[timeRange];
  
  return periods[timeRange].map((period, index) => {
    const dataPoint = { name: period };
    keys.forEach(key => {
      if (key === 'sales') {
        dataPoint[key] = Math.floor((Math.random() * 5000 + 2000) * multiplier);
      } else if (key === 'revenue') {
        dataPoint[key] = Math.floor((Math.random() * 8000 + 3000) * multiplier);
      }
    });
    return dataPoint;
  });
};

const generateProductData = (timeRange) => {
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  const multiplier = timeRange === 'last7days' ? 1 : timeRange === 'last30days' ? 4 : 12;
  
  return products.map(product => ({
    name: product,
    sales: Math.floor(Math.random() * 5000 * multiplier + 1000 * multiplier)
  }));
};

const generateAdData = (timeRange) => {
  const periods = {
    last7days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    last30days: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    last90days: ['Month 1', 'Month 2', 'Month 3']
  };

  return periods[timeRange].map(period => ({
    name: period,
    spend: Math.floor(Math.random() * 3000 + 1000),
    roas: Math.random() * 3 + 1.5
  }));
};

const generateCampaignData = (timeRange) => {
  const campaigns = ['Brand', 'Prospecting', 'Retargeting', 'UGC'];
  const multiplier = timeRange === 'last7days' ? 1 : timeRange === 'last30days' ? 3 : 9;
  
  return campaigns.map(campaign => ({
    name: campaign,
    clicks: Math.floor(Math.random() * 5000 * multiplier + 1000 * multiplier),
    conversions: Math.floor(Math.random() * 3000 * multiplier + 500 * multiplier)
  }));
};

// Export functions to get data by time range with user ID
export const getDataByTimeRange = (timeRange, userId = null) => {
  return generateData(timeRange, userId);
};

// Keep original data structure for backward compatibility
export const dashboardData = generateData('last7days');