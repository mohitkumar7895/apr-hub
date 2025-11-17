# Figma Implementation Guide
## Step-by-Step Instructions for Tasks 1 & 2

This guide will help you recreate the designs in Figma based on the working React implementation.

---

## Task 1: Dashboard UI Design in Figma

### Step 1: Set Up Your Figma File
1. Create a new Figma file: "APR Hub - Dashboard Design"
2. Set frame size to **1440px × 1024px** (Desktop)
3. Create additional frames for responsive breakpoints:
   - Tablet: 768px × 1024px
   - Mobile: 375px × 812px

### Step 2: Create Design System
1. **Colors** (Create Color Styles):
   - Primary Blue: `#2563EB`
   - Success Green: `#10B981`
   - Error Red: `#EF4444`
   - Warning Amber: `#F59E0B`
   - Background: `#F9FAFB`
   - Surface: `#FFFFFF`
   - Text Primary: `#111827`
   - Text Secondary: `#4B5563`
   - Border: `#E5E7EB`

2. **Typography** (Create Text Styles):
   - Heading 1: 24px, Bold (700), Primary Text
   - Heading 2: 18px, Semi-bold (600), Primary Text
   - Body: 14px, Regular (400), Primary Text
   - Small: 12px, Regular (400), Secondary Text

3. **Spacing** (Create Spacing Tokens):
   - 4, 8, 12, 16, 20, 24, 32, 48, 64px

### Step 3: Build Dashboard Header
1. Create a frame: **1440px × Auto**
2. Add text elements:
   - "Analytics Dashboard" (Heading 1)
   - "Shopify & Meta Ads Performance" (Body, Secondary)
3. Add controls on right:
   - Dropdown: 140px × 40px, border, rounded 8px
   - Button: Auto × 40px, Blue background, white text
4. Use Auto Layout with space-between

### Step 4: Create Metric Card Component
1. Create component: **Metric Card**
2. Frame: **Auto × Auto** (min 120px height)
3. Structure:
   - Header row: Title (left) + Icon container (right)
   - Value section: Large number + Trend indicator
4. Add variants for:
   - Different metric types (10 variants)
   - Different trend states (positive/negative)
5. Apply styles: White background, border, rounded 12px, padding 24px

### Step 5: Create Metrics Grid
1. Create frame with Auto Layout
2. Set to Grid layout: 5 columns, 24px gap
3. Add 10 Metric Card instances
4. Set constraints for responsive behavior

### Step 6: Create Chart Cards
1. Create component: **Chart Container**
2. Frame: **Auto × 400px** (min-height)
3. Structure:
   - Header: Title + "View Details" button
   - Chart area: 320px height placeholder
4. Create variants for:
   - Line Chart
   - Bar Chart
   - Pie Chart
   - Table view

### Step 7: Create Charts Grid
1. Create frame with Auto Layout
2. Set to Grid: 2 columns, 24px gap
3. Add 4 Chart Container instances

### Step 8: Prototype Interactions
1. **Time Range Dropdown**:
   - Add interaction: On click → Open overlay
   - Create overlay frame with options
   - Add interactions to select options

2. **Export Button**:
   - Add interaction: On click → Show success state
   - Create success state variant

3. **Chart Hover**:
   - Add hover state with tooltip
   - Create tooltip component

### Step 9: Create Responsive Variants
1. Duplicate main frame for tablet (1024px)
2. Adjust grid: 4 columns for metrics
3. Duplicate for mobile (640px)
4. Adjust grid: 1 column for metrics, stack charts

---

## Task 2: Drag-and-Drop Report Builder in Figma

### Step 1: Set Up Figma File
1. Create new file: "APR Hub - Report Builder"
2. Create frame: **1440px × 900px** (full viewport)

### Step 2: Create Header Component
1. Frame: **1440px × 80px**
2. Background: White
3. Border-bottom: 1px, gray-200
4. Layout:
   - Left: Title + Subtitle
   - Right: Preview button + Save button
5. Make it a component

### Step 3: Create Components Panel
1. Frame: **320px × 820px** (viewport height - header)
2. Background: White
3. Border-right: 1px, gray-200
4. Structure:
   - Header section (Title + Description)
   - Component categories
   - Component cards (scrollable)

### Step 4: Create Component Library Item
1. Create component: **Component Card**
2. Frame: **Auto × Auto** (min 64px height)
3. Structure:
   - Icon container: 40px × 40px, blue-100 background
   - Text section: Title + Description
4. Add variants:
   - Default state
   - Hover state (shadow)
   - Dragging state (50% opacity)
5. Create instances for:
   - Revenue Metric
   - Orders Metric
   - Customers Metric
   - Line Chart
   - Bar Chart
   - Pie Chart
   - Data Table
   - Date Filter

### Step 5: Create Canvas Area
1. Frame: **Flexible × 820px**
2. Background: gray-50
3. Padding: 24px
4. Canvas frame:
   - Background: White
   - Border: 2px dashed, gray-300
   - Border-radius: 12px
   - Min-height: 600px
   - Grid pattern overlay (20px × 20px)

### Step 6: Create Canvas Item Components
1. **Metric Component**:
   - Frame: 256px × Auto
   - White background, border, rounded
   - Variants: Default, Selected (blue border + ring)

2. **Line Chart Component**:
   - Frame: 320px × Auto
   - Chart placeholder with sample data visualization

3. **Bar Chart Component**:
   - Frame: 320px × Auto
   - Bar chart visualization

4. **Pie Chart Component**:
   - Frame: 288px × Auto
   - Pie chart visualization

5. **Table Component**:
   - Frame: 384px × Auto
   - Table with rows and columns

6. **Filter Component**:
   - Frame: 256px × Auto
   - Dropdown selector

### Step 7: Create Properties Panel
1. Frame: **320px × 820px**
2. Background: White
3. Border-left: 1px, gray-200
4. Structure:
   - Header (Icon + Title)
   - Form sections (scrollable)
   - Footer

### Step 8: Create Properties Form Components
1. **Input Field**:
   - Label + Input box
   - Variants: Default, Focus, Error

2. **Select Dropdown**:
   - Similar to input but with dropdown arrow

3. **Action Buttons**:
   - Apply button (blue)
   - Remove button (red)

### Step 9: Set Up Prototype Interactions

#### Drag and Drop Simulation:
1. **Component Card → Canvas**:
   - Create interaction: On drag start → Show dragging state
   - Create interaction: On drag over canvas → Change canvas border to blue
   - Create interaction: On drop → Show component on canvas

2. **Select Component**:
   - Create interaction: On click → Show selected state
   - Create interaction: On select → Show properties panel

3. **Edit Properties**:
   - Create interaction: On input change → Update component preview
   - Use component variants to show different states

4. **Preview Mode**:
   - Create separate frame for preview
   - Create interaction: On Preview click → Navigate to preview frame
   - Preview frame: Full width, no panels, solid borders

5. **Save Report**:
   - Create interaction: On Save click → Show modal/overlay
   - Create success state

### Step 10: Create Empty State
1. Create component: **Empty Canvas State**
2. Structure:
   - Large icon circle
   - Title and description
   - 3-step guide
3. Use this when canvas has no items

### Step 11: Create Preview Mode Frame
1. Duplicate main frame
2. Remove left and right panels
3. Make canvas full width
4. Change borders from dashed to solid
5. Remove grid pattern
6. Add "Preview Mode" badge at top

---

## Prototyping Tips

### For Clickable Prototype:

1. **Use Component Variants**:
   - Create variants for all states (default, hover, active, selected, dragging)
   - Use variant properties for easy switching

2. **Use Overlays**:
   - For dropdowns, modals, tooltips
   - Set up overlay interactions

3. **Use Smart Animate**:
   - For smooth transitions between states
   - For component state changes

4. **Create Interaction Flows**:
   - Start screen → Dashboard
   - Dashboard → Report Builder
   - Report Builder → Preview
   - Component selection → Properties panel

5. **Add Micro-interactions**:
   - Button hover states
   - Card hover effects
   - Input focus states
   - Loading states (optional)

---

## Deliverables Checklist

### Task 1: Dashboard Design
- [ ] Figma file with dashboard design
- [ ] All 10 metrics displayed
- [ ] 4 charts implemented
- [ ] Responsive breakpoints (desktop, tablet, mobile)
- [ ] Clickable prototype with:
  - [ ] Time range selection
  - [ ] Export button interaction
  - [ ] Chart hover states

### Task 2: Report Builder Design
- [ ] Figma file with report builder design
- [ ] Components panel with all component types
- [ ] Canvas area with grid
- [ ] Properties panel
- [ ] All component types designed
- [ ] Clickable prototype with:
  - [ ] Drag and drop simulation
  - [ ] Component selection
  - [ ] Properties editing
  - [ ] Preview mode
  - [ ] Save functionality

---

## Quick Reference: Component Dimensions

### Dashboard
- Metric Card: Auto × Min 120px
- Chart Card: Auto × Min 400px
- Container: 1440px max width

### Report Builder
- Components Panel: 320px width
- Canvas: Flexible width
- Properties Panel: 320px width
- Metric Component: 256px × Auto
- Line Chart: 320px × Auto
- Bar Chart: 320px × Auto
- Pie Chart: 288px × Auto
- Table: 384px × Auto
- Filter: 256px × Auto

---

Use this guide along with the working React implementation as reference to create pixel-perfect Figma designs!


