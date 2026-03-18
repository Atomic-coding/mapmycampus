# MapMyCampus Development Guidelines

## General Guidelines

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files
* Use TypeScript interfaces for all data structures
* Follow the existing color scheme: `#004080` (primary), `#4A90E2` (secondary)
* Maintain consistent spacing using Tailwind spacing scale

## Naming Conventions

### React Components
* **PascalCase** for all component names and files
* Use descriptive, action-oriented names that indicate purpose
* Examples:
  - `LoginPage.tsx` - Page-level components
  - `InteractiveMap.tsx` - Feature components
  - `QRCodeFeature.tsx` - Specific functionality
  - `InformationPanel.tsx` - UI sections

### Component Structure Naming
* **Pages**: End with "Page" (e.g., `LoginPage`, `SettingsPage`)
* **Features**: Descriptive feature name (e.g., `QRCodeFeature`, `NavigationSystem`)
* **UI Sections**: End with descriptive purpose (e.g., `InformationPanel`, `StatusLegend`)
* **Modals/Dialogs**: End with "Modal" or "Dialog" (e.g., `RoomBookingModal`)

### Variables and Functions
* **camelCase** for all variables, functions, and props
* Use descriptive names that indicate purpose:
  - `selectedRoom` - Current state
  - `handleRoomSelect` - Event handlers (start with "handle")
  - `isLoggedIn` - Boolean states (start with "is", "has", "can")
  - `onQRScanned` - Callback props (start with "on")

### CSS Classes and IDs
* Use **kebab-case** for custom CSS classes
* Follow BEM methodology when needed: `block__element--modifier`
* Prefer Tailwind utilities over custom classes
* Examples:
  - `floor-plan-container`
  - `room-status-indicator`
  - `navigation-breadcrumb`

### Data Models and Interfaces
* **PascalCase** for interfaces and types
* Use descriptive, domain-specific names:
  - `Room` - Core entities
  - `FloorPlan` - Data structures
  - `NavigationRoute` - Complex types
  - `QRCodeData` - Specific data models

### API and Backend Naming
* **snake_case** for database columns and table names
* **camelCase** for API request/response properties
* Use plural for collections: `rooms`, `buildings`, `events`
* Use singular for entities: `room`, `building`, `event`

### File and Folder Structure
* **PascalCase** for component files
* **kebab-case** for utility and config files
* **camelCase** for helper functions and hooks
* Group related components in folders:
  ```
  components/
    ├── pages/           # Page-level components
    ├── features/        # Feature-specific components
    ├── ui/              # Reusable UI components
    └── shared/          # Shared utilities
  ```

## Design System Guidelines

### Colors
* **Primary**: `#004080` (--campus-primary) - Main brand color, navigation, headers
* **Secondary**: `#4A90E2` (--campus-secondary) - Accent color, buttons, highlights
* **Light Blue**: `#E3F2FD` (--campus-light-blue) - Backgrounds, subtle highlights
* **Success**: `#10B981` - Available rooms, positive states
* **Warning**: `#F59E0B` - Occupied rooms, caution states
* **Error**: `#EF4444` - Maintenance, error states

### Typography
* **Base font size**: 14px (set in CSS variables)
* **Font family**: Inter, Roboto, system fonts
* **Headings**: Use semantic HTML (h1, h2, h3) with default styling
* **Weights**: 
  - Normal (400) for body text
  - Medium (500) for headings and buttons

### Component Patterns

#### Buttons
* **Primary**: `bg-[#004080] hover:bg-[#003366]` - Main actions
* **Secondary**: `bg-[#4A90E2] hover:bg-[#357abd]` - Supporting actions
* **Ghost**: `variant="ghost"` - Minimal actions
* Always include hover states and proper contrast

#### Cards and Panels
* Use `Card` component from shadcn/ui
* Standard border radius: `rounded-xl`
* Consistent padding: `p-6` for content, `p-4` for compact
* Shadow: `shadow-lg` for elevated content

#### Room Status Indicators
* **Available**: Green (`#10B981`)
* **Occupied**: Yellow/Orange (`#F59E0B`)
* **Maintenance**: Red (`#EF4444`)
* **Selected**: Primary color (`#004080`)

#### Interactive Elements
* Always provide hover states
* Use proper focus indicators for accessibility
* Include loading states for async operations
* Provide visual feedback for user actions

### Layout Guidelines
* **Mobile-first**: Design for mobile, enhance for desktop
* **Responsive breakpoints**: Use Tailwind's default breakpoints
* **Grid systems**: Prefer CSS Grid for complex layouts, Flexbox for simple alignment
* **Spacing**: Use consistent spacing scale (4, 8, 12, 16, 24, 32px)

### Accessibility
* Use semantic HTML elements
* Include proper ARIA labels and descriptions
* Ensure keyboard navigation works
* Maintain color contrast ratios (WCAG AA)
* Provide alt text for images and icons

### State Management
* Use React hooks for local state
* Keep state as close to usage as possible
* Use TypeScript for type safety
* Consider context for shared state across components

### Specific MapMyCampus Patterns

#### Room Components
* Room selection state should be managed at the Dashboard level
* Room status updates should trigger visual changes immediately
* QR code scanning should highlight the corresponding room on the map

#### Floor Navigation
* Floor changes should update the entire map display
* Maintain room selection across floor changes when possible
* Show loading states during floor transitions

#### Navigation Features
* Turn-by-turn directions should be step-based and clear
* Estimated walking times should be displayed
* Provide fallback routes when primary paths are blocked

#### Data Handling
* Mock data should follow the same structure as real API responses
* Use consistent error handling patterns
* Implement proper loading states for all async operations