// External packages
const express = require("express")
const cors = require("cors")

const db = require("./database/db")

// Defined middleware
const logger = require("./logger")

const api = express()


// Middle
api.use(express.json())
api.use(cors())
api.use(logger)

api.get("/", async (req, res) => {
    const data = await db.query("SELECT * FROM wrong;")
    res.send(data.rows)
})

api.get("/people/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const data = await db.query("SELECT * FROM person WHERE person_id = $1", [id])
    res.send(data.rows[0])
})

module.exports = api