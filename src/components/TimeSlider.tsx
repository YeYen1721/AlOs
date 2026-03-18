interface TimeSliderProps {
  value: number
  onChange: (hour: number) => void
  isDark?: boolean
}

function formatTime(hour: number): string {
  const h = Math.floor(hour)
  const m = Math.round((hour - h) * 60)
  const period = h >= 12 ? 'PM' : 'AM'
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h
  return m > 0 ? `${display}:${m.toString().padStart(2, '0')} ${period}` : `${display} ${period}`
}

const markers = [
  { hour: 7, label: '7AM' },
  { hour: 12, label: '12PM' },
  { hour: 18, label: '6PM' },
  { hour: 21, label: '9PM' },
]

export default function TimeSlider({ value, onChange, isDark }: TimeSliderProps) {
  const progress = ((value - 7) / (21 - 7)) * 100
  const trackBg = isDark ? '#374151' : '#E5E7EB'

  return (
    <div className="px-5 py-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Time Simulation</span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">{formatTime(value)}</span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={7}
          max={21}
          step={0.5}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #4285F4 0%, #4285F4 ${progress}%, ${trackBg} ${progress}%, ${trackBg} 100%)`,
          }}
        />

        {/* Time markers */}
        <div className="flex justify-between mt-1">
          {markers.map((m) => (
            <span key={m.hour} className="text-[9px] text-gray-400 dark:text-gray-500">{m.label}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
