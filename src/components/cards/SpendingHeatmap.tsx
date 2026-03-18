import { spending, projectToSvg, categoryColors } from '../../data/mockData'

const MAP_WIDTH = 335
const MAP_HEIGHT = 200

const categoryTotals = spending.reduce((acc, t) => {
  acc[t.category] = (acc[t.category] || 0) + t.amount
  return acc
}, {} as Record<string, number>)

const totalSpent = spending.reduce((sum, t) => sum + t.amount, 0)

const topLocations = [...spending].sort((a, b) => b.amount - a.amount).slice(0, 3)

const maxAmount = Math.max(...spending.map(t => t.amount))

export default function SpendingHeatmap() {
  const markers = spending.map(t => ({
    ...t,
    ...projectToSvg(t.lat, t.lng, MAP_WIDTH, MAP_HEIGHT),
    radius: 8 + (t.amount / maxAmount) * 16,
  }))

  return (
    <div className="space-y-4">
      {/* Total */}
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">${totalSpent.toFixed(2)}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">spent this week</div>
      </div>

      {/* SVG Map */}
      <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <svg width={MAP_WIDTH} height={MAP_HEIGHT} viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}>
          {/* Grid */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v${i}`} x1={i * (MAP_WIDTH / 7)} y1={0} x2={i * (MAP_WIDTH / 7)} y2={MAP_HEIGHT}
              stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth={0.5} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * (MAP_HEIGHT / 5)} x2={MAP_WIDTH} y2={i * (MAP_HEIGHT / 5)}
              stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth={0.5} />
          ))}

          {/* Spending markers */}
          {markers.map((m, i) => (
            <circle key={i}
              cx={m.x} cy={m.y} r={m.radius}
              fill={categoryColors[m.category]}
              opacity={0.7}
              stroke="white"
              strokeWidth={1.5}
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            {cat}
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">By Category</h3>
        {Object.entries(categoryTotals).sort(([,a], [,b]) => b - a).map(([cat, amount]) => (
          <div key={cat} className="flex items-center gap-3">
            <div className="w-16 text-xs text-gray-600 dark:text-gray-400">{cat}</div>
            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(amount / totalSpent) * 100}%`,
                  backgroundColor: categoryColors[cat],
                }}
              />
            </div>
            <div className="w-14 text-right text-xs font-medium text-gray-900 dark:text-white">
              ${amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Top spending locations */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Top Locations</h3>
        {topLocations.map((loc, i) => (
          <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{loc.place}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColors[loc.category] }} />
              <div className="text-sm font-semibold text-gray-900 dark:text-white">${loc.amount.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
