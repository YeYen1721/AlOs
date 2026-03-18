import { nearbyPlaces } from '../../data/mockData'

export default function LunchBreak() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">🍽️ Lunch Break</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">1h 45min free</div>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 bg-white/60 dark:bg-gray-700/60 px-2.5 py-1 rounded-full">
            📍 Near SOMA
          </div>
        </div>
      </div>

      {/* Nearby places */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Nearby Places</h3>
        {nearbyPlaces.map((place, i) => (
          <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-lg">
              {i === 0 ? '🥪' : i === 1 ? '🍣' : '🍗'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{place.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{place.cuisine} · {place.distance}</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-amber-400 text-xs">★</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{place.rating}</span>
              <span className="text-gray-300 dark:text-gray-600 ml-1">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
