import { Menu } from "../components/Menu"
import { Stat } from "../components/Stat"
import { useStats } from "../data/useStats"
import { pathWithBase } from "../utils/pathWithBase"

export const Header = () => {
  const stats = useStats()

  return (
    <div className="sticky top-0 flex gap-2 items-center p-2 bg-[oklch(0.2507_0.0321_232.15)] border-b-4 border-b-[oklch(0.2007_0.0321_232.15)]">
      <Menu>
        <a className="text-xl" href={pathWithBase("/stats")}>
          Stats
        </a>
      </Menu>
      <Stat value={stats.get("name")}></Stat>
      <div className="ml-auto">
        <Stat value={stats.get("class")}></Stat>
      </div>
    </div>
  )
}
