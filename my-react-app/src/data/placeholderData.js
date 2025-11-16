import { DollarSign, ShoppingCart, Users, TrendingUp, Eye, MousePointer } from 'lucide-react';

// Generate random data for different time ranges
const generateData = (timeRange) => {
  const baseValues = {
    last7days: { revenue: 24568, orders: 1234, aov: 124.50, conversion: 3.2 },
    last30days: { revenue: 85690, orders: 4321, aov: 128.75, conversion: 3.5 },
    last90days: { revenue: 245600, orders: 12890, aov: 132.20, conversion: 3.8 }
  };

  const base = baseValues[timeRange];
  
  // Generate trends based on time range
  const trends = {
    last7days: { revenue: 12.5, orders: 8.2, aov: 4.1, conversion: -2.1 },
    last30days: { revenue: 15.3, orders: 12.1, aov: 6.2, conversion: 1.5 },
    last90days: { revenue: 22.8, orders: 18.5, aov: 8.9, conversion: 4.2 }
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
        title: 'Returning Customers',
        value: `${(Math.random() * 20 + 25).toFixed(1)}%`,
        trend: (Math.random() * 10 - 2).toFixed(1),
        icon: Users,
        bgColor: 'bg-indigo-500'
      },
      {
        id: 6,
        title: 'Ad Spend',
        value: `$${(base.revenue * 0.35).toLocaleString()}`,
        trend: (Math.random() * 15 + 5).toFixed(1),
        icon: DollarSign,
        bgColor: 'bg-red-500'
      },
      {
        id: 7,
        title: 'ROAS',
        value: `${(Math.random() + 2.5).toFixed(1)}x`,
        trend: (Math.random() * 8 + 2).toFixed(1),
        icon: TrendingUp,
        bgColor: 'bg-emerald-500'
      },
      {
        id: 8,
        title: 'CTR',
        value: `${(Math.random() + 1.5).toFixed(1)}%`,
        trend: (Math.random() * 6 - 3).toFixed(1),
        icon: Eye,
        bgColor: 'bg-amber-500'
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

// Export functions to get data by time range
export const getDataByTimeRange = (timeRange) => {
  return generateData(timeRange);
};

// Keep original data structure for backward compatibility
export const dashboardData = generateData('last7days');