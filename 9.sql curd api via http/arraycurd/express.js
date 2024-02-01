const express = require('express');
const app = express()
let array = ["wfved","fedfw","qwerty"]

app.use(express.json())

app.get('/get',(req,res)=>{
    res.send(array)
})
app.post('/post',(req,res)=>{
    array.push(req.body.data)
    res.send(array)
})
app.delete('/delete',(req,res)=>{
    let id = req.body.id
    array.splice(id,1);
    res.send(array)
})
app.put('/put',(req,res)=>{
    id = req.body.id
    data = req.body.data    
    array.splice(id, 1, data);
    res.send(array)
})

app.listen(8888)