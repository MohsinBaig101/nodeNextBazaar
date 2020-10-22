const userModal = require('../models/User.modal');
const bcrypt = require('bcrypt');
const user = require('../routes/user');
var jwt = require('jsonwebtoken');

module.exports = {
    // Retrieve and return records from the database.
    /**
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    getUsers: async (req,res,next) => {
        try{
            const users = await userModal.find({}).exec();
          
            return Helper.apiResponse(req,res,200,true,users,'message');
        }catch(err){
            return Helper.apiResponse(req,res,400,false,err,'Error');
        }
    },
    login : async (req,res) => {
        try{
            const users = await userModal.findOne({'name':req.body.name}).exec();
            if(users){
                bcrypt.compare(req.body.password,users.password,(err,result)=>{
                    if(result){
                        jwt.sign({ foo: 'bar' }, process.env.TOKEN_SECRET, { algorithm: 'HS256' }, function(err, token) {
                            let data = {
                                token : token
                            };
                            let message = 'Login Successfully';
                            return Helper.apiResponse(req,res,200,true,data,message);
                        });
                    }else{
                        let message = 'Invalid Credentials';
                        return Helper.apiResponse(req,res,400,false,null,message);
                    }
                });
            }else{   
                let message = 'Invalid Credentials';
                return Helper.apiResponse(req,res,400,false,null,message);
            }
        }catch(error){
            let message = 'Invalid Credentials';
            return Helper.apiResponse(req,res,400,false,null,message);
        }
    },

    saveUsers: async (req, res, next) => {
        try {
            let user = new userModal();
            const hash = await bcrypt.hash(req.body.password,10);
            user.name = req.body.name;
            user.password = hash;
            user.save(user);
            return Helper.apiResponse(req,res,200,true,null,'Record Saved Successfully');
        } catch (error) {
            return Helper.apiResponse(req,res,400,false,null,'Something went wrong');
        }
    },

};