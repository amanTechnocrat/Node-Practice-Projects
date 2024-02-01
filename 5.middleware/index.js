const express = require('express');
const filter = require('./middileware');

const app = express()
const route = express.Router()

// app.use(filter)
route.use(filter)
app.get('', filter, (_, res) => {
    res.send('welcome')
})
app.get('/home', filter, (_, res) => {
    res.send('home')
})
route.get('/help', filter, (_, res) => {
    res.send('help')
})
route.get('/info',filter,(_,res)=>{
    res.send('info')
})
app.use('/',route)
app.listen(8888)