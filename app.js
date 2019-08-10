require('dotenv').config() // Initialize dotenv config

const express = require('express') // Import express
const bodyParser = require('body-parser') // Import body-parses
const app = express() // Create method
const port = process.env.SERVER_PORT // Default PORT

const drumRoute = require('./src/routes/drum')

app.listen(port, () => {
  console.log(`\n GASSSSSSS AKU DI PORT : ${port} MASS!!!!\n`)
}) // Create listening app

app.use(bodyParser.json()) // Body parse json
app.use(bodyParser.urlencoded({ extended: false })) // body type

app.use('/', drumRoute)