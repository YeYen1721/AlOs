import { useState } from 'react'

interface PhoneFrameProps {
  children: (isDark: boolean) => React.ReactNode
}

function StatusBar() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[54px] z-30 pointer-events-none">
      {/* Time */}
      <div className="absolute left-7 top-[15px] text-[14px] font-semibold text-white"
        style={{ textShadow: '0 0.5px 1px rgba(0,0,0,0.2)' }}>
        9:41
      </div>

      {/* Dynamic Island */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[10px] w-[126px] h-[36px] bg-black rounded-[20px]" />

      {/* Right icons: signal, wifi, battery */}
      <div className="absolute right-6 top-[16px] flex items-center gap-[5px]">
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
          <rect x="0" y="9" width="3" height="3" rx="0.5" opacity="1" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" opacity="1" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" opacity="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="1" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
          <path d="M1 4 Q8 -1, 15 4" />
          <path d="M3.5 7 Q8 3, 12.5 7" />
          <path d="M6 10 Q8 7, 10 10" />
          <circle cx="8" cy="11.5" r="1" fill="white" stroke="none" />
        </svg>
        {/* Battery */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0.5" y="0.5" width="23" height="11" rx="2.5" stroke="white" strokeWidth="1" />
          <rect x="24" y="3.5" width="2" height="5" rx="1" fill="white" opacity="0.5" />
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill="white" />
        </svg>
      </div>
    </div>
  )
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [dark, setDark] = useState(false)

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 transition-colors duration-300 ${dark ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div
        className={`relative w-[375px] h-[812px] rounded-[50px] shadow-2xl overflow-hidden ${dark ? 'dark' : ''}`}
        style={{
          border: '6px solid #1a1a1a',
          boxShadow: dark
            ? '0 25px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 25px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        {/* Status bar */}
        <StatusBar />

        {/* Dark mode toggle - floating */}
        <button
          onClick={() => setDark(!dark)}
          className="absolute right-4 top-[56px] z-30 w-8 h-8 rounded-full flex items-center justify-center text-sm backdrop-blur-md"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          aria-label="Toggle dark mode"
        >
          {dark ? '\u2600\uFE0F' : '\uD83C\uDF19'}
        </button>

        {/* Content area - starts below status bar */}
        <div className="absolute inset-0 top-[54px] bottom-[34px] overflow-hidden">
          {children(dark)}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full z-30" />
      </div>
    </div>
  )
}
