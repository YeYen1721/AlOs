export default function WeatherIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <defs>
        <linearGradient id="weatherBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#47B8F5" />
          <stop offset="100%" stopColor="#1E88E5" />
        </linearGradient>
      </defs>
      <rect width="60" height="60" rx="13" fill="url(#weatherBg)" />
      {/* Sun */}
      <circle cx="40" cy="18" r="8" fill="#FFD54F" />
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 40 + Math.cos(rad) * 10
        const y1 = 18 + Math.sin(rad) * 10
        const x2 = 40 + Math.cos(rad) * 13
        const y2 = 18 + Math.sin(rad) * 13
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD54F" strokeWidth="1.5" strokeLinecap="round" />
      })}
      {/* Cloud */}
      <ellipse cx="28" cy="32" rx="14" ry="9" fill="white" />
      <ellipse cx="22" cy="34" rx="10" ry="7" fill="white" />
      <ellipse cx="36" cy="34" rx="10" ry="7" fill="white" />
      {/* Temperature */}
      <text x="30" y="52" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="-apple-system, system-ui, sans-serif">
        52°
      </text>
    </svg>
  )
}
