import { randomInt } from "./randomInt"

export const resolveDiceReferences = (expression: string): string => {
  const reference = expression.match(/\b(\d+d\d+)\b/i)?.[1]

  if (!reference) return expression

  const [amount, value] = reference.split(/d/i).map((n) => parseInt(n, 10))

  let sum = ""

  for (let i = 0; i < amount; i += 1) {
    sum += (i === 0 ? "" : "+") + randomInt(value)
  }

  const resolved = expression.replace(reference, String(sum))

  return resolveDiceReferences(resolved)
}
