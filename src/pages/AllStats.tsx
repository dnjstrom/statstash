import { useMemo, useState } from "preact/hooks"
import PWABadge from "../PWABadge.tsx"
import { useStats } from "../data/useStats.tsx"
import { Stat } from "../components/Stat.tsx"
import { Menu } from "../components/Menu.tsx"
import { pathWithBase } from "../utils/pathWithBase.tsx"
import { local } from "../data/db.ts"

export const AllStats = () => {
  const stats = useStats()
  const [search, setSearch] = useState("")

  const filteredStats = useMemo(() => {
    if (!search) return stats.entries

    return stats.entries.filter(([key]) => key.includes(search))
  }, [stats, search])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-2 sticky top-0 bg-[oklch(0.2007_0.0321_232.15)]">
        <Menu>
          <a className="text-xl" href={pathWithBase("/")}>
            DND
          </a>
        </Menu>

        <form
          className="flex gap-1 py-2 w-full"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            const formData = new FormData(event.currentTarget)

            const key = formData.get("key")

            if (!key || typeof key !== "string") return

            stats.set(key, "")
            setSearch("")

            event.currentTarget.reset()
          }}
        >
          <input
            className="border px-1 w-full"
            name="key"
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value.toLocaleLowerCase())
            }}
          />
          <button className="cursor-pointer ml-1">Add</button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        {filteredStats.map(([key, value]) => (
          <div className="flex flex-col gap-1 bg-[oklch(0.2507_0.0321_232.15)] py-2 px-2">
            <div className="flex gap-2 justify-between items-center">
              <div className="font-medium">{key}</div>

              <button
                className="cursor-pointer col-span-1 text-lg"
                onClick={() => {
                  stats.remove(key)
                }}
              >
                ✕
              </button>
            </div>

            <input
              className="border px-1 w-full col-span-7"
              onInput={(updated) => {
                value.value = updated.currentTarget.value
              }}
              value={JSON.stringify(value, null, 2)}
            />

            <div className="flex text-neutral-400 gap-1 text-sm">
              <Stat value={value} />
            </div>
          </div>
        ))}
      </div>

      <ResetStatsButton />

      <PWABadge />
    </div>
  )
}

const ResetStatsButton = () => {
  const stats = useStats()

  const onReset = async () => {
    // Remove all existing stats
    await local.bulkDocs(
      stats.entries.map(([key]) => ({
        _id: key,
        _deleted: true,
      }))
    )

    // Insert default stats for testing purposes
    const defaultStats = [
      ["name", "Balthazar Gesh Nadar Eldaran"],
      ["class", "Wizard 3"],
      ["strength.attribute", "8"],
      ["strength", "({strength.attribute}-10)/2"],
      ["dexterity.attribute", "13"],
      ["dexterity", "({dexterity.attribute}-10)/2"],
      ["constitution.attribute", "14"],
      ["constitution", "({constitution.attribute}-10)/2"],
      ["intelligence.attribute", "18"],
      ["intelligence", "({intelligence.attribute}-10)/2"],
      ["wisdom.attribute", "12"],
      ["wisdom", "({wisdom.attribute}-10)/2"],
      ["charisma.attribute", "10"],
      ["charisma", "({charisma.attribute}-10)/2"],
      ["level", "3"],
      ["proficiency_bonus", "Math.floor(({level} - 1) / 4) + 2"],
      ["strength.saving_throw.proficient", "0"],
      [
        "strength.saving_throw",
        "{strength.saving_throw.proficient} * {proficiency_bonus} + {strength}",
      ],
      ["dexterity.saving_throw.proficient", "0"],
      [
        "dexterity.saving_throw",
        "{dexterity.saving_throw.proficient} * {proficiency_bonus} + {dexterity}",
      ],
      ["constitution.saving_throw.proficient", "0"],
      [
        "constitution.saving_throw",
        "{constitution.saving_throw.proficient} * {proficiency_bonus} + {constitution}",
      ],
      ["intelligence.saving_throw.proficient", "1"],
      [
        "intelligence.saving_throw",
        "{intelligence.saving_throw.proficient} * {proficiency_bonus} + {intelligence}",
      ],
      ["wisdom.saving_throw.proficient", "1"],
      [
        "wisdom.saving_throw",
        "{wisdom.saving_throw.proficient} * {proficiency_bonus} + {wisdom}",
      ],
      ["charisma.saving_throw.proficient", "0"],
      [
        "charisma.saving_throw",
        "{charisma.saving_throw.proficient} * {proficiency_bonus} + {charisma}",
      ],
      ["acrobatics.proficient", "0"],
      [
        "acrobatics",
        "{acrobatics.proficient} * {proficiency_bonus} + {dexterity}",
      ],
      ["animal_handling.proficient", "0"],
      [
        "animal_handling",
        "{animal_handling.proficient} * {proficiency_bonus} + {wisdom}",
      ],
      ["arcana.proficient", "1"],
      ["arcana", "{arcana.proficient} * {proficiency_bonus} + {intelligence}"],
      ["athletics.proficient", "0"],
      [
        "athletics",
        "{athletics.proficient} * {proficiency_bonus} + {strength}",
      ],
      ["deception.proficient", "0"],
      [
        "deception",
        "{deception.proficient} * {proficiency_bonus} + {charisma}",
      ],
      ["history.proficient", "1"],
      [
        "history",
        "{history.proficient} * {proficiency_bonus} + {intelligence}",
      ],
      ["insight.proficient", "0"],
      ["insight", "{insight.proficient} * {proficiency_bonus} + {wisdom}"],
      ["intimidation.proficient", "0"],
      [
        "intimidation",
        "{intimidation.proficient} * {proficiency_bonus} + {charisma}",
      ],
      ["investigation.proficient", "1"],
      [
        "investigation",
        "{investigation.proficient} * {proficiency_bonus} + {intelligence}",
      ],
      ["medicine.proficient", "0"],
      ["medicine", "{medicine.proficient} * {proficiency_bonus} + {wisdom}"],
      ["nature.proficient", "0"],
      ["nature", "{nature.proficient} * {proficiency_bonus} + {intelligence}"],
      ["perception.proficient", "1"],
      [
        "perception",
        "{perception.proficient} * {proficiency_bonus} + {wisdom}",
      ],
      ["performance.proficient", "0"],
      [
        "performance",
        "{performance.proficient} * {proficiency_bonus} + {charisma}",
      ],
      ["persuasion.proficient", "0"],
      [
        "persuasion",
        "{persuasion.proficient} * {proficiency_bonus} + {charisma}",
      ],
      ["religion.proficient", "1"],
      [
        "religion",
        "{religion.proficient} * {proficiency_bonus} + {intelligence}",
      ],
      ["sleight_of_hand.proficient", "0"],
      [
        "sleight_of_hand",
        "{sleight_of_hand.proficient} * {proficiency_bonus} + {dexterity}",
      ],
      ["stealth.proficient", "0"],
      ["stealth", "{stealth.proficient} * {proficiency_bonus} + {dexterity}"],
      ["survival.proficient", "0"],
      ["survival", "{survival.proficient} * {proficiency_bonus} + {wisdom}"],
      ["inspiration", "0"],
      ["perception.passive", "10+{perception}"],
      ["speed", "30"],
      ["initiative", "{dexterity}"],
      ["hit_points.max", "20"],
      ["hit_points.temporary", "0"],
      ["hit_points", "20"],
      ["armor_class", "11"],
      ["death_saves.successes", "0"],
      ["death_saves.failures", "0"],
    ]

    await local.bulkDocs(
      defaultStats.map(([key, value]) => ({
        _id: key,
        value,
      }))
    )
  }

  return (
    <button
      onClick={() => {
        onReset()
      }}
    >
      Reset
    </button>
  )
}
