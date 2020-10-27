const User = require('../../models/User.modal');
const Role = require('../../models/Role.modal');
const RegisterMail = require('../../mails/RegisterEmail');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { find } = require('../../models/Role.modal');
module.exports = {
    login : async (req,res,next) => {
        try{
            const users = await User.findOne({'email':req.body.email}).populate('roles').exec();
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
            return Helper.apiResponse(req,res,400,false,error,message);
        }
    },

    register: async (req, res, next) => {
        try {
            const role = await Role.findOne({'key':'client'}).exec();
            if(role){
                let user = new User();
                const hash = await bcrypt.hash(req.body.password,10);
                user.name = req.body.name;
                user.password = hash;
                user.roles = [
                    role._id
                ];
                user.email = req.body.email;
                user.save(user).then(()=>{
                    RegisterMail.sendMail(next);
                })
               
                return Helper.apiResponse(req,res,200,true,null,'Record Saved Successfully');
            }else{
                let roleSave = new Role({
                    name : 'Client',
                    key:'client',
                    permissions : []
                });
                roleSave.save( async (err)=>{
                    if(err) return Helper.apiResponse(req,res,400,false,err,'Something went wrong');
                    let user = new User();
                    const hash = await bcrypt.hash(req.body.password,10);
                    user.name = req.body.name;
                    user.password = hash;
                    user.email = req.body.email;
                    user.roles = [
                        roleSave._id
                    ];
                    user.save(user).then(()=>{
                        RegisterMail.sendMail(next);
                    });
                    return Helper.apiResponse(req,res,200,true,null,'Record Saved Successfully');
                })
                
            }          
            
        } catch (error) {
            return Helper.apiResponse(req,res,400,false,null,'Something went wrong');
        }
    },

};