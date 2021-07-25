import 'kinode/config'
import express from 'express'
import http from 'http'

import listUsers from './route/one'
import listUserById from './route/two'

const app = express()
const server = http.createServer(app)

app.use(listUsers)
app.use(listUserById)

server.listen(process.env.NODE_ENV || 3000, () => console.log(`server running on port ${server.address().port}`))
