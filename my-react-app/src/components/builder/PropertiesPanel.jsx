import React from 'react';
import { Trash2, Settings, Save } from 'lucide-react';

const PropertiesPanel = ({ item, onUpdate, onRemove }) => {
  const handleConfigChange = (key, value) => {
    onUpdate(item.id, { [key]: value });
  };

  const handleNumberChange = (key, value) => {
    const numValue = parseFloat(value) || 0;
    onUpdate(item.id, { [key]: numValue });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'metric': return '📊';
      case 'lineChart': return '📈';
      case 'barChart': return '📊';
      case 'pieChart': return '🥧';
      case 'table': return '📋';
      case 'filter': return '⚡';
      default: return '🔧';
    }
  };

  const applyChanges = () => {
    // Changes are applied automatically via state updates
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">{getIcon(item.type)}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 capitalize">{item.type} Settings</h2>
            <p className="text-sm text-gray-500">Configure your component</p>
          </div>
        </div>
      </div>

      {/* Properties Form */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Component Type Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">Component Type</span>
            <span className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded">{item.type}</span>
          </div>
        </div>

        {/* Common Properties */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={item.config.title || ''}
            onChange={(e) => handleConfigChange('title', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Enter component title"
          />
        </div>

        {/* Description for Charts */}
        {(item.type === 'lineChart' || item.type === 'barChart' || item.type === 'pieChart') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={item.config.description || ''}
              onChange={(e) => handleConfigChange('description', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter chart description"
            />
          </div>
        )}

        {/* Metric Specific Properties */}
        {item.type === 'metric' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Value
              </label>
              <input
                type="text"
                value={item.config.value || ''}
                onChange={(e) => handleConfigChange('value', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="e.g., $1,234 or 45.2%"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use $ for currency, % for percentages
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trend Percentage
              </label>
              <div className="flex space-x-3">
                <input
                  type="number"
                  step="0.1"
                  value={item.config.trend || 0}
                  onChange={(e) => handleNumberChange('trend', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="0.0"
                />
                <div className={`w-20 rounded-lg flex items-center justify-center text-sm font-medium ${
                  (item.config.trend || 0) >= 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {(item.config.trend || 0) >= 0 ? '↗' : '↘'} {Math.abs(item.config.trend || 0)}%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Positive for growth, negative for decline
              </p>
            </div>
          </>
        )}

        {/* Display Options */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Display Options
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Width
              </label>
              <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="auto">Auto</option>
                <option value="full">Full Width</option>
                <option value="half">Half Width</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Theme
              </label>
              <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={applyChanges}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Apply</span>
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          Changes are saved automatically
        </p>
      </div>
    </div>
  );
};

export default PropertiesPanel;