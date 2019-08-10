const conn = require('../config/db')
const jwt = require('jsonwebtoken')

module.exports = {
    // Get All User
    Register: (data) => {
        return new Promise((resolve, reject) => {
          conn.query('INSERT INTO user SET ?', data, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },
}

