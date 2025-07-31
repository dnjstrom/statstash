import { Value } from "./useStats"
import { JSX } from "preact"
import { useExpressionResolver } from "./useExpressionResolver"

export const Stat = ({
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
