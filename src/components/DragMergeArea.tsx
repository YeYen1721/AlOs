import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AppIcon from './AppIcon'
import MergeAnimation from './ui/MergeAnimation'
import Card from './ui/Card'
import TimeSlider from './TimeSlider'
import { useDragMerge } from '../hooks/useDragMerge'
import { appIcons, iconPositions } from '../data/mockData'
import RouteOptimizer from './cards/RouteOptimizer'
import OutfitRec from './cards/OutfitRec'
import ContextPlaylist from './cards/ContextPlaylist'
import SpendingHeatmap from './cards/SpendingHeatmap'
import LunchBreak from './cards/LunchBreak'
import DaySummary from './cards/DaySummary'

const cardComponents: Record<string, { component: React.FC; title: string }> = {
  route: { component: RouteOptimizer, title: 'Route Optimizer' },
  outfit: { component: OutfitRec, title: 'Outfit Recommendation' },
  playlist: { component: ContextPlaylist, title: 'Contextual Playlist' },
  spending: { component: SpendingHeatmap, title: 'Spending Heatmap' },
}

function getAutoTriggerCard(hour: number): { component: React.FC; title: string } | null {
  if (hour >= 7 && hour < 8) return { component: OutfitRec, title: 'Morning Outfit' }
  if (hour >= 8 && hour < 12) return { component: RouteOptimizer, title: 'Today\'s Route' }
  if (hour >= 12 && hour < 18) return { component: LunchBreak, title: 'Lunch Break' }
  if (hour >= 18 && hour <= 21) return { component: DaySummary, title: 'Day Summary' }
  return null
}

export default function DragMergeArea({ isDark }: { isDark: boolean }) {
  const [sliderHour, setSliderHour] = useState(7)
  const [sliderActive, setSliderActive] = useState(false)

  const {
    nearbyIcon,
    mergeResult,
    mergePosition,
    showAnimation,
    showCard,
    invalidShake,
    handleDrag,
    handleDragEnd,
    onAnimationComplete,
    resetMerge,
  } = useDragMerge()

  const cardConfig = mergeResult ? cardComponents[mergeResult] : null
  const CardContent = cardConfig?.component

  const autoCard = sliderActive ? getAutoTriggerCard(sliderHour) : null
  const AutoCardContent = autoCard?.component

  const handleSliderChange = (hour: number) => {
    setSliderHour(hour)
    if (!sliderActive) setSliderActive(true)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-2 pb-1">
        <h1 className="text-[15px] font-bold text-gray-900 dark:text-white">Generative OS</h1>
        <p className="text-[11px] text-gray-500 dark:text-gray-400">Drag two apps together to merge</p>
      </div>

      {/* Time slider */}
      <TimeSlider value={sliderHour} onChange={handleSliderChange} isDark={isDark} />

      {/* Icon area */}
      <div className="relative" style={{ height: 300 }}>
        {appIcons.map((app) => (
          <AppIcon
            key={app.id}
            id={app.id}
            label={app.label}
            color={app.color}
            icon={app.icon}
            position={iconPositions[app.id]}
            isGlowing={nearbyIcon === app.id}
            dimmed={showCard || showAnimation || sliderActive}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
        ))}

        {/* Merge animation */}
        {mergePosition && (
          <MergeAnimation
            position={mergePosition}
            active={showAnimation}
            onComplete={onAnimationComplete}
          />
        )}
      </div>

      {/* Invalid shake visual feedback */}
      {invalidShake && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500 animate-pulse">
          Invalid combination
        </div>
      )}

      {/* Auto-trigger card (inline, not overlay) */}
      <AnimatePresence mode="wait">
        {sliderActive && autoCard && AutoCardContent && (
          <motion.div
            key={autoCard.title}
            className="absolute inset-x-0 top-[100px] bottom-0 z-20 bg-white/95 dark:bg-[#2C2C2E]/95 backdrop-blur-sm rounded-t-2xl overflow-y-auto px-5 pt-4 pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{autoCard.title}</h2>
              <button
                onClick={() => setSliderActive(false)}
                className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
              >
                Dismiss
              </button>
            </div>
            <AutoCardContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card overlay (from drag-merge) */}
      <AnimatePresence>
        {showCard && cardConfig && CardContent && (
          <Card onClose={resetMerge} title={cardConfig.title}>
            <CardContent />
          </Card>
        )}
      </AnimatePresence>
    </div>
  )
}
