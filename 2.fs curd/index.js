const fs = require('fs');
const path = require('path');

// const type = process.argv;
// if (type[2] == "add") {
//     fs.writeFileSync(type[3], type[4])
// } else if (type[2] == "del") {
//     fs.unlinkSync(type[3])
// }
// console.log(__dirname,'curd');
const dirpath = path.join(__dirname,'curd')
console.log(dirpath);
const filepath = `${dirpath}/apple.txt`
// fs.writeFileSync(filepath,"this is apple")
// fs.readFile(filepath,'utf8',(err,item)=>{
//     console.log(item)
// })
// fs.appendFile(filepath," apple is file name",(err)=>{
//     if(!err) console.log("file is updated");
// })
// fs.rename(filepath,`${dirpath}/orange.txt`,(err)=>{
//         if(!err) console.log("file is Renamed")})
// fs.unlinkSync(`${dirpath}/orange.txt`)