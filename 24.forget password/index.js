const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./Routes/forgetpassroutes');
const app = express()
const database = "Forgetpass"
mongoose.connect(`mongodb://localhost:27017/${database}`)
app.use(cors());
app.use(express.json())
app.use(routes)

app.listen(8888)