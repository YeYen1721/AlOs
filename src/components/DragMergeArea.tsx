import { AnimatePresence } from 'framer-motion'
import AppIcon from './AppIcon'
import MergeAnimation from './ui/MergeAnimation'
import Card from './ui/Card'
import { useDragMerge } from '../hooks/useDragMerge'
import { appIcons, iconPositions, type AppId } from '../data/mockData'
import RouteOptimizer from './cards/RouteOptimizer'
import OutfitRec from './cards/OutfitRec'
import ContextPlaylist from './cards/ContextPlaylist'
import SpendingHeatmap from './cards/SpendingHeatmap'

const cardComponents: Record<string, { component: React.FC; title: string }> = {
  route: { component: RouteOptimizer, title: 'Route Optimizer' },
  outfit: { component: OutfitRec, title: 'Outfit Recommendation' },
  playlist: { component: ContextPlaylist, title: 'Contextual Playlist' },
  spending: { component: SpendingHeatmap, title: 'Spending Heatmap' },
}

export default function DragMergeArea() {
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

  return (
    <div className="relative w-full h-full">
      {/* Header */}
      <div className="px-5 pt-2 pb-1">
        <h1 className="text-[15px] font-bold text-gray-900 dark:text-white">Generative OS</h1>
        <p className="text-[11px] text-gray-500 dark:text-gray-400">Drag two apps together to merge</p>
      </div>

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
            dimmed={showCard || showAnimation}
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

      {/* Card overlay */}
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
