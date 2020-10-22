var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var permissionSchema = new Schema({
  name: {type : String,required:true},
  key :{type:String,require:true}
});
const permissionModal = mongoose.model('Permission', permissionSchema );
module.exports = permissionModal;