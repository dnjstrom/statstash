import { Value } from "../data/useStats"
import { Dot } from "./Dot"
import { Stat } from "./Stat"
import { useInteraction } from "./useInteraction"

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
  const interaction = useInteraction({
    onClick,
    onLongPress: () => alert(`Long pressed on ${name}`),
  })

  return (
    <button
      className="flex gap-2 items-baseline px-4 py-2 bg-[oklch(0.2507_0.0321_232.15)] cursor-pointer hover:bg-[oklch(0.2707_0.0321_232.15)] active:bg-[oklch(0.2307_0.0321_232.15)] rounded-lg"
      type="button" // Explicitly set type to button to avoid form submission issues
      {...interaction}
      // Remove onClick override as we're using pointer events now
    >
      <div className="flex justify-center items-center text-xl w-2 h-2">
        <Dot filled={proficient} />
      </div>

      {name}

      <div className="ml-auto">
        <Stat value={modifier} />
      </div>
    </button>
  )
}
