import { motion } from 'framer-motion'
import { useState } from 'react'

interface CardProps {
  children: React.ReactNode
  onClose: () => void
  title?: string
}

export default function Card({ children, onClose, title }: CardProps) {
  const [dragY, setDragY] = useState(0)

  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <motion.div
        className="flex-1 bg-white dark:bg-[#2C2C2E] rounded-t-[20px] shadow-2xl overflow-hidden flex flex-col"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDrag={(_, info) => setDragY(info.offset.y)}
        onDragEnd={() => {
          if (dragY > 100) {
            onClose()
          }
          setDragY(0)
        }}
      >
        {/* Handle bar + close */}
        <div className="flex items-center justify-between px-5 pt-3 pb-2 shrink-0">
          <div className="w-8" />
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium"
          >
            ✕
          </button>
        </div>

        {title && (
          <h2 className="text-lg font-bold px-5 pb-2 text-gray-900 dark:text-white">{title}</h2>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
