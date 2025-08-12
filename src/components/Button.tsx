import { JSX } from "preact"
import { cn } from "../utils/cn"

export const Button = ({
  children,
  onClick,
  className,
  type = "button",
}: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      className={cn(
        "flex text-center text-lg justify-center gap-2 items-baseline px-4 py-2 bg-[oklch(0.2507_0.0321_232.15)] cursor-pointer hover:bg-[oklch(0.2707_0.0321_232.15)] active:bg-[oklch(0.2307_0.0321_232.15)] rounded-lg",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
