const SubCatagory = require('../models/subCatagories.schema');
const asyncWrapper = require('../middlewares/asyncWrapper');
const statusCodeText = require('../utilites/statusCodeText');
const appError = require('../utilites/appError');

const getAllSubCategories = asyncWrapper(async (req, res) => {
    const SubCatagories = await SubCatagory.find({});
    if(!SubCatagories){
        throw new appError(statusCodeText.FAIL, 404, 'No subcategories found');
    }
    res.status(200).json({ status: statusCodeText.SUCCESS, data: { SubCatagories } });
})

const getSubCategoryById = asyncWrapper(async (req, res) => {
    const id = +req.params.id;
    const category = await SubCatagory.findOne({id}, {'__v':false , "_id":false});
    if(!category){
        throw new appError(statusCodeText.FAIL, 400, 'No subcategory found, maybe an invalid id');
    }
    res.status(200).json({ status: statusCodeText.SUCCESS, data: { category } });
});

const addSubCatagory = asyncWrapper(async(req , res )=>{
    const {subcategories, id, categories } = req.body;
    if(!subcategories || !id || !categories){
        throw new appError(statusCodeText.FAIL, 400, 'Please provide all required fields');
    }
    const newSubCatagory = {
        id,
        categories,
        subcategories
    }
    const subCatagory = await new SubCatagory(newSubCatagory);
    await subCatagory.save();
    res.status(201).json({status:statusCodeText.SUCCESS , message:'Category added successfully', data:{subCatagory}});
});

const deleteSubCatagory = asyncWrapper(async(req, res )=>{
    const id = +req.params.id;
    const subCategory = await SubCatagory.findOneAndDelete({id}, {'__v': false , '_id':true});
    if(!subCategory){
        throw new appError(statusCodeText.FAIL, 400, 'Subcategory not found');
    }
    res.status(200).json({status:statusCodeText.SUCCESS , message:'Subcategory deleted successfully', data:{subCategory}});
});


module.exports = {
    getAllSubCategories,
    getSubCategoryById,
    deleteSubCatagory,
    addSubCatagory
}