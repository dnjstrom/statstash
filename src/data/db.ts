import { default as PouchDB } from "pouchdb"

export const remote = new PouchDB("http://localhost:5173/db/stats", {
  auth: {
    username: "admin",
    password: "admin",
  },
})

export const local = new PouchDB("stats")
