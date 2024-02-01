const fs = require('fs');
const path = require('path');
const location = path.join(`${__dirname}/files`)
console.log(location);

//  for (let i = 1; i < 6; i++) {
//      fs.writeFileSync(`${location}/test${i}.txt`,`this is testfile ${i}`);
//     //  fs.writeFileSync(location+"/test"+i+".txt","this is test")
//  }
fs.readdir(location,(error,file)=>{
    file.map((val)=>{
        console.log(val);
    })
})