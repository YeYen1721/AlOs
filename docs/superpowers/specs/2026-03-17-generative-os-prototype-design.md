# Generative OS Prototype — Design Spec

## Overview

A mobile prototype (React + Vite + TypeScript + Tailwind) demonstrating the "Generative OS" concept: an app that combines data from existing apps and generates context-aware UI cards. Built at 375px fixed width inside a phone frame. All mock data, no real APIs.

## Core Interaction: Drag to Merge

Six app icons (Calendar, Maps, Weather, Closet, Spotify, Spending) float on the main screen. Users drag one icon onto another to merge them. Valid combinations produce a card with a satisfying animation. Invalid ones bounce apart.

**Valid combinations:**
1. Maps + Calendar → Route Optimizer
2. Weather + Closet → Outfit Recommendation
3. Spotify + Calendar → Contextual Playlist
4. Spending + Maps → Spending Heatmap

**Merge mechanics:**
- Icons use Framer Motion `drag` prop (works on touch + mouse)
- Proximity detection: when two icons are within ~60px, they "snap" with a glow
- Valid merge: particle burst → card slides up from bottom
- Invalid merge: shake animation → icons bounce back to original positions
- Combination lookup is a simple map of valid pairs

## Architecture

```
src/
  components/
    PhoneFrame.tsx        — 375px device chrome (Dynamic Island, home bar)
    AppIcon.tsx           — Draggable app icon with label and color
    DragMergeArea.tsx     — Main screen: 6 icons + merge logic + time slider
    TimeSlider.tsx        — Time-of-day slider for auto-trigger simulation
    cards/
      RouteOptimizer.tsx  — Maps + Calendar (Combination 1)
      OutfitRec.tsx       — Weather + Closet (Combination 2)
      ContextPlaylist.tsx — Spotify + Calendar (Combination 3)
      SpendingHeatmap.tsx — Spending + Maps (Combination 4)
      DaySummary.tsx      — 9PM auto-trigger card
      LunchBreak.tsx      — 12PM auto-trigger card
    ui/
      Card.tsx            — Base card wrapper (rounded corners, shadow, dark mode)
      MergeAnimation.tsx  — Glow/particle burst effect on merge
  data/
    mockData.ts           — All mock data from concept doc Section 11
  hooks/
    useDragMerge.ts       — Drag detection, proximity check, merge validation
  App.tsx
```

## Phone Frame

- 375px width, ~812px height (iPhone proportions)
- Top: Dynamic Island (cosmetic — black pill shape)
- Bottom: Home indicator bar (cosmetic)
- Rounded corners + shadow to simulate a real device
- Dark mode toggle accessible from the frame

## Combination Cards

Each card is a full-screen overlay that slides up via Framer Motion. Dismiss by swiping down or tapping close.

### 1. Route Optimizer (Maps + Calendar)

- **Top**: SVG map area with markers for each meeting location (WeWork SOMA, Blue Bottle Hayes, Tipstown FiDi). Dashed route line connecting markers in chronological order. Travel time labels between stops.
- **Summary pill**: "3 stops · ~36 min total"
- **Bottom**: Scrollable timeline of event cards (chronological). Each card shows time, title, location, travel time to next stop. Gap cards between meetings suggest nearby cafes (e.g., "15 min gap — Blue Bottle 0.2mi away").

### 2. Outfit Recommendation (Weather + Closet)

- **Top**: Weather summary (52°F, partly cloudy icon, high 58/low 48, 40% rain)
- **Hourly bar**: Horizontal scroll showing temp + rain chance per hour
- **Outfit card**: Grid of 4 items (Outer + Top + Bottom + Shoes) with color swatch + name for each
- **Tip**: "Rain expected after 2pm — bring an umbrella"
- **Calendar note**: "You have a meeting — smart casual recommended"

### 3. Contextual Playlist (Spotify + Calendar)

- **Context tag**: "Commuting" / "At Cafe" / "Before Meeting" with icon
- **Track list**: Songs matched to current context with artist names
- **Mini player**: Play/pause/skip controls (cosmetic)
- **Next context preview**: "Investor Meeting in 45 min — switching to Focus mode"

### 4. Spending Heatmap (Spending + Maps)

- **Top**: SVG map with spending markers (circle size = amount). Category colors: Coffee (brown #8B4513), Dining (orange #F39C12), Shopping (purple #9B59B6), Grocery (green #34A853)
- **Bottom**: Category breakdown with progress bars or mini bar chart
- **Top spending locations**: Ranked list
- **Total**: "This week: $260.50"

## Auto-Trigger Simulation (Time Slider)

A slider at the top of the main screen, ranging from 7AM to 9PM. As the user drags it, cards crossfade in/out:

| Time | Card |
|------|------|
| 7 AM | Weather + Outfit recommendation |
| 8 AM | Maps + Calendar route optimizer |
| 12 PM | Lunch break — nearby places card |
| 9 PM | Day summary (timeline + spending + steps + tomorrow preview) |

Smooth crossfade transitions between cards as slider moves.

## Design System

### Colors
- Calendar: #4285F4 (blue)
- Maps: #34A853 (green)
- Weather: #87CEEB (sky blue)
- Closet: #9B59B6 (purple)
- Spotify: #1DB954 (green)
- Spending: #F39C12 (orange)

### Visual Style
- Background: light gray (#F5F5F5), dark mode: #1C1C1E
- Cards: white, dark mode: #2C2C2E
- Border radius: 16–20px on cards
- Soft shadows, generous whitespace
- Text: bold titles, regular body, gray secondary
- Font: system font stack

### Dark Mode
- Tailwind `darkMode: 'class'`
- Toggle button in phone frame
- Built into every component from the start

## Mock Data

All data from concept doc Section 11:
- **Calendar**: 4 events (Design Review, Lunch with Sarah, Investor Meeting, Team Standup)
- **Weather**: 52°F, partly cloudy, 40% rain after 2pm, hourly forecast
- **Closet**: 9 items (coats, tops, bottoms, shoes with warmth ratings)
- **Spending**: 8 transactions across SF with lat/lng coordinates
- **Music**: 3 context playlists (commute/cafe/focus, 3 tracks each)

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS 4
- Framer Motion (drag, animations, transitions)
- No routing library
- No state management library (useState/useReducer)
- No backend
- SVG for maps (no Google Maps API)

## Build Sequence

1. Project setup + PhoneFrame + AppIcon + drag-to-merge interaction
2. Route Optimizer card (Maps + Calendar)
3. Outfit Recommendation card (Weather + Closet)
4. Contextual Playlist card (Spotify + Calendar)
5. Spending Heatmap card (Spending + Maps)
6. Time slider + auto-trigger cards (LunchBreak, DaySummary)

## Success Criteria

1. Drag-to-merge feels delightful — smooth, satisfying, "TikTok-worthy"
2. Route Optimizer card makes someone say "why doesn't this exist?"
3. All 4 combinations work with valid merge detection
4. Time slider smoothly crossfades between auto-trigger cards
5. Dark mode works throughout
6. 60fps animations on modern browsers
