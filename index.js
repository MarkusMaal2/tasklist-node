const express = require('express')
const app = express()
const port = 8415

// add template engine
const path = require('path')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// static files s- CSS, JS, Images, etc.
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.render('index')
})

app.listen(port)