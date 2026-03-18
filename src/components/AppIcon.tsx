import { motion, type PanInfo } from 'framer-motion'
import type { AppId } from '../data/mockData'

interface AppIconProps {
  id: AppId
  label: string
  color: string
  icon: string
  position: { x: number; y: number }
  isGlowing: boolean
  dimmed: boolean
  onDrag: (id: AppId, point: { x: number; y: number }) => void
  onDragEnd: (id: AppId) => void
}

export default function AppIcon({
  id, label, color, icon, position, isGlowing, dimmed, onDrag, onDragEnd,
}: AppIconProps) {
  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing select-none touch-none"
      style={{ left: position.x, top: position.y }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDrag={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        onDrag(id, {
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        })
      }}
      onDragEnd={() => onDragEnd(id)}
      animate={isGlowing ? { scale: [1, 1.1, 1] } : { scale: 1 }}
      transition={isGlowing ? { repeat: Infinity, duration: 0.8 } : { duration: 0.2 }}
      whileDrag={{ scale: 1.15, zIndex: 50 }}
    >
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
        style={{ backgroundColor: color }}
        animate={isGlowing ? {
          boxShadow: [
            `0 0 0px ${color}`,
            `0 0 20px ${color}`,
            `0 0 0px ${color}`,
          ],
        } : {
          boxShadow: `0 4px 12px rgba(0,0,0,0.15)`,
          opacity: dimmed ? 0.4 : 1,
        }}
        transition={isGlowing ? { repeat: Infinity, duration: 0.8 } : { duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <span className={`text-[10px] font-medium ${dimmed ? 'opacity-40' : ''} dark:text-white text-gray-700`}>
        {label}
      </span>
    </motion.div>
  )
}
