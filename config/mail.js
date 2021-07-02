const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.googlemail.com',
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD
  }
})
module.exports = {
  transporter: transporter
}
