const mongoose = require('mongoose')

// Define a schema
const Schema = mongoose.Schema

const permissionSchema = new Schema({
  name: { type: String, required: true },
  key: { type: String, require: true }
})
const permissionModal = mongoose.model('Permission', permissionSchema)
module.exports = permissionModal
