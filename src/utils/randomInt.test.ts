import { describe, it, expect } from "vitest"
import { randomInt } from "./randomInt"

describe("randomInt", () => {
  it("should return a number", () => {
    const result = randomInt(6)
    expect(typeof result).toBe("number")
  })

  it("should return an integer", () => {
    const result = randomInt(10)
    expect(Number.isInteger(result)).toBe(true)
  })

  it("should return a value between 1 and the max (inclusive)", () => {
    const max = 6
    const result = randomInt(max)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(max)
  })

  it("should be able to return the maximum value", () => {
    // Mock Math.random to return 0.9999 (which will result in the max value)
    const originalRandom = Math.random
    Math.random = () => 0.9999

    const max = 6
    const result = randomInt(max)
    expect(result).toBe(max)

    // Restore the original Math.random
    Math.random = originalRandom
  })

  it("should be able to return the minimum value (1)", () => {
    // Mock Math.random to return a very small value
    const originalRandom = Math.random
    Math.random = () => 0.0001

    const result = randomInt(6)
    expect(result).toBe(1)

    // Restore the original Math.random
    Math.random = originalRandom
  })

  it("should handle large maximum values", () => {
    const max = 1000000
    const result = randomInt(max)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(max)
  })
})
