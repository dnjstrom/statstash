/**
 * Delays the execution for a specified amount of time.

 * @param ms - The number of milliseconds to delay

 * @returns A promise that resolves after the specified delay
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))
