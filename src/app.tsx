import { useEffect } from "preact/hooks"
import PWABadge from "./PWABadge.tsx"
import "./app.css"
import { db } from "./db.ts"

export const App = () => {
  useEffect(() => {
    void db.info().then(function (info) {
      console.log(info)
    })
  }, [])

  return (
    <>
      <h1 className="text-2xl">StatStash</h1>

      <PWABadge />
    </>
  )
}
