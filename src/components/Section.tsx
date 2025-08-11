import { ComponentChild, ComponentChildren } from "preact"

export const Section = ({
  title,
  className,
  children,
}: {
  title: ComponentChild
  children: ComponentChildren
  className?: string
}) => {
  return (
    <div>
      <div className="text-sm font-medium ml-2 pt-1">{title}</div>

      <div className={className}>{children}</div>
    </div>
  )
}
