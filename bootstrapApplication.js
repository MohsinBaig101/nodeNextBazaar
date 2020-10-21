exports.bootstrap = app => {
    const helper = require('./app/helpers/helper');
    global.Helper = helper.Helper;
    
    require('./app/routes/index').bootstrap(app);
    
    // const brands = require('./app/routes/user.js');
    // app.use(brands.basePath,brands.router);
    // app.get('/hello',function(req,res){
    //     res.status(201).send('checking');
    // })
    require('./config/connectDatabase.js').bootstrap();
};