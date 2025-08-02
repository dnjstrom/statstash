import { useEffect, useState } from "preact/hooks"
import * as db from "./db"

export const useDbChanges = (
  onChange: (change: PouchDB.Replication.SyncResult<{}>) => void
) => {
  const [docs, setDocs] = useState<
    PouchDB.Core.ExistingDocument<PouchDB.Core.AllDocsMeta>[] | undefined
  >()

  const onActive = () => console.debug("Replication active")
  const onComplete = () => console.debug("Replication complete")
  const onDenied = () => console.debug("Replication denied")
  const onPaused = () => console.debug("Replication paused")
  const onError = () => console.error("Replication error")

  useEffect(() => {
    db.local
      .allDocs({
        include_docs: true,
      })
      .then((result) => {
        const docs = result.rows
          .map((row) => row.doc)
          .flatMap((doc) => {
            if (!doc) return []
            return [doc]
          })

        setDocs(docs)
      })

    const handle = db.local.sync(db.remote, {
      live: true,
      retry: true,
    })

    handle
      .on("change", onChange)
      .on("active", onActive)
      .on("complete", onComplete)
      .on("denied", onDenied)
      .on("paused", onPaused)
      .on("error", onError)

    return () => {
      handle.cancel()
      handle.removeListener("change", onChange)
      handle.removeListener("active", onActive)
      handle.removeListener("complete", onComplete)
      handle.removeListener("denied", onDenied)
      handle.removeListener("paused", onPaused)
      handle.removeListener("error", onError)
      handle.removeAllListeners()
    }
  }, [])

  return docs
}
