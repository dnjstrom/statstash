import { useStats } from "../data/useStats"
import { useExpressionResolver } from "../utils/useExpressionResolver"
import { useToast } from "../components/Toast"
import { AttributeBox } from "../components/AttributeBox"
import { SkillBox } from "../components/SkillBox"
import { Section } from "../components/Section"
import { Throw } from "../components/Throw"
import { Page } from "./Page"
import { repeatWithDelay } from "../utils/repeatWithDelay"

export const Skills = () => {
  const stats = useStats()

  const resolve = useExpressionResolver()

  const toaster = useToast()

  const throwRepeating = async ({
    expression,
    pretitle,
    title,
  }: {
    expression: string
    pretitle: string
    title: string
  }) => {
    await repeatWithDelay(10, async () => {
      const result = resolve(expression)
      toaster.info(<Throw pretitle={pretitle} title={title} {...result} />)
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
          />
        </div>
      </Section>
    </Page>
  )
}
