import { weather, closetItems } from '../../data/mockData'

const selectedOutfit = {
  outer: closetItems.find(i => i.name === "Navy coat")!,
  top: closetItems.find(i => i.name === "Black turtleneck")!,
  bottom: closetItems.find(i => i.name === "Black slacks")!,
  shoes: closetItems.find(i => i.name === "Brown loafers")!,
}

export default function OutfitRec() {
  return (
    <div className="space-y-4">
      {/* Weather summary */}
      <div className="bg-gradient-to-br from-sky-100 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/20 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-light text-gray-900 dark:text-white">{weather.temp}°F</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Partly Cloudy</div>
          </div>
          <div className="text-5xl">⛅</div>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span>H:{weather.high}° L:{weather.low}°</span>
          <span>💧 {weather.rainChance}% rain</span>
          <span>💨 {weather.wind} mph</span>
        </div>
      </div>

      {/* Hourly forecast */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {weather.hourly.map((h, i) => (
          <div key={i} className={`shrink-0 flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-xs ${
            h.rain > 40
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'
              : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}>
            <span className="font-medium">{h.hour}</span>
            <span className="text-base">{h.rain > 40 ? '🌧️' : h.rain > 20 ? '🌤️' : '☀️'}</span>
            <span className="font-bold text-gray-900 dark:text-white">{h.temp}°</span>
            <span className="text-[10px]">💧{h.rain}%</span>
          </div>
        ))}
      </div>

      {/* Outfit recommendation */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Today's Outfit</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(selectedOutfit).map(([type, item]) => (
            <div key={type} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
              <div
                className="w-10 h-10 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <div className="text-xs text-gray-400 dark:text-gray-500 capitalize">{type}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 px-3 py-2 rounded-xl text-xs">
          🌧️ Rain expected after 2pm — bring an umbrella
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-xl text-xs">
          👔 You have a meeting — smart casual recommended
        </div>
      </div>
    </div>
  )
}
