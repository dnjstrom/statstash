import { useState } from "preact/hooks"
import { Page } from "./Page"
import { useImmer } from "use-immer"
import {
  ThrowResult,
  useExpressionResolver,
} from "../utils/useExpressionResolver"
import { updateModifier } from "../utils/updateModifier"
import { updateDice } from "../utils/updateDice"
import { repeatWithDelay } from "../utils/repeatWithDelay"
import { Button } from "../components/Button"
import { ComponentProps } from "preact"
import { cn } from "../utils/cn"

export const Dice = () => {
  const [expression, setExpression] = useState("")

  const [previousThrow, setPreviousThrow] = useImmer<ThrowResult | null>(null)
  const resolve = useExpressionResolver()

  const incrementDie = (sides: number) => {
    setExpression((prev) => {
      return updateDice(prev, sides)
    })
  }

  const incrementModifier = (value: number) => {
    setExpression((prev) => {
      return updateModifier(prev, value)
    })
  }

  const throwRepeating = async (expression: string) => {
    let previous: string | number = ""

    await repeatWithDelay(20, async () => {
      let result = resolve(expression)

      // Ensure we don't show the same result twice as it makes for a janky animation.
      // Guard against infinite loops by breaking after 100 iterations.
      for (let i = 0; i < 100; i++) {
        if (result.value !== previous) {
          break
        }

        result = resolve(expression)
      }

      setPreviousThrow(result)

      previous = result.value
    })
  }

  return (
    <Page>
      <div className="flex flex-col gap-4 justify-end h-full">
        {previousThrow ? (
          <div className="h-full flex flex-col justify-center items-center">
            <div className="relative text-9xl/24 font-black w-full text-center">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full max-w-[80%] text-lg break-all text-center">
                {previousThrow.equation}
                {previousThrow.outcome !== previousThrow.value.toString() && (
                  <>
                    <span className="text-slate-400">=</span>
                    {previousThrow.outcome}
                  </>
                )}
              </div>
              {previousThrow.value}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center text-6xl text-[oklch(0.2507_0.0321_232.15)]">
            StatStash
          </div>
        )}

        <form
          className="flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()

            setPreviousThrow(null)

            if (expression.trim() === "") {
              if (previousThrow) {
                throwRepeating(previousThrow.equation)
              }
            } else {
              throwRepeating(expression)
              setExpression("")
            }
          }}
        >
          <input
            className="p-2 text-center text-xl bg-[oklch(0.2507_0.0321_232.15)]"
            value={expression}
            onChange={(event) => {
              setExpression(event.currentTarget.value)
            }}
          />

          <div className="grid grid-cols-4 gap-2">
            <Die
              onClick={() => {
                incrementModifier(-5)
              }}
            >
              -5
            </Die>
            <Die
              onClick={() => {
                incrementModifier(-1)
              }}
            >
              -1
            </Die>
            <Die
              onClick={() => {
                incrementModifier(+1)
              }}
            >
              +1
            </Die>
            <Die
              onClick={() => {
                incrementModifier(+5)
              }}
            >
              +5
            </Die>
            <Die
              onClick={() => {
                incrementDie(2)
              }}
            >
              d2
            </Die>
            <Die
              onClick={() => {
                incrementDie(4)
              }}
            >
              d4
            </Die>
            <Die
              onClick={() => {
                incrementDie(6)
              }}
            >
              d6
            </Die>
            <Die
              onClick={() => {
                incrementDie(8)
              }}
            >
              d8
            </Die>
            <Die
              onClick={() => {
                incrementDie(10)
              }}
            >
              d10
            </Die>
            <Die
              onClick={() => {
                incrementDie(12)
              }}
            >
              d12
            </Die>
            <Die
              onClick={() => {
                incrementDie(20)
              }}
            >
              d20
            </Die>
            <Die
              onClick={() => {
                incrementDie(100)
              }}
            >
              d100
            </Die>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Die
              onClick={() => {
                setExpression("")

                if (expression.trim() === "") {
                  setPreviousThrow(null)
                }
              }}
            >
              Clear
            </Die>
            <Die type="submit" className="col-span-2">
              Roll
            </Die>
          </div>
        </form>
      </div>
    </Page>
  )
}

const Die = ({ className, ...props }: ComponentProps<typeof Button>) => (
  <Button {...props} className={cn("py-3", className)} />
)
