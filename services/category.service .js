const Category= require('../models/catagories.schema');


const getAllCategories = ()=>{
    return Category.find({}, { '__v': false, '_id': false })
}

const getCategorieById = (id)=>{
    return Category.findOne({ id }, { '__v': false, '_id': false })
}


const addCategory = (newCategory)=>{
    return new Category(newCategory);
}

const deleteCategory = (id)=>{
    return Category.findOneAndDelete({id}, {'__V':false , '_id':false})
}

module.exports = {
    getAllCategories,
    getCategorieById,
    addCategory,
    deleteCategory
}