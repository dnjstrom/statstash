import { ComponentChildren } from "preact"
import { cn } from "../../utils/cn"

export const FormActions = ({
  children,
  className,
}: {
  children: ComponentChildren
  className?: string
}) => {
  return (
    <div className={cn("flex justify-end gap-2 mt-2", className)}>
      {children}
    </div>
  )
}
