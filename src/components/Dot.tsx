import { JSX } from "preact"
import { cn } from "../utils/cn"

export const Dot = ({
  filled = false,
  className,
  ...otherProps
}: { filled: boolean } & JSX.HTMLAttributes<HTMLSpanElement>) =>
  filled ? (
    <span
      {...otherProps}
      className={cn(
        className,
        "text-cyan-600 flex items-center justify-center"
      )}
    >
      ●
    </span>
  ) : (
    "○"
  )
