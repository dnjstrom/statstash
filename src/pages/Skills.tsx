import { useState } from "preact/hooks"
import { useStats } from "../data/useStats"
import { useExpressionResolver } from "../utils/useExpressionResolver"
import { useToast } from "../components/Toast"
import { AttributeBox } from "../components/AttributeBox"
import { SkillBox } from "../components/SkillBox"
import { Section } from "../components/Section"
import { Throw } from "../components/Throw"
import { Page } from "./Page"
import { repeatWithDelay } from "../utils/repeatWithDelay"
import { Modal } from "../components/Modal"

export const Skills = () => {
  const stats = useStats()
  const resolve = useExpressionResolver()
  const toaster = useToast()

  // State for editing attributes and skills
  const [editingAttributeId, setEditingAttributeId] = useState<string>()
  const [editingSkillId, setEditingSkillId] = useState<string>()

  const throwRepeating = async ({
    expression,
    pretitle,
    title,
  }: {
    expression: string
    pretitle: string
    title: string
  }) => {
    let previous: string | number = ""

    await repeatWithDelay(20, async () => {
      let result = resolve(expression)

      // Ensure we don't show the same result twice as it makes for a janky animation.
      // Guard against infinite loops by breaking after 100 iterations.
      for (let i = 0; i < 100; i++) {
        if (result.value !== previous) {
          break
        }

        result = resolve(expression)
      }

      toaster.info(<Throw pretitle={pretitle} title={title} {...result} />)

      previous = result.value
    })
  }

  return (
    <Page>
      <Section title="Attributes">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <AttributeBox
            name="Strength"
            value={stats.get("strength.attribute")}
            modifier={stats.get("strength")}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{strength}",
                pretitle: "Attribute",
                title: "Strength",
              })
            }}
            onLongPress={() => setEditingAttributeId("strength")}
          />
          <AttributeBox
            name="Dexterity"
            value={stats.get("dexterity.attribute")}
            modifier={stats.get("dexterity")}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{dexterity}",
                pretitle: "Attribute",
                title: "Dexterity",
              })
            }}
            onLongPress={() => setEditingAttributeId("dexterity")}
          />
          <AttributeBox
            name="Constitution"
            value={stats.get("constitution.attribute")}
            modifier={stats.get("constitution")}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{constitution}",
                pretitle: "Attribute",
                title: "Constitution",
              })
            }}
            onLongPress={() => setEditingAttributeId("constitution")}
          />
          <AttributeBox
            name="Intelligence"
            value={stats.get("intelligence.attribute")}
            modifier={stats.get("intelligence")}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{intelligence}",
                pretitle: "Attribute",
                title: "Intelligence",
              })
            }}
            onLongPress={() => setEditingAttributeId("intelligence")}
          />
          <AttributeBox
            name="Wisdom"
            value={stats.get("wisdom.attribute")}
            modifier={stats.get("wisdom")}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{wisdom}",
                pretitle: "Attribute",
                title: "Wisdom",
              })
            }}
            onLongPress={() => setEditingAttributeId("wisdom")}
          />
          <AttributeBox
            name="Charisma"
            value={stats.get("charisma.attribute")}
            modifier={stats.get("charisma")}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{charisma}",
                pretitle: "Attribute",
                title: "Charisma",
              })
            }}
            onLongPress={() => setEditingAttributeId("charisma")}
          />
        </div>
      </Section>

      <Section title="Skills">
        <div className="grid grid-cols-2 gap-2">
          <SkillBox
            name="Acrobatics"
            modifier={stats.get("acrobatics")}
            proficient={stats.get("acrobatics.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{acrobatics}",
                pretitle: "Skill",
                title: "Acrobatics",
              })
            }}
            onLongPress={() => setEditingSkillId("acrobatics")}
          />
          <SkillBox
            name="Animal Handling"
            modifier={stats.get("animal_handling")}
            proficient={stats.get("animal_handling.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{animal_handling}",
                pretitle: "Skill",
                title: "Animal Handling",
              })
            }}
            onLongPress={() => setEditingSkillId("animal_handling")}
          />
          <SkillBox
            name="Arcana"
            modifier={stats.get("arcana")}
            proficient={stats.get("arcana.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{arcana}",
                pretitle: "Skill",
                title: "Arcana",
              })
            }}
            onLongPress={() => setEditingSkillId("arcana")}
          />
          <SkillBox
            name="Athletics"
            modifier={stats.get("athletics")}
            proficient={stats.get("athletics.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{athletics}",
                pretitle: "Skill",
                title: "Athletics",
              })
            }}
            onLongPress={() => setEditingSkillId("athletics")}
          />
          <SkillBox
            name="Deception"
            modifier={stats.get("deception")}
            proficient={stats.get("deception.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{deception}",
                pretitle: "Skill",
                title: "Deception",
              })
            }}
            onLongPress={() => setEditingSkillId("deception")}
          />
          <SkillBox
            name="History"
            modifier={stats.get("history")}
            proficient={stats.get("history.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{history}",
                pretitle: "Skill",
                title: "History",
              })
            }}
            onLongPress={() => setEditingSkillId("history")}
          />
          <SkillBox
            name="Insight"
            modifier={stats.get("insight")}
            proficient={stats.get("insight.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{insight}",
                pretitle: "Skill",
                title: "Insight",
              })
            }}
            onLongPress={() => setEditingSkillId("insight")}
          />
          <SkillBox
            name="Intimidation"
            modifier={stats.get("intimidation")}
            proficient={stats.get("intimidation.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{intimidation}",
                pretitle: "Skill",
                title: "Intimidation",
              })
            }}
            onLongPress={() => setEditingSkillId("intimidation")}
          />
          <SkillBox
            name="Investigation"
            modifier={stats.get("investigation")}
            proficient={stats.get("investigation.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{investigation}",
                pretitle: "Skill",
                title: "Investigation",
              })
            }}
            onLongPress={() => setEditingSkillId("investigation")}
          />
          <SkillBox
            name="Medicine"
            modifier={stats.get("medicine")}
            proficient={stats.get("medicine.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{medicine}",
                pretitle: "Skill",
                title: "Medicine",
              })
            }}
            onLongPress={() => setEditingSkillId("medicine")}
          />
          <SkillBox
            name="Nature"
            modifier={stats.get("nature")}
            proficient={stats.get("nature.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{nature}",
                pretitle: "Skill",
                title: "Nature",
              })
            }}
            onLongPress={() => setEditingSkillId("nature")}
          />
          <SkillBox
            name="Perception"
            modifier={stats.get("perception")}
            proficient={stats.get("perception.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{perception}",
                pretitle: "Skill",
                title: "Perception",
              })
            }}
            onLongPress={() => setEditingSkillId("perception")}
          />
          <SkillBox
            name="Performance"
            modifier={stats.get("performance")}
            proficient={stats.get("performance.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{performance}",
                pretitle: "Skill",
                title: "Performance",
              })
            }}
            onLongPress={() => setEditingSkillId("performance")}
          />
          <SkillBox
            name="Persuasion"
            modifier={stats.get("persuasion")}
            proficient={stats.get("persuasion.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{persuasion}",
                pretitle: "Skill",
                title: "Persuasion",
              })
            }}
            onLongPress={() => setEditingSkillId("persuasion")}
          />
          <SkillBox
            name="Religion"
            modifier={stats.get("religion")}
            proficient={stats.get("religion.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{religion}",
                pretitle: "Skill",
                title: "Religion",
              })
            }}
            onLongPress={() => setEditingSkillId("religion")}
          />
          <SkillBox
            name="Sleight of Hand"
            modifier={stats.get("sleight_of_hand")}
            proficient={stats.get("sleight_of_hand.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{sleight_of_hand}",
                pretitle: "Skill",
                title: "Sleight of Hand",
              })
            }}
            onLongPress={() => setEditingSkillId("sleight_of_hand")}
          />
          <SkillBox
            name="Stealth"
            modifier={stats.get("stealth")}
            proficient={stats.get("stealth.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{stealth}",
                pretitle: "Skill",
                title: "Stealth",
              })
            }}
            onLongPress={() => setEditingSkillId("stealth")}
          />
          <SkillBox
            name="Survival"
            modifier={stats.get("survival")}
            proficient={stats.get("survival.proficient")?.value === "1"}
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{survival}",
                pretitle: "Skill",
                title: "Survival",
              })
            }}
            onLongPress={() => setEditingSkillId("survival")}
          />
        </div>
      </Section>

      <Modal
        isOpen={Boolean(editingAttributeId)}
        onClose={() => {
          setEditingAttributeId(undefined)
        }}
        orientation="center"
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            const formData = new FormData(event.currentTarget)

            if (!editingAttributeId) return

            const value = formData.get("value")

            if (!value || typeof value !== "string") return

            const attributeKey = `${editingAttributeId}.attribute`
            stats.set(attributeKey, value)

            event.currentTarget.reset()
            setEditingAttributeId(undefined)
          }}
        >
          <label className="font-medium">
            {editingAttributeId
              ? editingAttributeId.charAt(0).toUpperCase() +
                editingAttributeId.slice(1)
              : ""}{" "}
            Value
          </label>
          <input
            type="number"
            name="value"
            min="1"
            className="border border-white rounded px-2 py-1"
            autofocus
            defaultValue={
              (editingAttributeId &&
                stats
                  .get(`${editingAttributeId}.attribute`)
                  ?.value?.toString()) ||
              ""
            }
          />

          <button type="submit" className="border rounded">
            Save
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={Boolean(editingSkillId)}
        onClose={() => {
          setEditingSkillId(undefined)
        }}
        orientation="center"
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            const formData = new FormData(event.currentTarget)

            if (!editingSkillId) return

            const isProficient = formData.get("proficient") === "on" ? "1" : "0"

            stats.set(`${editingSkillId}.proficient`, isProficient)

            event.currentTarget.reset()
            setEditingSkillId(undefined)
          }}
        >
          <label className="font-medium">
            {editingSkillId
              ? editingSkillId
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              : ""}
          </label>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="proficient"
              id="proficient"
              defaultChecked={
                editingSkillId
                  ? stats.get(`${editingSkillId}.proficient`)?.value === "1"
                  : false
              }
            />
            <label htmlFor="proficient">Proficient</label>
          </div>

          <button type="submit" className="border rounded">
            Save
          </button>
        </form>
      </Modal>
    </Page>
  )
}
