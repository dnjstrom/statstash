export const resolveStatReferences = (
  expression: string,
  resolver: (name: string) => string
): string => {
  const name = expression.match(/{([^{}]+)}/i)?.[1]

  if (!name) return expression

  const value = resolver(name?.trim())

  if (!value) throw new Error(`Can't resolve value for stat ${name?.trim()}`)

  const resolved = expression.replace(`{${name}}`, String(value))

  return resolveStatReferences(resolved, resolver)
}
