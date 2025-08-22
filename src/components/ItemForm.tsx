import { JSX } from "preact"
import {
  Form,
  FormSubmitButton,
  SelectField,
  TextAreaField,
  TextField,
} from "./form"
import type { Item } from "../data/useStatSync"

type ItemLocation = "EQUIPPED" | "CARRIED" | "STORED"

export const ItemForm = ({
  item,
  onSubmit,
}: {
  item?: Partial<Item> & { key?: string }
  onSubmit: (item: Omit<Item, "type"> & { key?: string }) => void
}) => {
  const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)

    const name = formData.get("name")
    const description = formData.get("description")
    const locationValue = formData.get("location")

    if (!name || typeof name !== "string") return

    // Default to CARRIED if location is invalid
    let location: ItemLocation = "CARRIED"
    if (
      typeof locationValue === "string" &&
      (locationValue === "EQUIPPED" ||
        locationValue === "CARRIED" ||
        locationValue === "STORED")
    ) {
      location = locationValue
    }

    onSubmit({
      key: item?.key,
      name,
      description: typeof description === "string" ? description : null,
      location,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        autofocus
        defaultValue={item?.name || ""}
      />

      <TextAreaField
        name="description"
        label="Description"
        defaultValue={item?.description || ""}
      />

      <SelectField
        name="location"
        label="Location"
        defaultValue={item?.location || "CARRIED"}
        options={[
          { value: "EQUIPPED", label: "Equipped" },
          { value: "CARRIED", label: "Carried" },
          { value: "STORED", label: "Stored" },
        ]}
      />

      <FormSubmitButton />
    </Form>
  )
}
