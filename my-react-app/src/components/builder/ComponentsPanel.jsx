import React from 'react';
import { useDrag } from 'react-dnd';
import { BarChart3, LineChart, PieChart, Table, Filter, DollarSign, Users, TrendingUp, MousePointer } from 'lucide-react';

const DraggableComponent = ({ type, icon: Icon, title, description, defaultConfig, onAddItem }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { 
      type, 
      defaultConfig: { 
        ...defaultConfig,
        title: title
      }, 
      title 
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 sm:p-4 border border-gray-200 rounded-lg bg-white cursor-grab hover:shadow-md transition-all ${
        isDragging ? 'opacity-50 shadow-lg' : 'opacity-100'
      }`}
    >
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{title}</h3>
          <p className="text-xs text-gray-500 truncate hidden sm:block">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ComponentsPanel = ({ onAddItem }) => {
  const components = [
    {
      type: 'metric',
      icon: DollarSign,
      title: 'Revenue Metric',
      description: 'Display revenue with trends',
      defaultConfig: { 
        value: '$24,568', 
        trend: 12.5, 
        title: 'Total Revenue'
      }
    },
    {
      type: 'metric',
      icon: ShoppingCart,
      title: 'Orders Metric',
      description: 'Display order count',
      defaultConfig: { 
        value: '1,234', 
        trend: 8.2, 
        title: 'Total Orders'
      }
    },
    {
      type: 'metric',
      icon: Users,
      title: 'Customers Metric',
      description: 'Display customer metrics',
      defaultConfig: { 
        value: '45.2%', 
        trend: 5.7, 
        title: 'Returning Customers'
      }
    },
    {
      type: 'lineChart',
      icon: LineChart,
      title: 'Line Chart',
      description: 'Trends over time',
      defaultConfig: { 
        title: 'Sales Over Time',
        description: 'Track your sales performance'
      }
    },
    {
      type: 'barChart',
      icon: BarChart3,
      title: 'Bar Chart',
      description: 'Compare categories',
      defaultConfig: { 
        title: 'Top Products',
        description: 'Best performing products'
      }
    },
    {
      type: 'pieChart',
      icon: PieChart,
      title: 'Pie Chart',
      description: 'Proportion analysis',
      defaultConfig: { 
        title: 'Revenue by Source',
        description: 'Breakdown by channels'
      }
    },
    {
      type: 'table',
      icon: Table,
      title: 'Data Table',
      description: 'Tabular data display',
      defaultConfig: { 
        title: 'Performance Data',
        description: 'Detailed metrics table'
      }
    },
    {
      type: 'filter',
      icon: Filter,
      title: 'Date Filter',
      description: 'Time range selector',
      defaultConfig: { 
        title: 'Date Range',
        type: 'date'
      }
    }
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Components</h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Drag components to the canvas
        </p>
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        <h3 className="text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide">Metrics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
          {components.filter(comp => comp.type === 'metric').map((component) => (
            <DraggableComponent
              key={`${component.type}-${component.title}`}
              {...component}
              onAddItem={onAddItem}
            />
          ))}
        </div>
        
        <h3 className="text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide mt-4 sm:mt-6">Charts</h3>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
          {components.filter(comp => comp.type.includes('Chart')).map((component) => (
            <DraggableComponent
              key={`${component.type}-${component.title}`}
              {...component}
              onAddItem={onAddItem}
            />
          ))}
        </div>
        
        <h3 className="text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide mt-4 sm:mt-6">Other</h3>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
          {components.filter(comp => !comp.type.includes('Chart') && comp.type !== 'metric').map((component) => (
            <DraggableComponent
              key={`${component.type}-${component.title}`}
              {...component}
              onAddItem={onAddItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Add missing icon imports
const ShoppingCart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default ComponentsPanel;