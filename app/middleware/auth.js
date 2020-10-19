const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new Error('You must send an Authorization header')

    const [authType, token] = authorization.trim().split(' ')
    if (authType !== 'Bearer') throw new Error('Expected a Bearer token')

    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if(decoded.foo){  
            next();
        }else{
            return res.status(401).send({'message':'Token is Invalid'});
        }
    });
  } catch (error) {
    next(error.message)
  }
}