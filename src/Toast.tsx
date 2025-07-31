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
    <div className="fixed bottom-4 left-4 right-4 rounded p-4 bg-[oklch(0.2507_0.0321_232.15)] text-3xl shadow-2xl">
      <div
        className="absolute -top-2 -right-1 flex justify-center items-center cursor-pointer select-none w-8 h-8 -m-2 text-lg rounded-full bg-slate-700"
        onClick={() => {
          onClose()
        }}
      >
        ✕
      </div>

      {children}
    </div>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)

  if (!ctx) throw new Error("useToast must be used within a ToastProvider.")

  return ctx
}
