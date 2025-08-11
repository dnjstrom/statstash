import { describe, expect, it } from "vitest"
import { updateModifier } from "./updateModifier"

describe("updateModifier", () => {
  // Test with empty expressions
  it("should handle empty expressions", () => {
    expect(updateModifier("", 1)).toBe("1")
    expect(updateModifier("  ", 5)).toBe("5")
    expect(updateModifier("", -3)).toBe("-3")
  })

  // Test with standalone numbers
  it("should update standalone numbers", () => {
    expect(updateModifier("1", 1)).toBe("2")
    expect(updateModifier("5", 10)).toBe("15")
    expect(updateModifier("10", -5)).toBe("5")
    expect(updateModifier("5", -10)).toBe("-5")
    expect(updateModifier("-5", 10)).toBe("5")
    expect(updateModifier("-5", -10)).toBe("-15")
  })

  // Test with dice expressions
  it("should add modifiers to dice expressions", () => {
    expect(updateModifier("1d4", 1)).toBe("1d4+1")
    expect(updateModifier("1d20", 5)).toBe("1d20+5")
    expect(updateModifier("2d6", -3)).toBe("2d6-3")
  })

  // Test with expressions that already have modifiers
  it("should update existing modifiers", () => {
    expect(updateModifier("1d4+1", 1)).toBe("1d4+2")
    expect(updateModifier("1d4-1", 1)).toBe("1d4")
    expect(updateModifier("1d4-1", 2)).toBe("1d4+1")
    expect(updateModifier("1d4+2", -1)).toBe("1d4+1")
    expect(updateModifier("1d4+1", -2)).toBe("1d4-1")
    expect(updateModifier("1d4+0", 0)).toBe("1d4+0")
  })

  // Test with complex expressions
  it("should handle complex expressions", () => {
    expect(updateModifier("1d4+1+1d6", 2)).toBe("1d4+1+1d6+2")
    expect(updateModifier("1d4+1+1d6+1", 2)).toBe("1d4+1+1d6+3")
    expect(updateModifier("1d4+1+1d6-2", 2)).toBe("1d4+1+1d6")
    expect(updateModifier("1d4+1+1d6-2", 5)).toBe("1d4+1+1d6+3")
    expect(updateModifier("1d4+1+1d6+2", -5)).toBe("1d4+1+1d6-3")
    expect(updateModifier("1d4+5+2d6+1d8+10", 5)).toBe("1d4+5+2d6+1d8+15")
  })

  // Test edge cases
  it("should handle edge cases", () => {
    // Handles spaces
    expect(updateModifier("1d4 + 2", 3)).toBe("1d4 + 5")
    // Handles multiple modifiers correctly (only updates the last one)
    expect(updateModifier("1d4+2+3", 1)).toBe("1d4+2+4")
    // Zero value modifiers should be preserved if adding zero
    expect(updateModifier("1d4+0", 0)).toBe("1d4+0")
  })
})
