// src/components/dashboard/Dashboard.jsx
import React, { useState } from 'react';
import MetricCard from './MetricCard';
import ChartContainer from './ChartContainer';
import { getDataByTimeRange } from '../../data/placeholderData';

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('last7days');
  const { metrics, charts } = getDataByTimeRange(selectedTimeRange);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Shopify & Meta Ads Performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="last90days">Last 90 days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Grid - 8 metrics as required */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart) => (
          <ChartContainer key={chart.id} chart={chart} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;