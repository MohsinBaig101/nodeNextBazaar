const { body, validationResult, check } = require('express-validator');
const mongoose = require('mongoose');
const Category = require('../models/Category.modal');
const validation = {
    validate : () => {
        return[
            body('name','Name is Required Field').not().isEmpty(),
            body('description','Description is Required Field').not().isEmpty(),
            body('picture','Picture is Required Field').not().isEmpty(),
            body('icon_class','Icon Class is Required Field').not().isEmpty(),
            check('slug').not().isEmpty().custom(val=>{
                var query = Category.find({ slug: val})
                return query.exec().then(category => {
                    if (category.length > 0) {
                         return Promise.reject('Category Slug already Exist');
                    }
                });
            })
        ];
    }
}
module.exports = validation.validate;