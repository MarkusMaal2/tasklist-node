const express = require('express')

const app = express()
const port = 8415

// add template engine
const path = require('path')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// static files s- CSS, JS, Images, etc.
app.use(express.static(path.join(__dirname, 'public')))

// use file system - r/w files
const fs = require('fs')


app.get("/", (req, res) => {
    fs.readFile('./tasks.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(`Error reading file: ${err}`)
            return
        }
        try {
            const tasks = JSON.parse(jsonString)
            res.render('index', {tasksData : tasks})
        } catch (err) {
            console.log(`Error parsing file: ${err}`)
        }
    })
})

app.listen(port)