import { useState } from 'react'
import { music, type MusicContext } from '../../data/mockData'

const contextConfig: Record<MusicContext, { label: string; icon: string; gradient: string }> = {
  commute: { label: 'Commuting', icon: '🚶', gradient: 'from-orange-100 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20' },
  cafe: { label: 'At Cafe', icon: '☕', gradient: 'from-teal-100 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/20' },
  focus: { label: 'Before Meeting', icon: '💼', gradient: 'from-violet-100 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/20' },
}

const contextOrder: MusicContext[] = ['commute', 'cafe', 'focus']

export default function ContextPlaylist() {
  const [activeContext, setActiveContext] = useState<MusicContext>('commute')
  const config = contextConfig[activeContext]
  const tracks = music[activeContext]

  const cycleContext = () => {
    const idx = contextOrder.indexOf(activeContext)
    setActiveContext(contextOrder[(idx + 1) % contextOrder.length])
  }

  return (
    <div className="space-y-4">
      {/* Context tag */}
      <button
        onClick={cycleContext}
        className={`w-full bg-gradient-to-br ${config.gradient} rounded-2xl p-4 text-left`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{config.icon}</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">{config.label}</span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">Tap to switch ›</span>
        </div>
      </button>

      {/* Track list */}
      <div className="space-y-1">
        {tracks.map((track, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${
            i === 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              i === 0 ? 'bg-[#1DB954] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}>
              {i === 0 ? '▶' : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium truncate ${
                i === 0 ? 'text-[#1DB954]' : 'text-gray-900 dark:text-white'
              }`}>{track.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{track.artist}</div>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              track.mood === 'energetic' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
              track.mood === 'chill' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' :
              'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
            }`}>{track.mood}</span>
          </div>
        ))}
      </div>

      {/* Mini player */}
      <div className="bg-gray-900 dark:bg-black rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1DB954] to-[#191414]" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{tracks[0].title}</div>
            <div className="text-xs text-gray-400">{tracks[0].artist}</div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-700 rounded-full mb-3">
          <div className="h-1 bg-[#1DB954] rounded-full w-2/5" />
        </div>
        <div className="flex items-center justify-center gap-8">
          <button className="text-white/60 text-lg">⏮</button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black text-lg">⏸</button>
          <button className="text-white/60 text-lg">⏭</button>
        </div>
      </div>

      {/* Next context preview */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>💼</span>
          <span>Investor Meeting in 45 min — switching to <strong className="text-gray-700 dark:text-gray-300">Focus mode</strong></span>
        </div>
      </div>
    </div>
  )
}
