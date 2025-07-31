import { resolveDiceReferences } from "./resolveDiceReferences"
import { resolveStatReferences } from "./resolveStatReferences"
import { useStats } from "./useStats"

export const useExpressionResolver = () => {
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
