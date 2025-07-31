import { evaluateExpression } from "./evaluateExpression"

export const resolveStatReferences = (
  expression: string,
  resolver: (name: string) => string
): string => {
  const name = expression.match(/{([^{}]+)}/i)?.[1]

  if (!name) return expression

  let value = resolver(name?.trim())

  if (!value) throw new Error(`Can't resolve value for stat ${name?.trim()}`)

  value = String(evaluateExpression(resolveStatReferences(value, resolver)))

  const resolved = expression.replace(`{${name}}`, String(value))

  return resolved.replace(/\+-/gi, "-")
}
