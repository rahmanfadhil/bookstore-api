const mongoose = require('mongoose')
const Schema = mongoose.Schema

const data_schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  genre: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { collection: "books" });

module.exports = mongoose.model('Books', data_schema)
