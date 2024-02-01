const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    // host:'smtp.gmail.com',
    // port:587,
    // secure:false,
    // requireTLS:true,
    service:'gmail',
    auth:{
        user:"aman.elsner@gmail.com",
        pass:""
    }
})

let mails = {
    from:'test <aman.elsner@gmail.com>',
    to:'aman.elsner@gmail.com',
    subject:"test1ssss",
    text:"test1fsgdbfgn"
}
transporter.sendMail(mails,(err,info)=>{
    if(err) throw err;
    else{
        console.log(info);
    }
})