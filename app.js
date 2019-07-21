const express = require('express')
const app = express()

// Log to console and .log files
const morgan = require('morgan')
const fs = require('fs')
app.use(morgan('dev'))
app.use(morgan('combined', {stream: fs.createWriteStream('./logs/access-combined.log', {flags: 'a'})}));
app.use(morgan('dev', {stream: fs.createWriteStream('./logs/access-dev.log', {flags: 'a'})}));

// Database
const db = require('./config/database')

// Test database connection
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log("Error: " + err))

app.get('/', (req, res) =>{
    res.send("INDEX")
})

// User routes
app.use('/users', require('./routes/users'))

const port = 28992
app.listen(port, console.log("Server started on port " + port))