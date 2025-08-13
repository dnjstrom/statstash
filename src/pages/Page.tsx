import { ComponentChildren } from "preact"
import { cn } from "../utils/cn"

export const Page = ({
  children,
  className,
}: {
  children: ComponentChildren
  className?: string
}) => (
  <div
    className={cn(
      "px-2 flex flex-col gap-2 h-full overflow-auto pb-4",
      className
    )}
  >
    {children}
  </div>
)
