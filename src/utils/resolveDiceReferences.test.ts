import { expect, test } from "vitest"
import { resolveDiceReferences } from "./resolveDiceReferences.ts"

test("Resolves single dice reference", () => {
  const results = new Array(100)
    .fill(undefined)
    .map(() => resolveDiceReferences("1d4"))
    .map((n) => parseInt(n, 10))

  results.map((result) => {
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(4)
  })
})
