require('dotenv').config()
const path = require('path')
const express = require('express')
const secure = require('express-force-https')

const app = express()
const { log } = console
const port = process.env.PORT || 3002

app.use(secure)
app.use(express.static(path.join(__dirname, 'build')))
app.use('/static', express.static(path.join(__dirname, 'build', 'static')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.listen(port, () => {
  log(`Application assets server listening on ${port}`)
})