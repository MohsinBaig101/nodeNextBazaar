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
            const users = await userModal.find({},'name email').exec();
            return Helper.apiResponse(req,res,200,true,users,'message');
        }catch(err){
            return Helper.apiResponse(req,res,400,false,err,'Error');
        }
    },
    

};