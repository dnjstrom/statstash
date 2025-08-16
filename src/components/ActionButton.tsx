import { ComponentChildren } from "preact"

type ActionButtonProps = {
  onClick: (event: MouseEvent) => void
  children: ComponentChildren
  className?: string
}

export const ActionButton = ({
  onClick,
  children,
  className = "",
}: ActionButtonProps) => {
  return (
    <button
      className={`text-xs ${className} cursor-pointer`}
      onClick={(event) => {
        event.stopPropagation()
        onClick(event)
      }}
    >
      {children}
    </button>
  )
}
