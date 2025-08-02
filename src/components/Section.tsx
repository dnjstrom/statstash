import { ComponentChildren } from "preact"

export const Section = ({
  title,
  children,
}: {
  title: string
  children: ComponentChildren
}) => {
  return (
    <div>
      <div className="text-sm font-medium ml-2 pt-1">{title}</div>

      {children}
    </div>
  )
}
