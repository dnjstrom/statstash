/**
 * Updates a dice expression by incrementing/decrementing a specific die type
 * or adding a new die if necessary.
 *
 * @param expression - The current dice expression
 * @param sides - The number of sides of the die to increment (e.g., 4 for d4, 20 for d20)
 * @param amount - The amount to change the die count by (default: 1)
 * @returns The updated dice expression
 */
export function updateDice(
  expression: string,
  sides: number,
  amount: number = 1
): string {
  // If empty, just add the new die
  if (expression.trim() === "") {
    return `${amount}d${sides}`
  }

  // Create a regex that matches dice of the specified type
  const dieRegex = new RegExp(`(\\d+)d(${sides})(?![\\d])`, "g")

  // Find all matches to identify if we have any dice of this type
  const matches = [...expression.matchAll(dieRegex)]

  // If we're removing dice and found matches
  if (amount < 0 && matches.length > 0) {
    // Target the last occurrence of this die type
    const lastMatch = matches[matches.length - 1]
    const matchedText = lastMatch[0]
    const dieCount = parseInt(lastMatch[1], 10)
    const newValue = dieCount + amount

    // If the new value is zero or negative, remove the die entirely
    if (newValue <= 0) {
      // Calculate the position of this die in the expression
      const matchIndex = lastMatch.index || 0
      const beforePart = expression.substring(0, matchIndex)
      const afterPart = expression.substring(matchIndex + matchedText.length)

      // Check if there's an operator before the die
      const operatorBeforeRegex = /([+-])\s*$/
      const operatorBefore = beforePart.match(operatorBeforeRegex)

      let result
      if (operatorBefore) {
        // Remove the operator and the die
        result = beforePart.replace(operatorBeforeRegex, "") + afterPart
      } else {
        // Just remove the die (it was the first term)
        result = beforePart + afterPart
      }

      // Clean up the result
      result = result
        .replace(/^\+\s*/, "") // Remove leading +
        .replace(/([+-])\s*([+-])/, "$2") // Clean up consecutive operators
        .trim()

      return result
    }

    // Update the die count
    return (
      expression.substring(0, lastMatch.index) +
      `${newValue}d${sides}` +
      expression.substring((lastMatch.index || 0) + matchedText.length)
    )
  }

  // Check if the last term is the die we're looking for
  const lastDieRegex = new RegExp(`(\\d+)d(${sides})(?![\\d])\\s*$`, "i")
  const lastDieMatch = expression.match(lastDieRegex)

  if (lastDieMatch) {
    // If the last term is the die we're looking for, update it
    const lastDieCount = parseInt(lastDieMatch[1], 10)
    const newValue = lastDieCount + amount
    return expression.replace(lastDieRegex, `${newValue}d${sides}`)
  }

  // If we're trying to decrease and there's no die to decrease, do nothing
  if (amount <= 0) {
    return expression
  }

  // Add the die with appropriate operator
  if (expression.trim() !== "") {
    // Preserve spacing pattern from the original expression
    const hasSpacesAroundOperators = / [+\-] /.test(expression)
    const operator = hasSpacesAroundOperators ? " + " : "+"

    // Check if the expression already ends with an operator
    if (/[+-]\s*$/.test(expression)) {
      return `${expression}${amount}d${sides}`
    }
    return `${expression}${operator}${amount}d${sides}`
  }

  return `${amount}d${sides}`
}
