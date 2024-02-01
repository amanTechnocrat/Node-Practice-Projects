const express = require('express');
const controller = require('../Controller/forgetcontroller');
const {verifytoken} = require('../Middleware/jwt');
const routes = express.Router();

routes.get("/",controller.get)
routes.post("/forgetpass",controller.forgetpass)
routes.post("/cp",verifytoken,controller.createfp)

module.exports = routes;