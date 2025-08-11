import { describe, expect, it } from "vitest"
import { updateDice } from "./updateDice"

describe("updateDie", () => {
  // Test with empty expressions
  it("should handle empty expressions", () => {
    expect(updateDice("", 4)).toBe("1d4")
    expect(updateDice("  ", 20)).toBe("1d20")
    expect(updateDice("", 6, 2)).toBe("2d6")
  })

  // Test with expressions that don't contain the die type
  it("should add dice to expressions without that die type", () => {
    expect(updateDice("1d6", 4)).toBe("1d6+1d4")
    expect(updateDice("1d20", 6)).toBe("1d20+1d6")
    expect(updateDice("2d10", 20, 2)).toBe("2d10+2d20")
  })

  // Test with expressions that already have the die type
  it("should update existing dice of the same type", () => {
    expect(updateDice("1d4", 4)).toBe("2d4")
    expect(updateDice("2d6", 6)).toBe("3d6")
    expect(updateDice("1d20", 20, 2)).toBe("3d20")
  })

  // Test with complex expressions
  it("should handle complex expressions", () => {
    expect(updateDice("1d4+1d6", 4)).toBe("1d4+1d6+1d4")
    expect(updateDice("1d6+1d4", 4)).toBe("1d6+2d4")
    expect(updateDice("1d4+1d6+5", 4)).toBe("1d4+1d6+5+1d4")
    expect(updateDice("1d20+5+2d6", 6)).toBe("1d20+5+3d6")
  })

  // Test with multiple occurrences of the same die
  it("should add dice to the end unless it's the last term", () => {
    expect(updateDice("1d6+2d6", 6)).toBe("1d6+3d6")
    expect(updateDice("1d4+3+2d4", 4)).toBe("1d4+3+3d4")
    expect(updateDice("1d4+1d6+1d4", 4, 2)).toBe("1d4+1d6+3d4")
    expect(updateDice("1d6+1d4+1d6", 6)).toBe("1d6+1d4+2d6")
    expect(updateDice("1d4+1d6+1d8", 4)).toBe("1d4+1d6+1d8+1d4")
  })

  // Test with negative amount (decreasing dice)
  it("should handle decreasing dice count", () => {
    expect(updateDice("2d6", 6, -1)).toBe("1d6")
    expect(updateDice("1d20", 20, -1)).toBe("")
    expect(updateDice("1d4+2d6", 6, -1)).toBe("1d4+1d6")
    expect(updateDice("1d4+1d6", 6, -1)).toBe("1d4")
  })

  // Test edge cases with operators
  it("should handle edge cases with operators", () => {
    expect(updateDice("1d20+1d4", 4, -1)).toBe("1d20")
    expect(updateDice("1d20-1d4", 4, -1)).toBe("1d20")
    expect(updateDice("1d4+5", 4, -1)).toBe("5")
    expect(updateDice("+1d4", 4, -1)).toBe("")
    expect(updateDice("1d6+1d4+3", 4, -1)).toBe("1d6+3")
  })
})
