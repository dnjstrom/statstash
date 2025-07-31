import PWABadge from "./PWABadge.tsx"
import {
  lazy,
  LocationProvider,
  ErrorBoundary,
  Router,
  Route,
} from "preact-iso"

import { AllStats } from "./AllStats.tsx"
import { DNDLayout } from "./dnd.tsx"
import { StatsProvider } from "./useStats.tsx"
import { pathWithBase } from "./pathWithBase.tsx"
import { ToastProvider } from "./Toast.tsx"

const NotFound = lazy(() => import("./NotFound.tsx").then((m) => m.NotFound))

export const App = () => {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <StatsProvider>
          <Router>
            <Route
              path={pathWithBase("/")}
              component={() => (
                <ToastProvider>
                  <DNDLayout />
                </ToastProvider>
              )}
            />

            <Route path={pathWithBase("/stats")} component={AllStats} />

            <Route default component={NotFound} />
            <PWABadge />
          </Router>
        </StatsProvider>
      </ErrorBoundary>
    </LocationProvider>
  )
}
