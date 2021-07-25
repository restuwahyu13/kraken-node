require('kinode/config')
const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)

const listUsers = require('./route/one')
const listUserById = require('./route/two')

app.use(listUsers)
app.use(listUserById)

server.listen(process.env.NODE_ENV || 3000, () => console.log(`server running on port ${server.address().port}`))
