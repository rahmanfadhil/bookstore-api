const jwt = require('jsonwebtoken')
const Users = require('./../models/users')

const TOKEN_KEY = 'my_secret_key'

module.exports = (req, res, next) => {
  if (req.token){
    jwt.verify(req.token, TOKEN_KEY, (err, data) => {
      if(!err){
        Users.findOne(data.data, (err, db_data) => {
          if(!err && db_data !== null){
            req.user_id = db_data._id
            req.user_data = db_data
            next()
          } else if(db_data == null){
            res.send({ text: 'error', msg: 'User data is not exist'})
          } else {
            res.send({ err: 'error', msg: error.message })
          }
        })
      } else {
        res.sendStatus(403)
      }
    })
  } else {
    res.sendStatus(403)
  }
}
