import { Stat } from "./Stat"
import { Value } from "./useStats"

export const AttributeBox = ({
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
