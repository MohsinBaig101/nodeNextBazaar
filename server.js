const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

// create express app
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
require('./bootstrapApplication').bootstrap(app)
// listen for requests
const port = 9001
app.listen(port, () => {
  console.log(`Hi! Server is listening on port ${port}`)
})
