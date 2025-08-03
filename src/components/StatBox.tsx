import { ComponentChild, ComponentChildren } from "preact"

export const StatBox = ({
  name,
  onClick,
  children,
}: {
  name: ComponentChild
  onClick?: () => void
  children: ComponentChildren
}) => {
  return (
    <button
      className="flex flex-col justify-center items-center p-2 bg-[oklch(0.2507_0.0321_232.15)] cursor-pointer hover:bg-[oklch(0.2707_0.0321_232.15)] active:bg-[oklch(0.2307_0.0321_232.15)] rounded-lg"
      onClick={onClick}
    >
      <div className="flex justify-center items-center h-full m-1">
        {children}
      </div>
      <div className="flex gap-2 items-baseline">{name}</div>
    </button>
  )
}
