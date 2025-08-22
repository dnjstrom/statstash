import { Stat } from "./Stat"
import { Value } from "../data/useStats"
import { InteractiveElement } from "./InteractiveElement"

export const AttributeBox = ({
  name,
  value,
  modifier,
  onClick,
  onLongPress,
  ...rest
}: {
  name: string
  value: Value
  modifier: Value
  onClick: () => void
  onLongPress: () => void
}) => {
  return (
    <InteractiveElement
      onClick={onClick}
      onLongPress={onLongPress}
      className="flex flex-col justify-center items-center p-2"
      {...rest}
    >
      <Stat value={modifier} className="text-3xl" />
      <div className="flex gap-2 items-baseline">
        {name}
        <Stat value={value} />
      </div>
    </InteractiveElement>
  )
}
