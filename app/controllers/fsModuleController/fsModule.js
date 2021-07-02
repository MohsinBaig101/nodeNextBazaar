const fsPromises = require('fs').promises
// const fsPromises = require('fs');
const path = require('path')
module.exports = {
    createDir: async (req, res, next) => {
        // console.log(process.cwd()+'/public');
        // return res.send(path.resolve(process.cwd())+'/public/');

        const saved = await fsPromises.mkdir(path.join(path.resolve(process.cwd()), '/uploads/', 'dynamic/', 'check', 'j'), { recursive: true })
        res.send(saved)
        // fsPromises.mkdir(path.join(path.resolve(process.cwd()),'/uploads/','dynamic/','check','j'),{recursive:true},(err)=>{
        //     if(err) return next(err);
        //     return res.send('Directory Successfully created');
        // });
    }
}
