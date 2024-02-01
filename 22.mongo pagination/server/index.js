const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes/routes');
const database = "pagination"
mongoose.connect(`mongodb://localhost:27017/${database}`)

const app = express();
app.use(express.json())
app.use(cors())
app.use(routes)


app.listen(8888)