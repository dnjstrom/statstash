import { JSX } from "preact"
import { cn } from "../../utils/cn"
import { FormField } from "./FormField"

export const TextAreaField = ({
  name,
  label,
  defaultValue,
  className,
  rows = 5,
  ...props
}: Omit<JSX.HTMLAttributes<HTMLTextAreaElement>, "className"> & {
  name: string
  label?: string
  defaultValue?: string
  className?: string
  rows?: number
}) => {
  return (
    <FormField label={label}>
      <textarea
        name={name}
        className={cn("border border-white rounded px-2 py-1", className)}
        defaultValue={defaultValue}
        rows={rows}
        {...props}
      />
    </FormField>
  )
}
