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

export default function TimeSlider({ value, onChange }: TimeSliderProps) {
  const progress = ((value - 7) / (21 - 7)) * 100

  return (
    <div className="mx-4 mb-2 px-3 py-2.5 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)' }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] text-white/50 uppercase tracking-wider font-medium">Time Simulation</span>
        <span className="text-sm font-bold text-white">{formatTime(value)}</span>
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
            background: `linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`,
          }}
        />

        <div className="flex justify-between mt-1">
          {markers.map((m) => (
            <span key={m.hour} className="text-[9px] text-white/40">{m.label}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
