# MapMyCampus — Complete Figma Design & Technical Handoff Document
> **Project**: MapMyCampus - PCCOER Campus Navigation System  
> **Version**: 1.0  
> **Date**: March 2026  
> **Tech Stack**: React 18 + TypeScript + Tailwind CSS + Shadcn/UI + Supabase  
> **Live URL**: https://mapmy-campus.lovable.app
---
## TABLE OF CONTENTS
1. [Project Overview](#1-project-overview)
2. [Design System & Tokens](#2-design-system--tokens)
3. [Typography](#3-typography)
4. [Color Palette](#4-color-palette)
5. [Shadows & Effects](#5-shadows--effects)
6. [Animations & Transitions](#6-animations--transitions)
7. [Component Library](#7-component-library)
8. [Screen-by-Screen Breakdown](#8-screen-by-screen-breakdown)
9. [Data Models & TypeScript Types](#9-data-models--typescript-types)
10. [Routing & Navigation Architecture](#10-routing--navigation-architecture)
11. [Authentication System](#11-authentication-system)
12. [QR Code System](#12-qr-code-system)
13. [Database Schema](#13-database-schema)
14. [Dependencies & Libraries](#14-dependencies--libraries)
15. [Figma Setup Instructions](#15-figma-setup-instructions)
---
## 1. PROJECT OVERVIEW
MapMyCampus is an indoor campus navigation web application for PCCOER (Pimpri Chinchwad College of Engineering & Research), Ravet, Pune. It provides:
- **Interactive SVG floor plans** with zoomable/pannable rooms
- **QR code-based navigation** — scan QR at room entrance → get directions
- **Room information panels** with events, amenities, directions
- **Outdoor campus map** using OpenStreetMap embed
- **User authentication** (signup, login, password reset)
- **User profiles** with usage statistics
- **Multi-floor navigation** (Floor 1, Floor 2)
### App Flow
```
Auth Page (Login/Signup)
  → Dashboard (Main App)
      ├── Floor Plan View (SVG interactive map)
      ├── QR Navigation View (indoor navigation with QR waypoints)
      ├── Generate QR View (create QR codes for rooms)
      ├── Campus Map View (OpenStreetMap embed)
      ├── Information Panel (right sidebar - room details)
      └── Sidebar (left - floor selection, navigation)
  → Profile Page
  → QR Navigation Page (scanned QR landing)
  → Reset Password Page
```
---
## 2. DESIGN SYSTEM & TOKENS
### Border Radius
| Token | Value |
|-------|-------|
| `--radius` | `0.5rem` (8px) |
| `lg` | `0.5rem` |
| `md` | `calc(0.5rem - 2px)` = 6px |
| `sm` | `calc(0.5rem - 4px)` = 4px |
### Spacing System
Uses Tailwind's default spacing scale (4px base):
- `p-2` = 8px, `p-3` = 12px, `p-4` = 16px, `p-6` = 24px, `p-8` = 32px
- `gap-2` = 8px, `gap-3` = 12px, `gap-4` = 16px, `gap-6` = 24px
### Container
- Max width: `1400px` at 2xl breakpoint
- Center aligned
- Padding: `2rem` (32px)
---
## 3. TYPOGRAPHY
### Font Stack
| Usage | Font | Fallback |
|-------|------|----------|
| **Sans (body/UI)** | `Inter` | `system-ui, sans-serif` |
| **Mono (code/IDs)** | `JetBrains Mono` | `monospace` |
### Type Scale (used in app)
| Element | Size | Weight | Class |
|---------|------|--------|-------|
| App title (sidebar) | `text-xl` (20px) | `font-bold` (700) | — |
| Page titles | `text-3xl` (30px) | `font-bold` (700) | — |
| Section titles | `text-2xl` (24px) | `font-bold` (700) | — |
| Card titles | `text-lg` (18px) | `font-bold` (700) | — |
| Card subtitles | `text-base` (16px) | `font-semibold` (600) | — |
| Body text | `text-sm` (14px) | `font-medium` (500) | — |
| Small text | `text-xs` (12px) | `font-medium` (500) | — |
| Labels | `text-sm` (14px) | `font-medium` (500) | — |
| Muted descriptions | `text-sm` / `text-xs` | normal | `text-muted-foreground` |
### Font Features
```css
font-feature-settings: 'cv11', 'ss01';
font-variation-settings: 'opsz' 32;
```
---
## 4. COLOR PALETTE
### Light Theme (Primary)
| Token | HSL | Hex Approx | Usage |
|-------|-----|-----------|-------|
| **--background** | `0 0% 98%` | `#FAFAFA` | Page background |
| **--foreground** | `210 20% 15%` | `#1E2A3A` | Main text |
| **--card** | `0 0% 100%` | `#FFFFFF` | Card backgrounds |
| **--card-foreground** | `210 20% 15%` | `#1E2A3A` | Card text |
| **--primary** | `213 100% 25%` | `#004080` | Deep University Blue — buttons, links, accents |
| **--primary-foreground** | `0 0% 98%` | `#FAFAFA` | Text on primary |
| **--primary-light** | `212 89% 42%` | `#1A6CC8` | Lighter blue variant |
| **--primary-dark** | `213 100% 20%` | `#003366` | Darker blue variant |
| **--secondary** | `212 89% 59%` | `#4A90E2` | Bright Accent Blue |
| **--secondary-foreground** | `0 0% 98%` | `#FAFAFA` | Text on secondary |
| **--secondary-light** | `212 89% 80%` | `#A3C8F0` | Light accent |
| **--secondary-dark** | `212 89% 45%` | `#2E78D0` | Dark accent |
| **--success** | `142 76% 36%` | `#16A34A` | Available rooms |
| **--success-foreground** | `0 0% 98%` | `#FAFAFA` | Text on success |
| **--success-light** | `142 76% 90%` | `#D1FAE5` | Success background |
| **--warning** | `38 92% 50%` | `#F59E0B` | Maintenance / QR points |
| **--warning-foreground** | `0 0% 98%` | `#FAFAFA` | Text on warning |
| **--warning-light** | `38 92% 90%` | `#FEF3C7` | Warning background |
| **--destructive** | `0 72% 51%` | `#DC2626` | Occupied rooms / errors |
| **--destructive-foreground** | `0 0% 98%` | `#FAFAFA` | Text on destructive |
| **--destructive-light** | `0 72% 90%` | `#FEE2E2` | Error background |
| **--muted** | `210 20% 96%` | `#F1F5F9` | Muted backgrounds |
| **--muted-foreground** | `215 16% 47%` | `#64748B` | Muted text |
| **--accent** | `212 50% 95%` | `#EFF6FF` | Accent backgrounds |
| **--accent-foreground** | `213 100% 25%` | `#004080` | Accent text |
| **--border** | `214 20% 88%` | `#D1D5DB` | Borders |
| **--input** | `214 20% 94%` | `#E8ECF1` | Input backgrounds |
| **--ring** | `213 100% 25%` | `#004080` | Focus rings |
### Dark Theme
| Token | HSL | Hex Approx |
|-------|-----|-----------|
| **--background** | `213 50% 8%` | `#0A1628` |
| **--foreground** | `0 0% 95%` | `#F2F2F2` |
| **--card** | `213 50% 10%` | `#0D1D33` |
| **--primary** | `212 89% 59%` | `#4A90E2` |
| **--primary-foreground** | `213 50% 8%` | `#0A1628` |
| **--secondary** | `213 50% 20%` | `#1A3050` |
| **--success** | `120 60% 40%` | `#2EA043` |
| **--warning** | `38 100% 60%` | `#FFB020` |
| **--destructive** | `0 84% 65%` | `#F87171` |
| **--muted** | `213 50% 15%` | `#132640` |
| **--muted-foreground** | `215 20% 65%` | `#94A3B8` |
| **--border** | `213 50% 15%` | `#132640` |
### Sidebar Colors (Light)
| Token | HSL |
|-------|-----|
| **--sidebar-background** | `0 0% 98%` |
| **--sidebar-foreground** | `240 5.3% 26.1%` |
| **--sidebar-primary** | `240 5.9% 10%` |
| **--sidebar-accent** | `240 4.8% 95.9%` |
| **--sidebar-border** | `220 13% 91%` |
| **--sidebar-ring** | `217.2 91.2% 59.8%` |
---
## 5. SHADOWS & EFFECTS
### Shadow System
| Name | CSS Value | Usage |
|------|-----------|-------|
| **shadow-xs** | `0 1px 2px hsla(primary, 0.05)` | Subtle elevation |
| **shadow-sm** | `0 1px 3px hsla(primary, 0.1), 0 1px 2px hsla(primary, 0.06)` | Light elevation |
| **shadow-card** | `0 4px 6px hsla(primary, 0.07), 0 2px 4px hsla(primary, 0.06)` | Card elevation |
| **shadow-elevated** | `0 10px 15px hsla(primary, 0.1), 0 4px 6px hsla(primary, 0.05)` | Header, elevated cards |
| **shadow-glow** | `0 0 40px hsla(secondary, 0.3)` | Highlighted/selected items |
| **shadow-inner** | `inset 0 2px 4px hsla(primary, 0.06)` | Inner shadow |
### Backdrop Blur
- Cards: `backdrop-blur-xl` (24px blur)
- Overlays: `backdrop-blur-sm` (4px blur)
### Glass Effect
```css
.glass-effect {
  background: linear-gradient(135deg, hsla(card, 0.7) 0%, hsla(card, 0.3) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid hsla(border, 0.5);
}
```
### Gradients
| Name | CSS | Usage |
|------|-----|-------|
| **campus-gradient** | `linear-gradient(135deg, primary-dark 0%, primary 50%, secondary 100%)` | Logo backgrounds, CTA buttons |
| **hero-gradient** | `linear-gradient(135deg, primary 0%, secondary 100%)` | Hero sections |
| **gradient-subtle** | `linear-gradient(180deg, background 0%, muted 100%)` | Page backgrounds |
---
## 6. ANIMATIONS & TRANSITIONS
### Transition Presets
| Name | Value | Usage |
|------|-------|-------|
| **smooth-transition** | `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)` | General UI transitions |
| **bounce-transition** | `all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful interactions |
| **spring-transition** | `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Spring-like feedback |
### Keyframe Animations
| Name | Description | Duration |
|------|-------------|----------|
| **fade-in** | Fade up from 10px below | 0.5s ease-out |
| **slide-up** | Slide up from 20px below | 0.3s ease-out |
| **scale-in** | Scale from 0.95 to 1 | 0.2s ease-out |
| **shimmer** | Background shimmer effect | 2s linear infinite |
| **accordion-down/up** | Radix accordion | 0.2s ease-out |
| **animate-pulse** | CSS pulse (used on highlighted rooms, navigation paths) | default |
| **animate-spin** | CSS spin (used on loading indicators) | default |
### Micro-interactions
| Class | Effect |
|-------|--------|
| `hover-lift` | `-translate-y-0.5` + elevated shadow on hover |
| `press-effect` | `scale(0.98)` on active/press |
---
## 7. COMPONENT LIBRARY
All components use **Shadcn/UI** (Radix UI primitives + Tailwind).
### Core Components Used
| Component | Source | Usage |
|-----------|--------|-------|
| `Button` | shadcn/ui | All buttons — variants: default, outline, ghost, secondary, destructive, link |
| `Card` | shadcn/ui | All content containers |
| `Input` | shadcn/ui | Search bars, form inputs |
| `Badge` | shadcn/ui | Status indicators, tags |
| `Avatar` | shadcn/ui | User profile pictures |
| `Dialog` | shadcn/ui | QR Scanner modal, QR Viewer modal |
| `Tabs` | shadcn/ui | Info/Events/Directions tabs, Floor tabs |
| `DropdownMenu` | shadcn/ui | User menu in header |
| `Sheet` | shadcn/ui | Mobile sidebar drawer |
| `ScrollArea` | shadcn/ui | QR code viewer scrollable area |
| `Separator` | shadcn/ui | Section dividers |
| `Alert` | shadcn/ui | Demo notifications |
| `Label` | shadcn/ui | Form labels |
| `Tooltip` | shadcn/ui | Provider wrapper |
### Button Sizes
| Size | Height | Padding |
|------|--------|---------|
| `default` | `h-10` (40px) | `px-4 py-2` |
| `sm` | `h-9` (36px) | `px-3` |
| `lg` | `h-11` (44px) | `px-8` |
| `icon` | `h-10 w-10` (40px) | — |
### Custom Button Styles
```css
.btn-primary: bg-primary text-primary-foreground hover:bg-primary-dark
.btn-glass: glass-effect text-foreground hover:bg-primary/10
.campus-gradient: linear-gradient(135deg, primary-dark → primary → secondary)
```
### Icons (Lucide React)
All icons from `lucide-react` package:
```
Search, Bell, Menu, User, Settings, QrCode, Home, Building2,
ZoomIn, ZoomOut, RotateCcw, Navigation, MapPin, Camera, Upload,
Zap, Scan, X, Download, FlaskConical, GraduationCap, Briefcase,
Calendar, Clock, Users, Wifi, Monitor, Snowflake, BookOpen,
Phone, Mail, Layers, ArrowLeft, Edit, Shield, Target, Compass,
Copy, ExternalLink, ArrowRight
```
---
## 8. SCREEN-BY-SCREEN BREAKDOWN
---
### 8.1 AUTH PAGE (`/auth`)
**Layout**: Centered card on gradient background  
**Background**: `bg-gradient-to-br from-blue-50 to-indigo-100`  
**Card**: `max-w-md` (448px), centered vertically and horizontally
#### States:
1. **Login** — Email + Password fields, "Sign In" button, "Forgot password?" link, "Don't have an account? Sign up" toggle
2. **Signup** — Full Name + Email + Password fields, "Sign Up" button, "Already have an account? Sign in" toggle  
3. **Forgot Password** — Email field, "Send Reset Link" button, "Back to login" link
#### Elements:
- `CardHeader`: Title ("Welcome Back" / "Create Account") + Description
- `CardContent`: Form with `space-y-4` gap
- Each input has a `<label>` with `text-sm font-medium`
- `Input` with placeholder text
- Primary `Button` full width (`w-full`)
- Toggle links: `text-sm text-blue-600 hover:underline`
#### Validation:
- Email: Zod `z.string().email()`
- Password: Zod `z.string().min(6)`
- Full Name: Zod `z.string().min(2)` (signup only)
---
### 8.2 RESET PASSWORD PAGE (`/reset-password`)
**Layout**: Same as Auth Page  
**Fields**: New Password + Confirm Password  
**Validation**: Passwords match + min 6 chars  
**Action**: Updates password via Supabase `updateUser`
---
### 8.3 DASHBOARD (`/`) — Main App
**Layout**: Full viewport height (`h-screen`), horizontal flex layout  
**Background**: `bg-gradient-to-br from-background to-muted/30`
#### Structure:
```
┌─────────────┬──────────────────────────────────────────┬────────────────┐
│             │            HEADER (h-16)                 │                │
│   SIDEBAR   ├──────────────────────────────────────────┤  INFORMATION   │
│   (w-64)    │                                          │    PANEL       │
│   hidden    │         MAP VIEW TOGGLE BUTTONS          │    (w-80)      │
│   on mobile │                                          │                │
│             │         MAIN MAP AREA                    │   Room details │
│   - Logo    │         (flex-1)                         │   Events       │
│   - Floors  │                                          │   Directions   │
│   - Nav     │   4 views:                               │                │
│   - User    │   1. Floor Plan (SVG)                    │                │
│   - Stats   │   2. QR Navigation (SVG + list)          │                │
│             │   3. Generate QR (QR code display)       │                │
│             │   4. Campus Map (OSM iframe)             │                │
└─────────────┴──────────────────────────────────────────┴────────────────┘
```
---
### 8.3.1 SIDEBAR (Desktop: `w-64`, Mobile: Sheet drawer)
**Background**: `bg-card/80 backdrop-blur-xl`, right border  
**Sections**:
1. **Logo Section** (top, `p-6`, bottom border)
   - University logo: `w-12 h-12` rounded-2xl with `campus-gradient` background
   - Logo image: `w-7 h-7` inside
   - Title: "MapMyCampus" — `text-xl font-bold text-primary`
   - Subtitle: "PCCOER Navigation" — `text-xs text-muted-foreground`
2. **Floor Selection** (`p-4`)
   - Label with Building2 icon
   - 2-column grid of floor buttons
   - Active: `campus-gradient text-primary-foreground shadow-sm`
   - Inactive: `outline, hover:bg-primary/10 border-primary/20`
3. **Navigation Menu** (`p-4`, flex-1)
   - Items: Dashboard (active), QR Scanner, Profile, Settings
   - Active item: `bg-primary/10 text-primary`
   - Inactive: `ghost, hover:bg-primary/5`
   - QR Scanner has "New" badge
4. **User Profile** (`p-4`)
   - Avatar `w-10 h-10` with initials fallback
   - Name (truncated), Email (truncated)
   - Role badge: `variant="outline" capitalize`
   - Container: `rounded-lg bg-muted/50 hover:bg-muted`
5. **Quick Stats** (`p-4`, top border)
   - 2-column grid
   - Available: `bg-success/10`, count in `text-success`
   - Occupied: `bg-destructive/10`, count in `text-destructive`
---
### 8.3.2 HEADER (`h-16`)
**Background**: `bg-card/60 backdrop-blur-xl`, bottom border, `elevated-shadow`
**Left**: Mobile menu (Sheet trigger, `lg:hidden`) + Logo (`w-10 h-10`) + Title + Subtitle  
**Center**: Search input (`max-w-lg`, `h-11`, search icon left, `pl-10`)  
**Right**: View QR Codes button + Bell icon with notification badge (red `2`) + User avatar dropdown
#### User Dropdown Menu (`w-56`):
- Label: Name + Email
- Items: Profile, Settings, Log out
---
### 8.3.3 MAP VIEW TOGGLE
**Layout**: Horizontal flex with `gap-2 flex-wrap`  
**Buttons**: 4 toggle buttons — "Floor Plan", "QR Navigation", "Generate QR", "Campus Map"  
**Active**: `variant="default"`, Inactive: `variant="outline"`, all `size="sm"`
---
### 8.3.4 FLOOR PLAN VIEW (InteractiveMap)
**Container**: Card with `elevated-shadow`, `bg-card/80 backdrop-blur-sm`
**Header**:
- Title: "Floor {n} - Interactive Map" with Navigation icon
- Zoom controls: 3 square buttons (ZoomIn, ZoomOut, RotateCcw) — `h-9 w-9 p-0`
- Status legend: colored dots (3px circles) for Available/Occupied/Maintenance/Selected
**Map Area**: `h-96` (384px), SVG viewBox `0 0 700 400`
- Background: `hsl(var(--card))` with `hsl(var(--border))` stroke
- Corridors: `hsl(var(--muted))` horizontal rectangles
- Main Entrance: primary-colored rectangle at top center
- Rooms: Colored rectangles based on status
  - Available: `hsl(var(--success))`
  - Occupied: `hsl(var(--destructive))`
  - Maintenance: `hsl(var(--warning))`, opacity 0.7
  - Selected: `hsl(var(--primary))`, stroke width 3
  - Highlighted: `hsl(var(--secondary))` with pulsing border
- Room labels: White text (ID + type), centered in room rect
- Navigation line: Dashed from entrance to selected room, `animate-pulse`
**Overlays**:
- Top-left: Zoom level badge (`{zoom}%`)
- Top-right: Room count badge (`{n} rooms`)
**Interactions**: Click to select, drag to pan, zoom buttons
---
### 8.3.5 QR NAVIGATION VIEW (IndoorNavigationMap)
**Container**: Same card style as Floor Plan
**Header**:
- Title: "Indoor Navigation - Floor {n}"
- "Scan QR" button (outline)
- Search input with Search icon
- Current location indicator (if set): `bg-primary/10` rounded bar
**Map Area**: `h-96`, SVG viewBox `0 0 800 600`
- Grid pattern: 20x20px dashed grid
- QR Waypoints: Yellow (warning) circles with QR icon, radius 8
- Rooms: Semi-transparent fills (`status-color/0.3`), selectable
- Navigation path: Dashed blue line from current location to destination
**Legend** (floating, top-right): Available, Occupied, QR Point indicators
**Room List** (below map, `max-h-48` scrollable):
- Each room: Clickable card with name, department, status badge, distance
---
### 8.3.6 GENERATE QR VIEW (QRCodeGenerator)
**Container**: Same card style  
**When no room selected**: Centered placeholder with QrCode icon (`w-16 h-16`), title, description
**When room selected**:
- Title: "QR Code Generator"
- Room name + ID badge
- QR code image: `w-48 h-48` in white container with `border-2 border-primary/20 shadow-lg`
- QR color: Dark `#0066CC`, Light `#FFFFFF`
- 3 action buttons (stacked):
  1. "Download QR Code" — `campus-gradient`
  2. "Copy Navigation URL" — outline
  3. "Test Navigation" — secondary
- Instructions: Numbered steps (1-3)
---
### 8.3.7 CAMPUS MAP VIEW (OpenStreetMap)
**Container**: Same card style  
**Header**: Title + Satellite/Standard toggle + "Open in Maps" button + Legend (4 types)
**Map**: OpenStreetMap `<iframe>` embed, full width, `h-96`
- Center: PCCOER coordinates `[18.6298, 73.7997]`
- Bbox: ±0.01 degrees
**Overlays**:
- Top-left: Scrollable location list (`max-h-64`) with campus locations
- Top-right: Location count badge
- Bottom-right: Map type badge
---
### 8.3.8 INFORMATION PANEL (Right sidebar, `w-80`)
**Background**: `bg-card/60 backdrop-blur-xl`, left border
**Empty State**: MapPin icon (`w-12 h-12`) + "Select a Room" text
**When room selected**:
- **Header** (`p-6`): Room name (primary, bold), department, status badge
- **Tabs**: Info | Events | Directions (3-column grid)
**Info Tab**:
- Room Details card: Capacity, Type, Floor, Room ID
- Description card (if exists)
- Amenities card: Badges with icons (Wifi, Projector, AC, etc.)
- Contact card: Phone + Email
**Events Tab**:
- Today's schedule card
- Event items: Title, time badge, instructor
- Empty state: Calendar icon + "No events scheduled"
**Directions Tab**:
- Step-by-step numbered navigation (1-4 steps)
- Each step: Numbered circle (`w-6 h-6 rounded-full bg-primary`) + instruction + distance
- Estimated walking time: `bg-muted/50` bar
- "Start Navigation" button: `campus-gradient`
---
### 8.4 PROFILE PAGE (`/profile`)
**Layout**: `max-w-4xl` centered, `min-h-screen`, gradient background  
**Grid**: `lg:grid-cols-3`, 2-col main + 1-col sidebar
**Header**: Back button + "User Profile" title + description
**Main Card (2-col span)**:
- Avatar: `h-24 w-24` with role badge
- Editable fields (2-col grid): Name, Email, Phone, Department, Student ID (disabled), Address
- Edit/Save toggle button
**Sidebar cards**:
1. **Usage Statistics**: 3 stat rows (Rooms Visited: 45, QR Scans: 23, Days Active: 89)
2. **Quick Actions**: "Back to Dashboard" + "Sign Out" (destructive)
3. **Account Status**: Account Type badge, Status (Active/green), Verified (✓)
---
### 8.5 QR NAVIGATION PAGE (`/qr-navigate`)
**Layout**: Centered card (`max-w-lg`), gradient background
**Header**: Navigation icon in gradient circle + "QR Navigation" title
**Content**:
- Room info card (`bg-primary/5`): Room ID, Name, Department, Floor, Status
- "Start Navigation" button (`campus-gradient`, `h-12`)
- "What's next?" info box
**Error State** (invalid QR): MapPin icon + "Invalid QR Code" + redirect button
---
### 8.6 QR CODE VIEWER (Modal Dialog)
**Size**: `max-w-6xl max-h-[90vh]`  
**Tabs**: One tab per floor  
**Content**: Rooms grouped by type (Lab, Classroom, Office, Admin)
- Each type has icon + color
- Room cards: 3-column grid (`lg:grid-cols-3`)
- Each card: Room name, ID badge, QR code image (`w-24 h-24`), Save + Navigate buttons
- "Download All" button per floor
---
### 8.7 QR CODE SCANNER (Modal Dialog)
**Size**: `sm:max-w-md`  
**States**:
1. Default: 2 buttons (Scan with Camera + Upload Image), demo alert, how-it-works steps
2. Scanning: Animated scanning indicator (pulse + spin borders)
3. Result: Success icon + room ID + "Redirecting..."
---
## 9. DATA MODELS & TYPESCRIPT TYPES
```typescript
// Room type - represents a physical room on campus
interface Room {
  id: string;           // e.g., "R101", "L103", "O104"
  name: string;         // e.g., "Computer Science Lab A"
  department: string;   // e.g., "Computer Science"
  capacity: number;     // e.g., 30
  status: 'available' | 'occupied' | 'maintenance';
  x: number;            // SVG X coordinate on floor plan
  y: number;            // SVG Y coordinate
  width: number;        // SVG rectangle width
  height: number;       // SVG rectangle height
  type: 'classroom' | 'lab' | 'office' | 'admin';
  amenities?: string[]; // e.g., ['Projector', 'WiFi', 'AC']
  floor: number;        // Floor number (1, 2, etc.)
  description?: string; // Room description text
}
// Event type - represents a scheduled event
interface Event {
  id: string;
  title: string;
  instructor: string;
  startTime: string;    // "HH:MM" format
  endTime: string;      // "HH:MM" format
  roomId: string;       // References Room.id
  date: string;         // ISO date string
}
// User type - represents an app user
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'staff' | 'admin';
  avatar?: string;
}
// Navigation step for directions
interface NavigationStep {
  instruction: string;
  direction: 'straight' | 'left' | 'right' | 'up' | 'down';
  distance: string;
}
// QR Waypoint for indoor navigation
interface QRWaypoint {
  id: string;
  roomId: string;
  coordinates: [number, number];
  qrCode: string;
  description: string;
}
```
---
## 10. ROUTING & NAVIGATION ARCHITECTURE
```
Routes:
  /              → Index (auth check → Dashboard)
  /auth          → AuthPage (login/signup)
  /reset-password → ResetPasswordPage
  /qr-navigate   → QRNavigationPage (QR code landing)
  /profile       → ProfilePage
  *              → NotFound (404)
```
### Route Protection:
- `/` checks Supabase session → redirects to `/auth` if not logged in
- `/profile` checks session → redirects to `/auth` if not logged in
- `/auth` checks session → redirects to `/` if already logged in
### QR Navigation Flow:
1. QR code contains URL: `{origin}/qr-navigate?navigate={roomId}&room={roomName}`
2. User scans QR → lands on QRNavigationPage
3. Shows room info → clicks "Start Navigation"
4. Redirects to `/?room={roomId}&floor={floor}`
5. Dashboard highlights the room on the map
---
## 11. AUTHENTICATION SYSTEM
**Provider**: Supabase Auth (email/password)
### Features:
- **Sign Up**: Email + Password + Full Name → creates auth user + profile record
- **Sign In**: Email + Password → session stored in localStorage
- **Forgot Password**: Sends reset email with `redirectTo: /reset-password`
- **Reset Password**: Validates new password → updates via `supabase.auth.updateUser()`
- **Sign Out**: Clears session → redirects to `/auth`
### Session Management:
```typescript
// Auth state listener pattern
supabase.auth.onAuthStateChange((event, session) => {
  setSession(session);
});
// Initial session check
supabase.auth.getSession().then(({ data: { session } }) => {
  setSession(session);
});
```
### Input Validation (Zod):
```typescript
const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
});
```
---
## 12. QR CODE SYSTEM
### Generation:
- Library: `qrcode` npm package
- Method: `QRCode.toDataURL(url, options)`
- QR Color: Dark `#0066CC`, Light `#FFFFFF`
- Sizes: 256px (generator), 200px (viewer)
- URL format: `{origin}/qr-navigate?navigate={roomId}&room={encodedRoomName}`
### Viewing:
- Modal dialog shows all rooms' QR codes grouped by floor and type
- Each QR is downloadable as PNG
- "Download All" downloads all QR codes for a floor
### Scanning (Demo):
- Simulated — randomly picks a room ID after 1.5s delay
- Camera and Upload options (both trigger simulation)
- Real implementation would use a camera-based QR scanner library
### Navigation Handler:
- `QRNavigationHandler` component checks URL params on load
- If `navigate` and `room` params exist, triggers room highlight + map view switch
- Cleans URL after processing
---
## 13. DATABASE SCHEMA
### Table: `profiles`
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,  -- References auth.users(id)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT,
  avatar_url TEXT
);
```
### RLS Policies:
```sql
-- Users can only view their own profile
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);
-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);
```
### Trigger:
```sql
-- Auto-create profile on user signup
CREATE FUNCTION public.handle_new_user() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', ''));
  RETURN new;
END;
$$;
```
---
## 14. DEPENDENCIES & LIBRARIES
### Core
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | DOM rendering |
| `react-router-dom` | ^6.30.1 | Client-side routing |
| `typescript` | ^5.8.3 | Type safety |
| `vite` | ^5.4.19 | Build tool |
### UI & Styling
| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^3.4.17 | Utility-first CSS |
| `tailwindcss-animate` | ^1.0.7 | Animation utilities |
| `class-variance-authority` | ^0.7.1 | Component variants |
| `clsx` | ^2.1.1 | Class merging |
| `tailwind-merge` | ^2.6.0 | Tailwind class dedup |
| `lucide-react` | ^0.462.0 | Icon library |
### Radix UI (Shadcn primitives)
All `@radix-ui/react-*` packages — accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, label, popover, progress, scroll-area, select, separator, slider, switch, tabs, toast, toggle, tooltip
### Backend & Auth
| Package | Version | Purpose |
|---------|---------|---------|
| `@supabase/supabase-js` | ^2.58.0 | Supabase client |
| `@tanstack/react-query` | ^5.83.0 | Data fetching/caching |
### QR Code
| Package | Version | Purpose |
|---------|---------|---------|
| `qrcode` | ^1.5.4 | QR code generation |
| `@types/qrcode` | ^1.5.5 | TypeScript types |
### Forms & Validation
| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | ^7.61.1 | Form management |
| `@hookform/resolvers` | ^3.10.0 | Zod integration |
| `zod` | ^3.25.76 | Schema validation |
### Maps
| Package | Version | Purpose |
|---------|---------|---------|
| `leaflet` | ^1.9.4 | Map library (available but using OSM iframe) |
| `react-leaflet` | ^5.0.0 | React Leaflet wrapper |
### Other
| Package | Version | Purpose |
|---------|---------|---------|
| `date-fns` | ^3.6.0 | Date formatting |
| `sonner` | ^1.7.4 | Toast notifications |
| `recharts` | ^2.15.4 | Charts (available) |
| `cmdk` | ^1.1.1 | Command palette |
| `next-themes` | ^0.3.0 | Theme switching |
| `vaul` | ^0.9.9 | Drawer component |
| `embla-carousel-react` | ^8.6.0 | Carousel |
---
## 15. FIGMA SETUP INSTRUCTIONS
### Step 1: Create Design System File
1. **Create a new Figma file** called "MapMyCampus Design System"
2. **Set up Color Styles** — Create all colors from Section 4 as Figma color styles
   - Use the naming convention: `Primary/Default`, `Primary/Light`, `Primary/Dark`, etc.
   - Create both Light and Dark theme color sets
3. **Set up Text Styles** — Create text styles matching Section 3:
   - `Heading/H1` — Inter 30px Bold
   - `Heading/H2` — Inter 24px Bold
   - `Heading/H3` — Inter 20px Bold
   - `Card Title` — Inter 18px Bold
   - `Body` — Inter 14px Medium
   - `Body Small` — Inter 12px Medium
   - `Label` — Inter 14px Medium
   - `Caption` — Inter 12px Regular
4. **Set up Effect Styles** — Shadows from Section 5
### Step 2: Create Component Library
Build these Figma components matching the Shadcn/UI styling:
1. **Button** — 4 variants × 4 sizes = 16 combinations
2. **Input** — Default, with icon, disabled states
3. **Card** — With header, content, footer slots
4. **Badge** — Default, outline, destructive, secondary, success, warning
5. **Avatar** — With image, with fallback initials
6. **Tab Bar** — 2-tab and 3-tab variants
7. **Dialog/Modal** — Standard modal with header/content
8. **Sidebar** — Desktop (264px) and mobile (Sheet drawer)
9. **Room Rectangle** — SVG room component with status colors
10. **QR Code Display** — Frame with download button
11. **Navigation Step** — Numbered circle + text
12. **Stat Card** — Icon + label + value
### Step 3: Create Page Frames
Create frames for each screen at these dimensions:
- **Desktop**: 1440 × 900 (fill container)
- **Mobile**: 375 × 812 (iPhone)
#### Screens to create:
1. `Auth - Login` (centered card)
2. `Auth - Signup` (centered card)
3. `Auth - Forgot Password` (centered card)
4. `Auth - Reset Password` (centered card)
5. `Dashboard - Floor Plan` (full layout with sidebar + map + info panel)
6. `Dashboard - QR Navigation` (map swap only)
7. `Dashboard - Generate QR` (with room selected)
8. `Dashboard - Generate QR` (no room — empty state)
9. `Dashboard - Campus Map` (OSM embed area)
10. `Dashboard - Room Selected` (info panel populated)
11. `Dashboard - Room Info Tab`
12. `Dashboard - Events Tab`
13. `Dashboard - Directions Tab`
14. `Dashboard - Mobile` (Sheet sidebar open)
15. `Profile Page`
16. `QR Navigation Landing` (valid QR)
17. `QR Navigation Landing` (invalid QR)
18. `QR Viewer Modal` (with QR codes grid)
19. `QR Scanner Modal` (default / scanning / result states)
20. `404 Not Found`
### Step 4: Mock Data for Figma
Use this data to populate your Figma screens:
**Floor 1 Rooms:**
| ID | Name | Type | Department | Status | Capacity |
|----|------|------|------------|--------|----------|
| R101 | Computer Science Lab A | Lab | Computer Science | Available | 30 |
| R102 | Lecture Hall B | Classroom | General | Occupied | 150 |
| L103 | Chemistry Lab | Lab | Chemistry | Maintenance | 25 |
| O104 | Dean Office | Office | Administration | Available | 5 |
**Floor 2 Rooms:**
| ID | Name | Type | Department | Status | Capacity |
|----|------|------|------------|--------|----------|
| R201 | Physics Lab | Lab | Physics | Available | 20 |
| R202 | Mathematics Classroom | Classroom | Mathematics | Occupied | 40 |
| O203 | Faculty Lounge | Office | General | Available | 15 |
| A204 | Student Services | Admin | Administration | Available | 10 |
**User**: MapMyCampus, admin@pccoer.in, Admin role
**Campus Locations** (for outdoor map):
- PCCOER Main Building, Library, Computer Science Lab, Main Gate, Student Parking, Canteen
- Center coordinates: 18.6298°N, 73.7997°E
---
## APPENDIX: ROOM COORDINATE REFERENCE (SVG)
### Floor 1 (viewBox: 0 0 700 400)
```
Corridors: y=60-100, y=250-290, y=300-340 (full width)
Main Entrance: x=320, y=0, w=60, h=20
R101: x=50, y=100, w=120, h=80
R102: x=200, y=100, w=150, h=100
L103: x=380, y=120, w=100, h=90
O104: x=520, y=100, w=80, h=60
```
### Floor 2 (viewBox: 0 0 700 400)
```
R201: x=60, y=120, w=110, h=85
R202: x=200, y=110, w=130, h=90
O203: x=380, y=130, w=95, h=70
A204: x=500, y=115, w=90, h=75
```
### QR Waypoints (viewBox: 0 0 800 600)
```
qr-entrance-1: [100, 100] → Room R101
qr-corridor-1: [200, 150] → Main corridor
qr-stairs-1: [300, 200] → Staircase
```
---
*This document contains everything needed to recreate the MapMyCampus project in Figma and rebuild it on any platform.*