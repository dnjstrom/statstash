import { JSX } from "preact"
import { cn } from "../../utils/cn"
import { FormField } from "./FormField"

export const TextField = ({
  name,
  label,
  defaultValue,
  className,
  autofocus,
  ...props
}: Omit<JSX.HTMLAttributes<HTMLInputElement>, "className" | "type"> & {
  name: string
  label?: string
  defaultValue?: string
  className?: string
  autofocus?: boolean
}) => {
  return (
    <FormField label={label}>
      <input
        type="text"
        name={name}
        className={cn("border border-white rounded px-2 py-1", className)}
        defaultValue={defaultValue}
        autoFocus={autofocus}
        {...props}
      />
    </FormField>
  )
}
