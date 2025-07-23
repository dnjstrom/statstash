import PWABadge from "./PWABadge.tsx"
import { useStats } from "./useStats.tsx"

export const Home = () => {
  const stats = useStats()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl">StatStash</h1>

      <hr />

      {stats.entries.map(([key, value]) => (
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
            className="cursor-pointer"
            onClick={() => {
              stats.remove(key)
            }}
          >
            ❌
          </button>
        </div>
      ))}

      <hr />

      <form
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          const formData = new FormData(event.currentTarget)

          const key = formData.get("key")

          if (!key || typeof key !== "string") return

          stats.add(key, "")

          event.currentTarget.reset()
        }}
      >
        <label>
          New stat: <input className="border px-1" name="key" />
        </label>
        <button className="cursor-pointer ml-1">Add</button>
      </form>

      <PWABadge />
    </div>
  )
}
