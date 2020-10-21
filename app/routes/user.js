var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const Auth = require('../middleware/auth');
  router.use('/get',Auth);
router.get('/get',UserController.getUsers);
router.post('/post',UserController.saveUsers);
router.post('/login',UserController.login);
module.exports = {
    router: router,
    basePath: '/users'
};