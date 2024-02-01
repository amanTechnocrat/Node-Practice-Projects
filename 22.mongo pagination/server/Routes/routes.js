const verifytoken = require('../helper/jwt').verifytoken;
const express = require('express');
const pagecontroller = require('../Controller/pagecontroller');
const routes = express.Router();


routes.get('/get',verifytoken,pagecontroller.pagination)
routes.post('/gentoken',pagecontroller.token)

module.exports=routes;