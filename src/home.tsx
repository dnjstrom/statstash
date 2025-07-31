import { useMemo, useState } from "preact/hooks"
import PWABadge from "./PWABadge.tsx"
import { useStats } from "./useStats.tsx"
import { Stat } from "./Stat.tsx"
import { Menu } from "./Menu.tsx"

export const Home = () => {
  const stats = useStats()
  const [search, setSearch] = useState("")

  const filteredStats = useMemo(() => {
    if (!search) return stats.entries

    return stats.entries.filter(([key]) => key.includes(search))
  }, [stats, search])

  return (
    <div className="flex flex-col gap-6 px-2">
      <div className="flex items-center gap-2">
        <Menu>
          <a href="/">DND</a>
        </Menu>

        <form
          className="flex gap-1 sticky top-0 bg-[oklch(0.2007_0.0321_232.15)] py-2 w-full"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            const formData = new FormData(event.currentTarget)

            const key = formData.get("key")

            if (!key || typeof key !== "string") return

            stats.add(key, "")
            setSearch("")

            event.currentTarget.reset()
          }}
        >
          <input
            className="border px-1 w-full"
            name="key"
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value)
            }}
          />
          <button className="cursor-pointer ml-1">Add</button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        {filteredStats.map(([key, value]) => (
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 justify-between">
              <div className="">{key}</div>

              <button
                className="cursor-pointer col-span-1"
                onClick={() => {
                  stats.remove(key)
                }}
              >
                ❌
              </button>
            </div>

            <input
              className="border px-1 w-full col-span-7"
              onInput={(updated) => {
                value.value = updated.currentTarget.value
              }}
              value={value}
            />

            <div className="flex text-neutral-400 gap-1">
              <Stat value={value} />
            </div>
          </div>
        ))}
      </div>

      <PWABadge />
    </div>
  )
}
