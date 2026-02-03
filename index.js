require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router')
require('./db.js')

const server = express()
server.use(cors())
server.use(express.json())
server.use(router)

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log(`Server Started Running At Port ${PORT}`)
})