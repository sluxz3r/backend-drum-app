require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.SERVER_PORT
const xssFilter = require('x-xss-protection')
const logger = require('morgan')
const userRoute = require('./src/routes/drum')

app.use(express.static(__dirname + '/src/uploads/images/'))
app.use(xssFilter())
app.use(logger('dev'))
app.listen(port, () => {
  console.log(`\n GASSSSSSS AKU DI PORT : ${port} MASS!!!!\n`)
}) 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', userRoute)