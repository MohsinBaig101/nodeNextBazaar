const AuthRoutes = require('./auth');
const UserRoutes = require('./user');

exports.bootstrap = app => {
    
    app.use(AuthRoutes.basePath,AuthRoutes.router);
    app.use(UserRoutes.basePath,UserRoutes.router);
}