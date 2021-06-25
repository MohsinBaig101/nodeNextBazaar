const Category = require('../models/Category.modal');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const categoryService = require('../services/CategoryService');
module.exports = {
    // Retrieve and return records from the database.
    /**
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    getCategories: async (req,res,next) => {
        const page = req.query.page;
        const perPage = parseInt(req.query.perPage);
        const categories = await Category.find().limit(perPage).skip(page > 0?(page-1)* perPage: 0 * perPage).exec();
        return Helper.apiResponse(req,res,200,true,categories,'message');
    },
    createCategories: async (req,res,next) => {
        const data = {
            name : req.body.name,
            slug : req.body.slug,
            description : req.body.description,
            picture : req.body.picture,
            icon_class : req.body.icon_class,
            parent_id : req.body.parent_id
        };
        try{
            const isSaved = await categoryService.createCategory(data);
            console.log(isSaved);
            if(isSaved.success === true){
                return Helper.apiResponse(req,res,200,true,isSaved.data,'Category is Saved');
            }else{
                return Helper.apiResponse(req,res,400,false,isSaved.error,isSaved.errMsg);
            }
        }catch(err){
            return Helper.apiResponse(req,res,400,false,err,'Error !');
        }
    },
    fileUpload : async (req,res,next) => {
        return Helper.apiResponse(req,res,200,true,null,'File Upload Successfully')
    }
    

};