const User = require('../../models/User.modal');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
module.exports = {
    login : async (req,res) => {
        try{
            const users = await User.findOne({'name':req.body.name}).exec();
            if(users){
                bcrypt.compare(req.body.password,users.password,(err,result)=>{
                    if(result){
                        jwt.sign({ loggedInUser: users }, process.env.TOKEN_SECRET, { algorithm: 'HS256' }, function(err, token) {
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

    register: async (req, res, next) => {
        try {
            let user = new User();
            const hash = await bcrypt.hash(req.body.password,10);
            user.name = req.body.name;
            user.password = hash;
            user.email = req.body.email
            user.save(user);
            return Helper.apiResponse(req,res,200,true,null,'Record Saved Successfully');
        } catch (error) {
            return Helper.apiResponse(req,res,400,false,null,'Something went wrong');
        }
    },

};