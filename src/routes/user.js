const express = require('express')
const Route = express.Router()

const UserController = require('../controller/user')

const Auth = require('../helpers/auth')

Route
  .get('/user/', UserController.AllUser)
  .get('/user/:userid',  Auth.authInfo, Auth.accesstoken, UserController.IdUser)
  .post('/register/', UserController.Register)
  .post('/login/', Auth.authInfo, UserController.Login)
  .patch('/token/:userid', UserController.destroyToken)
  .delete('/member/:userid', UserController.deleteMember)
module.exports = Route