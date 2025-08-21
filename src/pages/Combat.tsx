import { useState } from "preact/hooks"
import { Dot } from "../components/Dot"
import { Section } from "../components/Section"
import { SkillBox } from "../components/SkillBox"
import { Stat } from "../components/Stat"
import { StatBox } from "../components/StatBox"
import { Throw } from "../components/Throw"
import { useToast } from "../components/Toast"
import { useStats } from "../data/useStats"
import { repeatWithDelay } from "../utils/repeatWithDelay"
import { useExpressionResolver } from "../utils/useExpressionResolver"
import { Page } from "./Page"
import { Modal } from "../components/Modal"

export const Combat = () => {
  const stats = useStats()
  const resolve = useExpressionResolver()
  const toaster = useToast()

  // State for editing saving throws
  const [editingSavingThrowId, setEditingSavingThrowId] = useState<string>()

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
      <Section title="Health">
        <div className="grid grid-cols-2 gap-2">
          <StatBox name="Hit Points">
            <div className="flex gap-1 items-center text-3xl">
              <Stat value={stats.get("hit_points")} />
              /
              <Stat value={stats.get("hit_points.max")} />
            </div>
          </StatBox>

          <StatBox name="Temporary HP">
            <Stat
              value={stats.get("hit_points.temporary")}
              className="text-3xl"
            />
          </StatBox>

          <StatBox
            name={
              <div className="flex">
                Hit Roll (<Stat value={stats.get("hit_dice.die")} />)
              </div>
            }
          >
            <Stat value={stats.get("hit_dice")} className="text-3xl" />
          </StatBox>

          <StatBox name="Death Saves">
            <div className="grid grid-cols-2">
              <div className="text-end">Successes:</div>
              <Stat value={stats.get("death_saves.successes")} />

              <div className="text-end">Failures:</div>
              <Stat value={stats.get("death_saves.failures")} />
            </div>
          </StatBox>
        </div>
      </Section>

      <Section title="Stats">
        <div className="grid grid-cols-4 gap-2">
          <StatBox name="AC">
            <Stat value={stats.get("armor_class")} className="text-3xl" />
          </StatBox>

          <StatBox name="Initiative">
            <Stat value={stats.get("initiative")} className="text-3xl" />
          </StatBox>

          <StatBox name="Speed">
            <div className="flex items-end gap-1">
              <Stat value={stats.get("speed")} className="text-3xl" />
              ft
            </div>
          </StatBox>

          <StatBox name="Inspiration">
            <Dot filled className="text-3xl w-5 h-5" />
          </StatBox>
        </div>
      </Section>

      <Section title="Saving throws">
        <div className="grid grid-cols-2 gap-2">
          <SkillBox
            name="Strength"
            modifier={stats.get("strength.saving_throw")}
            proficient={
              stats.get("strength.saving_throw.proficient")?.value === "1"
            }
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{strength.saving_throw}",
                pretitle: "Saving Throw",
                title: "Strength",
              })
            }}
            onLongPress={() => setEditingSavingThrowId("strength")}
          />
          <SkillBox
            name="Dexterity"
            modifier={stats.get("dexterity.saving_throw")}
            proficient={
              stats.get("dexterity.saving_throw.proficient")?.value === "1"
            }
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{dexterity.saving_throw}",
                pretitle: "Saving Throw",
                title: "Dexterity",
              })
            }}
            onLongPress={() => setEditingSavingThrowId("dexterity")}
          />
          <SkillBox
            name="Constitution"
            modifier={stats.get("constitution.saving_throw")}
            proficient={
              stats.get("constitution.saving_throw.proficient")?.value === "1"
            }
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{constitution.saving_throw}",
                pretitle: "Saving Throw",
                title: "Constitution",
              })
            }}
            onLongPress={() => setEditingSavingThrowId("constitution")}
          />
          <SkillBox
            name="Intelligence"
            modifier={stats.get("intelligence.saving_throw")}
            proficient={
              stats.get("intelligence.saving_throw.proficient")?.value === "1"
            }
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{intelligence.saving_throw}",
                pretitle: "Saving Throw",
                title: "Intelligence",
              })
            }}
            onLongPress={() => setEditingSavingThrowId("intelligence")}
          />
          <SkillBox
            name="Wisdom"
            modifier={stats.get("wisdom.saving_throw")}
            proficient={
              stats.get("wisdom.saving_throw.proficient")?.value === "1"
            }
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{wisdom.saving_throw}",
                pretitle: "Saving Throw",
                title: "Wisdom",
              })
            }}
            onLongPress={() => setEditingSavingThrowId("wisdom")}
          />
          <SkillBox
            name="Charisma"
            modifier={stats.get("charisma.saving_throw")}
            proficient={
              stats.get("charisma.saving_throw.proficient")?.value === "1"
            }
            onClick={async () => {
              await throwRepeating({
                expression: "1d20+{charisma.saving_throw}",
                pretitle: "Saving Throw",
                title: "Charisma",
              })
            }}
            onLongPress={() => setEditingSavingThrowId("charisma")}
          />
        </div>
      </Section>

      <Modal
        isOpen={Boolean(editingSavingThrowId)}
        onClose={() => {
          setEditingSavingThrowId(undefined)
        }}
        orientation="center"
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            const formData = new FormData(event.currentTarget)

            if (!editingSavingThrowId) return

            const isProficient = formData.get("proficient") === "on" ? "1" : "0"

            stats.set(
              `${editingSavingThrowId}.saving_throw.proficient`,
              isProficient
            )

            event.currentTarget.reset()
            setEditingSavingThrowId(undefined)
          }}
        >
          <label className="font-medium">
            {editingSavingThrowId
              ? editingSavingThrowId.charAt(0).toUpperCase() +
                editingSavingThrowId.slice(1)
              : ""}{" "}
            Saving Throw
          </label>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="proficient"
              id="proficient"
              defaultChecked={
                editingSavingThrowId
                  ? stats.get(`${editingSavingThrowId}.saving_throw.proficient`)
                      ?.value === "1"
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
