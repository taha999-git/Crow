# Settings Page Layout & Structure Guide

## 📐 Overall Layout

```
┌─────────────────────────────────────────────────────┐
│                     HEADER (Crow)                    │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│   SIDEBAR    │         MAIN CONTENT AREA            │
│  (220px)     │         (Responsive)                 │
│              │                                      │
│ - Settings   │  ┌────────────────────────────────┐ │
│   Title      │  │ My Account / Page Title         │ │
│              │  │ Manage account settings...      │ │
│ - User       │  └────────────────────────────────┘ │
│   Profile    │                                      │
│              │  ┌────────────────────────────────┐ │
│ - Navigation │  │  SETTINGS CARD                 │ │
│   Items      │  │ ├─ Profile                     │ │
│   - My Acc.  │  │ ├─ Avatar Upload Section       │ │
│   - Prefs    │  │ ├─ Personal Info Form          │ │
│   - Appear.  │  │ └─ Security Section            │ │
│   - Privacy  │  └────────────────────────────────┘ │
│   - Notif.   │                                      │
│   - etc      │  ┌────────────────────────────────┐ │
│              │  │  SETTINGS CARD                 │ │
│ - Back Link  │  │  (More cards as needed)        │ │
│              │  └────────────────────────────────┘ │
└──────────────┴──────────────────────────────────────┘
```

## 🎨 Color Scheme

### Sidebar (Discord-Inspired)
```
Background:      #2c2f33  (Dark gray)
Border:          #23272a  (Darker gray)
Text:            #99aab5  (Light gray)
Active:          #2563eb  (Blue)
Hover:           #36393f  (Slightly lighter gray)
```

### Main Content (Professional Light)
```
Background:      #f5f6f7  (Light gray)
Cards:           #ffffff  (White)
Text Primary:    #1e293b  (Dark)
Text Secondary:  #99aab5  (Gray)
Borders:         #e5e7eb  (Light gray)
Accents:         #2563eb  (Blue)
Danger:          #dc2626  (Red)
Success:         #43b581  (Green)
```

## 📱 Component Breakdown

### 1. Sidebar Header
```
┌─────────────────────────┐
│  Settings               │  <- Title (16px, bold)
│  ┌───────────────────┐  │
│  │ Z  Username       │  │  <- Avatar (48px) + User Info
│  │    Online ●       │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

### 2. Navigation Item
```
┌────────────────────────────┐
│  👤 My Account             │  <- Icon + Text
└────────────────────────────┘
   (hover: background change, color change)
   (active: blue background, white text)
```

### 3. Settings Card
```
┌──────────────────────────────┐
│ Profile                       │  <- Title
│ Customize how you appear      │  <- Subtitle
├──────────────────────────────┤
│                              │
│  Avatar Upload Section       │  <- Card Content
│  Personal Info Form          │
│  Security Section            │
│                              │
└──────────────────────────────┘
```

### 4. Preference Item
```
┌───────────────────────────────────────────┐
│ │ Join with video                │ [●─────] │
│ │ Automatically enable your      │         │
│ │ video when joining meetings    │         │
│                                           │
│   (Hover: left border highlights,        │
│    background slightly changes)          │
└───────────────────────────────────────────┘
```

### 5. Form Group
```
Label Text *
(Hint: Additional help text)
┌───────────────────────────┐
│ input value              │
└───────────────────────────┘
```

### 6. Toggle Switch
```
  ○─────  (unchecked)
  ───●   (checked)
```

## 🎭 Typography

```
Page Title:        1.8rem (28.8px), Bold, Dark
Card Title:        1.3rem (20.8px), Semi-bold, Dark
Section Title:     0.95rem (15.2px), Medium, Dark
Label:             0.95rem (15.2px), Bold, Dark
Body Text:         0.95rem (15.2px), Normal, Dark
Hint Text:         0.85rem (13.6px), Normal, Gray
Small Text:        0.8rem (12.8px), Normal, Light Gray
```

## 🔄 Responsive Breakpoints

### Desktop (1025px+)
- Sidebar: 220px fixed width
- Main content: Flexible
- Grid: 2 columns for forms

### Tablet (769px - 1024px)
- Sidebar becomes horizontal
- Nav items in row
- Grid: 1 column for forms

### Mobile (481px - 768px)
- Full width layout
- Sidebar above content
- Single column everything
- Buttons full width

### Small Mobile (≤480px)
- Optimized spacing
- Stacked preference items
- Touch-friendly buttons (48px min)

## 🎬 Animations

### Tab Transition
```
From: opacity: 0, translateY(10px)
To:   opacity: 1, translateY(0)
Duration: 0.3s ease
```

### Button Hover
```
Transform: translateY(-2px)
Shadow: Increased depth
```

### Toggle Switch
```
Background: Color change
Slider: Smooth slide 20px
Duration: 0.3s
```

### Preference Item Hover
```
Background: Subtle change
Left border: Highlight (4px blue)
Shadow: Slight increase
```

## 📋 Tab Structure

```
├── Profile (Default)
│   ├── Avatar Upload
│   ├── Personal Information
│   └── Security
│
├── Preferences
│   ├── Meeting Preferences
│   └── Audio & Video
│
├── Appearance
│   └── Theme Selection (Light/Dark/Auto)
│
├── Privacy
│   ├── Profile Visibility
│   ├── Show Online Status
│   └── Allow Meeting Invitations
│
└── Notifications
    ├── Meeting Invitations
    ├── Meeting Reminders
    └── Messages
```

## 🔘 Button Styles

### Primary (Save Changes)
```
Background: Linear gradient (Blue → Dark Blue)
Color: White
Padding: 12px 24px
Border: None
Icon: ✓ (Save icon)
Hover: Lift effect + shadow
```

### Secondary (Cancel, Change, etc.)
```
Background: #f3f4f6
Color: Dark
Border: 1px #d1d5db
Padding: 10px 20px
Hover: Border darkens
```

### Danger (Delete)
```
Background: #fee2e2
Color: #dc2626
Border: 1px #fecaca
Padding: 10px 20px
Hover: More intense red
```

## ✅ Form Validation States

### Normal
```
Border: #d1d5db
```

### Focus
```
Border: #2563eb
Shadow: 0 0 0 3px rgba(37, 99, 235, 0.1)
```

### Disabled
```
Background: #f9fafb
Border: #e5e7eb
Color: #9ca3af
Cursor: not-allowed
```

---

This structure provides a clean, professional, and modern settings experience that rivals Discord and Zoom!
