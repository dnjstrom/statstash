import { ComponentChildren } from "preact"

export const Page = ({ children }: { children: ComponentChildren }) => (
  <div className="px-2 flex flex-col gap-2 h-full overflow-auto pb-4">
    {children}
  </div>
)
