import { useStats, Value } from "./useStats"
import { ThrowResult, useExpressionResolver } from "./useExpressionResolver"
import { Stat } from "./Stat"
import { Menu } from "./Menu"
import { pathWithBase } from "./pathWithBase"
import { useToast } from "./Toast"

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
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        <AttributeBox
          name="Strength"
          value={stats.get("attributes.strength")}
          modifier={stats.get("attributes.strength.modifier")}
          onClick={() => {
            const result = resolve("1d20+{attributes.strength.modifier}")
            toaster.info(<Throw title="Strength" {...result} />)
          }}
        />
        <AttributeBox
          name="Dexterity"
          value={stats.get("attributes.dexterity")}
          modifier={stats.get("attributes.dexterity.modifier")}
          onClick={() => {
            const result = resolve("1d20+{attributes.dexterity.modifier}")
            toaster.info(<Throw title="Dexterity" {...result} />)
          }}
        />
        <AttributeBox
          name="Constitution"
          value={stats.get("attributes.constitution")}
          modifier={stats.get("attributes.constitution.modifier")}
          onClick={() => {
            const result = resolve("1d20+{attributes.constitution.modifier}")
            toaster.info(<Throw title="Constitution" {...result} />)
          }}
        />
        <AttributeBox
          name="Intelligence"
          value={stats.get("attributes.intelligence")}
          modifier={stats.get("attributes.intelligence.modifier")}
          onClick={() => {
            const result = resolve("1d20+{attributes.intelligence.modifier}")
            toaster.info(<Throw title="Intelligence" {...result} />)
          }}
        />
        <AttributeBox
          name="Wisdom"
          value={stats.get("attributes.wisdom")}
          modifier={stats.get("attributes.wisdom.modifier")}
          onClick={() => {
            const result = resolve("1d20+{attributes.wisdom.modifier}")
            toaster.info(<Throw title="Wisdom" {...result} />)
          }}
        />
        <AttributeBox
          name="Charisma"
          value={stats.get("attributes.charisma")}
          modifier={stats.get("attributes.charisma.modifier")}
          onClick={() => {
            const result = resolve("1d20+{attributes.charisma.modifier}")
            toaster.info(<Throw title="Strength" {...result} />)
          }}
        />
      </div>
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
      <Stat value={modifier} sign className="text-3xl" />
      <div className="flex gap-2 items-baseline">
        {name}
        <Stat value={value} />
      </div>
    </button>
  )
}
