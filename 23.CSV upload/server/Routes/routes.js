const express = require('express');
const pagecontroller = require('../Controller/controller');
const routes = express.Router();

routes.post('/csv',pagecontroller.readcsv)

module.exports=routes;