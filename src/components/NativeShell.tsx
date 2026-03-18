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
        backgroundColor: dark ? '#1C1C1E' : '#F5F5F5',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* Status bar spacer + dark mode toggle */}
      <div className="flex items-center justify-between px-5 pt-2 pb-0">
        <div />
        <button
          onClick={() => setDark(!dark)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-white/20 dark:bg-white/10"
          aria-label="Toggle dark mode"
        >
          {dark ? '\u2600\uFE0F' : '\uD83C\uDF19'}
        </button>
      </div>

      <div className="h-[calc(100vh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-40px)] overflow-hidden relative">
        {children(dark)}
      </div>
    </div>
  )
}
