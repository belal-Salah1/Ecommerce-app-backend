const asyncWrapper = require('../middlewares/asyncWrapper');
const statusCodeText = require('../utilites/statusCodeText');
const subCategoriesService = require('../services/subCategory.service ');
const validationHelper = require('../helpers/validation');
const getId = require('../utilites/getId');

const getAllSubCategories = asyncWrapper(async (req, res) => {
    const SubCatagories = await subCategoriesService.getAllSubCategories();
    validationHelper.validateDataExist(SubCatagories, 'No subcategories found');
    res.status(200).json({ status: statusCodeText.SUCCESS, data: { SubCatagories } });
})

const getSubCategoryById = asyncWrapper(async (req, res) => {
    const id = getId(req);
    const subCategory = await subCategoriesService.getSubCategoryById(id);
    validationHelper.validateItemExist(subCategory , 'Subcategory not found');
    res.status(200).json({ status: statusCodeText.SUCCESS, data: { subCategory } });
});

const addSubCatagory = asyncWrapper(async(req , res )=>{
    const {subcategories, id, categories } = req.body;
    validationHelper.validateAllFieldsProvided({ id, categories, subcategories });
    const newSubCatagory = { id, categories, subcategories };
    const subCatagory = await subCategoriesService.addSubCatagory(newSubCatagory);
    await subCatagory.save();
    res.status(201).json({status:statusCodeText.SUCCESS , message:'Category added successfully', data:{subCatagory}});
});

const deleteSubCatagory = asyncWrapper(async(req, res )=>{
    const id = getId(req);
    console.log(id);
    const subCategory = await subCategoriesService.deleteSubCatagory(id);
    validationHelper.validateItemExist(subCategory, 'Subcategory not found');
    res.status(200).json({status:statusCodeText.SUCCESS , message:'Subcategory deleted successfully', data:null});
});


module.exports = {
    getAllSubCategories,
    getSubCategoryById,
    deleteSubCatagory,
    addSubCatagory
}