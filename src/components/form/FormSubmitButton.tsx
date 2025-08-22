import { Button } from "../Button"
import { ComponentChildren } from "preact"
import { cn } from "../../utils/cn"

export const FormSubmitButton = ({
  children = "Save",
  className,
}: {
  children?: ComponentChildren
  className?: string
}) => {
  return (
    <Button type="submit" className={cn(className)}>
      {children}
    </Button>
  )
}
