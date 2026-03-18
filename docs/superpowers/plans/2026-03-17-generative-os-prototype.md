# Generative OS Prototype Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive mobile prototype demonstrating the "Generative OS" drag-to-merge concept with 4 combination cards and a time-based auto-trigger slider.

**Architecture:** Single-page React app rendered inside a 375px phone frame. Six draggable app icons merge to produce overlay cards. A time slider simulates context-based auto-triggers. All data is mock, no backend.

**Tech Stack:** React 19 + Vite + TypeScript, Tailwind CSS v4, Framer Motion

**Spec:** `docs/superpowers/specs/2026-03-17-generative-os-prototype-design.md`

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Create: `tailwind.config.ts` (if needed for v4), `postcss.config.js`

- [ ] **Step 1: Scaffold Vite + React + TypeScript project**

```bash
cd /Users/minwook/YAY/AlOs
npm create vite@latest . -- --template react-ts
```

Accept overwriting existing files if prompted.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Tailwind CSS v4**

Update `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Replace `src/index.css` with:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

- [ ] **Step 4: Clean up App.tsx to a minimal shell**

```tsx
function App() {
  return <div className="min-h-screen bg-gray-100 dark:bg-[#1C1C1E] flex items-center justify-center">
    <h1 className="text-2xl font-bold dark:text-white">Generative OS</h1>
  </div>
}
export default App
```

- [ ] **Step 5: Verify dev server runs**

```bash
npm run dev
```

Open in browser, confirm Tailwind styles render and dark mode class works.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + TS + Tailwind + Framer Motion"
```

---

## Task 2: Mock Data

**Files:**
- Create: `src/data/mockData.ts`

- [ ] **Step 1: Create mock data file with all datasets**

All data from concept doc Section 11 plus additional auto-trigger data:

```ts
// Calendar events
export const calendarEvents = [
  { time: "09:00", title: "Design Review", location: "WeWork SOMA, SF", duration: 60, lat: 37.7849, lng: -122.4034 },
  { time: "11:30", title: "Lunch with Sarah", location: "Blue Bottle Hayes Valley", duration: 90, lat: 37.7764, lng: -122.4217 },
  { time: "14:00", title: "Investor Meeting", location: "Tipstown FiDi", duration: 60, lat: 37.7946, lng: -122.3999 },
  { time: "16:30", title: "Team Standup", location: "Online (Zoom)", duration: 30, lat: null, lng: null },
]

// Weather
export const weather = {
  temp: 52, unit: "F" as const, condition: "partly_cloudy", rainChance: 40, wind: 12,
  high: 58, low: 48,
  hourly: [
    { hour: "9 AM", temp: 50, rain: 10 },
    { hour: "12 PM", temp: 55, rain: 25 },
    { hour: "3 PM", temp: 56, rain: 50 },
    { hour: "6 PM", temp: 52, rain: 35 },
  ],
}

// Closet items
export const closetItems = [
  { name: "Navy coat", type: "outer" as const, warmth: 4, color: "#1B3A5C" },
  { name: "Beige trench", type: "outer" as const, warmth: 3, color: "#C8B89A" },
  { name: "Gray sweater", type: "top" as const, warmth: 3, color: "#808080" },
  { name: "White button-down", type: "top" as const, warmth: 1, color: "#FFFFFF" },
  { name: "Black turtleneck", type: "top" as const, warmth: 3, color: "#1C1C1E" },
  { name: "Blue jeans", type: "bottom" as const, warmth: 2, color: "#4A6FA5" },
  { name: "Black slacks", type: "bottom" as const, warmth: 2, color: "#2C2C2E" },
  { name: "White sneakers", type: "shoes" as const, warmth: 2, color: "#F5F5F5" },
  { name: "Brown loafers", type: "shoes" as const, warmth: 1, color: "#8B5E3C" },
]

// Spending transactions
export const spending = [
  { place: "Blue Bottle Coffee, Hayes Valley", amount: 6.50, category: "Coffee" as const, date: "3/15", lat: 37.7764, lng: -122.4217 },
  { place: "Tartine Bakery, Mission", amount: 28.00, category: "Dining" as const, date: "3/14", lat: 37.7614, lng: -122.4241 },
  { place: "Trader Joe's, SOMA", amount: 45.00, category: "Grocery" as const, date: "3/14", lat: 37.7849, lng: -122.4034 },
  { place: "Everlane, Valencia", amount: 78.00, category: "Shopping" as const, date: "3/13", lat: 37.7642, lng: -122.4215 },
  { place: "City Lights Books, North Beach", amount: 24.50, category: "Shopping" as const, date: "3/12", lat: 37.7976, lng: -122.4064 },
  { place: "Chipotle, Market St", amount: 12.50, category: "Dining" as const, date: "3/12", lat: 37.7851, lng: -122.4082 },
  { place: "Philz Coffee, Mission", amount: 7.00, category: "Coffee" as const, date: "3/11", lat: 37.7564, lng: -122.4212 },
  { place: "Uniqlo Online", amount: 59.00, category: "Shopping" as const, date: "3/10", lat: 37.7868, lng: -122.4065 },
]

// Music by context
export const music = {
  commute: [
    { title: "Espresso", artist: "Sabrina Carpenter", mood: "energetic" },
    { title: "Blinding Lights", artist: "The Weeknd", mood: "energetic" },
    { title: "Levitating", artist: "Dua Lipa", mood: "energetic" },
  ],
  cafe: [
    { title: "Sunday Morning", artist: "Maroon 5", mood: "chill" },
    { title: "Electric Feel", artist: "MGMT", mood: "chill" },
    { title: "Put Your Records On", artist: "Corinne Bailey Rae", mood: "chill" },
  ],
  focus: [
    { title: "Clair de Lune", artist: "Debussy", mood: "calm" },
    { title: "Weightless", artist: "Marconi Union", mood: "calm" },
    { title: "Experience", artist: "Ludovico Einaudi", mood: "calm" },
  ],
}

// Nearby places (for LunchBreak card)
export const nearbyPlaces = [
  { name: "Deli Board", cuisine: "Sandwiches", distance: "0.2mi", rating: 4.6 },
  { name: "Sushi Zone", cuisine: "Japanese", distance: "0.3mi", rating: 4.4 },
  { name: "The Bird", cuisine: "Fried Chicken", distance: "0.4mi", rating: 4.3 },
]

// Activity (for DaySummary card)
export const activity = { steps: 8234, miles: 4.2 }

// Tomorrow's events (for DaySummary card)
export const tomorrowEvents = [
  { time: "10:00", title: "Team Sync", location: "WeWork SOMA" },
  { time: "14:00", title: "1:1 with Sarah", location: "Online (Zoom)" },
]

// SVG map projection config
export const mapBounds = {
  minLat: 37.74, maxLat: 37.81,
  minLng: -122.43, maxLng: -122.39,
}

// App icon config
export type AppId = "calendar" | "maps" | "weather" | "closet" | "spotify" | "spending"

export const appIcons: { id: AppId; label: string; color: string; icon: string }[] = [
  { id: "calendar", label: "Calendar", color: "#4285F4", icon: "📅" },
  { id: "maps", label: "Maps", color: "#34A853", icon: "🗺️" },
  { id: "weather", label: "Weather", color: "#87CEEB", icon: "⛅" },
  { id: "closet", label: "Closet", color: "#9B59B6", icon: "👔" },
  { id: "spotify", label: "Spotify", color: "#1DB954", icon: "🎵" },
  { id: "spending", label: "Spending", color: "#F39C12", icon: "💳" },
]

// Valid merge combinations: sorted pair → card type
export const validCombinations: Record<string, string> = {
  "calendar+maps": "route",
  "closet+weather": "outfit",
  "calendar+spotify": "playlist",
  "maps+spending": "spending",
}

export function getMergeKey(a: AppId, b: AppId): string {
  return [a, b].sort().join("+")
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/mockData.ts
git commit -m "feat: add all mock data sets"
```

---

## Task 3: PhoneFrame + Dark Mode Toggle

**Files:**
- Create: `src/components/PhoneFrame.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build PhoneFrame component**

375px wide, ~812px tall container with:
- Rounded corners (border-radius: 40px), shadow
- Dynamic Island: black pill shape at top center (120px wide, 34px tall, border-radius: 17px)
- Home indicator bar: black bar at bottom center (134px wide, 5px tall, border-radius: 3px)
- Dark mode toggle: small sun/moon button in the status bar area
- Toggle adds/removes `.dark` class on the phone frame's outer wrapper
- Children rendered in the main content area between Dynamic Island and home bar

- [ ] **Step 2: Wire into App.tsx**

App renders a centered PhoneFrame with a placeholder background.

- [ ] **Step 3: Verify in browser**

Confirm phone frame renders with Dynamic Island, home bar, and dark mode toggle works.

- [ ] **Step 4: Commit**

```bash
git add src/components/PhoneFrame.tsx src/App.tsx
git commit -m "feat: add PhoneFrame with Dynamic Island and dark mode toggle"
```

---

## Task 4: AppIcon + Drag Behavior

**Files:**
- Create: `src/components/AppIcon.tsx`

- [ ] **Step 1: Build AppIcon component**

Props: `id`, `label`, `color`, `icon` (emoji), `position: {x, y}`, `onDrag`, `onDragEnd`.

- Circular icon (56px) with the app color as background, emoji centered
- Label below the icon
- Uses Framer Motion `motion.div` with `drag` prop
- `dragMomentum={false}` for precise control
- Reports position on drag via `onDrag` callback
- On drag end, animates back to origin position unless merged

- [ ] **Step 2: Verify icons render and are draggable**

Place 2-3 test icons in PhoneFrame, confirm drag works on mouse and touch.

- [ ] **Step 3: Commit**

```bash
git add src/components/AppIcon.tsx
git commit -m "feat: add draggable AppIcon component"
```

---

## Task 5: DragMergeArea + useDragMerge Hook

**Files:**
- Create: `src/hooks/useDragMerge.ts`
- Create: `src/components/DragMergeArea.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build useDragMerge hook**

Manages:
- `iconPositions`: Record of current drag positions for each icon (relative to origin)
- `activeIcon`: which icon is currently being dragged
- `nearbyIcon`: which icon the dragged icon is close to (within 60px)
- `mergeResult`: the card type produced by a valid merge (or null)

Functions:
- `handleDrag(id, point)`: update position, check proximity against all other icons using their layout positions + drag offset. Throttled via rAF.
- `handleDragEnd(id)`: if nearbyIcon exists, check `validCombinations`. If valid → set `mergeResult`. If invalid → trigger shake. Always reset positions.
- `resetMerge()`: clear `mergeResult` (when card is dismissed)

Icon layout positions (absolute, within the phone frame content area ~335x700px):
```
Row 1: Calendar (55, 80)   Maps (140, 80)     Weather (225, 80)
Row 2: Closet (55, 190)    Spotify (140, 190)  Spending (225, 190)
```

- [ ] **Step 2: Build DragMergeArea component**

- Renders all 6 AppIcons at their layout positions
- Passes `onDrag` and `onDragEnd` from the hook to each icon
- When `nearbyIcon` is set, applies glow effect to both icons (CSS box-shadow pulse)
- When `mergeResult` is set, renders MergeAnimation then the appropriate card overlay
- Includes a header area with "Generative OS" title

- [ ] **Step 3: Wire into App.tsx**

PhoneFrame renders DragMergeArea as its child.

- [ ] **Step 4: Test merge detection**

Drag Calendar onto Maps → should detect proximity and log merge. Drag Calendar onto Weather → should reject (invalid pair: calendar+weather is not in validCombinations).

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useDragMerge.ts src/components/DragMergeArea.tsx src/App.tsx
git commit -m "feat: add drag-to-merge interaction with proximity detection"
```

---

## Task 6: Merge Animation + Card Overlay

**Files:**
- Create: `src/components/ui/MergeAnimation.tsx`
- Create: `src/components/ui/Card.tsx`
- Modify: `src/components/DragMergeArea.tsx`

- [ ] **Step 1: Build MergeAnimation component**

Props: `position: {x, y}`, `active: boolean`, `onComplete: () => void`

When `active` becomes true:
1. Render a burst of ~12 small circles (particles) at `position` that fly outward and fade
2. Render a central glow circle that expands and fades
3. Use Framer Motion `animate` for all particles
4. After ~600ms, call `onComplete`

Colors: use a gradient of the two merging app colors (can receive as prop or use white/gold).

- [ ] **Step 2: Build Card base component**

Props: `children`, `onClose`, `title?`

- Full-height overlay within the phone frame
- Slides up from bottom via `motion.div` with `initial={{ y: "100%" }}` `animate={{ y: 0 }}`
- Close button (X) at top right
- Swipe down to dismiss: `drag="y"` with `dragConstraints={{ top: 0 }}`, if dragged >100px down, close
- White background, dark mode: #2C2C2E
- Rounded top corners (20px)
- Scrollable content area

- [ ] **Step 3: Wire animation → card flow in DragMergeArea**

When merge detected:
1. Set `showAnimation = true` at merge position
2. MergeAnimation plays → `onComplete` sets `showAnimation = false` and `showCard = true`
3. Card overlay slides up with the correct card component based on `mergeResult`
4. Card's `onClose` calls `resetMerge()`

For now, render a placeholder card with the merge type name. Real card content comes in Tasks 7-10.

- [ ] **Step 4: Test full merge flow**

Drag Maps onto Calendar → glow → particle burst → placeholder card slides up → close card → icons reset.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/MergeAnimation.tsx src/components/ui/Card.tsx src/components/DragMergeArea.tsx
git commit -m "feat: add merge animation and card overlay system"
```

---

## Task 7: Route Optimizer Card (Maps + Calendar)

**Files:**
- Create: `src/components/cards/RouteOptimizer.tsx`
- Modify: `src/components/DragMergeArea.tsx` (wire card)

- [ ] **Step 1: Build SVG map section**

- SVG viewBox sized to fill card width (~335px) and ~200px tall
- Light gray background with subtle grid lines for "map feel"
- Plot markers for each calendar event with a physical location (exclude "Online (Zoom)")
- Use `mapBounds` for linear projection: `x = (lng - minLng) / (maxLng - minLng) * width`, `y = (1 - (lat - minLat) / (maxLat - minLat)) * height`
- Markers: colored circles (16px) with event index number
- Dashed line connecting markers in order (`stroke-dasharray`)
- Travel time labels on each segment (hardcoded: "12 min", "14 min", "10 min")

- [ ] **Step 2: Build summary pill**

Rounded pill at top of card: "📍 3 stops · 🚶 ~36 min total"
Semi-transparent background, centered text.

- [ ] **Step 3: Build timeline cards**

Scrollable list below the map. For each calendar event:
- Card with time (bold), title, location, duration
- Between events: gap card showing travel time + suggestion
  - "🚶 12 min walk" travel indicator
  - "☕ 15 min gap — Blue Bottle 0.2mi away" (hardcoded suggestions)
- Team Standup (Zoom) shows with a video icon, no travel card after it

- [ ] **Step 4: Wire into DragMergeArea**

When `mergeResult === "route"`, render `RouteOptimizer` inside `Card`.

- [ ] **Step 5: Test full flow**

Drag Maps + Calendar → animation → Route Optimizer card with map + timeline. Verify scroll works, close works.

- [ ] **Step 6: Commit**

```bash
git add src/components/cards/RouteOptimizer.tsx src/components/DragMergeArea.tsx
git commit -m "feat: add Route Optimizer card (Maps + Calendar)"
```

---

## Task 8: Outfit Recommendation Card (Weather + Closet)

**Files:**
- Create: `src/components/cards/OutfitRec.tsx`
- Modify: `src/components/DragMergeArea.tsx` (wire card)

- [ ] **Step 1: Build weather summary section**

- Large temp display: "52°F" with weather icon (emoji or SVG: ⛅)
- High/Low: "H:58° L:48°"
- Rain chance badge: "💧 40% rain"
- Wind: "💨 12 mph"

- [ ] **Step 2: Build hourly forecast bar**

Horizontal scrollable row of 4 hourly items:
- Hour label, temp, rain % with a small bar/dot indicator
- Highlight hours with >40% rain in a different color

- [ ] **Step 3: Build outfit recommendation**

Select one item per type based on weather (warmth >= 3 for 52°F):
- Outer: Navy coat (warmth 4)
- Top: Black turtleneck (warmth 3)
- Bottom: Black slacks (warmth 2, meeting day)
- Shoes: Brown loafers (warmth 1, meeting day)

Display as a 2x2 grid. Each cell: color swatch circle + item name.

- [ ] **Step 4: Add tips and calendar note**

- Tip: "🌧️ Rain expected after 2pm — bring an umbrella"
- Calendar note: "👔 You have a meeting — smart casual recommended"
- Styled as subtle info bars at the bottom of the card

- [ ] **Step 5: Wire into DragMergeArea**

When `mergeResult === "outfit"`, render `OutfitRec` inside `Card`.

- [ ] **Step 6: Commit**

```bash
git add src/components/cards/OutfitRec.tsx src/components/DragMergeArea.tsx
git commit -m "feat: add Outfit Recommendation card (Weather + Closet)"
```

---

## Task 9: Contextual Playlist Card (Spotify + Calendar)

**Files:**
- Create: `src/components/cards/ContextPlaylist.tsx`
- Modify: `src/components/DragMergeArea.tsx` (wire card)

- [ ] **Step 1: Build context tag header**

- Pill-shaped tag: "🚶 Commuting" (default context in drag-merge mode)
- Tappable context switcher: cycles through commute → cafe → focus
- Background tint matches context mood (energetic=warm, chill=cool, calm=muted)

- [ ] **Step 2: Build track list**

- List of 3 tracks for the active context
- Each row: track number, title (bold), artist (gray), mood tag pill
- Spotify green accent on the active/playing track (first one)

- [ ] **Step 3: Build mini player**

- Album art placeholder (gradient square)
- Track title + artist
- Play/pause button (⏸), skip forward (⏭), skip back (⏮)
- Progress bar (static, ~40% filled)
- All controls are cosmetic (no actual playback)

- [ ] **Step 4: Build next context preview**

- Subtle card at bottom: "💼 Investor Meeting in 45 min — switching to Focus mode"
- Dimmed styling to indicate future state

- [ ] **Step 5: Wire into DragMergeArea**

When `mergeResult === "playlist"`, render `ContextPlaylist` inside `Card`.

- [ ] **Step 6: Commit**

```bash
git add src/components/cards/ContextPlaylist.tsx src/components/DragMergeArea.tsx
git commit -m "feat: add Contextual Playlist card (Spotify + Calendar)"
```

---

## Task 10: Spending Heatmap Card (Spending + Maps)

**Files:**
- Create: `src/components/cards/SpendingHeatmap.tsx`
- Modify: `src/components/DragMergeArea.tsx` (wire card)

- [ ] **Step 1: Build SVG spending map**

- Same SVG map approach as RouteOptimizer (reuse projection logic — extract to a shared util if not already)
- Plot spending markers as circles
- Circle radius proportional to amount (scale: $6.50 → 8px, $78 → 24px)
- Colors by category: Coffee=#8B4513, Dining=#F39C12, Shopping=#9B59B6, Grocery=#34A853
- Slight opacity (0.7) for overlap visibility
- Category legend below the map (colored dots + labels)

- [ ] **Step 2: Build category breakdown**

- 4 horizontal progress bars, one per category
- Label + amount + bar filled proportionally to total
- Coffee: $13.50, Dining: $40.50, Shopping: $161.50, Grocery: $45.00
- Total: "$260.50 this week"

- [ ] **Step 3: Build top spending locations list**

- Top 3 by amount: Everlane ($78), Uniqlo ($59), Trader Joe's ($45)
- Each row: rank number, place name, amount, category color dot

- [ ] **Step 4: Wire into DragMergeArea**

When `mergeResult === "spending"`, render `SpendingHeatmap` inside `Card`.

- [ ] **Step 5: Commit**

```bash
git add src/components/cards/SpendingHeatmap.tsx src/components/DragMergeArea.tsx
git commit -m "feat: add Spending Heatmap card (Spending + Maps)"
```

---

## Task 11: Time Slider + Auto-Trigger Cards

**Files:**
- Create: `src/components/TimeSlider.tsx`
- Create: `src/components/cards/LunchBreak.tsx`
- Create: `src/components/cards/DaySummary.tsx`
- Modify: `src/components/DragMergeArea.tsx`

- [ ] **Step 1: Build TimeSlider component**

- Horizontal slider from 7 (7AM) to 21 (9PM)
- Time labels at key points: 7AM, 12PM, 6PM, 9PM
- Current time displayed as "8:30 AM" above the slider
- Styled as a thin track with a circular thumb
- Emits the current hour value on change

- [ ] **Step 2: Build LunchBreak card**

- Header: "🍽️ Lunch Break" with "1h 45min free" subtitle
- "Near SOMA" location tag
- 3 nearby place cards from `nearbyPlaces` mock data:
  - Name, cuisine, distance, rating (star display)
  - Each card is tappable-looking (subtle arrow)

- [ ] **Step 3: Build DaySummary card**

- **Timeline section**: Vertical timeline with 4 stops from calendar events + "Home (9pm)"
  - Each node: time + location + colored dot
- **Spending section**: "Today: $47.50" with breakdown (lunch $32 + coffee $7.50 + snack $8 — hardcoded as "today's" subset)
- **Steps section**: "🚶 8,234 steps · 4.2 miles" with a simple progress ring or bar
- **Tomorrow preview**: "2 meetings, first at 10am — relaxed morning ☀️" with tomorrow's events listed

- [ ] **Step 4: Wire auto-trigger logic into DragMergeArea**

When time slider is active (user has interacted with it):
- Map time ranges to cards:
  - 7–7:59 → `OutfitRec`
  - 8–11:59 → `RouteOptimizer`
  - 12–17:59 → `LunchBreak`
  - 18–21 → `DaySummary`
- Render the active card with `AnimatePresence` + crossfade (`opacity` transition)
- When slider is active, auto-trigger cards appear in the main area (not as overlays) — icons are still visible but dimmed
- Time slider appears at the top of DragMergeArea, above the icons

- [ ] **Step 5: Test slider flow**

Drag slider from 7AM → 9PM and verify all 4 cards crossfade smoothly at their breakpoints.

- [ ] **Step 6: Commit**

```bash
git add src/components/TimeSlider.tsx src/components/cards/LunchBreak.tsx src/components/cards/DaySummary.tsx src/components/DragMergeArea.tsx
git commit -m "feat: add time slider with auto-trigger cards"
```

---

## Task 12: Polish Pass

**Files:**
- Modify: various components

- [ ] **Step 1: Animation polish**

- Ensure icon glow pulse uses a smooth keyframe animation (not abrupt)
- Particle burst: vary particle sizes and speeds for organic feel
- Card slide-up: use spring physics (`type: "spring", damping: 25, stiffness: 300`)
- Card dismiss: faster exit animation than entry

- [ ] **Step 2: Dark mode audit**

- Walk through every component and verify dark: variants
- Check contrast: text on dark cards, icons on dark backgrounds
- SVG maps: adjust grid/background colors for dark mode

- [ ] **Step 3: Touch/mobile audit**

- Test all drag interactions with touch simulation in DevTools
- Ensure no text selection during drag
- Ensure no scroll interference during drag
- Test card swipe-to-dismiss on touch

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "polish: animation tuning, dark mode audit, touch fixes"
```
