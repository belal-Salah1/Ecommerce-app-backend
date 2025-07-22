const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/subCategories.controller');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utilites/userRoles');

router.route('/')
    .get(verifyToken,allowedTo(userRoles.ADMIN ,userRoles.MANAGER,userRoles.USER),categoriesController.getAllSubCategories)
    .post(verifyToken,allowedTo(userRoles.ADMIN), categoriesController.addSubCatagory);


router.route('/:id')
    .get(verifyToken,allowedTo(userRoles.ADMIN ,userRoles.MANAGER,userRoles.USER), categoriesController.getSubCategoryById)
    .delete(verifyToken,allowedTo(userRoles.ADMIN), categoriesController.deleteSubCatagory);



module.exports = router;