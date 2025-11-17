// src/components/builder/ReportBuilder.jsx
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ComponentsPanel from './ComponentsPanel';
import BuilderCanvas from './BuilderCanvas';
import PropertiesPanel from './PropertiesPanel';
import { getCurrentUser } from '../../utils/auth';
import { getUserReports, saveUserReport, deleteUserReport } from '../../utils/reportStorage';
import { X, Save, Eye, EyeOff, FolderOpen, Trash2, Download } from 'lucide-react';

const ReportBuilder = () => {
  const [canvasItems, setCanvasItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [savedReports, setSavedReports] = useState([]);
  const [user, setUser] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [reportName, setReportName] = useState('');
  const [currentReportId, setCurrentReportId] = useState(null);

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
    // Update selected item if it's the one being edited
    if (selectedItem?.id === itemId) {
      setSelectedItem(prev => ({
        ...prev,
        config: { ...prev.config, ...newConfig }
      }));
    }
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

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
    setSelectedItem(null); // Deselect when toggling preview
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      const userId = currentUser.id || currentUser.email;
      const reports = getUserReports(userId);
      setSavedReports(reports);
    }
  }, []);

  const handleSaveReport = () => {
    if (!user) {
      alert('Please log in to save reports.');
      return;
    }
    if (canvasItems.length === 0) {
      alert('Please add at least one component to the canvas before saving.');
      return;
    }
    setShowSaveModal(true);
    if (currentReportId) {
      // If editing existing report, pre-fill name
      const existingReport = savedReports.find(r => r.id === currentReportId);
      if (existingReport) {
        setReportName(existingReport.name);
      }
    }
  };

  const confirmSaveReport = () => {
    if (!reportName.trim()) {
      alert('Please enter a report name.');
      return;
    }
    
    const userId = user?.id || user?.email;
    const report = {
      id: currentReportId || Date.now().toString(),
      name: reportName.trim(),
      items: [...canvasItems],
      createdAt: currentReportId 
        ? savedReports.find(r => r.id === currentReportId)?.createdAt 
        : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (saveUserReport(userId, report)) {
      const updatedReports = getUserReports(userId);
      setSavedReports(updatedReports);
      setShowSaveModal(false);
      setReportName('');
      setCurrentReportId(report.id);
      alert(`Report "${report.name}" saved successfully!`);
    }
  };

  const handleLoadReport = (report) => {
    setCanvasItems([...report.items]);
    setCurrentReportId(report.id);
    setShowLoadModal(false);
    setSelectedItem(null);
  };

  const handleDeleteReport = (reportId) => {
    if (confirm('Are you sure you want to delete this report?')) {
      const userId = user?.id || user?.email;
      if (deleteUserReport(userId, reportId)) {
        const updatedReports = getUserReports(userId);
        setSavedReports(updatedReports);
        if (currentReportId === reportId) {
          setCanvasItems([]);
          setCurrentReportId(null);
          setReportName('');
        }
      }
    }
  };

  const handleNewReport = () => {
    if (canvasItems.length > 0 && !confirm('Create a new report? Current work will be cleared.')) {
      return;
    }
    setCanvasItems([]);
    setCurrentReportId(null);
    setReportName('');
    setSelectedItem(null);
  };

  const handleExportReport = () => {
    const reportData = {
      name: reportName || 'Untitled Report',
      items: canvasItems,
      exportedAt: new Date().toISOString(),
      user: user
    };
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report-${reportName || 'untitled'}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Header with all required actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 p-4 sm:p-6 border-b border-gray-200 bg-white flex-shrink-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Report Builder</h1>
            <p className="text-sm sm:text-base text-gray-600">Create custom reports with drag-and-drop</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button 
              onClick={handleNewReport}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              New
            </button>
            <button 
              onClick={() => setShowLoadModal(true)}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Load</span>
            </button>
            <button 
              onClick={handlePreview}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 ${
                isPreviewMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPreviewMode ? 'Exit Preview' : 'Preview'}</span>
            </button>
            <button 
              onClick={handleExportReport}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button 
              onClick={handleSaveReport}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
            {savedReports.length > 0 && (
              <div className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                {savedReports.length} saved
              </div>
            )}
          </div>
        </div>

        {/* Main builder area with 3 panels */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Components Panel - Responsive */}
          {!isPreviewMode && (
            <div className="hidden lg:block w-64 xl:w-80 border-r border-gray-200 bg-white overflow-y-auto flex-shrink-0">
              <ComponentsPanel onAddItem={addItemToCanvas} />
            </div>
          )}

          {/* Canvas */}
          <div className="flex-1 bg-gray-50 overflow-auto min-w-0">
            <BuilderCanvas
              items={canvasItems}
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
              onUpdateItem={updateItemConfig}
              onRemoveItem={removeItem}
              onAddItem={addItemToCanvas}
              onUpdateItemPosition={updateItemPosition}
              isPreviewMode={isPreviewMode}
              onQuickAdd={addItemToCanvas}
            />
          </div>

          {/* Properties Panel - Responsive */}
          {selectedItem && !isPreviewMode && (
            <div className="hidden lg:block w-64 xl:w-80 border-l border-gray-200 bg-white overflow-y-auto flex-shrink-0">
              <PropertiesPanel
                item={selectedItem}
                onUpdate={updateItemConfig}
                onRemove={removeItem}
              />
            </div>
          )}

          {/* Mobile Components Panel - Bottom Sheet */}
          {!isPreviewMode && (
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-h-[50vh] overflow-y-auto z-40">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Components</h3>
                <ComponentsPanel onAddItem={addItemToCanvas} />
              </div>
            </div>
          )}

          {/* Mobile Properties Panel - Bottom Sheet */}
          {selectedItem && !isPreviewMode && (
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-h-[70vh] overflow-y-auto z-50">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Properties</h3>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <PropertiesPanel
                  item={selectedItem}
                  onUpdate={updateItemConfig}
                  onRemove={removeItem}
                />
              </div>
            </div>
          )}
        </div>

        {/* Save Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Save Report</h2>
                <button
                  onClick={() => {
                    setShowSaveModal(false);
                    setReportName('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Name
                </label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && confirmSaveReport()}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter report name"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSaveModal(false);
                    setReportName('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSaveReport}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Load Reports Modal */}
        {showLoadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Load Saved Reports</h2>
                <button
                  onClick={() => setShowLoadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {savedReports.length === 0 ? (
                  <div className="text-center py-12">
                    <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No saved reports yet</p>
                    <p className="text-sm text-gray-500 mt-2">Create and save a report to see it here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedReports.map((report) => (
                      <div
                        key={report.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{report.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {report.items.length} component{report.items.length !== 1 ? 's' : ''}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title="Delete report"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleLoadReport(report)}
                          className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Load Report
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default ReportBuilder;