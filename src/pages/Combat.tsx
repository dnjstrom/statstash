import { Dot } from "../components/Dot"
import { Section } from "../components/Section"
import { SkillBox } from "../components/SkillBox"
import { Stat } from "../components/Stat"
import { StatBox } from "../components/StatBox"
import { Throw } from "../components/Throw"
import { useToast } from "../components/Toast"
import { useStats } from "../data/useStats"
import { useExpressionResolver } from "../utils/useExpressionResolver"
import { Page } from "./Page"

export const Combat = () => {
  const stats = useStats()

  const resolve = useExpressionResolver()

  const toaster = useToast()

  return (
    <Page>
      <Section title="Health">
        <div className="grid grid-cols-2 gap-2">
          <StatBox name="Hit Points">
            <div className="flex gap-1 items-center text-3xl">
              <Stat value={stats.get("hit_points")} />
              /
              <Stat value={stats.get("hit_points.max")} />
            </div>
          </StatBox>

          <StatBox name="Temporary HP">
            <Stat
              value={stats.get("hit_points.temporary")}
              className="text-3xl"
            />
          </StatBox>

          <StatBox
            name={
              <div className="flex">
                Hit Dice (<Stat value={stats.get("hit_dice.die")} />)
              </div>
            }
          >
            <Stat value={stats.get("hit_dice")} className="text-3xl" />
          </StatBox>

          <StatBox name="Death Saves">
            <div className="grid grid-cols-2">
              <div className="text-end">Successes:</div>
              <Stat value={stats.get("death_saves.successes")} />

              <div className="text-end">Failures:</div>
              <Stat value={stats.get("death_saves.failures")} />
            </div>
          </StatBox>
        </div>
      </Section>

      <Section title="Stats">
        <div className="grid grid-cols-4 gap-2">
          <StatBox name="AC">
            <Stat value={stats.get("armor_class")} className="text-3xl" />
          </StatBox>

          <StatBox name="Initiative">
            <Stat value={stats.get("initiative")} className="text-3xl" />
          </StatBox>

          <StatBox name="Speed">
            <div className="flex items-end gap-1">
              <Stat value={stats.get("speed")} className="text-3xl" />
              ft
            </div>
          </StatBox>

          <StatBox name="Inspiration">
            <Dot filled className="text-3xl w-5 h-5" />
          </StatBox>
        </div>
      </Section>

      <Section title="Saving throws">
        <div className="grid grid-cols-2 gap-2">
          <SkillBox
            name="Strength"
            modifier={stats.get("strength.saving_throw")}
            proficient={
              stats.get("strength.saving_throw.proficient")?.value === "1"
            }
            onClick={() => {
              const result = resolve("1d20+{strength.saving_throw}")
              toaster.info(
                <Throw pretitle="Saving Throw" title="Strength" {...result} />
              )
            }}
          />
          <SkillBox
            name="Dexterity"
            modifier={stats.get("dexterity.saving_throw")}
            proficient={
              stats.get("dexterity.saving_throw.proficient")?.value === "1"
            }
            onClick={() => {
              const result = resolve("1d20+{dexterity.saving_throw}")
              toaster.info(
                <Throw pretitle="Saving Throw" title="Dexterity" {...result} />
              )
            }}
          />
          <SkillBox
            name="Constitution"
            modifier={stats.get("constitution.saving_throw")}
            proficient={
              stats.get("constitution.saving_throw.proficient")?.value === "1"
            }
            onClick={() => {
              const result = resolve("1d20+{constitution.saving_throw}")
              toaster.info(
                <Throw
                  pretitle="Saving Throw"
                  title="Constitution"
                  {...result}
                />
              )
            }}
          />
          <SkillBox
            name="Intelligence"
            modifier={stats.get("intelligence.saving_throw")}
            proficient={
              stats.get("intelligence.saving_throw.proficient")?.value === "1"
            }
            onClick={() => {
              const result = resolve("1d20+{intelligence.saving_throw}")
              toaster.info(
                <Throw
                  pretitle="Saving Throw"
                  title="Intelligence"
                  {...result}
                />
              )
            }}
          />
          <SkillBox
            name="Wisdom"
            modifier={stats.get("wisdom.saving_throw")}
            proficient={
              stats.get("wisdom.saving_throw.proficient")?.value === "1"
            }
            onClick={() => {
              const result = resolve("1d20+{wisdom.saving_throw}")
              toaster.info(
                <Throw pretitle="Saving Throw" title="Wisdom" {...result} />
              )
            }}
          />
          <SkillBox
            name="Charisma"
            modifier={stats.get("charisma.saving_throw")}
            proficient={
              stats.get("charisma.saving_throw.proficient")?.value === "1"
            }
            onClick={() => {
              const result = resolve("1d20+{charisma.saving_throw}")
              toaster.info(
                <Throw pretitle="Saving Throw" title="Charisma" {...result} />
              )
            }}
          />
        </div>
      </Section>
    </Page>
  )
}
