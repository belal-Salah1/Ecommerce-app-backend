const Category= require('../models/catagories.schema');
const asyncWrapper = require('../middlewares/asyncWrapper');
const statusCodeText = require('../utilites/statusCodeText');
const appError = require('../utilites/appError');
const categoryService = require('../services/category.service .js');
const categoriesHelper = require('../helpers/categories.helper.js');
const getId = require('../utilites/getId');

const getAllCategories = asyncWrapper(async(req, res) => {
    const categories = await categoryService.getAllCategories();
    categoriesHelper.validateCategoryiesExist(categories);
    res.status(200).json({ status: statusCodeText.SUCCESS, data: { categories } });
})
const getCategoryById = asyncWrapper(async(req, res) => {
    const id = getId(req);
    const category = await categoryService.getCategorieById(id);
    categoriesHelper.validateCategoryExist(category);
    res.status(200).json({ status: statusCodeText.SUCCESS, data: { category } });
});

const addCategory = asyncWrapper(async(req, res) => {
    const {id , name , imgSrc ,code} = req.body;
    categoriesHelper.validateAllFieldsProvided({id, name, imgSrc, code});
    const newCategory = {id , name , imgSrc ,code};
    const category = await categoryService.addCategory(newCategory);
    await category.save();

    res.status(201).json({ status: statusCodeText.SUCCESS, data: { category } });
    
});

const deleteCategory = asyncWrapper(async(req ,res)=>{
    const id = getId(req)
    const category = await categoryService.deleteCategory(id);
    categoriesHelper.validateCategoryExist(category);
    res.status(200).json({ status: statusCodeText.SUCCESS,message:'Product deleted successfully', data:  null });
})


module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    deleteCategory,
}