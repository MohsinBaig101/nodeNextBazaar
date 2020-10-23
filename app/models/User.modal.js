var mongoose = require('mongoose');
const Role = require('../models/Role.modal');
//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {type : String,required:true},
  email :{type:String,require:true},
  password: {type : String,required:true},
  roles : [{type: mongoose.ObjectId,ref:Role}]
});
const userModal = mongoose.model('User', userSchema );
module.exports = userModal;