const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const Auth = require('../middleware/auth')
const ACL = require('../middleware/acl')

router.use('/get', Auth)

router.get('/get', function (req, res, next) {
  ACL(req, res, next, ['client'])
}, UserController.getUsers)

module.exports = {
  router: router,
  basePath: '/users'
}
