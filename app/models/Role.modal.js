var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var roleSchema = new Schema({
  name: {type : String,required:true},
  key :{type:String,require:true},
  permissions : {type:Array}
});
const roleModal = mongoose.model('Role', roleSchema );
module.exports = roleModal;