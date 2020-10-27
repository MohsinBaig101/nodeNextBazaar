const AuthRoutes = require('./auth');
const UserRoutes = require('./user');
const CategoryRoutes = require('./category');

exports.bootstrap = app => {
    
    app.use(AuthRoutes.basePath,AuthRoutes.router);
    app.use(UserRoutes.basePath,UserRoutes.router);
    app.use(CategoryRoutes.router);
}