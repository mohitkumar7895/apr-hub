# APR Hub Analytics Platform - Frontend Demo

A modern, AI-driven analytics platform demo built with React, Tailwind CSS, and Recharts. This project demonstrates a complete analytics dashboard and a drag-and-drop report builder.

## Features

### Task 1: Analytics Dashboard
- **Complete Metrics Display**: Revenue, Orders, AOV, Conversion Rate, Returning Customer Rate, Ad Spend, ROAS, Impressions, CTR, Purchases from Ads
- **Interactive Charts**: 
  - Sales Over Time (Line Chart)
  - Top Products (Bar Chart)
  - Ad Spend vs ROAS (Line Chart)
  - Campaign Performance (Bar Chart)
- **Time Range Selection**: Filter data by Last 7 days, 30 days, or 90 days
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Task 2: Drag-and-Drop Report Builder
- **Component Library**: Pre-built components including:
  - Metrics (Revenue, Orders, Customers)
  - Charts (Line, Bar, Pie)
  - Data Tables
  - Filters
- **Interactive Canvas**: Drag components from the panel and drop them on the canvas
- **Component Configuration**: Edit component properties in the right panel
- **Preview Mode**: Preview your report before saving
- **Save Functionality**: Save custom reports with names

### Task 3: Working Demo
- Fully functional React application
- Real-time drag-and-drop using react-dnd
- Interactive charts using Recharts
- Responsive UI with Tailwind CSS
- Static placeholder data for demonstration

## Tech Stack

- **React 19.2.0**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS 4.1.17**: Styling
- **Recharts 3.4.1**: Chart library
- **React DnD 16.0.1**: Drag-and-drop functionality
- **Lucide React**: Icon library

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd my-react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
my-react-app/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx       # Main dashboard component
│   │   │   ├── MetricCard.jsx      # Metric card component
│   │   │   └── ChartContainer.jsx  # Chart wrapper component
│   │   ├── builder/
│   │   │   ├── ReportBuilder.jsx   # Main report builder
│   │   │   ├── ComponentsPanel.jsx # Component library panel
│   │   │   ├── BuilderCanvas.jsx   # Canvas for dragging components
│   │   │   ├── CanvasItem.jsx      # Individual canvas items
│   │   │   └── PropertiesPanel.jsx # Component configuration panel
│   │   └── ui/
│   │       └── Header.jsx          # Navigation header
│   ├── data/
│   │   └── placeholderData.js     # Mock data generator
│   ├── App.jsx                     # Main app component
│   └── main.jsx                    # Entry point
├── package.json
└── vite.config.js
```

## Usage

### Dashboard View
1. Click on "Dashboard" in the navigation
2. View all metrics and charts
3. Use the time range selector to filter data
4. Click "Export Report" to export (placeholder functionality)

### Report Builder
1. Click on "Report Builder" in the navigation
2. Drag components from the left panel onto the canvas
3. Click on a component to select and configure it
4. Use the properties panel on the right to edit component settings
5. Click "Preview" to see how your report looks
6. Click "Save Report" to save your custom report

## Features Implemented

✅ Complete dashboard with all required metrics
✅ Interactive charts with Recharts
✅ Drag-and-drop report builder
✅ Component configuration panel
✅ Preview mode
✅ Save reports functionality
✅ Responsive design
✅ Modern UI/UX
✅ Time range filtering

## Notes

- This is a demo application with static/placeholder data
- Charts use sample data for demonstration purposes
- Saved reports are stored in component state (not persisted to backend)
- The application is fully functional and ready for backend integration

## Future Enhancements

- Backend API integration
- Real-time data updates
- User authentication
- Report sharing and collaboration
- Advanced filtering and date range selection
- Export to PDF/CSV
- Custom chart types
- Data source connections (Shopify, Meta Ads API)

## License

This project is created for APR Hub Technologies internship screening task.
