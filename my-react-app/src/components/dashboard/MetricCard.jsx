import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricCard = ({ metric }) => {
  const isPositive = metric.trend >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
        <div className={`p-2 rounded-lg ${metric.bgColor}`}>
          <metric.icon className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          <div className="flex items-center space-x-1 mt-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {metric.trend > 0 ? '+' : ''}{metric.trend}%
            </span>
            <span className="text-sm text-gray-500">vs previous</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;