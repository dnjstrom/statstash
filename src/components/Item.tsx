import { ComponentChild } from "preact"
import type { Item as ItemType } from "../data/useStatSync"
import { cn } from "../utils/cn"
import { InteractiveElement } from "./InteractiveElement"

export const Item = ({
  item,
  showDescription = true,
  onClick,
  onLongPress,
  action,
  ...rest
}: {
  item: ItemType & {
    key: string
  }
  showDescription?: boolean
  action?: ComponentChild
  onClick: () => void
  onLongPress: () => void
}) => (
  <InteractiveElement
    onClick={onClick || (() => {})}
    onLongPress={onLongPress}
    className={cn(
      "flex flex-col gap-1 items-baseline px-4 py-2",
      !onClick && !onLongPress && "cursor-default"
    )}
    {...rest}
  >
    <>
      <div className="flex w-full gap-2 items-baseline">
        <div className="text-sm font-bold whitespace-nowrap">{item.name}</div>

        {!showDescription && item.description && (
          <div className="text-xs text-left overflow-hidden whitespace-nowrap text-ellipsis w-full text-slate-400">
            {item.description}
          </div>
        )}

        {action && <div className="ml-auto">{action}</div>}
      </div>

      {item.description && showDescription && (
        <div className="text-sm whitespace-pre-line">{item.description}</div>
      )}
    </>
  </InteractiveElement>
)
