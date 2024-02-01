const express = require('express');
const routes = express.Router()
const verifytoken = require('../middleware/verifytoken');
const usercontroller = require('../controller/usercontroller');
const filedupload = require('../middleware/imageupload');


routes.post('/adduser', usercontroller.add_user)

routes.post('/login', usercontroller.login_user)


routes.get('/getdata', verifytoken,usercontroller.get_user)

routes.delete('/deleteuser/:id', verifytoken,usercontroller.user_delete)

routes.put('/updateuser/:id',verifytoken ,usercontroller.update_user)

routes.post('/get',verifytoken,usercontroller.get_pic)

module.exports = routes;