import { Form, FormSubmitButton, NumberField } from "./form"
import { Value } from "../data/useStats"
import { JSX } from "preact"

export const AttributeForm = ({
  attributeId,
  attributeValue,
  onSubmit,
}: {
  attributeId: string
  attributeValue?: Value
  onSubmit: (attributeId: string, value: string) => void
}) => {
  const displayName = attributeId.charAt(0).toUpperCase() + attributeId.slice(1)

  const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)
    const value = formData.get("value")

    if (!value || typeof value !== "string") return

    onSubmit(attributeId, value)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <NumberField
        name="value"
        label={`${displayName} Value`}
        min="1"
        autofocus
        defaultValue={attributeValue?.value?.toString() || ""}
      />

      <FormSubmitButton />
    </Form>
  )
}
