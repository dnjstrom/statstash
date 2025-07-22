import PWABadge from "./PWABadge.tsx"
import "./app.css"
import { useStats } from "./useStats.ts"

export const App = () => {
  const { stats, addStat, removeStat } = useStats()

  return (
    <>
      <h1 className="text-2xl">StatStash</h1>

      <div className="flex flex-col gap-2">
        {[...stats.entries()].map(([key, value]) => (
          <div className="flex gap-4 justify-center items-center">
            {key}:
            <input
              className="border px-1"
              onInput={(updated) => {
                value.value = updated.currentTarget.value
              }}
              value={value}
            />
            <button
              onClick={() => {
                removeStat(key)
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <form
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            const formData = new FormData(event.currentTarget)

            const key = formData.get("key")

            if (!key || typeof key !== "string") return

            addStat(key, "")

            event.currentTarget.reset()
          }}
        >
          <label>
            New stat: <input className="border px-1" name="key" />
          </label>
          <button className="ml-1">Add</button>
        </form>
      </div>

      <PWABadge />
    </>
  )
}
