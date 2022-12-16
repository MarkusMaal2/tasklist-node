const express = require('express')
const app = express()
const port = 8415

app.get("/", (req, res) => {
    res.send("Hello!")
})

app.listen(port)