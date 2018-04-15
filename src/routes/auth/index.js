const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Users = require('./../../models/users')

const TOKEN_KEY = 'my_secret_key'

const verify_token = require('./../../middlewares/verify-token')

// Route for get user
router.get('/user', verify_token, (req, res) => {
  res.send({ text: 'success' , data: req.user_data })
})

// Route for update user data
router.put('/user', verify_token, (req, res) => {
  if(req.body.email && req.body.pass){
    const user = {
      email: req.body.email,
      pass: req.body.pass
    }
    Users.update(user, (err, data) => {
      if(!err){
        let token = jwt.sign({ data }, TOKEN_KEY)
        res.send({ text: 'success', data, token })
      } else {
        res.send({ text: 'error' , msg: err.message })
      }
    })
  } else {
    res.send({ text: 'error', msg: 'Email and password cannot be empty' })
  }
})

// Route for register new user
router.post('/register', (req, res) => {
  if(req.body.email && req.body.pass){
    const user = {
      email: req.body.email,
      pass: req.body.pass
    }
    Users.findOne({ email: user.email }, (err, data) => {
      if (!err && data == null){
        let newUser = new Users(user)
        newUser.save().then((new_data) => {
          const token = jwt.sign({ data: new_data }, TOKEN_KEY)
          res.send({ text: "success", user, token })
        }).catch(error => {
          res.send({ text: 'error', msg: error.message})
        })
      } else if (data !== null) {
        res.send({ text: 'error', msg: 'Email already exist' })
      } else {
        res.send({ text: 'error', msg: err.message })
      }
    })
  } else {
    res.send({ text: 'error', msg: 'Email and password cannot be empty' })
  }
})

// Route for login to account
router.post('/login', (req, res) => {
  if(req.body.email && req.body.pass){
    const user = {
      email: req.body.email,
      pass: req.body.pass
    }
    Users.findOne(user, (err, data) => {
      if (!err && data !== null){
        const token = jwt.sign({ data }, TOKEN_KEY)
        res.send({ text: "success", token })
      } else if (data == null) {
        res.send({ text: 'error', msg: 'Email and password is incorrect' })
      } else {
        res.send({ text: 'error', msg: err.message })
      }
    })
  } else {
    res.sendStatus({ text: 'error', msg: 'Email and password cannot be empty' })
  }
})

module.exports = router
