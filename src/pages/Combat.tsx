import { Section } from "../components/Section"
import { SkillBox } from "../components/SkillBox"
import { Throw } from "../components/Throw"
import { useToast } from "../components/Toast"
import { useStats } from "../data/useStats"
import { useExpressionResolver } from "../utils/useExpressionResolver"
import { Header } from "./Header"

export const Combat = () => {
  const stats = useStats()

  const resolve = useExpressionResolver()

  const toaster = useToast()

  return (
    <div className="flex flex-col">
      <Header />

      <div className="px-2 flex flex-col gap-2">
        <Section title="Saving throws">
          <div className="grid grid-cols-2 gap-2">
            <SkillBox
              name="Strength"
              modifier={stats.get("strength.saving_throw")}
              proficient={
                stats.get("strength.saving_throw.proficient")?.value === "1"
              }
              onClick={() => {
                const result = resolve("1d20+{strength.saving_throw}")
                toaster.info(
                  <Throw pretitle="Saving Throw" title="Strength" {...result} />
                )
              }}
            />
            <SkillBox
              name="Dexterity"
              modifier={stats.get("dexterity.saving_throw")}
              proficient={
                stats.get("dexterity.saving_throw.proficient")?.value === "1"
              }
              onClick={() => {
                const result = resolve("1d20+{dexterity.saving_throw}")
                toaster.info(
                  <Throw
                    pretitle="Saving Throw"
                    title="Dexterity"
                    {...result}
                  />
                )
              }}
            />
            <SkillBox
              name="Constitution"
              modifier={stats.get("constitution.saving_throw")}
              proficient={
                stats.get("constitution.saving_throw.proficient")?.value === "1"
              }
              onClick={() => {
                const result = resolve("1d20+{constitution.saving_throw}")
                toaster.info(
                  <Throw
                    pretitle="Saving Throw"
                    title="Constitution"
                    {...result}
                  />
                )
              }}
            />
            <SkillBox
              name="Intelligence"
              modifier={stats.get("intelligence.saving_throw")}
              proficient={
                stats.get("intelligence.saving_throw.proficient")?.value === "1"
              }
              onClick={() => {
                const result = resolve("1d20+{intelligence.saving_throw}")
                toaster.info(
                  <Throw
                    pretitle="Saving Throw"
                    title="Intelligence"
                    {...result}
                  />
                )
              }}
            />
            <SkillBox
              name="Wisdom"
              modifier={stats.get("wisdom.saving_throw")}
              proficient={
                stats.get("wisdom.saving_throw.proficient")?.value === "1"
              }
              onClick={() => {
                const result = resolve("1d20+{wisdom.saving_throw}")
                toaster.info(
                  <Throw pretitle="Saving Throw" title="Wisdom" {...result} />
                )
              }}
            />
            <SkillBox
              name="Charisma"
              modifier={stats.get("charisma.saving_throw")}
              proficient={
                stats.get("charisma.saving_throw.proficient")?.value === "1"
              }
              onClick={() => {
                const result = resolve("1d20+{charisma.saving_throw}")
                toaster.info(
                  <Throw pretitle="Saving Throw" title="Charisma" {...result} />
                )
              }}
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
