const express = require('express')
const Route = express.Router()

const DrumController = require('../controller/drum')
const UserController = require('../controller/user')
const Auth = require('../helpers/auth')

Route
  .get('/user/', UserController.AllUser)
  .get('/user/pola/', Auth.authInfo, UserController.Pola)
  .get('/drum/set/', Auth.authInfo, DrumController.DrumSet)
  .post('/register/', UserController.Register)
  .post('/login/', UserController.Login)
  .get('/user/:userid', Auth.authInfo, UserController.UserId)
  .patch('/user/score/:id_score', Auth.authInfo, UserController.UpdateScore)
  .patch('/user/pola/:id', Auth.authInfo, UserController.UpdatePola)
  .patch('/logout/:userid', UserController.Logout)

module.exports = Route