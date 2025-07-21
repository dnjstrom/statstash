import { default as PouchDB } from "pouchdb"

export const remote = new PouchDB("http://localhost:5984/stats", {
  auth: {
    username: "admin",
    password: "admin",
  },
})

export const local = new PouchDB("stats")
