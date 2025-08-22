import { JSX } from "preact"

export const CheckboxField = ({
  name,
  label,
  defaultChecked,
  id = name,
  ...props
}: Omit<JSX.HTMLAttributes<HTMLInputElement>, "className" | "type"> & {
  name: string
  label: string
  defaultChecked?: boolean
  id?: string
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name={name}
        id={id}
        defaultChecked={defaultChecked}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
