import * as db from "./db"

export const startSync = async (
  onChange: (change: PouchDB.Replication.SyncResult<{}>) => void
) => {
  const result = await db.local.allDocs({
    include_docs: true,
  })

  const docs = result.rows.map((row) => row.doc)

  const handle = db.local
    .sync(db.remote, {
      live: true,
      retry: true,
    })
    .on("change", onChange)
    .on("active", () => console.debug("Replication resumed"))
    .on("complete", () => console.debug("Replication finished"))
    .on("denied", () => console.debug("Replication denied"))
    .on("paused", () => console.debug("Replication paused"))
    .on("error", console.error)

  return { docs, handle }
}
