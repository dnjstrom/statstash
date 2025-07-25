import { resolveStatReferences } from "./resolveStatReferences"
import { useStats, Value } from "./useStats"
import { JSX } from "preact"
import { resolveDiceReferences } from "./resolveDiceReferences"

export const DNDLayout = () => {
  const stats = useStats()

  const resolve = useExpressionResolver()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center p-2 justify-between bg-[oklch(0.2507_0.0321_232.15)]">
        <Stat value={stats.get("name")}></Stat>
        <Stat value={stats.get("class")}></Stat>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        <AttributeBox
          name="Strength"
          value={stats.get("attributes.strength")}
          modifier={stats.get("attributes.strength.modifier")}
          onClick={() => {
            console.log(resolve("1d20+{attributes.strength.modifier}"))
          }}
        />
        <AttributeBox
          name="Dexterity"
          value={stats.get("attributes.dexterity")}
          modifier={stats.get("attributes.dexterity.modifier")}
          onClick={() => {
            console.log(resolve("1d20+{attributes.dexterity.modifier}"))
          }}
        />
        <AttributeBox
          name="Constitution"
          value={stats.get("attributes.constitution")}
          modifier={stats.get("attributes.constitution.modifier")}
          onClick={() => {
            console.log(resolve("1d20+{attributes.constitution.modifier}"))
          }}
        />
        <AttributeBox
          name="Intelligence"
          value={stats.get("attributes.intelligence")}
          modifier={stats.get("attributes.intelligence.modifier")}
          onClick={() => {
            console.log(resolve("1d20+{attributes.intelligence.modifier}"))
          }}
        />
        <AttributeBox
          name="Wisdom"
          value={stats.get("attributes.wisdom")}
          modifier={stats.get("attributes.wisdom.modifier")}
          onClick={() => {
            console.log(resolve("1d20+{attributes.wisdom.modifier}"))
          }}
        />
        <AttributeBox
          name="Charisma"
          value={stats.get("attributes.charisma")}
          modifier={stats.get("attributes.charisma.modifier")}
          onClick={() => {
            console.log(resolve("1d20+{attributes.charisma.modifier}"))
          }}
        />
      </div>
    </div>
  )
}

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

const Stat = ({
  value,
  sign,
  ...otherProps
}: { value: Value; sign?: boolean } & JSX.HTMLAttributes<HTMLDivElement>) => {
  const resolve = useExpressionResolver()

  const unresolved = value?.value
  const resolved =
    typeof unresolved === "string" ? resolve(unresolved) : unresolved

  return <div {...otherProps}>{formatValue(resolved)}</div>
}

const formatValue = <T,>(value: T): string => {
  if (value === undefined) return "–"

  return String(value)
}

const useExpressionResolver = () => {
  const stats = useStats()

  return (expression: string) => {
    const resolved = resolveDiceReferences(
      resolveStatReferences(expression, (name) => {
        const value = stats.get(name)

        if (!value)
          throw new Error(`Unable to resolve value for stat {${name}}.`)

        return String(value)
      })
    )

    try {
      // TODO: Write a safer evaluation function
      const number = eval(resolved)
      return Math.floor(number)
    } catch (e) {
      return resolved
    }
  }
}
