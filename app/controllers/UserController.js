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
            return res.status(201).send(users);
        }catch(err){
            return res.status(400).send('Error');
        }
    },
    login : async (req,res) => {
        try{
            const users = await userModal.findOne({'name':req.body.name}).exec();
            if(users){
                bcrypt.compare(req.body.password,users.password,(err,result)=>{
                    if(result){
                        jwt.sign({ foo: 'bar' }, process.env.TOKEN_SECRET, { algorithm: 'HS256' }, function(err, token) {
                            
                            return res.status(200).send({
                                'message':'Correct Credentials',
                                'token' : token,
                                'error':err
                            });
                        });
                    }else{
                        return res.status(400).send('Invalid Credentials');
                    }
                });
            }else{   
                return res.status(400).send('Invalid Credentials');
            }
        }catch(error){
            return res.status(400).send('Error'+error);
        }
    },

    saveUsers: async (req, res, next) => {
        try {
            let user = new userModal();
            const hash = await bcrypt.hash(req.body.password,10);
            user.name = req.body.name;
            user.password = hash;
            user.save(user);
            return res.status(201).send({'message':'Record Saved Successfully'});
        } catch (error) {
            return res.status(201).send(error);
        }
    },

    // Retrieve and return a record from the database.
    /**
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    findOne: async (req, res, next) => {
        try {
            let brand = await brandService.getBrandWithData(req.params.id);
            if (brand) {
                return helper.apiResponse(res, false, "Brand found", brand);
            }
            return helper.apiResponse(res, false, "Failed! No record found.", {});

        } catch (error) {
            return helper.apiResponse(res, true, error.message, null);
        }
    },

    // Add a record to database.
    /**
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    add: async (req, res, next) => {
        try {
            let params = req.body;
            const brand = await brandService.create(params, req.user._id, req.token);
            return helper.apiResponse(res, false, "New Brand saved successfully", brand, 'CREATED');
        } catch (error) {
            const statusCode = error.status || 'INTERNAL_SERVER_ERROR';
            return helper.apiResponse(res, true, error.message, null, statusCode);
        }
    },

    // Find one record from database and update.
    /**
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    findOneAndUpdate: async (req, res, next) => {
        try {
            const brand = await brandService.update(req);
            return helper.apiResponse(res, false, "Brand updated successfully", brand);
        } catch (error) {
            console.log(error);
            const statusCode = error.status || 'INTERNAL_SERVER_ERROR';
            return helper.apiResponse(res, true, error.message, null, statusCode);
        }
    },

};