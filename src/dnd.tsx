import { useStats, Value } from "./useStats"
import { ThrowResult, useExpressionResolver } from "./useExpressionResolver"
import { Stat } from "./Stat"
import { Menu } from "./Menu"
import { pathWithBase } from "./pathWithBase"
import { useToast } from "./Toast"
import { ComponentChildren } from "preact"

export const DNDLayout = () => {
  const stats = useStats()

  const resolve = useExpressionResolver()

  const toaster = useToast()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center p-2 bg-[oklch(0.2507_0.0321_232.15)]">
        <Menu>
          <a href={pathWithBase("/stats")}>Stats</a>
        </Menu>
        <Stat value={stats.get("name")}></Stat>
        <div className="ml-auto">
          <Stat value={stats.get("class")}></Stat>
        </div>
      </div>

      <Section title="Attributes">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <AttributeBox
            name="Strength"
            value={stats.get("strength.attribute")}
            modifier={stats.get("strength")}
            onClick={() => {
              const result = resolve("1d20+{strength}")
              toaster.info(<Throw title="Strength" {...result} />)
            }}
          />
          <AttributeBox
            name="Dexterity"
            value={stats.get("dexterity.attribute")}
            modifier={stats.get("dexterity")}
            onClick={() => {
              const result = resolve("1d20+{dexterity}")
              toaster.info(<Throw title="Dexterity" {...result} />)
            }}
          />
          <AttributeBox
            name="Constitution"
            value={stats.get("constitution.attribute")}
            modifier={stats.get("constitution")}
            onClick={() => {
              const result = resolve("1d20+{constitution}")
              toaster.info(<Throw title="Constitution" {...result} />)
            }}
          />
          <AttributeBox
            name="Intelligence"
            value={stats.get("intelligence.attribute")}
            modifier={stats.get("intelligence")}
            onClick={() => {
              const result = resolve("1d20+{intelligence}")
              toaster.info(<Throw title="Intelligence" {...result} />)
            }}
          />
          <AttributeBox
            name="Wisdom"
            value={stats.get("wisdom.attribute")}
            modifier={stats.get("wisdom")}
            onClick={() => {
              const result = resolve("1d20+{wisdom}")
              toaster.info(<Throw title="Wisdom" {...result} />)
            }}
          />
          <AttributeBox
            name="Charisma"
            value={stats.get("charisma.attribute")}
            modifier={stats.get("charisma")}
            onClick={() => {
              const result = resolve("1d20+{charisma}")
              toaster.info(<Throw title="Strength" {...result} />)
            }}
          />
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
            onClick={() => {
              const result = resolve("1d20+{strength.saving_throw}")
              toaster.info(<Throw title="Strength Saving Throw" {...result} />)
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
              toaster.info(<Throw title="Dexterity Saving Throw" {...result} />)
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
                <Throw title="Constitution Saving Throw" {...result} />
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
                <Throw title="Intelligence Saving Throw" {...result} />
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
              toaster.info(<Throw title="Wisdom Saving Throw" {...result} />)
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
              toaster.info(<Throw title="Charisma Saving Throw" {...result} />)
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
              toaster.info(<Throw title="Acrobatics" {...result} />)
            }}
          />
          <SkillBox
            name="Animal Handling"
            modifier={stats.get("animal_handling")}
            proficient={stats.get("animal_handling.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{animal_handling}")
              toaster.info(<Throw title="Animal Handling" {...result} />)
            }}
          />
          <SkillBox
            name="Arcana"
            modifier={stats.get("arcana")}
            proficient={stats.get("arcana.proficient")?.value === "1"}
            onClick={() => {
              console.log("ASDF", stats.get("arcana.proficient")?.value)
              const result = resolve("1d20+{arcana}")
              toaster.info(<Throw title="Arcana" {...result} />)
            }}
          />
          <SkillBox
            name="Athletics"
            modifier={stats.get("athletics")}
            proficient={stats.get("athletics.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{athletics}")
              toaster.info(<Throw title="Athletics" {...result} />)
            }}
          />
          <SkillBox
            name="Deception"
            modifier={stats.get("deception")}
            proficient={stats.get("deception.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{deception}")
              toaster.info(<Throw title="Deception" {...result} />)
            }}
          />
          <SkillBox
            name="History"
            modifier={stats.get("history")}
            proficient={stats.get("history.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{history}")
              toaster.info(<Throw title="History" {...result} />)
            }}
          />
          <SkillBox
            name="Insight"
            modifier={stats.get("insight")}
            proficient={stats.get("insight.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{insight}")
              toaster.info(<Throw title="Insight" {...result} />)
            }}
          />
          <SkillBox
            name="Intimidation"
            modifier={stats.get("intimidation")}
            proficient={stats.get("intimidation.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{intimidation}")
              toaster.info(<Throw title="Intimidation" {...result} />)
            }}
          />
          <SkillBox
            name="Investigation"
            modifier={stats.get("investigation")}
            proficient={stats.get("investigation.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{investigation}")
              toaster.info(<Throw title="Investigation" {...result} />)
            }}
          />
          <SkillBox
            name="Medicine"
            modifier={stats.get("medicine")}
            proficient={stats.get("medicine.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{medicine}")
              toaster.info(<Throw title="Medicine" {...result} />)
            }}
          />
          <SkillBox
            name="Nature"
            modifier={stats.get("nature")}
            proficient={stats.get("nature.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{nature}")
              toaster.info(<Throw title="Nature" {...result} />)
            }}
          />
          <SkillBox
            name="Perception"
            modifier={stats.get("perception")}
            proficient={stats.get("perception.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{perception}")
              toaster.info(<Throw title="Perception" {...result} />)
            }}
          />
          <SkillBox
            name="Performance"
            modifier={stats.get("performance")}
            proficient={stats.get("performance.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{performance}")
              toaster.info(<Throw title="Performance" {...result} />)
            }}
          />
          <SkillBox
            name="Persuasion"
            modifier={stats.get("persuasion")}
            proficient={stats.get("persuasion.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{persuasion}")
              toaster.info(<Throw title="Persuasion" {...result} />)
            }}
          />
          <SkillBox
            name="Religion"
            modifier={stats.get("religion")}
            proficient={stats.get("religion.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{religion}")
              toaster.info(<Throw title="Religion" {...result} />)
            }}
          />
          <SkillBox
            name="Sleight of Hand"
            modifier={stats.get("sleight_of_hand")}
            proficient={stats.get("sleight_of_hand.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{sleight_of_hand}")
              toaster.info(<Throw title="Sleight of Hand" {...result} />)
            }}
          />
          <SkillBox
            name="Stealth"
            modifier={stats.get("stealth")}
            proficient={stats.get("stealth.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{stealth}")
              toaster.info(<Throw title="Stealth" {...result} />)
            }}
          />
          <SkillBox
            name="Survival"
            modifier={stats.get("survival")}
            proficient={stats.get("survival.proficient")?.value === "1"}
            onClick={() => {
              const result = resolve("1d20+{survival}")
              toaster.info(<Throw title="Survival" {...result} />)
            }}
          />
        </div>
      </Section>
    </div>
  )
}

const Throw = ({
  title,
  value,
  equation,
  outcome,
}: ThrowResult & { title: string }) => (
  <div className="flex gap-2 justify-between items-center">
    <div className="flex flex-col">
      <div className="text-lg font-medium">{title}</div>
      <div className="flex gap-1 text-sm text-slate-400">
        {equation}={outcome}={value}
      </div>
    </div>

    <div className="text-4xl">{value}</div>
  </div>
)

const AttributeBox = ({
  name,
  value,
  modifier,
  onClick,
}: {
  name: string
  value: Value
  modifier: Value
  onClick: () => void
}) => {
  return (
    <button
      className="flex flex-col justify-center items-center p-2 bg-[oklch(0.2507_0.0321_232.15)] cursor-pointer hover:bg-[oklch(0.2707_0.0321_232.15)] active:bg-[oklch(0.2307_0.0321_232.15)]"
      onClick={onClick}
    >
      <Stat value={modifier} className="text-3xl" />
      <div className="flex gap-2 items-baseline">
        {name}
        <Stat value={value} />
      </div>
    </button>
  )
}

const SkillBox = ({
  name,
  modifier,
  proficient,
  onClick,
}: {
  name: string
  modifier: Value
  proficient: boolean
  onClick: () => void
}) => {
  return (
    <button
      className="flex gap-2 items-baseline px-4 py-2 bg-[oklch(0.2507_0.0321_232.15)] cursor-pointer hover:bg-[oklch(0.2707_0.0321_232.15)] active:bg-[oklch(0.2307_0.0321_232.15)]"
      onClick={onClick}
    >
      <div>{proficient ? "●" : "○"}</div>
      {name}
      <div className="ml-auto">
        <Stat value={modifier} />
      </div>
    </button>
  )
}

const Section = ({
  title,
  children,
}: {
  title: string
  children: ComponentChildren
}) => {
  return (
    <div>
      <div className="text-sm font-medium ml-2">{title}</div>

      {children}
    </div>
  )
}
