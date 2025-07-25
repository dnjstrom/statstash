import PWABadge from "./PWABadge.tsx"
import {
  lazy,
  LocationProvider,
  ErrorBoundary,
  Router,
  Route,
} from "preact-iso"

import { Home } from "./home.tsx"
import { DNDLayout } from "./dnd.tsx"
import { StatsProvider } from "./useStats.tsx"

const NotFound = lazy(() => import("./NotFound.tsx").then((m) => m.NotFound))

const pathWithBase = (path: string): string => {
  if (import.meta.env.PROD) {
    return `/statstash/${path}`
  }

  return path
}

export const App = () => {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <StatsProvider>
          <Router>
            <Route path={pathWithBase("/")} component={DNDLayout} />
            <Route path={pathWithBase("/stats")} component={Home} />
            <Route default component={NotFound} />
            <PWABadge />
          </Router>
        </StatsProvider>
      </ErrorBoundary>
    </LocationProvider>
  )
}
