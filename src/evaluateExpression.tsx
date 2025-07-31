export const evaluateExpression = (expression: string) => {
  try {
    // TODO: Write a safer evaluation function
    const number = eval(expression)
    return Math.floor(number)
  } catch (e) {
    return expression
  }
}
