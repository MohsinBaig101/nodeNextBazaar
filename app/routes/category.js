var express = require('express');
var router = express.Router();
var multer  = require('multer')
const createCategoryValidator = require('../validation/createCategoryValidation');
var upload = multer({ dest: 'uploads/imgs/',fileFilter : (req, file, cb) => {
 console.log(file);
  if(file.mimetype == 'image/png'){
    cb(null, true)
  }else{
    cb(new Error('File Mime Type Incorrect'));
  }
} })
const CategoryController = require('../controllers/CategoryController');
const ValidationLogin = require('../validation/auth.login');
const ValidationRegister = require('../validation/auth.register');
router.get('/categories',CategoryController.getCategories);
router.post('/create-category',[createCategoryValidator(),Helper.validateRequest],CategoryController.createCategories);
router.post('/file-upload',upload.single('avatar'),CategoryController.fileUpload);
module.exports = {
    router: router,
};