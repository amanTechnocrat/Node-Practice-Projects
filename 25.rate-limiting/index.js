const express = require('express');
const app = express()
const ratelimit = require('express-rate-limit')

const limit = ratelimit({
    max:3,
    onLimitReached:()=>{console.log("hh")}
})

app.get("/get",limit,(req,res)=>{
    res.send("hi")
})

app.listen(8888)