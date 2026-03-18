import { calendarEvents, projectToSvg } from '../../data/mockData'

const MAP_WIDTH = 335
const MAP_HEIGHT = 200

const physicalEvents = calendarEvents.filter(e => e.lat !== null)

const travelSegments = [
  { duration: "12 min", mode: "walk" },
  { duration: "14 min", mode: "transit" },
  { duration: "10 min", mode: "walk" },
]

const gapSuggestions = [
  null,
  "15 min gap — Blue Bottle 0.2mi away",
  null,
  null,
]

export default function RouteOptimizer() {
  const markers = physicalEvents.map((event, i) => ({
    ...event,
    ...projectToSvg(event.lat!, event.lng!, MAP_WIDTH, MAP_HEIGHT),
    index: i,
  }))

  return (
    <div className="space-y-4">
      {/* Summary pill */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium">
          <span>📍 3 stops</span>
          <span className="text-blue-300 dark:text-blue-600">·</span>
          <span>🚶 ~36 min total</span>
        </div>
      </div>

      {/* SVG Map */}
      <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
        <svg width={MAP_WIDTH} height={MAP_HEIGHT} viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}>
          {/* Grid lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v${i}`} x1={i * (MAP_WIDTH / 7)} y1={0} x2={i * (MAP_WIDTH / 7)} y2={MAP_HEIGHT}
              stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth={0.5} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * (MAP_HEIGHT / 5)} x2={MAP_WIDTH} y2={i * (MAP_HEIGHT / 5)}
              stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth={0.5} />
          ))}

          {/* Route line */}
          {markers.map((marker, i) => {
            if (i === 0) return null
            const prev = markers[i - 1]
            return (
              <line key={`route${i}`}
                x1={prev.x} y1={prev.y} x2={marker.x} y2={marker.y}
                stroke="#4285F4" strokeWidth={2} strokeDasharray="6 4"
                strokeLinecap="round"
              />
            )
          })}

          {/* Travel time labels */}
          {markers.map((marker, i) => {
            if (i === 0 || !travelSegments[i - 1]) return null
            const prev = markers[i - 1]
            const mx = (prev.x + marker.x) / 2
            const my = (prev.y + marker.y) / 2
            return (
              <g key={`label${i}`}>
                <rect x={mx - 20} y={my - 8} width={40} height={16} rx={8}
                  fill="white" className="dark:fill-gray-700" />
                <text x={mx} y={my + 3} textAnchor="middle" fontSize={8}
                  className="fill-gray-600 dark:fill-gray-300" fontWeight={500}>
                  {travelSegments[i - 1].duration}
                </text>
              </g>
            )
          })}

          {/* Markers */}
          {markers.map((marker, i) => (
            <g key={`marker${i}`}>
              <circle cx={marker.x} cy={marker.y} r={12}
                fill="#4285F4" stroke="white" strokeWidth={2} />
              <text x={marker.x} y={marker.y + 4} textAnchor="middle"
                fill="white" fontSize={10} fontWeight={700}>
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Timeline */}
      <div className="space-y-2">
        {calendarEvents.map((event, i) => (
          <div key={i}>
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="text-right shrink-0 w-12">
                <div className="text-sm font-bold text-gray-900 dark:text-white">{event.time}</div>
                <div className="text-[10px] text-gray-400">{event.duration}min</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{event.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  {event.lat ? '📍' : '💻'} {event.location}
                </div>
              </div>
            </div>

            {/* Gap suggestion */}
            {gapSuggestions[i] && (
              <div className="ml-6 my-1 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                <div className="w-px h-4 bg-amber-300 dark:bg-amber-600" />
                ☕ {gapSuggestions[i]}
              </div>
            )}

            {/* Travel indicator */}
            {i < calendarEvents.length - 1 && travelSegments[i] && (
              <div className="ml-6 my-1 flex items-center gap-2 text-xs text-gray-400">
                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
                🚶 {travelSegments[i].duration} {travelSegments[i].mode}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
