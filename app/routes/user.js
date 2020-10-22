var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const Auth = require('../middleware/auth');
const ACL = require('../middleware/acl');

  router.use('/get',Auth);
  router.get('/get',function(req,res,next){
    ACL(req,res,next,['admin'])
  },UserController.getUsers);
  router.post('/post',UserController.saveUsers);
  router.post('/login',UserController.login);
module.exports = {
    router: router,
    basePath: '/users'
};