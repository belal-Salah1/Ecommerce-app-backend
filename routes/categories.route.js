const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo =require('../middlewares/allowedTo');
const userRoles =require('../utilites/userRoles')
router.route('/')
    .get(verifyToken,allowedTo(userRoles.ADMIN, userRoles.MANAGER),categoriesController.getAllCategories)
    .post(verifyToken,allowedTo(userRoles.ADMIN),categoriesController.addCategory)


router.route('/:id')
    .get(verifyToken,allowedTo(userRoles.ADMIN, userRoles.MANAGER),categoriesController.getCategoryById)
    .delete(verifyToken,allowedTo(userRoles.ADMIN),categoriesController.deleteCategory)



module.exports = router;