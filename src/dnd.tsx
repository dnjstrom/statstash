import { useStats, Value } from "./useStats"
import { JSX } from "preact"

export const DNDLayout = () => {
  const stats = useStats()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center p-2 justify-between bg-[oklch(0.2507_0.0321_232.15)]">
        <Stat value={stats.get("name")}></Stat>
        <Stat value={stats.get("class")}></Stat>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <AttributeBox
          name="Strength"
          value={stats.get("attributes.strength")}
          modifier={stats.get("attributes.strength.modifier")}
        />
        <AttributeBox
          name="Dexterity"
          value={stats.get("attributes.dexterity")}
          modifier={stats.get("attributes.dexterity.modifier")}
        />
        <AttributeBox
          name="Constitution"
          value={stats.get("attributes.constitution")}
          modifier={stats.get("attributes.constitution.modifier")}
        />
        <AttributeBox
          name="Intelligence"
          value={stats.get("attributes.intelligence")}
          modifier={stats.get("attributes.intelligence.modifier")}
        />
        <AttributeBox
          name="Wisdom"
          value={stats.get("attributes.wisdom")}
          modifier={stats.get("attributes.wisdom.modifier")}
        />
        <AttributeBox
          name="Charisma"
          value={stats.get("attributes.charisma")}
          modifier={stats.get("attributes.charisma.modifier")}
        />
      </div>
    </div>
  )
}

const AttributeBox = ({
  name,
  value,
  modifier,
}: {
  name: string
  value: Value
  modifier: Value
}) => (
  <div className="flex flex-col justify-center items-center p-2 bg-[oklch(0.2507_0.0321_232.15)]">
    <Stat value={modifier} sign className="text-3xl" />
    <div className="flex items-center">
      (<Stat value={value} className="text-sm" />)
    </div>
    <div>{name}</div>
  </div>
)

const Stat = ({
  value,
  sign,
  ...otherProps
}: { value: Value; sign?: boolean } & JSX.HTMLAttributes<HTMLDivElement>) => {
  const prefix = sign && value?.value && getSign(parseFloat(value.value + ""))

  const parts = [prefix, value ?? "–"].filter(Boolean)

  return <div {...otherProps}>{parts.join("")}</div>
}

const getSign = (value: number) => {
  if (value < 0) return "-"
  return undefined
}
