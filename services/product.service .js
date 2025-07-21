const Product = require('../models/products.schema');


const getAllProducts = () =>{
    return Product.find({}, {'_v':false , "_id":false});
}

const getProductById = (pdId)=>{
    return Product.findOne({pdId}, {'__v':false , "_id":false});
}

const addProduct = (newProduct) => {
    return new Product(newProduct).save();
}
const updateProduct= (pdId ,updatedData) => {
    return Product.findOneAndUpdate({pdId},updatedData, {'__v': false , '_id':true})
}
const deleteProduct = (pdId) => {
    return Product.findOneAndDelete({pdId});
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct
};