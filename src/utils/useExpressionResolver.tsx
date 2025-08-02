import { evaluateExpression } from "./evaluateExpression"
import { resolveDiceReferences } from "./resolveDiceReferences"
import { resolveStatReferences } from "./resolveStatReferences"
import { useStats } from "../data/useStats"

export type ThrowResult = {
  value: string | number
  equation: string
  outcome: string
}

export const useExpressionResolver = () => {
  const stats = useStats()

  return (expression: string): ThrowResult => {
    const equation = resolveStatReferences(expression, (name) => {
      const value = stats.get(name)

      if (!value) throw new Error(`Unable to resolve value for stat {${name}}.`)

      return String(value)
    })

    const outcome = resolveDiceReferences(equation)

    const value = evaluateExpression(outcome)

    return {
      value,
      equation,
      outcome,
    }
  }
}
