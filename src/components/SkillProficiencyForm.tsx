import { JSX } from "preact"
import { CheckboxField, Form, FormSubmitButton } from "./form"

export const SkillProficiencyForm = ({
  skillId,
  skillName,
  isProficient = false,
  onSubmit,
}: {
  skillId: string
  skillName: string
  isProficient: boolean | undefined
  onSubmit: (skillId: string, isProficient: boolean) => void
}) => {
  const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)
    const proficient = formData.get("proficient") === "on"

    onSubmit(skillId, proficient)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <label className="font-medium">{skillName}</label>

      <CheckboxField
        name="proficient"
        label="Proficient"
        defaultChecked={isProficient}
      />

      <FormSubmitButton />
    </Form>
  )
}
