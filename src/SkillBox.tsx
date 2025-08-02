import { Stat } from "./Stat"
import { Value } from "./useStats"

export const SkillBox = ({
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
      <div className="flex justify-center items-center text-xl w-2 h-2">
        {proficient ? <span className="text-cyan-600">●</span> : "○"}
      </div>
      {name}
      <div className="ml-auto">
        <Stat value={modifier} />
      </div>
    </button>
  )
}
