# Settings Page - Visual Component Reference

## 🎨 Complete Component Library

This document provides visual references for all components in the redesigned settings page.

---

## 1️⃣ SIDEBAR COMPONENTS

### Sidebar Container
```
Width:           220px (Fixed)
Background:      #2c2f33
Border Right:    1px solid #23272a
Height:          Full viewport height
Display:         Flex column
```

### Sidebar Header
```
┌──────────────────┐
│ SETTINGS         │  ← Title: 16px, bold, white, uppercase
│                  │
│ ┌──────────────┐ │
│ │Z  Username   │ │  ← Avatar (48px) + Name + Status
│ │   Online ●   │ │
│ └──────────────┘ │
└──────────────────┘
Background: #23272a
Padding: 16px
Border Bottom: 1px solid #23272a
```

### Navigation Section
```
USER SETTINGS          ← Title: 11px, uppercase, gray, bold

👤 My Account         ← Item: 15px, normal gray
  (Hover: Light background, white text)
  (Active: Blue background, white text)

⚙️ Preferences

🎨 Appearance
```

### Navigation Item States
```
Normal:
  Background: transparent
  Color: #99aab5
  Padding: 8px 12px
  Border Radius: 6px

Hover:
  Background: #36393f
  Color: #ffffff
  Cursor: pointer

Active:
  Background: #2563eb
  Color: #ffffff
  Font Weight: 600
```

---

## 2️⃣ HEADER COMPONENTS

### Page Header
```
┌────────────────────────────────────────────┐
│ My Account                                 │
│ Manage your account settings and preferences
│                              [Save Changes]│
└────────────────────────────────────────────┘

Title: 28.8px, bold, dark
Subtitle: 15.2px, normal, gray
Button: Primary style, right aligned
```

---

## 3️⃣ CARD COMPONENTS

### Settings Card
```
┌──────────────────────────────────────┐
│ Profile                              │ ← Title: 20.8px, bold
│ Customize how you appear             │ ← Subtitle: 15.2px, gray
├──────────────────────────────────────┤ ← Border: 1px solid #e8e8e8
│                                      │
│  Card Content Here                   │ ← Padding: 32px (2rem)
│                                      │
└──────────────────────────────────────┘
Background: #ffffff
Border Radius: 12px
Box Shadow: 0 2px 8px rgba(0,0,0,0.08)
Margin Bottom: 24px
Transition: all 0.3s ease
```

### Card Hover State
```
Box Shadow: 0 4px 12px rgba(0,0,0,0.12)
Slight elevation effect
```

---

## 4️⃣ FORM COMPONENTS

### Form Group
```
Label Text                          ← 15.2px, bold, dark
(Optional Hint Text)               ← 13.6px, gray
┌─────────────────────────────────┐
│ User Input Here                 │ ← 15.2px
└─────────────────────────────────┘
  Border: 1px solid #d1d5db
  Padding: 10px 12px
  Border Radius: 6px
  Background: #ffffff
  
Focus State:
  Border: 1px solid #2563eb
  Box Shadow: 0 0 0 3px rgba(37,99,235,0.1)
```

### Form Label
```
Display Name *                     ← Bold, 15.2px, dark
Username cannot be changed         ← Gray hint, 13.6px
```

### Form Hint
```
"Used for account notifications and password recovery"
Font Size: 13.6px
Color: #99aab5
Margin Top: 4px
```

---

## 5️⃣ TOGGLE SWITCH COMPONENT

### Toggle Structure
```
OFF State:                    ON State:
┌─────────────────┐          ┌─────────────────┐
│ ●─────         │           │ ─────●          │
└─────────────────┘          └─────────────────┘

Width: 48px
Height: 28px
Border Radius: 34px
Background OFF: #ccc
Background ON: #2563eb
Slider: 22px circle, white

Animation: 0.3s ease
```

### Toggle with Label
```
Join with video              [●─────]
Automatically enable video   when joining meetings

Layout: Flex space-between
Left: Label + Description (90% width)
Right: Toggle Switch (10% width)
```

---

## 6️⃣ BUTTON COMPONENTS

### Primary Button (Save)
```
┌──────────────────────────────┐
│ 💾 Save All Changes          │ ← Icon + Text
└──────────────────────────────┘

Background: Linear gradient (#2563eb → #1e3a8a)
Color: White
Padding: 12px 24px
Border Radius: 6px
Font Weight: 600
Font Size: 16px
Box Shadow: 0 2px 8px rgba(37,99,235,0.2)

Hover:
  Transform: translateY(-2px)
  Box Shadow: 0 4px 12px rgba(37,99,235,0.3)
  Cursor: pointer
```

### Secondary Button (Cancel)
```
┌──────────────────┐
│ Cancel           │
└──────────────────┘

Background: #f3f4f6
Color: Dark (#1e293b)
Border: 1px solid #d1d5db
Padding: 10px 20px
Border Radius: 6px
Font Weight: 500
Font Size: 14px

Hover:
  Background: #e5e7eb
  Border Color: #9ca3af
```

### Danger Button (Delete)
```
┌──────────────────┐
│ Delete Account   │
└──────────────────┘

Background: #fee2e2
Color: #dc2626
Border: 1px solid #fecaca
Padding: 10px 20px
Border Radius: 6px
Font Weight: 500
Font Size: 14px

Hover:
  Background: #fecaca
  Border Color: #fca5a5
```

---

## 7️⃣ PREFERENCE ITEM COMPONENT

### Structure
```
┌────────────────────────────────────────────────────┐
│                                                   │
│ Join with video               [●─────────────────]│
│ Automatically enable your video                   │
│ when joining meetings                             │
│                                                   │
└────────────────────────────────────────────────────┘

Normal State:
  Background: #f9fafb
  Border: 1px solid #e5e7eb
  Border Left: 4px transparent
  Padding: 19.2px 24px
  Border Radius: 8px

Hover State:
  Background: #f3f4f6
  Border Left: 4px solid #2563eb
  Box Shadow: 0 2px 4px rgba(0,0,0,0.05)
```

### Preference Info
```
Join with video                    ← Title: 15.2px, bold, dark
Automatically enable your video    ← Desc: 13.6px, gray
when joining meetings
```

---

## 8️⃣ APPEARANCE COMPONENT

### Theme Selection
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │
│ │ Light   │ │  │ │  Dark   │ │  │ │  Auto   │ │
│ │ Preview │ │  │ │ Preview │ │  │ │ Preview │ │
│ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │
│             │  │             │  │             │
│   Light     │  │    Dark     │  │    Auto     │
└─────────────┘  └─────────────┘  └─────────────┘

Unchecked:
  Border: 2px solid #e5e7eb
  Background: #f9fafb
  Border Radius: 8px
  Padding: 24px 16px
  Cursor: pointer

Checked:
  Border: 2px solid #2563eb
  Background: #eff6ff
  Box Shadow: 0 0 0 3px rgba(37,99,235,0.1)

Preview Box:
  Height: 80px
  Border Radius: 6px
  Light: Gradient white → light gray, border
  Dark: Gradient dark gray → black
  Auto: Split light/dark gradient
```

---

## 9️⃣ AVATAR COMPONENT

### Avatar Upload
```
┌──────────────┐     ┌─────────────────────────┐
│   ┌────────┐│     │ Profile Picture         │
│   │        ││     │ JPG, PNG or GIF • Max 5MB
│   │ Avatar ││     │ [Remove Avatar]         │
│   │ 120px  ││     │                         │
│   └────────┘│     │                         │
└──────────────┘     └─────────────────────────┘
  Background: Light gray (#f9fafb)
  Border: 2px dashed #e5e7eb
  Padding: 24px
  Border Radius: 12px
  Gap: 32px

Avatar:
  Size: 120px × 120px
  Border Radius: 50%
  Border: 4px white
  Box Shadow: 0 4px 12px rgba(0,0,0,0.1)
  
Hover on Avatar:
  Overlay: rgba(0,0,0,0.5)
  Color: white
  Display: Flex (centered icon)
  Opacity: 0 → 1 on hover
```

---

## 🔟 COLOR PALETTE

### Primary Colors
```
┌──────┐ #2563eb  Primary Blue
│      │ Primary color for actions, links, active states
└──────┘

┌──────┐ #3b82f6  Primary Light
│      │ Hover states, lighter emphasis
└──────┘

┌──────┐ #1d4ed8  Primary Dark
│      │ Pressed states, darker emphasis
└──────┘
```

### Background & Surface Colors
```
┌──────┐ #2c2f33  Sidebar Dark
│      │ Sidebar background (Discord-inspired)
└──────┘

┌──────┐ #f5f6f7  Main Light
│      │ Main content area background
└──────┘

┌──────┐ #ffffff  Card White
│      │ Card backgrounds
└──────┘

┌──────┐ #f9fafb  Input Light
│      │ Input backgrounds, light sections
└──────┘
```

### Text Colors
```
┌──────┐ #1e293b  Text Dark
│      │ Primary text color
└──────┘

┌──────┐ #99aab5  Text Gray
│      │ Secondary text, descriptions
└──────┘

┌──────┐ #9ca3af  Text Light
│      │ Hints, disabled text
└──────┘
```

### Border & Divider Colors
```
┌──────┐ #e5e7eb  Border Normal
│      │ Normal borders, dividers
└──────┘

┌──────┐ #d1d5db  Border Dark
│      │ Darker borders, form inputs
└──────┘

┌──────┐ #23272a  Sidebar Border
│      │ Sidebar section dividers
└──────┘
```

### Status Colors
```
┌──────┐ #43b581  Success Green
│      │ Online status, success messages
└──────┘

┌──────┐ #dc2626  Error Red
│      │ Delete buttons, errors
└──────┘

┌──────┐ #fbbf24  Warning Yellow
│      │ Warnings, alerts
└──────┘

┌──────┐ #3b82f6  Info Blue
│      │ Information, hints
└──────┘
```

---

## 📏 SPACING SYSTEM

```
Extra Small:  4px   - Gaps between inline elements
Small:        8px   - Small gaps, minimal spacing
Medium:       12px  - Normal gap, button padding
Large:        16px  - Section spacing
X-Large:      24px  - Card padding, major gaps
2X-Large:     32px  - Large sections, major padding
```

---

## 🎯 TYPOGRAPHY SIZES

```
Page Title:      28.8px  (1.8rem)  Bold
Card Title:      20.8px  (1.3rem)  Semi-bold
Form Label:      15.2px  (0.95rem) Bold
Body Text:       15.2px  (0.95rem) Normal
Hint Text:       13.6px  (0.85rem) Normal
Small Text:      12.8px  (0.8rem)  Normal
```

---

## ✨ SHADOWS

```
Small Shadow:    0 1px 3px rgba(0,0,0,0.1)
Normal Shadow:   0 2px 8px rgba(0,0,0,0.08)
Medium Shadow:   0 4px 12px rgba(0,0,0,0.1)
Large Shadow:    0 10px 25px rgba(0,0,0,0.1)

Focus Shadow:    0 0 0 3px rgba(37,99,235,0.1)  (Blue)
```

---

## 🎬 TRANSITIONS

```
Default:     all 0.2s ease
Colors:      color 0.2s
Transforms:  transform 0.3s ease
Shadows:     box-shadow 0.3s
All:         all 0.3s ease
```

---

## 📱 BREAKPOINTS

```
Desktop:      1025px and up    - Full sidebar layout
Tablet:       769px - 1024px   - Responsive grid
Mobile:       481px - 768px    - Single column
Small Mobile: 480px and down   - Optimized
```

---

This comprehensive visual guide ensures consistency and makes it easy to understand every component in the redesigned settings page!
