import { Signal } from "@preact/signals"
import { Stat, useStatSync } from "./useStatSync"
import { createContext, ComponentChildren } from "preact"
import { useCallback, useContext, useMemo } from "preact/hooks"

export type Value = Signal<Stat["value"]> | undefined

type StatsContextType = {
  get: (name: string) => Signal<Stat["value"]> | undefined
  set: (id: Stat["_id"], value: Stat["value"]) => Promise<void>
  remove: (id: string) => Promise<void>
  entries: [string, Signal<Stat["value"]>][]
}

const StatsContext = createContext<StatsContextType | null>(null)

export const StatsProvider = ({
  children,
}: {
  children: ComponentChildren
}) => {
  const { setStat, removeStat, stats } = useStatSync()

  const get = useCallback((name: string) => stats.get(name), [stats])

  const entries = useMemo(
    () => [...stats.entries()].sort((a, b) => a[0].localeCompare(b[0])),
    [stats]
  )

  return (
    <StatsContext.Provider
      value={{
        get,
        set: setStat,
        remove: removeStat,
        entries,
      }}
    >
      {children}
    </StatsContext.Provider>
  )
}

export const useStats = () => {
  const context = useContext(StatsContext)

  if (!context) {
    throw new Error("useStats must be used within a StatsProvider")
  }

  return context
}
