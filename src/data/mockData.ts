// Calendar events
export const calendarEvents = [
  { time: "09:00", title: "Design Review", location: "WeWork SOMA, SF", duration: 60, lat: 37.7849, lng: -122.4034 },
  { time: "11:30", title: "Lunch with Sarah", location: "Blue Bottle Hayes Valley", duration: 90, lat: 37.7764, lng: -122.4217 },
  { time: "14:00", title: "Investor Meeting", location: "Tipstown FiDi", duration: 60, lat: 37.7946, lng: -122.3999 },
  { time: "16:30", title: "Team Standup", location: "Online (Zoom)", duration: 30, lat: null, lng: null },
] as const

// Weather
export const weather = {
  temp: 52,
  unit: "F" as const,
  condition: "partly_cloudy" as const,
  rainChance: 40,
  wind: 12,
  high: 58,
  low: 48,
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

export type MusicContext = keyof typeof music

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
  minLat: 37.74,
  maxLat: 37.81,
  minLng: -122.43,
  maxLng: -122.39,
}

export function projectToSvg(
  lat: number,
  lng: number,
  width: number,
  height: number
): { x: number; y: number } {
  const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * width
  const y = (1 - (lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * height
  return { x, y }
}

// App icon config
export type AppId = "calendar" | "maps" | "weather" | "closet" | "spotify" | "spending"

export const appIcons: { id: AppId; label: string; color: string; icon: string }[] = [
  { id: "calendar", label: "Calendar", color: "#4285F4", icon: "\uD83D\uDCC5" },
  { id: "maps", label: "Maps", color: "#34A853", icon: "\uD83D\uDDFA\uFE0F" },
  { id: "weather", label: "Weather", color: "#87CEEB", icon: "\u26C5" },
  { id: "closet", label: "Closet", color: "#9B59B6", icon: "\uD83D\uDC54" },
  { id: "spotify", label: "Spotify", color: "#1DB954", icon: "\uD83C\uDFB5" },
  { id: "spending", label: "Spending", color: "#F39C12", icon: "\uD83D\uDCB3" },
]

// Valid merge combinations: sorted pair -> card type
export const validCombinations: Record<string, string> = {
  "calendar+maps": "route",
  "closet+weather": "outfit",
  "calendar+spotify": "playlist",
  "maps+spending": "spending",
}

export function getMergeKey(a: AppId, b: AppId): string {
  return [a, b].sort().join("+")
}

// Icon layout positions (absolute, within phone content area)
export const iconPositions: Record<AppId, { x: number; y: number }> = {
  calendar: { x: 30, y: 80 },
  maps: { x: 135, y: 80 },
  weather: { x: 240, y: 80 },
  closet: { x: 30, y: 195 },
  spotify: { x: 135, y: 195 },
  spending: { x: 240, y: 195 },
}

// Category colors for spending
export const categoryColors: Record<string, string> = {
  Coffee: "#8B4513",
  Dining: "#F39C12",
  Shopping: "#9B59B6",
  Grocery: "#34A853",
}
