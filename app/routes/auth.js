const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth/AuthController')
const ValidationLogin = require('../validation/auth.login')
const ValidationRegister = require('../validation/auth.register')
router.post('/register', [ValidationRegister()], Helper.validateRequest, AuthController.register)
router.post('/login', [ValidationLogin()], Helper.validateRequest, AuthController.login)
module.exports = {
  router: router,
  basePath: '/auth'
}
