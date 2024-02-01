const express = require('express');
const routes = express.Router()

const ecomcontroller = require('../controllers/ecomcontroller');


routes.get('/getproductbyid/:id',ecomcontroller.get_productbyid)
routes.get('/getproducts',ecomcontroller.get_product)

routes.post('/addproducts', ecomcontroller.add_product)
routes.post('/add', ecomcontroller.add_product55)

routes.delete('/deleteproducts/:id', ecomcontroller.delete_product)

routes.put('/updateproducts/:id',ecomcontroller.update_product)

routes.get('/image/:url',ecomcontroller.viewimage)
routes.get('/video/:url',ecomcontroller.videost)
routes.all('*',ecomcontroller.all)

module.exports = routes;