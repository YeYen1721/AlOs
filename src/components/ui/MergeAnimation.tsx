import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface MergeAnimationProps {
  position: { x: number; y: number }
  active: boolean
  onComplete: () => void
}

const PARTICLE_COUNT = 12

export default function MergeAnimation({ position, active, onComplete }: MergeAnimationProps) {
  useEffect(() => {
    if (active) {
      const timer = setTimeout(onComplete, 600)
      return () => clearTimeout(timer)
    }
  }, [active, onComplete])

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {/* Central glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              left: position.x - 30,
              top: position.y - 30,
              width: 60,
              height: 60,
              background: 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,165,0,0.4) 50%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Particles */}
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const angle = (i / PARTICLE_COUNT) * Math.PI * 2
            const distance = 40 + Math.random() * 30
            const size = 4 + Math.random() * 6
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: position.x - size / 2,
                  top: position.y - size / 2,
                  width: size,
                  height: size,
                  background: i % 2 === 0 ? '#FFD700' : '#FF8C00',
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.02,
                  ease: 'easeOut',
                }}
              />
            )
          })}
        </div>
      )}
    </AnimatePresence>
  )
}
