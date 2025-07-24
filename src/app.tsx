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

export const App = () => {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <StatsProvider>
          <Router>
            <Route path="/statstash" component={Home} />
            <Route path="/statstash/dnd" component={DNDLayout} />
            <Route default component={NotFound} />
            <PWABadge />
          </Router>
        </StatsProvider>
      </ErrorBoundary>
    </LocationProvider>
  )
}
