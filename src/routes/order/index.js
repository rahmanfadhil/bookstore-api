const express = require('express')
const router = express.Router()

const Orders = require('./../../models/order')

router.use(require('./../../middlewares/verify-token'))

router.get('/', (req, res) => {
  Orders.find((err, data) => {
    if(!err){
      res.send({ text: 'success', data })
    } else {
      res.send(err.message)
    }
  })
})

router.post('/', (req, res) => {
  const bookData = {
    user_id: req.user_id,
    book_id: req.body.book_id,
    address: req.body.address,
    paid: req.body.paid,
  }
  let newBook = new Orders(bookData)
  newBook.save().then(data => {
    res.send({ text: 'success', msg: data })
  }).catch(err => {
    res.send({ text: 'error', msg: err.message })
  })
})

router.route('/:id')
.get((req, res) => {
  Orders.findOne({ _id : req.params.id }, (err, data) => {
    if(!err && data !== null) {
      res.send({ text: 'success', data })
    } else if(data == null) {
      res.send({ text: 'error', msg: 'Data not found'})
    } else {
      res.send({ text: 'error', msg: err.message })
    }
  })
})
.put((req, res) => {
  Orders.update({ _id: req.params.id }, req.body, (err, data) => {
    if(!err){
      res.send({ text: 'success', msg: data })
    } else {
      res.send({ text: 'error', msg: err.message })
    }
  })
})
.delete((req, res) => {
  Orders.remove({ _id: req.params.id }, (err, data) => {
    if(!err){
      res.send({ text: 'success', msg: data })
    } else {
      res.send({ text: 'error', msg: err.message })
    }
  })
})

module.exports = router
