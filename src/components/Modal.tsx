import { ComponentChildren } from "preact"
import { createPortal } from "preact/compat"
import { cn } from "../utils/cn"

export const Modal = ({
  isOpen,
  onClose,
  children,
  containerClassName,
  overlayClassName,
  orientation = "top",
}: {
  isOpen: boolean
  onClose: () => void
  children: ComponentChildren
  containerClassName?: string
  overlayClassName?: string
  orientation?: "top" | "bottom" | "center"
}) => {
  if (!isOpen) return null

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 bg-[rgba(0,0,0,0.5)] z-10 flex flex-col items-center p-4",
        orientation === "top" && "justify-start",
        orientation === "center" && "justify-center",
        orientation === "bottom" && "justify-end",
        overlayClassName
      )}
      onClick={() => {
        onClose()
      }}
    >
      <div
        className={cn(
          "relative w-full rounded-lg p-4 bg-[oklch(0.2507_0.0321_232.15)] shadow-lg shadow-black border-2 border-white",
          containerClassName
        )}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <div
          className="absolute -top-1 -right-1 flex justify-center items-center cursor-pointer select-none w-8 h-8 -m-2 rounded-full bg-[oklch(0.2507_0.0321_232.15)] border-2 border-white"
          onClick={() => {
            onClose()
          }}
        >
          ✕
        </div>

        {children}
      </div>
    </div>,
    document.body
  )
}
