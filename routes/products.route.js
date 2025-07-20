const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utilites/userRoles');
router.route('/')
    .get(verifyToken ,allowedTo(userRoles.ADMIN , userRoles.MANAGER) ,productsController.getAllProducts)
    .post(verifyToken,allowedTo(userRoles.ADMIN ), productsController.addProduct);
    




router.route('/:pdId')
    .get(verifyToken, allowedTo(userRoles.ADMIN , userRoles.MANAGER),productsController.getProductById)
    .patch(verifyToken, allowedTo(userRoles.ADMIN , userRoles.MANAGER),productsController.updateProduct)
    .delete(verifyToken, allowedTo(userRoles.ADMIN), productsController.deleteProduct);
   


module.exports = router;