const express = require('express')
const router = express.Router()

const Books = require('./../../models/books')

const verify_token = require('./../../middlewares/verify-token')

router.get('/', (req, res) => {
  Books.find((err, data) => {
    if(!err){
      res.send({ text: 'success', data })
    } else {
      res.send(err.message)
    }
  })
})

router.post('/', verify_token, (req, res) => {
  const bookData = {
    title: req.body.title,
    description: req.body.description,
    stock: req.body.stock,
    genre: req.body.genre,
    date: new Date()
  }
  let newBook = new Books(bookData)
  newBook.save().then(data => {
    res.send({ text: 'success', msg: data })
  }).catch(err => {
    res.send({ text: 'error', msg: err.message })
  })
})

router.route('/:id')
.get((req, res) => {
  Books.findOne({ _id : req.params.id }, (err, data) => {
    if(!err && data !== null) {
      res.send({ text: 'success', data })
    } else if(data == null) {
      res.send({ text: 'error', msg: 'Data not found'})
    } else {
      res.send({ text: 'error', msg: err.message })
    }
  })
})
.put(verify_token, (req, res) => {
  Books.update({ _id: req.params.id }, req.body, (err, data) => {
    if(!err){
      res.send({ text: 'success', msg: data })
    } else {
      res.send({ text: 'error', msg: err.message })
    }
  })
})
.delete(verify_token, (req, res) => {
  Books.remove({ _id: req.params.id }, (err, data) => {
    if(!err){
      res.send({ text: 'success', msg: data })
    } else {
      res.send({ text: 'error', msg: err.message })
    }
  })
})

module.exports = router
