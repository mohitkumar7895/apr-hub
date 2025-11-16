import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { BarChart3 } from 'lucide-react';
import CanvasItem from './CanvasItem';

const BuilderCanvas = ({ 
  items, 
  selectedItem, 
  onSelectItem, 
  onUpdateItem, 
  onRemoveItem, 
  onAddItem,
  onUpdateItemPosition 
}) => {
  const dropRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset && dropRef.current) {
        const canvasRect = dropRef.current.getBoundingClientRect();
        const position = {
          x: offset.x - canvasRect.left - 100, // Center the component
          y: offset.y - canvasRect.top - 50
        };
        return { position }; // This will be available in the end() of useDrag
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
    <div className="h-full p-6">
      <div 
        ref={dropRef}
        className={`relative bg-white rounded-xl border-2 min-h-[600px] transition-all ${
          isOver 
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
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
            {items.length} components • Click to select, drag to move
          </div>
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Ready</span>
          </div>
        </div>
        
        {/* Canvas Items */}
        {items.map((item) => (
          <CanvasItem
            key={item.id}
            item={item}
            isSelected={selectedItem?.id === item.id}
            onSelect={() => onSelectItem(item)}
            onUpdate={(config) => onUpdateItem(item.id, config)}
            onRemove={() => onRemoveItem(item.id)}
            onPositionChange={(position) => onUpdateItemPosition(item.id, position)}
          />
        ))}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Building Your Report</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Drag components from the left panel onto this canvas to create your custom analytics report
              </p>
              <div className="flex justify-center space-x-8 text-gray-500">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-semibold">1</span>
                  </div>
                  <div className="font-medium">Drag Components</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-semibold">2</span>
                  </div>
                  <div className="font-medium">Configure</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-semibold">3</span>
                  </div>
                  <div className="font-medium">Save</div>
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