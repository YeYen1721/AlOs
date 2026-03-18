import { useState } from 'react'

interface NativeShellProps {
  children: (isDark: boolean) => React.ReactNode
}

export default function NativeShell({ children }: NativeShellProps) {
  const [dark, setDark] = useState(false)

  return (
    <div
      className={`w-full min-h-screen ${dark ? 'dark' : ''}`}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* Dark mode toggle */}
      <div className="fixed top-[env(safe-area-inset-top)] right-4 z-50 pt-2">
        <button
          onClick={() => setDark(!dark)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm backdrop-blur-md"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          aria-label="Toggle dark mode"
        >
          {dark ? '\u2600\uFE0F' : '\uD83C\uDF19'}
        </button>
      </div>

      <div className="h-screen overflow-hidden relative">
        {children(dark)}
      </div>
    </div>
  )
}
