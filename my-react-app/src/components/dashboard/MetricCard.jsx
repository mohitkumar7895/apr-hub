import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricCard = ({ metric }) => {
  const isPositive = metric.trend >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 truncate flex-1">{metric.title}</h3>
        <div className={`p-2 sm:p-2.5 rounded-lg ${metric.bgColor} group-hover:scale-110 transition-transform flex-shrink-0 ml-2`}>
          <metric.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{metric.value}</p>
          <div className="flex items-center space-x-1 mt-1 sm:mt-2 flex-wrap">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
            ) : (
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
            )}
            <span className={`text-xs sm:text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {metric.trend > 0 ? '+' : ''}{typeof metric.trend === 'number' ? metric.trend.toFixed(1) : metric.trend}%
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">vs previous</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;