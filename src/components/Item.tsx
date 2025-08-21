import { ComponentChild } from "preact"
import type { Item as ItemType } from "../data/useStatSync"
import { cn } from "../utils/cn"
import { useInteraction } from "./useInteraction"

export const Item = ({
  item,
  showDescription = true,
  onClick,
  onLongPress,
  action,
}: {
  item: ItemType & {
    key: string
  }
  showDescription?: boolean
  onClick?: () => void
  onLongPress?: () => void
  action?: ComponentChild
}) => {
  const interactionHandlers = useInteraction({
    onClick: item.description ? onClick : undefined,
    onLongPress,
  })

  return (
    <div className="flex flex-col gap-1 items-baseline px-4 py-2 bg-[oklch(0.2507_0.0321_232.15)] rounded-lg">
      <button
        type="button"
        className={cn(
          "flex gap-2 items-baseline w-full py-2 -my-2",
          (item.description || onLongPress) && "cursor-pointer"
        )}
        {...interactionHandlers}
      >
        <div className="text-sm font-bold whitespace-nowrap">{item.name}</div>

        {!showDescription && (
          <div className="text-xs text-left overflow-hidden whitespace-nowrap text-ellipsis w-full text-slate-400">
            {item.description}
          </div>
        )}

        {action && <div className="ml-auto">{action}</div>}
      </button>

      {item.description && showDescription ? (
        <div className="text-sm whitespace-pre-line">{item.description}</div>
      ) : (
        <div className="text-xs overflow-hidden whitespace-nowrap text-ellipsis w-full text-slate-400"></div>
      )}
    </div>
  )
}
