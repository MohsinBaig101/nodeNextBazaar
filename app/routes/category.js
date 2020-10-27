var express = require('express');
var router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const ValidationLogin = require('../validation/auth.login');
const ValidationRegister = require('../validation/auth.register');
router.get('/categories',CategoryController.getCategories);
module.exports = {
    router: router,
};