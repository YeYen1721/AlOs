import { useState, useCallback, useRef } from 'react'
import { type AppId, iconPositions, validCombinations, getMergeKey } from '../data/mockData'

interface DragState {
  activeIcon: AppId | null
  dragPositions: Partial<Record<AppId, { x: number; y: number }>>
  nearbyIcon: AppId | null
  mergeResult: string | null
  mergePosition: { x: number; y: number } | null
  showAnimation: boolean
  showCard: boolean
  invalidShake: AppId | null
}

const MERGE_DISTANCE = 60
const ICON_CENTER_OFFSET = 28 // half of 56px icon

export function useDragMerge() {
  const [state, setState] = useState<DragState>({
    activeIcon: null,
    dragPositions: {},
    nearbyIcon: null,
    mergeResult: null,
    mergePosition: null,
    showAnimation: false,
    showCard: false,
    invalidShake: null,
  })

  const rafRef = useRef<number>(0)

  const getIconCenter = useCallback((id: AppId, dragPos?: { x: number; y: number }) => {
    const pos = dragPos || iconPositions[id]
    return { x: pos.x + ICON_CENTER_OFFSET, y: pos.y + ICON_CENTER_OFFSET }
  }, [])

  const handleDrag = useCallback((id: AppId, point: { x: number; y: number }) => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setState(prev => {
        const newDragPositions = { ...prev.dragPositions, [id]: point }
        const dragCenter = getIconCenter(id, point)

        // Check proximity to all other icons
        let closest: AppId | null = null
        let closestDist = Infinity

        const allIcons = Object.keys(iconPositions) as AppId[]
        for (const otherId of allIcons) {
          if (otherId === id) continue
          const otherCenter = getIconCenter(otherId, prev.dragPositions[otherId])
          const dist = Math.hypot(dragCenter.x - otherCenter.x, dragCenter.y - otherCenter.y)
          if (dist < MERGE_DISTANCE && dist < closestDist) {
            closest = otherId
            closestDist = dist
          }
        }

        return {
          ...prev,
          activeIcon: id,
          dragPositions: newDragPositions,
          nearbyIcon: closest,
        }
      })
    })
  }, [getIconCenter])

  const handleDragEnd = useCallback((id: AppId) => {
    setState(prev => {
      if (prev.nearbyIcon) {
        const key = getMergeKey(id, prev.nearbyIcon)
        const cardType = validCombinations[key]

        if (cardType) {
          // Valid merge
          const dragCenter = getIconCenter(id, prev.dragPositions[id])
          const otherCenter = getIconCenter(prev.nearbyIcon)
          const mergePos = {
            x: (dragCenter.x + otherCenter.x) / 2,
            y: (dragCenter.y + otherCenter.y) / 2,
          }
          return {
            ...prev,
            activeIcon: null,
            dragPositions: {},
            nearbyIcon: null,
            mergeResult: cardType,
            mergePosition: mergePos,
            showAnimation: true,
            showCard: false,
            invalidShake: null,
          }
        } else {
          // Invalid merge — shake
          return {
            ...prev,
            activeIcon: null,
            dragPositions: {},
            nearbyIcon: null,
            invalidShake: prev.nearbyIcon,
          }
        }
      }

      // No nearby icon — just reset
      return {
        ...prev,
        activeIcon: null,
        dragPositions: {},
        nearbyIcon: null,
      }
    })

    // Clear invalid shake after animation
    setTimeout(() => {
      setState(prev => ({ ...prev, invalidShake: null }))
    }, 500)
  }, [getIconCenter])

  const onAnimationComplete = useCallback(() => {
    setState(prev => ({
      ...prev,
      showAnimation: false,
      showCard: true,
    }))
  }, [])

  const resetMerge = useCallback(() => {
    setState(prev => ({
      ...prev,
      mergeResult: null,
      mergePosition: null,
      showAnimation: false,
      showCard: false,
    }))
  }, [])

  return {
    ...state,
    handleDrag,
    handleDragEnd,
    onAnimationComplete,
    resetMerge,
  }
}
