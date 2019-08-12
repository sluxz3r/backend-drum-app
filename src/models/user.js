const conn = require('../config/db')
const jwt = require('jsonwebtoken')

module.exports = {
    //Get All User By Scored
    AllUser: () => {
        return new Promise((resolve, reject) => {
          conn.query(`SELECT user.fullname, user.userid, user.image, score.scores FROM user INNER JOIN score ON user.userid=score.id_score ORDER BY scores DESC`, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },
    //Register
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

    //Login
    getByEmail: (email) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT userid, email, status, fullname, created_at, updated_at, salt, password FROM user WHERE email = ?', email, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateToken: (email, token) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE user SET token = ? WHERE email =?`, [token, email], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    Logout: (userid) => {
        const test = 'test';
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE user SET token = ? WHERE userid =?`, [test, userid], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

}

