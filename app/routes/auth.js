var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/auth/AuthController');
const Validation = require('../validation/auth.login');
router.post('/register',[Validation()],AuthController.register);
router.post('/login',[Validation()],AuthController.login);
module.exports = {
    router: router,
    basePath: '/auth'
};