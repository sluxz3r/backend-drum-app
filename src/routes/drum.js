const express = require('express')
const Route = express.Router()

const DrumController = require('../controller/drum')
const UserController = require('../controller/user')
const Auth = require('../helpers/auth')

Route
  .get('/user/', Auth.authInfo, UserController.AllUser)
  .get('/drum/set/', Auth.authInfo, DrumController.DrumSet)
  .post('/register/', UserController.Register)
  .post('/login/', Auth.authInfo, UserController.Login)
  .patch('/logout/:userid', UserController.Logout)

module.exports = Route