const jwt = require('jsonwebtoken');
module.exports = async (req, res, next,e) => {
    try {
      
      const { authorization } = req.headers
      const [authType, token] = authorization.trim().split(' ')
      if (authType !== 'Bearer') throw new Error('Expected a Bearer token')

      jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
          if(decoded.loggedInUser){  
              if(decoded.loggedInUser.roles.length > 0){
                 next();
              }else{
                return res.status(401).send({'message':'Your are Accessing unauthorized area'});
              }
              next();
          }else{
              return res.status(401).send({'message':'Token is Invalid'});
          }
      });
    } catch (error) {
      next(error.message)
    }
}