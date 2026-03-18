export default function CalendarIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect width="60" height="60" rx="13" fill="white" />
      <rect y="0" width="60" height="19" rx="13" fill="#FF3B30" />
      <rect y="10" width="60" height="9" fill="#FF3B30" />
      <text x="30" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="-apple-system, system-ui, sans-serif">
        MONDAY
      </text>
      <text x="30" y="46" textAnchor="middle" fill="#1C1C1E" fontSize="26" fontWeight="300" fontFamily="-apple-system, system-ui, sans-serif">
        17
      </text>
    </svg>
  )
}
