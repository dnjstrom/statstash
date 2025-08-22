import { JSX } from "preact"
import { cn } from "../../utils/cn"
import { FormField } from "./FormField"

export const NumberField = ({
  name,
  label,
  defaultValue,
  min,
  max,
  className,
  autofocus,
  ...props
}: Omit<JSX.HTMLAttributes<HTMLInputElement>, "className" | "type"> & {
  name: string
  label?: string
  defaultValue?: string | number
  min?: string | number
  max?: string | number
  className?: string
  autofocus?: boolean
}) => {
  return (
    <FormField label={label}>
      <input
        type="number"
        name={name}
        min={min}
        max={max}
        className={cn("border border-white rounded px-2 py-1", className)}
        defaultValue={defaultValue}
        autoFocus={autofocus}
        {...props}
      />
    </FormField>
  )
}
