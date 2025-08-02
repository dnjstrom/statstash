import { useState } from "preact/hooks"
import { cn } from "../utils/cn"
import { ComponentChildren } from "preact"

export const Menu = ({ children }: { children: ComponentChildren }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="z-50">
      <div
        className="text-xl cursor-pointer flex items-center justify-center -m-2 -mt-3 p-2 select-none"
        onClick={() => {
          setOpen(true)
        }}
      >
        ☰
      </div>
      <div
        className={cn(
          "fixed inset-0 bg-[oklch(0.2507_0.0321_232.15)] p-4 z-50",
          !open && "hidden"
        )}
      >
        <div className="text-4xl absolute bottom-8 left-1/2 -translate-x-1/2">
          StatStash
        </div>

        <div className="flex flex-col justify-center items-center absolute inset-0">
          {children}
        </div>

        <div
          className="absolute top-2 right-4 cursor-pointer select-none p-2 -m-2 text-lg"
          onClick={() => {
            setOpen(false)
          }}
        >
          ✕
        </div>
      </div>
    </div>
  )
}
