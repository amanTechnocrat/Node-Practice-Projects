const express = require('express');
const routes = require('./routes/userroutes');
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)



// app.listen(8888,"192.168.4.24")
app.listen(8888)
