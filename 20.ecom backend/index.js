const express = require('express');
const routes = require('./routes/ecomroutes');
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(cors())
app.use((err,req,res,next)=>{
    res.status(401).json({
        msg : 'incorrect data'
    })
})
app.use(routes)



// app.listen(8888,"192.168.4.24")
app.listen(9999,"192.168.4.24")
