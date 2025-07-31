import { evaluateExpression } from "./evaluateExpression"
import { resolveDiceReferences } from "./resolveDiceReferences"
import { resolveStatReferences } from "./resolveStatReferences"
import { useStats } from "./useStats"

const EXPRESSION_RESOLVER_OPTIONS = {
  dice: true,
  stats: true,
  evaluate: true,
}

export type ThrowResult = {
  value: string | number
  equation: string
  outcome: string
}

export const useExpressionResolver = () => {
  const stats = useStats()

  return (
    expression: string,
    options?: { dice: boolean; stats: boolean; evaluate: boolean }
  ): ThrowResult => {
    const opt = { ...EXPRESSION_RESOLVER_OPTIONS, ...options }

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
