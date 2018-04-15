const mongoose = require('mongoose')
const Schema = mongoose.Schema

const data_schema = new Schema({
  user_id: { type: String, required: true },
  book_id: { type: String, required: true },
  address: { type: String, required: true },
  paid: { type: Boolean, required: true },
  date: { type: Date, default: Date.now }
}, { collection: "order" });

module.exports = mongoose.model('Order', data_schema)
