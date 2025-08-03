import PWABadge from "./PWABadge.tsx"
import {
  lazy,
  LocationProvider,
  ErrorBoundary,
  Router,
  Route,
} from "preact-iso"

import { AllStats } from "./pages/AllStats.tsx"
import { Skills } from "./pages/Skills.tsx"
import { StatsProvider } from "./data/useStats.tsx"
import { pathWithBase } from "./utils/pathWithBase.tsx"
import { ToastProvider } from "./components/Toast.tsx"
import type { JSX } from "preact"
import { Dice } from "./pages/Dice.tsx"
import { Combat } from "./pages/Combat.tsx"
import { Spells } from "./pages/Spells.tsx"
import { Gear } from "./pages/Gear.tsx"
import { Notes } from "./pages/Notes.tsx"

const NotFound = lazy(() =>
  import("./pages/NotFound.tsx").then((m) => m.NotFound)
)

export const App = () => {
  return (
    <div className="relative min-w-lvw min-h-lvh">
      <LocationProvider>
        <ErrorBoundary>
          <StatsProvider>
            <ToastProvider>
              <Router>
                <Route path={pathWithBase("/stats")} component={AllStats} />

                <Route path={pathWithBase("/")} component={DndRoutes} />
                <Route path={pathWithBase("/*")} component={DndRoutes} />

                <PWABadge />
              </Router>
            </ToastProvider>
          </StatsProvider>
        </ErrorBoundary>
      </LocationProvider>
    </div>
  )
}

const DndRoutes = () => (
  <div className="pb-20 pt-12">
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <Route path={"/"} component={Skills} />
          <Route path={"/dice"} component={Dice} />
          <Route path={"/combat"} component={Combat} />
          <Route path={"/spells"} component={Spells} />
          <Route path={"/gear"} component={Gear} />
          <Route path={"/notes"} component={Notes} />

          <Route default component={NotFound} />
          <PWABadge />
        </Router>

        <NavBar />
      </ToastProvider>
    </ErrorBoundary>
  </div>
)

const NavBar = () => {
  return (
    <div
      className="fixed p-2 bg-[oklch(0.2007_0.0321_232.15)] flex gap-1 overflow-x-auto"
      style={{
        bottom: "env(safe-area-inset-bottom)",
        left: "env(safe-area-inset-left)",
        right: "env(safe-area-inset-right)",
      }}
    >
      <NavBarItem href={pathWithBase("/dice")}>Dice</NavBarItem>
      <NavBarItem href={pathWithBase("/")}>Skills</NavBarItem>
      <NavBarItem href={pathWithBase("/combat")}>Combat</NavBarItem>
      <NavBarItem href={pathWithBase("/spells")}>Spells</NavBarItem>
      <NavBarItem href={pathWithBase("/gear")}>Gear</NavBarItem>
      <NavBarItem href={pathWithBase("/notes")}>Notes</NavBarItem>
    </div>
  )
}

const NavBarItem = ({
  children,
  href,
  ...otherProps
}: { href: string } & JSX.HTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      href={href}
      {...otherProps}
      className="bg-[oklch(0.2507_0.0321_232.15)] p-2 rounded-lg cursor-pointer text-lg"
    >
      {children}
    </a>
  )
}
