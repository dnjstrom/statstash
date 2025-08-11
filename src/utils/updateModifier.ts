/**
 * Updates a dice expression by incrementing/decrementing the last modifier
 * or adding a new modifier if necessary.
 *
 * @param expression - The current dice expression
 * @param value - The value to add to the last modifier
 * @returns The updated dice expression
 */
export function updateModifier(expression: string, value: number): string {
  // If empty, just return the value
  if (expression.trim() === "") {
    return `${value}`
  }

  // If the entire expression is just a standalone number, update it
  if (/^\s*-?\d+\s*$/.test(expression)) {
    const currentValue = parseInt(expression, 10)
    return `${currentValue + value}`
  }

  // Look for the last modifier in the expression
  // This regex matches the last +/- followed by a number at the end of the string
  // Handle spaces properly with \s*
  const modifierRegex = /([+-])\s*(\d+)$/
  const modifierMatch = expression.match(modifierRegex)

  if (modifierMatch) {
    // We have a trailing modifier, update it
    const operator = modifierMatch[1] // + or -
    const currentValue = parseInt(modifierMatch[2], 10)

    // Calculate new value based on operator
    let newValue = currentValue
    if (operator === "+") {
      newValue += value
    } else {
      // If we have a negative modifier and we're adding to it
      newValue = value - currentValue
    }

    // Handle case when the new value becomes zero - preserve if original was +0
    if (newValue === 0) {
      // If we're adding 0 to an existing +0, preserve it
      if (operator === "+" && currentValue === 0 && value === 0) {
        return expression
      }
      return expression.slice(0, expression.length - modifierMatch[0].length)
    }

    // Format with the same spacing as original
    const spacing = modifierMatch[0].includes(" ") ? " " : ""

    // Handle sign change and new value
    if (newValue < 0) {
      return (
        expression.slice(0, expression.length - modifierMatch[0].length) +
        "-" +
        spacing +
        Math.abs(newValue)
      )
    } else {
      return (
        expression.slice(0, expression.length - modifierMatch[0].length) +
        "+" +
        spacing +
        newValue
      )
    }
  }

  // No modifier at the end, add a new one
  return expression + (value >= 0 ? `+${value}` : value.toString())
}
