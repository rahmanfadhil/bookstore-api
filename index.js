// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()

// Connect to database
mongoose.connect('mongodb://localhost/bookstore')

// Middlewares
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(require('./src/middlewares/jwt-token'))

// Require all routes
app.use('/auth', require('./src/routes/auth'))
app.use('/order', require('./src/routes/order'))
app.use('/books', require('./src/routes/books'))

const PORT = process.env.PORT || 8000

app.listen(PORT, err => {
  console.log(`listening on localhost:${PORT}`);
})
