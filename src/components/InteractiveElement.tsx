import { ReactNode } from "react"
import { useInteraction } from "./useInteraction"
import { cn } from "../utils/cn"

export const InteractiveElement = ({
  onClick,
  onLongPress,
  children,
  className = "",
}: {
  onClick: () => void
  onLongPress?: () => void
  children: ReactNode
  className?: string
}) => {
  const interaction = useInteraction({
    onClick,
    onLongPress: onLongPress || (() => {}),
  })

  return (
    <button
      className={cn(
        "cursor-pointer bg-[oklch(0.2507_0.0321_232.15)] hover:bg-[oklch(0.2707_0.0321_232.15)] active:bg-[oklch(0.2307_0.0321_232.15)] rounded-lg",
        className
      )}
      type="button" // Explicitly set type to button to avoid form submission issues
      {...interaction}
    >
      {children}
    </button>
  )
}
