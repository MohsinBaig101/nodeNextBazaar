const express = require('express')
const router = express.Router()
const multer = require('multer')
const createCategoryValidator = require('../validation/createCategoryValidation')
const upload = multer({
  dest: 'uploads/imgs/',
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.mimetype == 'image/png') {
      cb(null, true)
    } else {
      cb(new Error('File Mime Type Incorrect'))
    }
  }
})
const { getCategories, createCategories, fileUpload } = require('../controllers/CategoryController')
// console.log(CategoryController);
const ValidationLogin = require('../validation/auth.login')
const ValidationRegister = require('../validation/auth.register')
router.get('/categories', getCategories)
router.post('/create-category', [createCategoryValidator(), Helper.validateRequest], createCategories)
router.post('/file-upload', upload.single('avatar'), fileUpload)
module.exports = {
  router: router
}
