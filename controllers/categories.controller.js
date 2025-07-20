const Category= require('../models/catagories.schema');
const asyncWrapper = require('../middlewares/asyncWrapper');
const statusCodeText = require('../utilites/statusCodeText');
const appError = require('../utilites/appError');

const getAllCategories = asyncWrapper(async(req, res) => {
    const categories = await Category.find({}, { '__v': false, '_id': false });
    if(!categories){
        throw new appError(statusCodeText.FAIL, 404, 'No categories found');
    }
    res.status(200).json({ status: statusCodeText.SUCCESS, data: { categories } });
})
const getCategoryById = asyncWrapper(async(req, res) => {
    const id = +req.params.id;
    const category = await Category.findOne({ id }, { '__v': false, '_id': false });
    if(!category){
        throw new appError(statusCodeText.FAIL, 404, 'No category found, maybe an invalid id');
    }
    res.status(200).json({ status: statusCodeText.SUCCESS, data: { category } });
});

const addCategory = asyncWrapper(async(req, res) => {
    const {id , name , imgSrc ,code} = req.body;
    if(!id || !name || !imgSrc || !code){
        throw new appError(statusCodeText.FAIL, 404, 'please provide all required fields ');
    }
    const newCategory = {id , name , imgSrc ,code};
    const category = await new Category(newCategory);
    await category.save();

    res.status(201).json({ status: statusCodeText.SUCCESS, data: { category } });
    
});

const deleteCategory = asyncWrapper(async(req ,res)=>{
    const id = +req.params.id;
    const category = await Category.findOneAndDelete({id}, {'__V':false , '_id':false})
    if(!category){
        throw new appError(statusCodeText.FAIL, 404, 'please provide all required fields');
    }
    res.status(200).json({ status: statusCodeText.SUCCESS,message:'Product deleted successfully', data:  null });
})


module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    deleteCategory,
}