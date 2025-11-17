import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { BarChart3, Plus, ArrowRight, Info } from 'lucide-react';
import CanvasItem from './CanvasItem';

const BuilderCanvas = ({ 
  items, 
  selectedItem, 
  onSelectItem, 
  onUpdateItem, 
  onRemoveItem, 
  onAddItem,
  onUpdateItemPosition,
  isPreviewMode = false,
  onQuickAdd = null
}) => {
  const dropRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset && dropRef.current) {
        const canvasRect = dropRef.current.getBoundingClientRect();
        const position = {
          x: Math.max(0, offset.x - canvasRect.left - 100), // Center the component
          y: Math.max(0, offset.y - canvasRect.top - 50)
        };
        // Actually add the item to canvas
        onAddItem(item, position);
        return { position };
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [onAddItem]);

  // Connect the drop ref to the drop target
  drop(dropRef);

  const handleCanvasClick = (e) => {
    // Deselect if clicking on empty canvas area
    if (e.target === e.currentTarget) {
      onSelectItem(null);
    }
  };

  return (
    <div className="h-full p-3 sm:p-6">
      <div 
        ref={dropRef}
        className={`relative bg-white rounded-lg sm:rounded-xl border-2 min-h-[400px] sm:min-h-[600px] transition-all ${
          isOver && !isPreviewMode
            ? 'border-blue-500 bg-blue-50 border-solid shadow-inner' 
            : 'border-dashed border-gray-300'
        }`}
        onClick={handleCanvasClick}
        style={{
          backgroundImage: `
            linear-gradient(90deg, #f1f5f9 1px, transparent 1px),
            linear-gradient(180deg, #f1f5f9 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        {/* Canvas Header */}
        {!isPreviewMode && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 z-10">
            <div className="text-xs sm:text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
              <span className="hidden sm:inline">{items.length} components • </span>
              <span className="text-xs">Click to select, drag to move</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Ready</span>
            </div>
          </div>
        )}
        {isPreviewMode && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-center z-10">
            <div className="text-xs sm:text-sm text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full font-medium">
              Preview Mode
            </div>
          </div>
        )}
        
        {/* Canvas Items */}
        {items.map((item) => (
          <CanvasItem
            key={item.id}
            item={item}
            isSelected={selectedItem?.id === item.id && !isPreviewMode}
            onSelect={() => !isPreviewMode && onSelectItem(item)}
            onUpdate={(config) => onUpdateItem(item.id, config)}
            onRemove={() => onRemoveItem(item.id)}
            onPositionChange={(position) => onUpdateItemPosition(item.id, position)}
            isPreviewMode={isPreviewMode}
          />
        ))}

        {/* Empty State */}
        {items.length === 0 && !isPreviewMode && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Start Building Your Report</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Add components to create your custom analytics report
              </p>

              {/* Permission/Instruction Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6 text-left">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Info className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">How to Add Components:</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start space-x-2">
                        <span className="font-semibold text-blue-600 mt-0.5">1.</span>
                        <span><strong className="text-gray-900">Desktop:</strong> Drag components from the left panel onto the canvas</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="font-semibold text-blue-600 mt-0.5">2.</span>
                        <span><strong className="text-gray-900">Mobile:</strong> Tap the components panel at the bottom, then drag to canvas</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="font-semibold text-blue-600 mt-0.5">3.</span>
                        <span><strong className="text-gray-900">Quick Add:</strong> Click the button below to add a sample metric component</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {onQuickAdd && (
                  <button
                    onClick={() => {
                      const sampleMetric = {
                        type: 'metric',
                        defaultConfig: {
                          title: 'Total Revenue',
                          value: '$24,568',
                          trend: 12.5
                        }
                      };
                      onQuickAdd(sampleMetric, { x: 100, y: 100 });
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Quick Add Sample Component</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Steps */}
              <div className="flex justify-center flex-wrap gap-4 sm:gap-8 text-gray-500">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <span className="text-base sm:text-lg font-semibold">1</span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium">Add Components</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <span className="text-base sm:text-lg font-semibold">2</span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium">Configure</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <span className="text-base sm:text-lg font-semibold">3</span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium">Save</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderCanvas;