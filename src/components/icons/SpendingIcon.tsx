export default function SpendingIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <defs>
        <linearGradient id="spendBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#F57C00" />
        </linearGradient>
      </defs>
      <rect width="60" height="60" rx="13" fill="url(#spendBg)" />
      {/* Card shape */}
      <rect x="11" y="18" width="38" height="24" rx="4" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.5" />
      {/* Card stripe */}
      <rect x="11" y="24" width="38" height="5" fill="white" fillOpacity="0.4" />
      {/* Chip */}
      <rect x="16" y="31" width="8" height="6" rx="1.5" fill="#FFD54F" stroke="white" strokeWidth="0.5" />
      {/* Dollar sign */}
      <text x="40" y="40" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="-apple-system, system-ui, sans-serif">
        $
      </text>
    </svg>
  )
}
