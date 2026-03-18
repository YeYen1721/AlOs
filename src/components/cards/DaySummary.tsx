import { calendarEvents, activity, tomorrowEvents } from '../../data/mockData'

const timelineStops = [
  ...calendarEvents.map(e => ({ time: e.time, location: e.location, color: '#4285F4' })),
  { time: '21:00', location: 'Home', color: '#34A853' },
]

const todaySpending = [
  { item: 'Lunch', amount: 32 },
  { item: 'Coffee', amount: 7.50 },
  { item: 'Snack', amount: 8 },
]
const todayTotal = todaySpending.reduce((sum, s) => sum + s.amount, 0)

export default function DaySummary() {
  const stepsProgress = Math.min(activity.steps / 10000, 1)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/10 rounded-2xl p-4">
        <div className="text-lg font-bold text-gray-900 dark:text-white">🌙 Day Summary</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Monday, March 17</div>
      </div>

      {/* Timeline */}
      <div className="space-y-0">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Timeline</h3>
        {timelineStops.map((stop, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* Vertical line + dot */}
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full border-2 shrink-0" style={{ borderColor: stop.color, backgroundColor: i === timelineStops.length - 1 ? stop.color : 'transparent' }} />
              {i < timelineStops.length - 1 && (
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
              )}
            </div>
            <div className="flex items-baseline gap-2 pb-2 -mt-0.5">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-10 shrink-0">
                {stop.time.replace(':00', '').replace(':30', ':30')}
              </span>
              <span className="text-sm text-gray-900 dark:text-white">{stop.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Spending */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">💳 Today's Spending</h3>
          <span className="text-sm font-bold text-gray-900 dark:text-white">${todayTotal.toFixed(2)}</span>
        </div>
        <div className="space-y-1">
          {todaySpending.map((s, i) => (
            <div key={i} className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{s.item}</span>
              <span>${s.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">🚶 Activity</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {activity.steps.toLocaleString()} steps · {activity.miles} miles
            </div>
          </div>
          {/* Progress ring */}
          <svg width={44} height={44} className="-rotate-90">
            <circle cx={22} cy={22} r={18} fill="none" stroke="currentColor"
              className="text-gray-100 dark:text-gray-700" strokeWidth={4} />
            <circle cx={22} cy={22} r={18} fill="none" stroke="#34A853"
              strokeWidth={4} strokeLinecap="round"
              strokeDasharray={`${stepsProgress * 113} 113`} />
          </svg>
        </div>
      </div>

      {/* Tomorrow */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3.5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">☀️ Tomorrow Preview</h3>
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          {tomorrowEvents.length} meetings, first at {tomorrowEvents[0].time.replace(':00', '')} AM — relaxed morning
        </div>
        {tomorrowEvents.map((e, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span className="font-medium">{e.time}</span>
            <span>{e.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
