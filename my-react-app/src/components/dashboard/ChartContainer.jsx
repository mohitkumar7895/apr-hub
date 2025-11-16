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
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{chart.title}</h3>
        <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
          View Details
        </button>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartContainer;