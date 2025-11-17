import React from 'react';
import { useDrag } from 'react-dnd';
import { 
  X, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Table, 
  Filter, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Move
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CanvasItem = ({ item, isSelected, onSelect, onUpdate, onRemove, onPositionChange, isPreviewMode = false }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'canvas-item',
    item: { id: item.id, type: item.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.position && !isPreviewMode) {
        onPositionChange(dropResult.position);
      }
    },
    canDrag: !isPreviewMode,
  }));

  const renderItemContent = () => {
    const baseClasses = `bg-white rounded-xl border-2 transition-all shadow-sm ${
      isPreviewMode ? 'cursor-default' : 'cursor-move'
    }`;
    const selectedClasses = isSelected 
      ? "border-blue-500 shadow-lg ring-2 ring-blue-200" 
      : "border-gray-200 hover:border-gray-300 hover:shadow-md";

    switch (item.type) {
      case 'metric':
        const isPositive = item.config.trend >= 0;
        return (
          <div className={`${baseClasses} ${selectedClasses} p-5 w-64`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{item.config.title}</h4>
              {item.config.title.includes('Revenue') && <DollarSign className="w-5 h-5 text-green-500" />}
              {item.config.title.includes('Orders') && <ShoppingCart className="w-5 h-5 text-blue-500" />}
              {item.config.title.includes('Customers') && <Users className="w-5 h-5 text-purple-500" />}
              {item.config.title.includes('AOV') && <TrendingUp className="w-5 h-5 text-orange-500" />}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{item.config.value}</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-semibold ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositive ? '↗' : '↘'} {Math.abs(item.config.trend)}%
                  </span>
                  <span className="text-xs text-gray-500">vs previous period</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'lineChart':
        const lineData = [
          { name: 'Mon', value: 3200 },
          { name: 'Tue', value: 4500 },
          { name: 'Wed', value: 3800 },
          { name: 'Thu', value: 5200 },
          { name: 'Fri', value: 4800 },
          { name: 'Sat', value: 6100 },
          { name: 'Sun', value: 5500 }
        ];
        return (
          <div className={`${baseClasses} ${selectedClasses} p-5 w-80`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{item.config.title || 'Line Chart'}</h4>
                <p className="text-sm text-gray-500">{item.config.description || 'Track performance over time'}</p>
              </div>
              <LineChart className="w-5 h-5 text-purple-500" />
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', r: 4 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'barChart':
        const barData = [
          { name: 'Product A', sales: 3200 },
          { name: 'Product B', sales: 2800 },
          { name: 'Product C', sales: 4500 },
          { name: 'Product D', sales: 3800 },
          { name: 'Product E', sales: 5200 }
        ];
        return (
          <div className={`${baseClasses} ${selectedClasses} p-5 w-80`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{item.config.title || 'Bar Chart'}</h4>
                <p className="text-sm text-gray-500">{item.config.description || 'Compare product performance'}</p>
              </div>
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                  />
                  <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'pieChart':
        const pieData = [
          { name: 'Direct', value: 35, color: '#f97316' },
          { name: 'Social', value: 25, color: '#ef4444' },
          { name: 'Email', value: 20, color: '#ec4899' },
          { name: 'Ads', value: 20, color: '#8b5cf6' }
        ];
        return (
          <div className={`${baseClasses} ${selectedClasses} p-5 w-72`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{item.config.title || 'Pie Chart'}</h4>
                <p className="text-sm text-gray-500">{item.config.description || 'Revenue distribution'}</p>
              </div>
              <PieChart className="w-5 h-5 text-orange-500" />
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'table':
        return (
          <div className={`${baseClasses} ${selectedClasses} p-5 w-96`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{item.config.title}</h4>
                <p className="text-sm text-gray-500">Detailed metrics table</p>
              </div>
              <Table className="w-5 h-5 text-gray-500" />
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
                <div className="p-3 font-semibold text-sm text-gray-700">Product</div>
                <div className="p-3 font-semibold text-sm text-gray-700">Sales</div>
                <div className="p-3 font-semibold text-sm text-gray-700">Growth</div>
                <div className="p-3 font-semibold text-sm text-gray-700">Revenue</div>
              </div>
              {[
                { product: 'Product A', sales: '1,234', growth: '+12%', revenue: '$12,345' },
                { product: 'Product B', sales: '987', growth: '+8%', revenue: '$9,876' },
                { product: 'Product C', sales: '756', growth: '+15%', revenue: '$7,654' }
              ].map((row, index) => (
                <div key={index} className="grid grid-cols-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <div className="p-3 text-sm text-gray-900">{row.product}</div>
                  <div className="p-3 text-sm text-gray-600">{row.sales}</div>
                  <div className="p-3 text-sm text-green-600 font-medium">{row.growth}</div>
                  <div className="p-3 text-sm text-gray-900 font-medium">{row.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'filter':
        return (
          <div className={`${baseClasses} ${selectedClasses} p-5 w-64`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{item.config.title}</h4>
                <p className="text-sm text-gray-500">Select time range</p>
              </div>
              <Filter className="w-5 h-5 text-blue-500" />
            </div>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
          </div>
        );

      default:
        return (
          <div className={`${baseClasses} ${selectedClasses} p-4 w-48`}>
            <h4 className="font-medium text-gray-900 capitalize">{item.type}</h4>
            <p className="text-sm text-gray-500 mt-1">Component</p>
          </div>
        );
    }
  };

  return (
    <div
      ref={drag}
      className={`absolute transition-all duration-200 ${
        isDragging ? 'opacity-60 rotate-1 scale-105 z-50' : 'opacity-100 z-20'
      } ${isSelected ? 'z-30' : ''}`}
      style={{
        left: item.position?.x || 0,
        top: item.position?.y || 0,
      }}
      onClick={(e) => {
        if (!isPreviewMode) {
          e.stopPropagation();
          onSelect();
        }
      }}
    >
      {renderItemContent()}
      
      {/* Selection Handle */}
      {isSelected && !isPreviewMode && (
        <div className="absolute -top-2 -right-2 flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
            title="Remove component"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="bg-blue-500 text-white rounded-full p-1 cursor-grab active:cursor-grabbing">
            <Move className="w-3 h-3" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasItem;