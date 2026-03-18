export default function MapsIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect width="60" height="60" rx="13" fill="#6DC96D" />
      {/* Map terrain */}
      <path d="M0 30 Q15 20, 30 35 Q45 50, 60 30 V60 H0 Z" fill="#4CAF50" opacity="0.6" />
      <path d="M0 40 Q20 30, 40 45 Q50 50, 60 40 V60 H0 Z" fill="#388E3C" opacity="0.5" />
      {/* Roads */}
      <line x1="10" y1="15" x2="50" y2="45" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15" y1="45" x2="45" y2="15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="10" x2="30" y2="50" stroke="#FFD54F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Location pin */}
      <circle cx="30" cy="25" r="6" fill="#1565C0" stroke="white" strokeWidth="2" />
      <circle cx="30" cy="25" r="2.5" fill="white" />
    </svg>
  )
}
