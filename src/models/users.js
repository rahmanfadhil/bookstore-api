const mongoose = require('mongoose')
const Schema = mongoose.Schema

const data_schema = new Schema({
  email: { type: String, required: true },
  pass: { type: String, required: true }
}, { collection: "users" });

module.exports = mongoose.model('Users', data_schema)
