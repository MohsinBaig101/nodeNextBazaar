const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) return Helper.apiResponse(req,res,400,false,null,'Expected a bearer token');

    const [authType, token] = authorization.trim().split(' ')
    if (authType !== 'Bearer') return Helper.apiResponse(req,res,400,false,null,'Expected a bearer token');

    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if(decoded.loggedInUser){  
            next();
        }else{
            return res.status(401).send({'message':'Token is Invalid'});
        }
    });
  } catch (error) {
    return Helper.apiResponse(req,res,400,false,error,'');
  }
}