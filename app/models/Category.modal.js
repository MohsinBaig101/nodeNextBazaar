const mongoose = require('mongoose')

// Define a schema
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  icon_class: { type: String, required: true },
  parent_id: { type: Number }
})
const CategoryModal = mongoose.model('Category', CategorySchema)
module.exports = CategoryModal
