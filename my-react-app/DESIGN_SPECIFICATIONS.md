# APR Hub Analytics Platform - Design Specifications
## For Figma Implementation (Tasks 1 & 2)

This document provides detailed design specifications to recreate the designs in Figma.

---

## Task 1: Dashboard UI Design Specifications

### Overall Layout
- **Container Width**: 1440px max (responsive breakpoints: 1280px, 1024px, 768px, 640px)
- **Background**: #F9FAFB (gray-50)
- **Padding**: 24px (container padding)
- **Spacing**: 24px between sections

### Header Section
- **Height**: Auto (flexible)
- **Background**: Transparent
- **Layout**: Flex row, space-between
- **Left Side**:
  - Title: "Analytics Dashboard" - 24px, font-weight: 700, color: #111827 (gray-900)
  - Subtitle: "Shopify & Meta Ads Performance" - 16px, color: #4B5563 (gray-600)
- **Right Side**:
  - Time Range Selector: 
    - Width: 140px
    - Height: 40px
    - Border: 1px solid #D1D5DB (gray-300)
    - Border-radius: 8px
    - Padding: 8px 12px
    - Font-size: 14px
  - Export Button:
    - Background: #2563EB (blue-600)
    - Hover: #1D4ED8 (blue-700)
    - Text: White, 14px, font-weight: 500
    - Padding: 8px 16px
    - Border-radius: 8px

### Metrics Grid
- **Layout**: Responsive grid
  - Mobile (1 column): < 640px
  - Tablet (2 columns): 640px - 1024px
  - Desktop (4 columns): 1024px - 1280px
  - Large Desktop (5 columns): > 1280px
- **Gap**: 24px between cards

### Metric Card Specifications
- **Width**: Auto (flexible)
- **Height**: Auto (flexible, min 120px)
- **Background**: #FFFFFF (white)
- **Border**: 1px solid #E5E7EB (gray-200)
- **Border-radius**: 12px
- **Padding**: 24px
- **Shadow**: None (hover: 0 10px 15px -3px rgba(0,0,0,0.1))
- **Layout**: Flex column

**Card Structure**:
1. **Header Row** (flex, space-between):
   - Title: 14px, font-weight: 500, color: #4B5563 (gray-600)
   - Icon Container: 32px × 32px, border-radius: 8px
     - Revenue: #10B981 (green-500)
     - Orders: #3B82F6 (blue-500)
     - AOV: #8B5CF6 (purple-500)
     - Conversion: #F97316 (orange-500)
     - Returning Customers: #6366F1 (indigo-500)
     - Ad Spend: #EF4444 (red-500)
     - ROAS: #10B981 (emerald-500)
     - Impressions: #F59E0B (amber-500)
     - CTR: #06B6D4 (cyan-500)
     - Purchases from Ads: #EC4899 (pink-500)

2. **Value Section**:
   - Main Value: 24px, font-weight: 700, color: #111827 (gray-900)
   - Trend Indicator: Flex row, align-center, gap: 4px
     - Icon: 16px × 16px (TrendingUp/TrendingDown)
     - Percentage: 14px, font-weight: 500
       - Positive: #059669 (green-600)
       - Negative: #DC2626 (red-600)
     - Label: "vs previous" - 14px, color: #6B7280 (gray-500)

### Charts Grid
- **Layout**: 2 columns on desktop (1024px+), 1 column on mobile
- **Gap**: 24px
- **Chart Card**:
  - Background: #FFFFFF
  - Border: 1px solid #E5E7EB
  - Border-radius: 12px
  - Padding: 24px
  - Min-height: 400px

**Chart Card Header**:
- Flex row, space-between
- Title: 18px, font-weight: 600, color: #111827
- "View Details" button: 14px, color: #6B7280, hover: #111827

**Chart Area**:
- Height: 320px
- Responsive container

### Color Palette
- **Primary**: #2563EB (blue-600)
- **Success**: #10B981 (green-500)
- **Warning**: #F59E0B (amber-500)
- **Error**: #EF4444 (red-500)
- **Background**: #F9FAFB (gray-50)
- **Surface**: #FFFFFF (white)
- **Text Primary**: #111827 (gray-900)
- **Text Secondary**: #4B5563 (gray-600)
- **Border**: #E5E7EB (gray-200)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, etc.)
- **Heading 1**: 24px, weight: 700
- **Heading 2**: 18px, weight: 600
- **Body**: 14px, weight: 400
- **Small**: 12px, weight: 400

---

## Task 2: Drag-and-Drop Report Builder Design Specifications

### Overall Layout
- **Layout**: 3-column layout (320px | Flexible | 320px)
- **Height**: 100vh (full viewport)
- **Background**: #F9FAFB (gray-50)

### Header Bar
- **Height**: Auto (flexible, ~80px)
- **Background**: #FFFFFF (white)
- **Border-bottom**: 1px solid #E5E7EB
- **Padding**: 24px
- **Layout**: Flex row, space-between

**Left Side**:
- Title: "Report Builder" - 24px, font-weight: 700, color: #111827
- Subtitle: "Create custom reports with drag-and-drop" - 16px, color: #4B5563

**Right Side** (flex row, gap: 12px):
- Preview Button:
  - Default: Border 1px #D1D5DB, text #374151, padding 8px 16px
  - Active: Background #2563EB, text white
- Save Button:
  - Background: #2563EB
  - Text: White, 14px, font-weight: 500
  - Padding: 8px 16px
  - Border-radius: 8px

### Left Panel: Components Library
- **Width**: 320px (fixed)
- **Background**: #FFFFFF
- **Border-right**: 1px solid #E5E7EB
- **Padding**: 24px
- **Overflow**: Auto (scrollable)

**Panel Header**:
- Title: "Components" - 18px, font-weight: 600, color: #111827
- Description: "Drag components to the canvas to build your report" - 14px, color: #6B7280
- Margin-bottom: 24px

**Component Categories**:
- Section Title: 12px, font-weight: 500, color: #374151, uppercase, letter-spacing: 0.05em
- Margin-top: 24px (first: 0)

**Component Card** (Draggable):
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border-radius: 8px
- Padding: 16px
- Margin-bottom: 12px
- Cursor: grab
- Hover: Shadow 0 4px 6px -1px rgba(0,0,0,0.1)
- Dragging: Opacity 50%

**Component Card Layout**:
- Flex row, gap: 12px
- Icon Container: 40px × 40px, background #DBEAFE (blue-100), border-radius: 8px
- Icon: 20px × 20px, color #2563EB
- Text Section:
  - Title: 14px, font-weight: 500, color: #111827
  - Description: 12px, color: #6B7280

### Center Panel: Canvas
- **Background**: #F9FAFB
- **Padding**: 24px
- **Overflow**: Auto (scrollable)
- **Canvas Area**:
  - Background: #FFFFFF
  - Border: 2px dashed #D1D5DB (default) / 2px solid #2563EB (drag-over)
  - Border-radius: 12px
  - Min-height: 600px
  - Position: Relative
  - Grid Pattern: 20px × 20px grid lines (#F1F5F9)

**Canvas Header** (Absolute, top: 16px, left: 16px, right: 16px):
- Status Badge: Background rgba(255,255,255,0.8), backdrop-blur, padding 8px 12px, border-radius: 999px
- Text: 14px, color: #6B7280
- Content: "{count} components • Click to select, drag to move"

**Empty State** (Centered):
- Icon Circle: 96px × 96px, background #DBEAFE, border-radius: 50%
- Icon: 48px × 48px, color #2563EB
- Title: 24px, font-weight: 700, color: #111827, margin-top: 24px
- Description: 18px, color: #4B5563, margin: 12px 0 24px
- Steps: 3 columns, gap: 32px
  - Step Circle: 48px × 48px, background #F3F4F6, border-radius: 50%
  - Step Number: 18px, font-weight: 600
  - Step Label: 14px, font-weight: 500, color: #6B7280

### Right Panel: Properties Panel
- **Width**: 320px (fixed, conditional - only when item selected)
- **Background**: #FFFFFF
- **Border-left**: 1px solid #E5E7EB
- **Overflow**: Auto (scrollable)
- **Layout**: Flex column, height: 100%

**Panel Header**:
- Padding: 24px
- Border-bottom: 1px solid #E5E7EB
- Layout: Flex row, gap: 12px
- Icon Container: 48px × 48px, gradient blue-500 to purple-600, border-radius: 8px
- Text:
  - Title: "{Component Type} Settings" - 18px, font-weight: 700, color: #111827
  - Subtitle: "Configure your component" - 14px, color: #6B7280

**Properties Form**:
- Padding: 24px
- Gap: 24px between sections

**Form Sections**:
1. **Component Type Badge**:
   - Background: #DBEAFE
   - Border: 1px solid #93C5FD
   - Padding: 16px
   - Border-radius: 8px
   - Layout: Flex row, space-between

2. **Input Fields**:
   - Label: 14px, font-weight: 500, color: #374151, margin-bottom: 8px
   - Input: 
     - Width: 100%
     - Height: 40px
     - Border: 1px solid #D1D5DB
     - Border-radius: 8px
     - Padding: 8px 12px
     - Font-size: 14px
     - Focus: Ring 2px #2563EB

3. **Display Options** (Grid 2 columns, gap: 16px):
   - Select dropdowns with same styling as inputs

4. **Quick Actions** (Grid 2 columns, gap: 12px):
   - Apply Button: Background #2563EB, text white, padding 8px 12px
   - Remove Button: Background #DC2626, text white, padding 8px 12px

**Panel Footer**:
- Padding: 16px
- Border-top: 1px solid #E5E7EB
- Background: #F9FAFB
- Text: 12px, color: #6B7280, text-center

### Canvas Item Specifications

**Metric Component**:
- Width: 256px (w-64)
- Background: #FFFFFF
- Border: 2px solid #E5E7EB (default) / #2563EB (selected)
- Border-radius: 12px
- Padding: 20px
- Position: Absolute
- Selected: Ring 2px #93C5FD, shadow-lg

**Chart Components**:
- Line Chart: 320px width
- Bar Chart: 320px width
- Pie Chart: 288px width
- Table: 384px width
- Filter: 256px width

**Selection Handles** (when selected):
- Position: Absolute, top: -8px, right: -8px
- Delete Button: 24px × 24px, background #DC2626, border-radius: 50%
- Move Handle: 24px × 24px, background #2563EB, border-radius: 50%
- Icons: 12px × 12px, white

### Preview Mode
- Components Panel: Hidden
- Properties Panel: Hidden
- Canvas: Full width
- Border: Solid (not dashed)
- Grid: Hidden
- Items: Not draggable, cursor: default
- Header Badge: "Preview Mode" - blue background

---

## Interactive States & Prototyping

### Dashboard Prototype Flows:
1. **Time Range Selection**:
   - Click dropdown → Select option → Data updates
   - Transition: Smooth fade (200ms)

2. **Export Report**:
   - Click button → Download JSON file
   - Feedback: Button state change (300ms)

3. **Chart Interaction**:
   - Hover over chart → Tooltip appears
   - Click "View Details" → Modal/Detail view (optional)

### Report Builder Prototype Flows:
1. **Drag Component**:
   - Start drag → Component becomes semi-transparent
   - Drag over canvas → Canvas border turns blue, background light blue
   - Drop → Component appears at drop position

2. **Select Component**:
   - Click component → Border turns blue, ring appears
   - Properties panel opens on right

3. **Edit Component**:
   - Change input → Live update on canvas
   - Apply button → Confirms changes

4. **Preview Mode**:
   - Click Preview → Panels hide, canvas expands
   - Click Exit Preview → Panels return

5. **Save Report**:
   - Click Save → Prompt appears
   - Enter name → Confirmation message

---

## Design Tokens

### Spacing Scale
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px

### Border Radius
- Small: 4px
- Medium: 8px
- Large: 12px
- Full: 999px

### Shadows
- Small: 0 1px 2px rgba(0,0,0,0.05)
- Medium: 0 4px 6px -1px rgba(0,0,0,0.1)
- Large: 0 10px 15px -3px rgba(0,0,0,0.1)

### Transitions
- Default: 150ms ease-in-out
- Fast: 100ms
- Slow: 300ms

---

## Figma Implementation Notes

1. **Create Components**:
   - Metric Card (with variants for different metrics)
   - Chart Container (with variants for chart types)
   - Component Library Item
   - Canvas Item (with variants for component types)
   - Properties Panel Section

2. **Auto Layout**:
   - Use Auto Layout for all cards and panels
   - Set constraints for responsive behavior

3. **Prototyping**:
   - Use Figma's prototype features for clickable interactions
   - Set up component states for hover/active/dragging
   - Use overlays for modals and tooltips

4. **Design System**:
   - Create a style guide with all colors, typography, and spacing
   - Use component variants for different states

---

This specification can be used to recreate the designs in Figma with pixel-perfect accuracy.


