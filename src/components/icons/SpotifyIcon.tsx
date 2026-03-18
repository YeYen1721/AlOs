export default function SpotifyIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect width="60" height="60" rx="13" fill="#1DB954" />
      {/* Spotify-inspired logo */}
      <circle cx="30" cy="30" r="18" fill="none" />
      {/* Sound waves */}
      <path d="M18 24 Q30 20, 42 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 31 Q30 27, 40 31" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 38 Q30 34, 38 38" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
