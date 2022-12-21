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

app.get("/delete-task/:taskId", (req, res) => {
    let deletedTaskId = parseInt(req.params.taskId)
    fs.readFile('./tasks.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(`Error reading file: ${err}`)
            return
        }
        try {
            const tasks = JSON.parse(jsonString)
            tasks.forEach((task, idx) => {
                if (task.id === deletedTaskId) {
                    tasks.splice(idx, 1)
                }
            })
            jsonString = JSON.stringify(tasks, null, 2)
            fs.writeFile("./tasks.json", jsonString, "utf-8", (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`)
                } else {
                    console.log(`Data saved to file`)
                }
            })
            res.redirect("/")
        } catch (err) {
            console.log(`Error parsing file: ${err}`)
        }
    })
})

app.listen(port)