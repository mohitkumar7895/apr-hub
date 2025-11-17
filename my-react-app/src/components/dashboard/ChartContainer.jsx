import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartContainer = ({ chart }) => {
  const renderChart = () => {
    switch (chart.type) {
      case 'line':
        return (
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'roas') return [value.toFixed(2) + 'x', 'ROAS'];
                if (name === 'spend' || name === 'sales' || name === 'revenue') return ['$' + value.toLocaleString(), name];
                return [value.toLocaleString(), name];
              }}
            />
            <Legend />
            {chart.lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => ['$' + value.toLocaleString(), 'Sales']}
            />
            <Legend />
            {chart.bars.map((bar) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                fill={bar.fill}
              />
            ))}
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{chart.title}</h3>
        <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex items-center gap-1 self-start sm:self-auto">
          <span>View Details</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartContainer;