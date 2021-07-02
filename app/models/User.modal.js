const mongoose = require('mongoose')
const Role = require('../models/Role.modal')
// Define a schema
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, require: true },
  password: { type: String, required: true },
  roles: [{ type: mongoose.ObjectId, ref: Role }]
})
const userModal = mongoose.model('User', userSchema)
module.exports = userModal
