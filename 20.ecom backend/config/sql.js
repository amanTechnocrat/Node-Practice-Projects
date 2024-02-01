const mysql = require('mysql');
const ct = mysql.createConnection({
    host:"localhost",
    password:"kalol382721",
    user:"root",
    database:"pagination"
})
// ct.connect((err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("connected");
//     }
// });

module.exports = ct;