import { default as PouchDB } from "pouchdb"

export const db = new PouchDB("http://localhost:5984/stats", {
  auth: {
    username: "admin",
    password: "admin",
  },
})
