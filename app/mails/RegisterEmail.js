const mainConfig = require("../../config/mail");

// async..await is not allowed in global scope, must use a wrapper
function main(next) {
  let info = mainConfig.transporter.sendMail({
                from: '"Fred Foo 👻" <mohsinbaig786786@gmail.com>', // sender address
                to: "mbaigarid@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            },function(err){
                console.log(err);
            });
            next();
}
module.exports = {
    sendMail : main
}