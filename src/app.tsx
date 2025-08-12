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

                <Route
                  path={pathWithBase("/")}
                  component={() => (
                    <SwiperProvider startingIndex={1}>
                      <DndRoutes />
                    </SwiperProvider>
                  )}
                />

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

const DndRoutes = () => {
  const { current, setCurrent } = useSwiper()

  return (
    <ErrorBoundary>
      <ToastProvider>
        <Header />
        <div className="h-full overflow-hidden">
          <Swiper
            id="pages"
            current={current}
            onChange={(swiper) => {
              setCurrent(swiper.realIndex)
            }}
          >
            <Dice />
            <Skills />
            <Combat />
            <Spells />
            <Gear />
            <Notes />
          </Swiper>
        </div>
        <div>
          <Swiper
            id="navbar"
            current={current}
            options={{
              slidesPerView: 4,
              spaceBetween: 8,
              centeredSlides: true,
              allowTouchMove: true,
            }}
          >
            <NavBarItem to={0}>Dice</NavBarItem>
            <NavBarItem to={1}>Skills</NavBarItem>
            <NavBarItem to={2}>Combat</NavBarItem>
            <NavBarItem to={3}>Spells</NavBarItem>
            <NavBarItem to={4}>Gear</NavBarItem>
            <NavBarItem to={5}>Notes</NavBarItem>
          </Swiper>
        </div>
      </ToastProvider>
    </ErrorBoundary>
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
        "p-2 py-3 rounded-lg cursor-pointer flex items-start justify-center w-full text-lg text-gray-400",
        swiper.current === to && "text-white"
      )}
      onClick={() => {
        swiper.setCurrent(to)
      }}
    >
      {children}
    </button>
  )
}
