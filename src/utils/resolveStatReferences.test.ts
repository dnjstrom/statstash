import { expect, test } from "vitest"
import { resolveStatReferences as resolveStatReferences } from "./resolveStatReferences.ts"

test("Resolves single stat references", () => {
  const stats: Record<string, string> = {
    strength: "15",
  }

  expect(
    resolveStatReferences("({strength}-10)/2", (name) => stats[name])
  ).toBe("(15-10)/2")
})

test("Resolves multiple stat references", () => {
  const stats: Record<string, string> = {
    strength: "18",
    dexterity: "10",
    constitution: "15",
  }

  expect(
    resolveStatReferences(
      "{strength}+{dexterity}+{constitution}",
      (name) => stats[name]
    )
  ).toBe("18+10+15")
})
