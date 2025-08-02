import { useStats } from "../data/useStats"
import { useExpressionResolver } from "../utils/useExpressionResolver"
import { useToast } from "../components/Toast"
import { AttributeBox } from "../components/AttributeBox"
import { SkillBox } from "../components/SkillBox"
import { Section } from "../components/Section"
import { Throw } from "../components/Throw"
import { Header } from "./Header"

export const Skills = () => {
  const stats = useStats()

  const resolve = useExpressionResolver()

  const toaster = useToast()

  return (
    <div className="flex flex-col">
      <Header />

      <div className="px-2 flex flex-col gap-2">
        <Section title="Attributes">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <AttributeBox
              name="Strength"
              value={stats.get("strength.attribute")}
              modifier={stats.get("strength")}
              onClick={() => {
                const result = resolve("1d20+{strength}")
                toaster.info(
                  <Throw pretitle="Attribute" title="Strength" {...result} />
                )
              }}
            />
            <AttributeBox
              name="Dexterity"
              value={stats.get("dexterity.attribute")}
              modifier={stats.get("dexterity")}
              onClick={() => {
                const result = resolve("1d20+{dexterity}")
                toaster.info(
                  <Throw pretitle="Attribute" title="Dexterity" {...result} />
                )
              }}
            />
            <AttributeBox
              name="Constitution"
              value={stats.get("constitution.attribute")}
              modifier={stats.get("constitution")}
              onClick={() => {
                const result = resolve("1d20+{constitution}")
                toaster.info(
                  <Throw
                    pretitle="Attribute"
                    title="Constitution"
                    {...result}
                  />
                )
              }}
            />
            <AttributeBox
              name="Intelligence"
              value={stats.get("intelligence.attribute")}
              modifier={stats.get("intelligence")}
              onClick={() => {
                const result = resolve("1d20+{intelligence}")
                toaster.info(
                  <Throw
                    pretitle="Attribute"
                    title="Intelligence"
                    {...result}
                  />
                )
              }}
            />
            <AttributeBox
              name="Wisdom"
              value={stats.get("wisdom.attribute")}
              modifier={stats.get("wisdom")}
              onClick={() => {
                const result = resolve("1d20+{wisdom}")
                toaster.info(
                  <Throw pretitle="Attribute" title="Wisdom" {...result} />
                )
              }}
            />
            <AttributeBox
              name="Charisma"
              value={stats.get("charisma.attribute")}
              modifier={stats.get("charisma")}
              onClick={() => {
                const result = resolve("1d20+{charisma}")
                toaster.info(
                  <Throw pretitle="Attribute" title="Strength" {...result} />
                )
              }}
            />
          </div>
        </Section>

        <Section title="Skills">
          <div className="grid grid-cols-2 gap-2">
            <SkillBox
              name="Acrobatics"
              modifier={stats.get("acrobatics")}
              proficient={stats.get("acrobatics.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{acrobatics}")
                toaster.info(
                  <Throw pretitle="Skill" title="Acrobatics" {...result} />
                )
              }}
            />
            <SkillBox
              name="Animal Handling"
              modifier={stats.get("animal_handling")}
              proficient={
                stats.get("animal_handling.proficient")?.value === "1"
              }
              onClick={() => {
                const result = resolve("1d20+{animal_handling}")
                toaster.info(
                  <Throw pretitle="Skill" title="Animal Handling" {...result} />
                )
              }}
            />
            <SkillBox
              name="Arcana"
              modifier={stats.get("arcana")}
              proficient={stats.get("arcana.proficient")?.value === "1"}
              onClick={() => {
                console.log("ASDF", stats.get("arcana.proficient")?.value)
                const result = resolve("1d20+{arcana}")
                toaster.info(
                  <Throw pretitle="Skill" title="Arcana" {...result} />
                )
              }}
            />
            <SkillBox
              name="Athletics"
              modifier={stats.get("athletics")}
              proficient={stats.get("athletics.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{athletics}")
                toaster.info(
                  <Throw pretitle="Skill" title="Athletics" {...result} />
                )
              }}
            />
            <SkillBox
              name="Deception"
              modifier={stats.get("deception")}
              proficient={stats.get("deception.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{deception}")
                toaster.info(
                  <Throw pretitle="Skill" title="Deception" {...result} />
                )
              }}
            />
            <SkillBox
              name="History"
              modifier={stats.get("history")}
              proficient={stats.get("history.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{history}")
                toaster.info(
                  <Throw pretitle="Skill" title="History" {...result} />
                )
              }}
            />
            <SkillBox
              name="Insight"
              modifier={stats.get("insight")}
              proficient={stats.get("insight.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{insight}")
                toaster.info(
                  <Throw pretitle="Skill" title="Insight" {...result} />
                )
              }}
            />
            <SkillBox
              name="Intimidation"
              modifier={stats.get("intimidation")}
              proficient={stats.get("intimidation.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{intimidation}")
                toaster.info(
                  <Throw pretitle="Skill" title="Intimidation" {...result} />
                )
              }}
            />
            <SkillBox
              name="Investigation"
              modifier={stats.get("investigation")}
              proficient={stats.get("investigation.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{investigation}")
                toaster.info(
                  <Throw pretitle="Skill" title="Investigation" {...result} />
                )
              }}
            />
            <SkillBox
              name="Medicine"
              modifier={stats.get("medicine")}
              proficient={stats.get("medicine.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{medicine}")
                toaster.info(
                  <Throw pretitle="Skill" title="Medicine" {...result} />
                )
              }}
            />
            <SkillBox
              name="Nature"
              modifier={stats.get("nature")}
              proficient={stats.get("nature.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{nature}")
                toaster.info(
                  <Throw pretitle="Skill" title="Nature" {...result} />
                )
              }}
            />
            <SkillBox
              name="Perception"
              modifier={stats.get("perception")}
              proficient={stats.get("perception.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{perception}")
                toaster.info(
                  <Throw pretitle="Skill" title="Perception" {...result} />
                )
              }}
            />
            <SkillBox
              name="Performance"
              modifier={stats.get("performance")}
              proficient={stats.get("performance.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{performance}")
                toaster.info(
                  <Throw pretitle="Skill" title="Performance" {...result} />
                )
              }}
            />
            <SkillBox
              name="Persuasion"
              modifier={stats.get("persuasion")}
              proficient={stats.get("persuasion.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{persuasion}")
                toaster.info(
                  <Throw pretitle="Skill" title="Persuasion" {...result} />
                )
              }}
            />
            <SkillBox
              name="Religion"
              modifier={stats.get("religion")}
              proficient={stats.get("religion.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{religion}")
                toaster.info(
                  <Throw pretitle="Skill" title="Religion" {...result} />
                )
              }}
            />
            <SkillBox
              name="Sleight of Hand"
              modifier={stats.get("sleight_of_hand")}
              proficient={
                stats.get("sleight_of_hand.proficient")?.value === "1"
              }
              onClick={() => {
                const result = resolve("1d20+{sleight_of_hand}")
                toaster.info(
                  <Throw pretitle="Skill" title="Sleight of Hand" {...result} />
                )
              }}
            />
            <SkillBox
              name="Stealth"
              modifier={stats.get("stealth")}
              proficient={stats.get("stealth.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{stealth}")
                toaster.info(
                  <Throw pretitle="Skill" title="Stealth" {...result} />
                )
              }}
            />
            <SkillBox
              name="Survival"
              modifier={stats.get("survival")}
              proficient={stats.get("survival.proficient")?.value === "1"}
              onClick={() => {
                const result = resolve("1d20+{survival}")
                toaster.info(
                  <Throw pretitle="Skill" title="Survival" {...result} />
                )
              }}
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
