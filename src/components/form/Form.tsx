import { ComponentChildren } from "preact"
import { JSX } from "preact/jsx-runtime"
import { cn } from "../../utils/cn"

export const Form = ({
  children,
  onSubmit,
  className,
}: {
  children: ComponentChildren
  onSubmit: JSX.GenericEventHandler<HTMLFormElement>
  className?: string
}) => {
  const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onSubmit(event)
  }

  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}
