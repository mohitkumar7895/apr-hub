// src/components/builder/ReportBuilder.jsx
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ComponentsPanel from './ComponentsPanel';
import BuilderCanvas from './BuilderCanvas';
import PropertiesPanel from './PropertiesPanel';

const ReportBuilder = () => {
  const [canvasItems, setCanvasItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // All drag-and-drop functionality implemented
  const addItemToCanvas = (item, position) => {
    const newItem = {
      id: Date.now().toString(),
      type: item.type,
      config: { ...item.defaultConfig },
      position: position || { x: 100, y: 100 }
    };
    setCanvasItems(prev => [...prev, newItem]);
    setSelectedItem(newItem);
  };

  const updateItemConfig = (itemId, newConfig) => {
    setCanvasItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, config: { ...item.config, ...newConfig } }
          : item
      )
    );
  };

  const updateItemPosition = (itemId, newPosition) => {
    setCanvasItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, position: newPosition }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCanvasItems(prev => prev.filter(item => item.id !== itemId));
    if (selectedItem?.id === itemId) setSelectedItem(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header with all required actions */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Report Builder</h1>
            <p className="text-gray-600">Create custom reports with drag-and-drop</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
              Preview
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              Save Report
            </button>
          </div>
        </div>

        {/* Main builder area with 3 panels */}
        <div className="flex flex-1 overflow-hidden">
          <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
            <ComponentsPanel onAddItem={addItemToCanvas} />
          </div>

          <div className="flex-1 bg-gray-50 overflow-auto">
            <BuilderCanvas
              items={canvasItems}
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
              onUpdateItem={updateItemConfig}
              onRemoveItem={removeItem}
              onAddItem={addItemToCanvas}
              onUpdateItemPosition={updateItemPosition}
            />
          </div>

          {selectedItem && (
            <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
              <PropertiesPanel
                item={selectedItem}
                onUpdate={updateItemConfig}
                onRemove={removeItem}
              />
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default ReportBuilder;