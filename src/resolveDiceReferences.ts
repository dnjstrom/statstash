export const resolveDiceReferences = (expression: string): string => {
  const reference = expression.match(/\b(\d+d\d+)\b/i)?.[1]

  if (!reference) return expression

  const [amount, value] = reference.split(/d/i).map((n) => parseInt(n, 10))

  let sum = 0

  for (let i = 0; i < amount; i += 1) {
    sum += randomInt(value)
  }

  const resolved = expression.replace(reference, String(sum))

  return resolveDiceReferences(resolved)
}

const randomInt = (max: number) => Math.ceil(Math.random() * max)
