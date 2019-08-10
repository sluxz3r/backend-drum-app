const express = require('express')
const Route = express.Router()

const DrumController = require('../controller/drum')
const UserController = require('../controller/user')
const Auth = require('../helpers/auth')

Route
  .get('/', DrumController.getIndex)
//   .get('/user/', Auth.authInfo, Auth.accesstoken, UserController.AllUser)
//   .get('/user/:userid', Auth.authInfo,  Auth.authInfo, Auth.accesstoken, UserController.IdUser)
  .post('/register/', UserController.Register)
  .post('/login/', Auth.authInfo, UserController.Login)
  .patch('/logout/:userid', UserController.Logout)

module.exports = Route