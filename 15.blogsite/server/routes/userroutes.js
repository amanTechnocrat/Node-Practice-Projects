const express = require('express');
const routes = express.Router()
const verifytoken = require('../middleware/verifytoken');
const usercontroller = require('../controller/usercontroller');



routes.post('/signup', usercontroller.add_user)
routes.post('/login', usercontroller.login_user)


// routes.get('/getdata', verifytoken,usercontroller.get_user)
routes.get('/getblogbyid/:id',verifytoken,usercontroller.get_blogbyid)
routes.get('/getblog',verifytoken,usercontroller.get_blog)

routes.post('/addblog', verifytoken,usercontroller.add_blog)

routes.delete('/deleteblog/:id', verifytoken,usercontroller.user_delete)

routes.put('/upblog/:id',verifytoken ,usercontroller.update_blog)

routes.post('/renewtoken',usercontroller.renew_token)

module.exports = routes;