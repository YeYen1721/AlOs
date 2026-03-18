import { motion, type PanInfo } from 'framer-motion'
import type { AppId } from '../data/mockData'
import { AppIconSvg } from './icons'

interface AppIconProps {
  id: AppId
  label: string
  color: string
  position: { x: number; y: number }
  isGlowing: boolean
  dimmed: boolean
  onDrag: (id: AppId, point: { x: number; y: number }) => void
  onDragEnd: (id: AppId) => void
}

export default function AppIcon({
  id, label, color, position, isGlowing, dimmed, onDrag, onDragEnd,
}: AppIconProps) {
  return (
    <motion.div
      className="absolute flex flex-col items-center gap-[5px] cursor-grab active:cursor-grabbing select-none touch-none"
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
        className="w-[60px] h-[60px] rounded-[14px] overflow-hidden shadow-lg"
        animate={isGlowing ? {
          boxShadow: [
            `0 0 0px ${color}`,
            `0 0 24px ${color}`,
            `0 0 0px ${color}`,
          ],
        } : {
          boxShadow: `0 2px 8px rgba(0,0,0,0.15)`,
          opacity: dimmed ? 0.4 : 1,
        }}
        transition={isGlowing ? { repeat: Infinity, duration: 0.8 } : { duration: 0.3 }}
      >
        <AppIconSvg id={id} size={60} />
      </motion.div>
      <span className={`text-[11px] font-normal tracking-tight ${dimmed ? 'opacity-40' : ''} text-white`}
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
      >
        {label}
      </span>
    </motion.div>
  )
}
