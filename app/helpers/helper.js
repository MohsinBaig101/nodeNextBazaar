const { validationResult } = require('express-validator');

const helpers = {
    apiResponse : (req,res,statusCode=400,status=false,data = null,message = null,version = 'v1') => {
        return res.status(statusCode).send({
            status : status,
            data : data,
            message : message,
            version : version
        })
    },
    validateRequest:(req,res,next) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return Helper.apiResponse(req,res,400,false,errors.array(),'Validation Error');
            }
            next();
        }catch(err){
            return Helper.apiResponse(req,res,300,false,err,'Validation Error');
        }
        
    }
}
module.exports = {
    Helper : helpers,
}