import { Value } from "../data/useStats"
import { Dot } from "./Dot"
import { Stat } from "./Stat"
import { InteractiveElement } from "./InteractiveElement"

export const SkillBox = ({
  name,
  modifier,
  proficient,
  onClick,
  onLongPress,
  ...rest
}: {
  name: string
  modifier: Value
  proficient: boolean
  onClick: () => void
  onLongPress: () => void
}) => {
  return (
    <InteractiveElement
      onClick={onClick}
      onLongPress={onLongPress}
      className="flex gap-2 items-baseline px-4 py-2"
      {...rest}
    >
      <div className="flex justify-center items-center text-xl w-2 h-2">
        <Dot filled={proficient} />
      </div>

      {name}

      <div className="ml-auto">
        <Stat value={modifier} />
      </div>
    </InteractiveElement>
  )
}
