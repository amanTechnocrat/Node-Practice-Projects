const express = require('express');
const { listen } = require('express/lib/application');

const app =express()
app.set('view engine','ejs')
const data={
    name:"harry",
    gender:"male",
    hobbies:["travel","cricket","movies"]
}
app.get('',(_,res)=>{
 res.render('page',{data})
})
app.get('/home',(_,res)=>{
    res.render('home')
   })
app.listen(8888)