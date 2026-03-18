interface PhoneFrameProps {
  children: (isDark: boolean) => React.ReactNode
}

import { useState } from 'react'

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [dark, setDark] = useState(false)

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 transition-colors duration-300 ${dark ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div
        className={`relative w-[375px] h-[812px] rounded-[40px] shadow-2xl overflow-hidden border-[3px] border-gray-800 ${dark ? 'dark' : ''}`}
        style={{ backgroundColor: dark ? '#1C1C1E' : '#F5F5F5' }}
      >
        {/* Status bar area */}
        <div className="relative h-[54px] flex items-start justify-center pt-[10px] z-20">
          {/* Dynamic Island */}
          <div className="w-[120px] h-[34px] bg-black rounded-[17px]" />
          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="absolute right-5 top-[14px] w-7 h-7 rounded-full flex items-center justify-center text-sm bg-white/20 dark:bg-white/10 backdrop-blur-sm"
            aria-label="Toggle dark mode"
          >
            {dark ? '\u2600\uFE0F' : '\uD83C\uDF19'}
          </button>
        </div>

        {/* Content area */}
        <div className="h-[calc(100%-54px-34px)] overflow-hidden relative">
          {children(dark)}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-gray-800 dark:bg-gray-400 rounded-full z-20" />
      </div>
    </div>
  )
}
