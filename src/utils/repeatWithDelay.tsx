import { delay } from "./delay"

export const repeatWithDelay = async (
  count: number,
  callback: () => Promise<void>,
  delayMs: number = 10
) => {
  for (let i = 0; i < count; i++) {
    await callback()
    await delay(delayMs)
  }
}
