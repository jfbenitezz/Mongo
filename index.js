const express = require('express')
const app = express()
app.use(express.json())

const usersRoute = require("./routes/users")
const propertiesRoute = require("./routes/properties")
const rentalsRoute = require("./routes/rentals")
const catalogRoute = require("./routes/catalog")
const filterRroute = require("./routes/filter")

app.use("/properties", propertiesRoute)
app.use("/users", usersRoute)
app.use("/rentals", rentalsRoute)
app.use("/catalog", catalogRoute)
app.use("/filter", filterRroute)

module.exports = app