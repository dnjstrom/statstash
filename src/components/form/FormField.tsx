import { ComponentChildren } from "preact"
import { cn } from "../../utils/cn"

export const FormField = ({
  label,
  children,
  className,
}: {
  label?: string
  children: ComponentChildren
  className?: string
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {label && <label className="font-medium mb-1">{label}</label>}
      {children}
    </div>
  )
}
