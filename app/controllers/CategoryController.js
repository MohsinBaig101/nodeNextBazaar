const Category = require('../models/Category.modal');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {
    // Retrieve and return records from the database.
    /**
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    getCategories: async (req,res,next) => {
        const categories = await Category.find({'parent_id':0,'active':1}).exec();
        return Helper.apiResponse(req,res,200,true,categories,'message');
    },
    

};