import { useEffect, useState } from "preact/hooks"
import PWABadge from "./PWABadge.tsx"
import "./app.css"
import "./sync.ts"
import { startSync } from "./sync.ts"
import z from "zod"

const StatDoc = z.object({
  key: z.string(),
  value: z.union([z.string(), z.number()]).optional(),
})

type Stat = z.infer<typeof StatDoc>

export const App = () => {
  const [stats, setStats] = useState(new Map<Stat["key"], Stat["value"]>())

  const setupSync = async () => {
    const { docs, handle } = await startSync((change) => {
      console.log("change", change)
      const updated = new Map(stats)

      change.change.docs.forEach((doc) => {
        const { data: stat } = z.safeParse(StatDoc, doc)

        if (!stat) return

        updated.set(stat.key, stat.value)
      })

      setStats(updated)
    })

    // Set up initial docs
    const updated = new Map(stats)
    docs.forEach((doc) => {
      const { data: stat } = z.safeParse(StatDoc, doc)

      if (!stat) return

      updated.set(stat.key, stat.value)
    })
    setStats(updated)

    return () => {
      handle.cancel()
    }
  }

  useEffect(() => void setupSync(), [])

  return (
    <>
      <h1 className="text-2xl">StatStash</h1>

      <div className="flex flex-col gap-2">
        {[...stats.entries()].map(([key, value]) => (
          <div>
            {key}: {value}
          </div>
        ))}
      </div>

      <PWABadge />
    </>
  )
}
