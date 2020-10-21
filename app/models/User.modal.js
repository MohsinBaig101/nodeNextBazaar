var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {type : String,required:true},
  email :{type:String,require:true},
  password: {type : String,required:true},
});
const userModal = mongoose.model('User', userSchema );
module.exports = userModal;