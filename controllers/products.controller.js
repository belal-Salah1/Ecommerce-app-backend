const Product = require('../models/products.schema');
const asyncWrapper = require('../middlewares/asyncWrapper');
const statusCodeText = require('../utilites/statusCodeText');
const appError = require('../utilites/appError');
const getAllProducts = asyncWrapper(async(req , res )=>{
    const products = await Product.find({}, {'_v':false , "_id":false});
    if(!products || products.length === 0){
        throw new appError(statusCodeText.FAIL, 404, 'No products found');
    }
    res.status(200).json({status:statusCodeText.SUCCESS , data:{products}} );
})

const getProductById = asyncWrapper(async(req,res)=>{
    const pdId = +req.params.pdId;
    const product = await Product.findOne({pdId}, {'__v':false , "_id":false});
    if(!product){
        throw new appError(statusCodeText.FAIL, 404, 'no product found maybe an invalid id');
    }   
    res.status(200).json({status:statusCodeText.SUCCESS , data:{product}});
})

const addProduct = asyncWrapper(async(req , res )=>{
    const {pdId, pdName, pdDesc , pdPrice,pdCategory ,pdSubCategory , pdImg , pdSize} = req.body;
    if(!pdId || !pdName || !pdDesc || !pdPrice || !pdCategory || !pdSubCategory || !pdImg){
        throw new appError(statusCodeText.FAIL, 400, 'Please provide all required fields');
    }
    const newProduct = {
        pdId,
        pdName,
        pdDesc,
        pdPrice,
        pdCategory,
        pdSubCategory,
        pdImg,
        pdSize
    }
    const product = await new Product(newProduct);
    await product.save();
    res.status(201).json({status:statusCodeText.SUCCESS , message:'Product added successfully', data:{product}});
})

const updateProduct = asyncWrapper(async(req, res )=>{
    const pdId = +req.params.pdId;
    const product = await Product.findOneAndUpdate({pdId}, req.body, {'__v': false , '_id':true});
    if(!product){
        throw new appError(statusCodeText.FAIL, 404, 'Product not found');
    }
    res.status(200).json({status:statusCodeText.SUCCESS , message:'Product updated successfully', data:{product}});
})
const deleteProduct = asyncWrapper(async(req, res )=>{
    const pdId = +req.params.pdId;
    const product = await Product.findOneAndDelete({pdId}, {'__v': false , '_id':true});
    if(!product){
        throw new appError(statusCodeText.FAIL, 404, 'Product not found');
    }
    res.status(200).json({status:statusCodeText.SUCCESS , message:'Product deleted successfully', data:{product}});
})

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    addProduct,
    deleteProduct
}