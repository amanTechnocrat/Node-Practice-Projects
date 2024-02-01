const express = require('express');
const path = require('path');

const app = express()
const location = path.join(__dirname,'public')

// app.get('',(req,res)=>{
//     console.log(req.query);
//     res.send('hello,this home page')
// })

// app.get('/about',(req,res)=>{
//     console.log(req.query);
//     res.send('<h1>hello,this is about page</h1>')
// })
// app.use(express.static(location))
app.get('',(_,res)=>{
    res.sendFile(`${location}/index.html`)
})
app.get('/about',(_,res)=>{
    res.sendFile(`${location}/about.html`)
})
app.get('*',(_,res)=>{
    res.sendFile(`${location}/404.html`)
})
app.listen(8888) 

