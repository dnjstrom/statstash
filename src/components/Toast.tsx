import { ComponentChildren, createContext } from "preact"
import { useContext, useState } from "preact/hooks"

const ToastContext = createContext<
  | undefined
  | {
      info: (children: ComponentChildren) => void
    }
>(undefined)

export const ToastProvider = ({
  children,
}: {
  children: ComponentChildren
}) => {
  const [toast, setToast] = useState<undefined | ComponentChildren>()
  const [key, setKey] = useState(0)

  const info = (children: ComponentChildren) => {
    setToast(children)
    setKey((prev) => prev + 1)
  }

  return (
    <ToastContext.Provider
      value={{
        info,
      }}
    >
      {toast && (
        <Toast
          key={key}
          onClose={() => {
            setToast(undefined)
          }}
        >
          {toast}
        </Toast>
      )}

      {children}
    </ToastContext.Provider>
  )
}

const Toast = ({
  children,
  onClose,
}: {
  children: ComponentChildren
  onClose: () => void
}) => {
  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-10 flex flex-col items-center p-4"
      onClick={() => {
        onClose()
      }}
    >
      <div className="relative w-full rounded-lg p-4 bg-[oklch(0.2507_0.0321_232.15)] text-3xl shadow-lg shadow-black border-2 border-white opacity-100 transition-opacity duration-1000 ease-in">
        <div
          className="absolute -top-1 -right-1 flex justify-center items-center cursor-pointer select-none w-8 h-8 -m-2 text-lg rounded-full bg-[oklch(0.2507_0.0321_232.15)] border-2 border-white"
          onClick={() => {
            onClose()
          }}
        >
          ✕
        </div>

        {children}
      </div>
    </div>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)

  if (!ctx) throw new Error("useToast must be used within a ToastProvider.")

  return ctx
}
