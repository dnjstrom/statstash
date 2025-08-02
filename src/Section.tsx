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
      <div className="text-sm font-medium ml-2">{title}</div>

      {children}
    </div>
  )
}
