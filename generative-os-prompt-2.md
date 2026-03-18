# Generative OS — Development Prompt

## Before You Start
Read `generative-os-full-concept-v2.md` first. It has the full concept, competitive analysis, tech stack, mock data, and all the details you need.

---

## What We're Building

A mobile prototype for a "Generative OS" concept — an app that combines data from existing apps and generates new, context-aware UI cards on the fly.

The core idea: every app on your phone already has useful data (calendar, maps, weather, spending, music, photos), but no one has built the **combined view**. Maps + Calendar = optimized daily route. Weather + Closet = outfit recommendation. We generate that combined UI.

Build it as a React web app (Vite + React). Mobile viewport (375px). All mock data, no real APIs yet.

---

## Build Order (Important — follow this sequence)

### Step 1: Main Screen — Drag to Merge
This is THE core interaction. Build this first and make it great.

- 6 app icons float on screen: Calendar, Maps, Weather, Closet, Spotify, Spending
- User **drags one icon onto another** and they merge — a generated UI card appears with a satisfying animation
- Think Little Alchemy vibes — merge animation, glow/particle effect, the card slides up from below
- Valid combinations produce a card. Invalid ones bounce apart with a subtle shake
- This interaction needs to be **fun enough to go viral on TikTok** — that's the bar

Valid combinations:
1. Maps + Calendar → Route Optimizer
2. Weather + Closet → Outfit Recommendation
3. Spotify + Calendar → Contextual Playlist
4. Spending + Maps → Spending Heatmap

### Step 2: Combination 1 — Maps + Calendar (Route Optimizer)
This is the MVP killer screen. Spend the most effort here.

- **Top**: Map area (SVG or simple map UI) with markers for each meeting location
- Dashed route line connecting markers in order
- Travel time + transport mode between stops
- **Summary pill** at top: "📍 3 stops · 🚶 ~36 min total"
- **Bottom**: Scrollable timeline of event cards (chronological)
  - Each card: time + title + location + travel time to next
  - Between meetings: gap cards like "☕ 15 min gap — Blue Bottle 0.2mi away"
- Tap a card to expand details
- The whole thing should make someone say "oh wow, I wish I had this every morning"

### Step 3: Combination 2 — Weather + Closet (Outfit Recommendation)
- **Top**: Weather summary card (temp, icon, high/low, rain chance)
- Hourly forecast bar (horizontal scroll)
- **Outfit card**: Outer + Top + Bottom + Shoes combination
  - Show each item with a color swatch + name
  - Tip: "Rain expected after 2pm — bring an umbrella"
- Calendar-aware: "You have a meeting — smart casual recommended"

### Step 4: Combination 3 — Spotify + Calendar (Contextual Playlist)
- Context tag: "🚶 Commuting" / "☕ At Cafe" / "💼 Before Meeting"
- Playlist matched to the current context (track list with artist names)
- Mini player UI (play/pause/skip)
- Next context preview: "Investor Meeting in 45 min — switching to Focus mode"
- The calendar timeline and music mood should feel connected

### Step 5: Combination 4 — Spending + Maps (Spending Heatmap)
- **Top**: Map with spending markers (size = amount)
- Category colors: Coffee (brown), Dining (orange), Shopping (purple), Grocery (green)
- **Bottom**: Category breakdown (progress bars or mini chart)
- Top spending locations list
- Total spent + comparison to last week

### Step 6: Auto-Trigger Simulation
Add a **time slider** at the top of the main screen:

- Drag from 7AM → 12PM → 6PM → 9PM
- Cards automatically change based on time of day:
  - 7 AM: Weather + Closet card appears
  - 8 AM: Maps + Calendar card appears
  - 12 PM: "Lunch break — 3 places nearby" card
  - 9 PM: Day Summary card (timeline + spending recap + tomorrow preview)
- This simulates the "zero-input, time-based trigger" concept from the product vision
- Smooth crossfade between cards as the slider moves

---

## Mock Data

All mock data is in `generative-os-full-concept-v2.md` Section 11. Use the US version — SF-based locations, USD, Fahrenheit.

Key data sets:
- **Calendar**: 4 events (Design Review at WeWork SOMA, Lunch at Blue Bottle Hayes, Investor Meeting at Tipstown FiDi, Team Standup on Zoom)
- **Weather**: 52°F, partly cloudy, 40% rain after 2pm
- **Closet**: 9 items (coats, sweaters, shirts, jeans, slacks, shoes)
- **Spending**: 8 transactions across SF (Blue Bottle, Tartine, Trader Joe's, Everlane, etc.)
- **Music**: 3 context playlists (commute/cafe/focus)

---

## Design Guide

### Visual Style
- Clean and minimal. Think Toss app (Korean fintech) meets Apple's design language
- Background: light gray or white
- Cards: large rounded corners (border-radius: 16-20px), soft shadows
- Generous whitespace, clear text hierarchy (bold titles, regular body, gray secondary text)
- English UI

### App Icon Colors
- Calendar: Blue (#4285F4)
- Maps: Green (#34A853)
- Weather: Sky blue (#87CEEB)
- Closet: Purple (#9B59B6)
- Spotify: Green (#1DB954)
- Spending: Orange (#F39C12)

### Phone Frame
- Render everything inside a 375px phone frame
- Top: Dynamic Island (fake, just for aesthetics)
- Bottom: Home indicator bar (fake)
- Phone frame with rounded corners + shadow → should look like a real device

### Animations
- **Drag to merge**: Icons glow as they approach → merge with a burst/particle effect → card slides up from below
- **Card transitions**: Smooth slide/fade
- **Time slider**: Cards crossfade as slider moves
- Target: 60fps, buttery smooth throughout

### Dark Mode
- Support it
- Background: dark gray (#1C1C1E)
- Cards: slightly lighter (#2C2C2E)
- Follow system preference or include a toggle

---

## Tech Requirements

- React + Vite
- State management: useState / useReducer (keep it simple)
- Drag: react-dnd or custom implementation with touch events (must work on mobile/touch)
- Maps: SVG-based (no real Google Maps yet — that comes later)
- Animations: Framer Motion or CSS transitions
- Not responsive — 375px fixed width (this is a mobile prototype)
- No backend needed — all mock data in-app

---

## What Matters Most

This is NOT a fully functional app. It's an **interactive prototype that makes people feel the concept**.

Two things matter above everything else:

1. **The drag-to-merge interaction must be delightful** — This is the viral moment. If someone screen-records this and posts it, people should want to try it. The animation, the sound design (if possible), the satisfaction of two icons merging into a useful card.

2. **Combination 1 (Maps + Calendar) must feel genuinely useful** — This is the value proof. When someone sees their day laid out as an optimized route with gap recommendations, they should think "why doesn't this exist already?"

Everything else is secondary. Nail these two first.
