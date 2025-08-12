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
import type { ComponentChildren } from "preact"
import { Dice } from "./pages/Dice.tsx"
import { Combat } from "./pages/Combat.tsx"
import { Spells } from "./pages/Spells.tsx"
import { Gear } from "./pages/Gear.tsx"
import { Notes } from "./pages/Notes.tsx"
import { Header } from "./pages/Header.tsx"
import { Swiper, SwiperProvider, useSwiper } from "./components/Swiper.tsx"
import { cn } from "./utils/cn.ts"

const NotFound = lazy(() =>
  import("./pages/NotFound.tsx").then((m) => m.NotFound)
)

export const App = () => {
  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <LocationProvider>
        <ErrorBoundary>
          <StatsProvider>
            <ToastProvider>
              <Router>
                <Route path={pathWithBase("/stats")} component={AllStats} />

                <Route path={pathWithBase("/")} component={DndRoutes} />

                <Route default component={NotFound} />
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
  <ErrorBoundary>
    <ToastProvider>
      <Header />
      <SwiperProvider startingIndex={1}>
        <div className="h-full overflow-hidden">
          <Swiper id="pages">
            <Dice />
            <Skills />
            <Combat />
            <Spells />
            <Gear />
            <Notes />
          </Swiper>
        </div>
        <NavBar />
      </SwiperProvider>
    </ToastProvider>
  </ErrorBoundary>
)

const NavBar = () => {
  return (
    <div className="p-2 pt-1 pb-0 bg-[oklch(0.2007_0.0321_232.15)] flex gap-1 overflow-x-auto">
      <NavBarItem to={0}>Dice</NavBarItem>
      <NavBarItem to={1}>Skills</NavBarItem>
      <NavBarItem to={2}>Combat</NavBarItem>
      <NavBarItem to={3}>Spells</NavBarItem>
      <NavBarItem to={4}>Gear</NavBarItem>
      <NavBarItem to={5}>Notes</NavBarItem>
    </div>
  )
}

const NavBarItem = ({
  children,
  to,
}: {
  to: number
  children: ComponentChildren
}) => {
  const swiper = useSwiper()

  return (
    <button
      className={cn(
        "bg-[oklch(0.2507_0.0321_232.15)] p-2 py-3 rounded-lg cursor-pointer text-lg flex items-center",
        swiper.current === to && "bg-cyan-900"
      )}
      onClick={() => {
        swiper.setCurrent(to)
      }}
    >
      {children}
    </button>
  )
}
