const helpers = {
    apiResponse : (req,res,statusCode=null,status=null,data = null,message = null,version = 'v1') => {
        return res.status(statusCode).send({
            status : status,
            data : data,
            message : message,
            version : version
        })
    }
}
module.exports = {
    Helper : helpers,
}