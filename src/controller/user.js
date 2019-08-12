const userModels = require('../models/user')
const DrumHelper = require('../helpers/helpers')
const jwt = require('jsonwebtoken')

module.exports = {
  //Get All User
  AllUser: (req, res) => {
    userModels.AllUser()
      .then((resultUser) => {
        const result = resultUser
        DrumHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // //Get User By ID
  // IdUser: (req, res) => {
  //     const userid = req.params.userid
  //     userModels.IdUser(userid)
  //         .then((resultUser) => {
  //             const result = resultUser
  //             DrumHelper.response(res, result, 200)
  //         })
  //         .catch((error) => {
  //             console.log(error)
  //         })
  // },

  //Register
  Register: (req, res) => {
    const salt = DrumHelper.generateSalt(18)
    const passwordHash = DrumHelper.setPassword(req.body.password, salt)

    const data = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      token: 'Test',
      status: 1,
      created_at: new Date(),
      updated_at: new Date()
    }

    userModels.Register(data)
      .then((resultRegister) => {
        DrumHelper.response(res, resultRegister, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  //Login
  Login: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    userModels.getByEmail(email)
      .then((result) => {
        const dataUser = result[0]
        const usePassword = DrumHelper.setPassword(password, dataUser.salt).passwordHash

        if (usePassword === dataUser.password) {
          dataUser.token = jwt.sign({
            userid: dataUser.userid
          }, process.env.SECRET_KEY, { expiresIn: '12h' })

          delete dataUser.salt
          delete dataUser.password
          userModels.updateToken(email, dataUser.token)
            .then((result) => {

            })
            .catch((err) => {
              console.log(err)
            })

          return DrumHelper.response(res, dataUser, 200)
        } else {
          return DrumHelper.response(res, null, 403, 'Wrong password!')
        }

      })
      .catch((error) => {
        console.log(error)
      })

  },

  //Logout
  Logout: (req, res) => {
    const userid = req.params.userid;

    userModels.Logout(userid)
      .then((resultUser) => {
        const result = resultUser[0]
        DrumHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}