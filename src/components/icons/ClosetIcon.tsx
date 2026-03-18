export default function ClosetIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <defs>
        <linearGradient id="closetBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#AB47BC" />
          <stop offset="100%" stopColor="#7B1FA2" />
        </linearGradient>
      </defs>
      <rect width="60" height="60" rx="13" fill="url(#closetBg)" />
      {/* Hanger */}
      <path d="M30 14 L30 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="13" r="2" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M18 30 L30 20 L42 30" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* T-shirt shape */}
      <path d="M20 30 L20 46 Q20 48, 22 48 L38 48 Q40 48, 40 46 L40 30" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Collar */}
      <path d="M26 30 L30 34 L34 30" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
