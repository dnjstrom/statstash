import { ReactNode } from "react"
import { useInteraction } from "./useInteraction"
import { cn } from "../utils/cn"
import { JSX } from "preact"

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

  // Generate the background style based on the long press progress
  const buttonStyle = {
    "--bg-progress": interaction.longPressProgress,
    background:
      interaction.isPressed && interaction.longPressProgress > 0
        ? `linear-gradient(to right, oklch(0.2307 0.0321 232.15) 0%, oklch(0.2307 0.0321 232.15) ${interaction.longPressProgress * 100}%, oklch(0.2507 0.0321 232.15) ${interaction.longPressProgress * 100}%)`
        : undefined,
  } as JSX.CSSProperties

  return (
    <button
      className={cn(
        "cursor-pointer bg-[oklch(0.2507_0.0321_232.15)] hover:bg-[oklch(0.2707_0.0321_232.15)] active:bg-[oklch(0.2307_0.0321_232.15)] rounded-lg transition-all",
        className
      )}
      style={buttonStyle}
      type="button" // Explicitly set type to button to avoid form submission issues
      {...interaction}
    >
      {children}
    </button>
  )
}
