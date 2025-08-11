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

  const throwRepeating = async () => {
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
            <div className="max-w-[80%] text-lg break-all text-center">
              {previousThrow.equation}
              {previousThrow.outcome !== previousThrow.value.toString() && (
                <>
                  <span className="text-slate-400">=</span>
                  {previousThrow.outcome}
                </>
              )}
            </div>

            <div className="text-9xl font-black">{previousThrow.value}</div>
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

            if (expression.trim() === "") return

            throwRepeating()
          }}
        >
          <input
            className="rounded p-2 text-center"
            value={expression}
            onChange={(event) => {
              setExpression(event.currentTarget.value)
            }}
          />

          <div className="grid grid-cols-4 gap-2">
            <Button
              onClick={() => {
                incrementModifier(+1)
              }}
            >
              +1
            </Button>
            <Button
              onClick={() => {
                incrementModifier(+5)
              }}
            >
              +5
            </Button>
            <Button
              onClick={() => {
                incrementModifier(+10)
              }}
            >
              +10
            </Button>
            <Button
              onClick={() => {
                incrementModifier(+50)
              }}
            >
              +50
            </Button>
            <Button
              onClick={() => {
                incrementDie(2)
              }}
            >
              d2
            </Button>
            <Button
              onClick={() => {
                incrementDie(4)
              }}
            >
              d4
            </Button>
            <Button
              onClick={() => {
                incrementDie(6)
              }}
            >
              d6
            </Button>
            <Button
              onClick={() => {
                incrementDie(8)
              }}
            >
              d8
            </Button>
            <Button
              onClick={() => {
                incrementDie(10)
              }}
            >
              d10
            </Button>
            <Button
              onClick={() => {
                incrementDie(12)
              }}
            >
              d12
            </Button>
            <Button
              onClick={() => {
                incrementDie(20)
              }}
            >
              d20
            </Button>
            <Button
              onClick={() => {
                incrementDie(100)
              }}
            >
              100
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => {
                setExpression("")

                if (expression.trim() === "") {
                  setPreviousThrow(null)
                }
              }}
            >
              Clear
            </Button>
            <Button type="submit" className="col-span-2">
              Throw
            </Button>
          </div>
        </form>
      </div>
    </Page>
  )
}
