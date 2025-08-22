import { JSX } from "preact"
import { cn } from "../../utils/cn"
import { FormField } from "./FormField"

type Option = {
  value: string
  label: string
}

export const SelectField = ({
  name,
  label,
  options,
  defaultValue,
  className,
  ...props
}: Omit<JSX.HTMLAttributes<HTMLSelectElement>, "className"> & {
  name: string
  label?: string
  options: Option[]
  defaultValue?: string
  className?: string
}) => {
  return (
    <FormField label={label}>
      <select
        name={name}
        defaultValue={defaultValue}
        className={cn("border border-white rounded px-2 py-1", className)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  )
}
