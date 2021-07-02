const Category = require('../models/Category.modal')
module.exports = {
  createCategory: async (data) => {
    const category = new Category()
    category.name = data.name
    category.slug = data.slug
    category.description = data.description
    category.picture = data.picture
    category.icon_class = data.icon_class
    category.parent_id = data.parent_id
    try {
      const categorySave = await category.save()
      const dataSaved = {
        success: true,
        data: categorySave
      }
      return dataSaved
    } catch (err) {
      const dataSaved = {
        success: false,
        error: err._message,
        errMsg: err._message
      }
      return dataSaved
    }
  }
}
