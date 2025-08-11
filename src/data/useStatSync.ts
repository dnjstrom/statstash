import { useCallback, useEffect } from "preact/hooks"
import "./useDbChanges.ts"
import { useDbChanges } from "./useDbChanges.ts"
import z from "zod"
import { useImmer } from "use-immer"
import { enableMapSet } from "immer"
import { Signal, signal } from "@preact/signals"
import { local } from "./db.ts"

const ItemSchema = z.object({
  type: z.literal("item"),
  name: z.string(),
  description: z.string().nullable(),
  location: z.enum(["EQUIPPED", "CARRIED", "STORED"]).default("CARRIED"),
})

export type Item = z.infer<typeof ItemSchema>

const StatDoc = z.object({
  _id: z.string(),
  value: z.union([z.string(), z.number(), ItemSchema]),
})

export type Stat = z.infer<typeof StatDoc>

enableMapSet()

export const useStatSync = () => {
  const [stats, setStats] = useImmer(
    new Map<Stat["_id"], Signal<Stat["value"]>>()
  )

  const makeSignal = (id: string, value: Stat["value"]) => {
    const s = signal(value)

    // Listen to changes of the signal and propagate to the local db
    s.subscribe(async (nextValue) => {
      const current = await local.get(id)

      const updated = {
        ...current,
        value: nextValue,
      }

      await local.put(updated)
    })

    return s
  }

  const initialDocs = useDbChanges((change) => {
    change.change.docs.forEach((doc) => {
      // Handle remote deletes
      if ("_deleted" in doc) {
        return setStats((prev) => {
          prev.delete(doc._id)
        })
      }

      // Handle remote updates
      const { data: stat } = z.safeParse(StatDoc, doc)

      if (!stat) return

      setStats((previous) => {
        if (previous.has(stat._id)) {
          const current = previous.get(stat._id)!
          current.value = stat.value
        } else {
          previous.set(stat._id, makeSignal(doc._id, stat.value))
        }
      })
    })
  })

  const addStat = useCallback(
    async (_id: Stat["_id"], value: Stat["value"]) => {
      const result = await local.put({
        _id: _id,
        value,
      })

      setStats((prev) => {
        prev.set(_id, makeSignal(result.id, value))
      })
    },
    []
  )

  const removeStat = useCallback(async (_id: string) => {
    const current = await local.get(_id)
    local.remove(current)
    setStats((prev) => {
      prev.delete(_id)
    })
  }, [])

  // Initialize db sync on mount
  useEffect(() => {
    // Set up initial docs
    initialDocs?.forEach((doc) => {
      const { data: stat, error } = z.safeParse(StatDoc, doc)

      if (error) {
        console.error("Invalid stat document:", error, doc)
        return
      }

      if (!stat || !doc?._id) return

      setStats((prev) => {
        const s = makeSignal(doc._id, stat.value)
        return prev.set(stat._id, s)
      })
    })
  }, [initialDocs])

  return { stats, addStat, removeStat }
}
