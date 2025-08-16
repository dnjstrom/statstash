import { useState, useMemo } from "preact/hooks"
import { Modal } from "../components/Modal"
import { Section } from "../components/Section"
import { Stat } from "../components/Stat"
import { StatBox } from "../components/StatBox"
import { useStats } from "../data/useStats"
import { Page } from "./Page"
import { v4 } from "uuid"
import type { Item as ItemType } from "../data/useStatSync"
import { ItemSchema } from "../data/useStatSync"
import { Item } from "../components/Item"
import { ActionButton } from "../components/ActionButton"
import { useImmer } from "use-immer"

const isItem = (value: unknown): value is ItemType =>
  typeof value === "object" &&
  value !== null &&
  "type" in value &&
  value.type === "item"

export const Gear = () => {
  const stats = useStats()
  const [editingGearId, setEditingGearId] = useState<string>()

  const gear = useMemo(() => {
    return stats.entries
      .filter(([key]) => key.startsWith("gear."))
      .flatMap(([key, signal]) => {
        if (isItem(signal.value)) return [{ key, ...signal.value }]
        return []
      })
  }, [stats.entries])

  const editingGear = gear.find((item) => item.key === `gear.${editingGearId}`)

  const equipped = gear.filter((item) => item.location === "EQUIPPED")
  const carried = gear.filter((item) => item.location === "CARRIED")
  const stored = gear.filter((item) => item.location === "STORED")

  const [open, setOpen] = useImmer(new Set<string>())

  const toggleOpen = (key: string) => {
    setOpen((draft) => {
      if (draft.has(key)) {
        draft.delete(key)
      } else {
        draft.add(key)
      }
    })
  }

  return (
    <Page>
      <Section title="Money" className="grid grid-cols-4 gap-1">
        <StatBox name="Copper">
          <Stat value={stats.get("copper")} />
        </StatBox>
        <StatBox name="Silver">
          <Stat value={stats.get("silver")} />
        </StatBox>
        <StatBox name="Gold">
          <Stat value={stats.get("gold")} />
        </StatBox>
        <StatBox name="Platinum">
          <Stat value={stats.get("platinum")} />
        </StatBox>
      </Section>

      <Section title="Equipped" className="flex flex-col gap-2">
        {equipped.map((item) => {
          const itemId = item.key.replace("gear.", "")

          return (
            <Item
              key={item.key}
              item={item}
              showDescription={open.has(item.key)}
              onClick={() => {
                toggleOpen(item.key)
              }}
              action={
                <ActionButton onClick={() => setEditingGearId(itemId)}>
                  Edit
                </ActionButton>
              }
            ></Item>
          )
        })}
      </Section>
      <Section title="Carried" className="flex flex-col gap-2">
        {carried.map((item) => {
          const itemId = item.key.replace("gear.", "")

          return (
            <Item
              key={item.key}
              item={item}
              showDescription={open.has(item.key)}
              onClick={() => {
                toggleOpen(item.key)
              }}
              action={
                <ActionButton onClick={() => setEditingGearId(itemId)}>
                  Edit
                </ActionButton>
              }
            ></Item>
          )
        })}
      </Section>
      <Section title="Stored" className="flex flex-col gap-2">
        {stored.map((item) => {
          const itemId = item.key.replace("gear.", "")

          return (
            <Item
              key={item.key}
              item={item}
              showDescription={open.has(item.key)}
              onClick={() => {
                toggleOpen(item.key)
              }}
              action={
                <ActionButton onClick={() => setEditingGearId(itemId)}>
                  Edit
                </ActionButton>
              }
            ></Item>
          )
        })}
      </Section>

      <button
        className="fixed bottom-4 right-4 w-12 h-12 bg-cyan-900 text-white rounded-full shadow cursor-pointer text-3xl flex justify-center items-center text-center"
        onClick={() => {
          setEditingGearId(v4())
        }}
      >
        <span className="-mt-1">+</span>
      </button>

      <Modal
        isOpen={Boolean(editingGearId)}
        onClose={() => {
          setEditingGearId(undefined)
        }}
        orientation="center"
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            const formData = new FormData(event.currentTarget)

            const key = `gear.${editingGearId}`

            const name = formData.get("name")

            if (!name || typeof name !== "string") return

            const description = formData.get("description")
            const locationValue = formData.get("location") as string

            // Use the ItemSchema to parse and validate the location
            const locationResult =
              ItemSchema.shape.location.safeParse(locationValue)
            const location = locationResult.success
              ? locationResult.data
              : "CARRIED"

            stats.set(key, {
              type: "item",
              name,
              description: typeof description === "string" ? description : null,
              location,
            })

            event.currentTarget.reset()
            setEditingGearId(undefined)
          }}
        >
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="border border-white rounded px-2 py-1"
            autofocus
            defaultValue={editingGear?.name || ""}
          />

          <label className="font-medium">Description</label>
          <textarea
            name="description"
            className="border border-white rounded px-2 py-1"
            rows={5}
            defaultValue={editingGear?.description || ""}
          />

          <label className="font-medium">Location</label>
          <select
            name="location"
            defaultValue={editingGear?.location || "CARRIED"}
            className="border border-white rounded px-2 py-1"
          >
            <option value="EQUIPPED">Equipped</option>
            <option value="CARRIED">Carried</option>
            <option value="STORED">Stored</option>
          </select>

          <button type="submit" className="border rounded">
            Save
          </button>
        </form>
      </Modal>
    </Page>
  )
}
