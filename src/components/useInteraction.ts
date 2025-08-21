/**
 * Detects click and long press events on a given element.
 * Uses pointer events which work across devices (mouse, touch, pen).
 */
import { useRef, useCallback } from "preact/hooks"
import { JSX } from "preact"

type InteractionCallbacks = {
  onClick?: () => void
  onLongPress?: () => void
}

type InteractionHandlers = {
  onPointerDown: JSX.PointerEventHandler<HTMLElement>
  onPointerUp: JSX.PointerEventHandler<HTMLElement>
  onPointerMove: JSX.PointerEventHandler<HTMLElement>
  onPointerCancel: JSX.PointerEventHandler<HTMLElement>
  onPointerLeave: JSX.PointerEventHandler<HTMLElement>
}

export const useInteraction = ({
  onClick,
  onLongPress,
}: InteractionCallbacks = {}): InteractionHandlers => {
  const longPressTimeoutRef = useRef<number | null>(null)
  const initialPositionRef = useRef<{ x: number; y: number } | null>(null)
  const isLongPressDetectedRef = useRef(false)
  const shouldFireClickRef = useRef(true)
  const pointerId = useRef<number | null>(null)

  // Clear the timeout and reset state
  const clearLongPressTimeout = useCallback(() => {
    if (longPressTimeoutRef.current !== null) {
      window.clearTimeout(longPressTimeoutRef.current)
      longPressTimeoutRef.current = null
    }
    isLongPressDetectedRef.current = false
  }, [])

  // Reset all state
  const resetState = useCallback(() => {
    clearLongPressTimeout()
    initialPositionRef.current = null
    shouldFireClickRef.current = true
    pointerId.current = null
  }, [clearLongPressTimeout])

  // Handle pointer down event
  const onPointerDown = useCallback(
    (e: JSX.TargetedEvent<HTMLElement, PointerEvent>) => {
      // Store the pointer ID to track this specific interaction
      pointerId.current = e.pointerId

      // Store initial position
      initialPositionRef.current = { x: e.clientX, y: e.clientY }

      // Reset click flag
      shouldFireClickRef.current = true

      // Clear any existing timeout
      clearLongPressTimeout()

      // Set up a new long press detection
      if (onLongPress) {
        isLongPressDetectedRef.current = false
        longPressTimeoutRef.current = window.setTimeout(() => {
          isLongPressDetectedRef.current = true
          shouldFireClickRef.current = false // Don't fire click after long press
          onLongPress()
        }, 450) // 450ms threshold for long press
      }

      // For button elements, capture the pointer to ensure we get all events
      if (e.currentTarget.tagName === "BUTTON") {
        e.currentTarget.setPointerCapture(e.pointerId)
      }
    },
    [onLongPress, clearLongPressTimeout]
  )

  // Handle pointer up event
  const onPointerUp = useCallback(
    (e: JSX.TargetedEvent<HTMLElement, PointerEvent>) => {
      // Only process if this is the same pointer that started the interaction
      if (pointerId.current !== null && pointerId.current === e.pointerId) {
        // If we should fire click and have an onClick handler
        if (
          shouldFireClickRef.current &&
          !isLongPressDetectedRef.current &&
          onClick &&
          initialPositionRef.current
        ) {
          // Check if the pointer hasn't moved too far
          const dx = Math.abs(e.clientX - initialPositionRef.current.x)
          const dy = Math.abs(e.clientY - initialPositionRef.current.y)

          // If movement is small enough to be considered a click
          if (dx < 10 && dy < 10) {
            e.preventDefault() // Prevent any default action

            // For button elements, we may need a timeout to avoid conflict with native click
            if (e.currentTarget.tagName === "BUTTON") {
              setTimeout(onClick, 0)
            } else {
              onClick()
            }
          }
        }

        // Release pointer capture if we had it
        if (
          e.currentTarget.hasPointerCapture &&
          e.currentTarget.hasPointerCapture(e.pointerId)
        ) {
          e.currentTarget.releasePointerCapture(e.pointerId)
        }

        // Reset state
        resetState()
      }
    },
    [onClick, resetState]
  )

  // Handle pointer movement
  const onPointerMove = useCallback(
    (e: JSX.TargetedEvent<HTMLElement, PointerEvent>) => {
      // Only process if this is the same pointer that started the interaction
      if (
        pointerId.current !== null &&
        pointerId.current === e.pointerId &&
        initialPositionRef.current
      ) {
        const dx = Math.abs(e.clientX - initialPositionRef.current.x)
        const dy = Math.abs(e.clientY - initialPositionRef.current.y)

        // If moved more than threshold, cancel click and long press
        if (dx > 10 || dy > 10) {
          shouldFireClickRef.current = false
          clearLongPressTimeout()
        }
      }
    },
    [clearLongPressTimeout]
  )

  // Handle pointer cancel event
  const onPointerCancel = useCallback(
    (e: JSX.TargetedEvent<HTMLElement, PointerEvent>) => {
      if (pointerId.current !== null && pointerId.current === e.pointerId) {
        resetState()
      }
    },
    [resetState]
  )

  // Handle pointer leave event (backup to ensure we don't miss events)
  const onPointerLeave = useCallback(
    (e: JSX.TargetedEvent<HTMLElement, PointerEvent>) => {
      if (
        pointerId.current !== null &&
        pointerId.current === e.pointerId &&
        !e.currentTarget.hasPointerCapture(e.pointerId)
      ) {
        resetState()
      }
    },
    [resetState]
  )

  return {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onPointerCancel,
    onPointerLeave,
  }
}
