// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import ChartContainer from './ChartContainer';
import { getDataByTimeRange } from '../../data/placeholderData';
import { getCurrentUser } from '../../utils/auth';

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('last7days');
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ metrics: [], charts: [] });

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    // Load initial data immediately
    const userId = currentUser?.id || currentUser?.email || null;
    try {
      const dashboardData = getDataByTimeRange(selectedTimeRange, userId);
      setData(dashboardData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Fallback to default data
      try {
        const defaultData = getDataByTimeRange(selectedTimeRange, null);
        setData(defaultData);
      } catch (fallbackError) {
        console.error('Error loading fallback data:', fallbackError);
        setData({ metrics: [], charts: [] });
      }
    }
  }, []);

  useEffect(() => {
    // Update data when time range or user changes
    if (user !== null || selectedTimeRange) {
      const userId = user?.id || user?.email || null;
      try {
        const dashboardData = getDataByTimeRange(selectedTimeRange, userId);
        setData(dashboardData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setData({ metrics: [], charts: [] });
      }
    }
  }, [selectedTimeRange]);

  const { metrics, charts } = data;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (!metrics || metrics.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {getGreeting()}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! 👋
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Here's your performance overview for {selectedTimeRange.replace('last', '').replace('days', ' days').replace('7', '7').replace('30', '30').replace('90', '90')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <p className="text-xs text-blue-100">Total Revenue</p>
              <p className="text-xl font-bold">{metrics[0]?.value || '$0'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-xl p-4 border border-gray-200">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Performance Metrics</h2>
          <p className="text-sm text-gray-600">Shopify & Meta Ads Performance</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full sm:w-auto"
          >
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="last90days">Last 90 days</option>
          </select>
          <button 
            onClick={() => {
              const reportData = {
                timeRange: selectedTimeRange,
                metrics: metrics,
                charts: charts,
                user: user,
                exportedAt: new Date().toISOString()
              };
              const dataStr = JSON.stringify(reportData, null, 2);
              const dataBlob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `analytics-report-${selectedTimeRange}-${Date.now()}.json`;
              link.click();
              URL.revokeObjectURL(url);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {metrics.slice(0, 5).map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      {/* Additional Metrics Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advertising Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {metrics.slice(5).map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      {/* All Metrics Grid (Alternative Layout) */}
      <div className="hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {charts.map((chart) => (
            <ChartContainer key={chart.id} chart={chart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;