const jwt = require('jsonwebtoken')
module.exports = async (req, res, next, routeRoule) => {
  try {
    const { authorization } = req.headers
    const [authType, token] = authorization.trim().split(' ')
    if (authType !== 'Bearer') return Helper.apiResponse(req, res, 400, false, null, 'Expected a bearer token')

    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
      if (decoded.loggedInUser) {
        if (decoded.loggedInUser.roles.length > 0) {
          const roles = decoded.loggedInUser.roles
          let matchedCheck = false
          roles.forEach(element => {
            routeRoule.forEach(routeR => {
              if (element.key === routeR) {
                matchedCheck = true
              }
            })
          })
          if (matchedCheck === true) {
            next()
          } else {
            return Helper.apiResponse(req, res, 400, false, null, 'Your are Accessing unauthorized area')
          }
        } else {
          return Helper.apiResponse(req, res, 400, false, null, 'Your are Accessing unauthorized area')
        }
      } else {
        return Helper.apiResponse(req, res, 400, false, null, 'Token is Invalid')
      }
    })
  } catch (error) {
    return Helper.apiResponse(req, res, 400, false, error, '')
  }
}
