const bcrypt = require('bcrypt');
const express = require('express');
const cookie = require('cookie-parser');
const app = express()
app.use(cookie())

const uu = bcrypt.genSalt(10)
//  function(err, salt) {
//     return salt
// })
setTimeout(() => {
    console.log(uu)
}, 1000);
// const hashpassword =async(plaintext)=>{
//     const hash = await bcrypt.hash(plaintext,10);
//     console.log(hash);

//     const checkplaintext = await bcrypt.compare(plaintext,hash);
//     console.log(checkplaintext);
// }

// hashpassword("aman")

// app.get('/setcookie',(req,res,next)=>{
//     // res.setHeader('set-cookie','gt=hh')
//     res.cookie("kk",'oo')
// })

// app.get('/getcookie',(req,res,next)=>{
//     res.send(req.cookies)
// })

// app.delete('/deletecookie',(req,res,next)=>{
//     res.clearCookie("kk")
//     res.send("deleted")
// })

// app.listen(8888)