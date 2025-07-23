import { expect, test } from "vitest"
import { resolveStatReferences as resolveStatReferences } from "./resolveStatReferences.ts"

test("Resolves single stat references", () => {
  const stats: Record<string, string> = {
    "attributes.strength": "15",
  }

  expect(
    resolveStatReferences("({attributes.strength}-10)/2", (name) => stats[name])
  ).toBe("(15-10)/2")
})

test("Resolves multiple stat references", () => {
  const stats: Record<string, string> = {
    "attributes.strength": "18",
    "attributes.dexterity": "10",
    "attributes.constitution": "15",
  }

  expect(
    resolveStatReferences(
      "{attributes.strength}+{attributes.dexterity}+{attributes.constitution}",
      (name) => stats[name]
    )
  ).toBe("18+10+15")
})
