const SubCatagory = require('../models/subCatagories.schema');

const getAllSubCategories = () =>{
    return SubCatagory.find({});
}

const getSubCategoryById  = (id) =>{
    return SubCatagory.findOne({id}, {'__v':false , "_id":false})
}

const addSubCatagory = (newSubCatagory) =>{
return new SubCatagory(newSubCatagory);
}

const deleteSubCatagory = (id) =>{
    return SubCatagory.findOneAndDelete({id});
}

module.exports = {
    getAllSubCategories,
    getSubCategoryById,
    addSubCatagory,
    deleteSubCatagory
}