const nodemailer = require('nodemailer');
require('dotenv').config()

const mail = (to,token) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "aman.elsner@gmail.com",
            pass: process.env.yy
        }
    })

    let mails = {
        from: 'test <aman.elsner@gmail.com>',
        to: "aman.elsner@gmail.com",
        subject: "Reset Password",
        html:`Vist this link for reset new password<br>
        Link: <a href='http://192.168.4.24:3000/f/${token}'>click to reset your account</a><br />`
    }
    transporter.sendMail(mails, (err, info) => {
        if (err) throw err;
    })
}

module.exports = mail;