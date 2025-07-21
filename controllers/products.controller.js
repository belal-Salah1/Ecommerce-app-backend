const asyncWrapper = require('../middlewares/asyncWrapper');
const statusCodeText = require('../utilites/statusCodeText');
const appError = require('../utilites/appError');
const productService = require('../services/product.service ');
const getId = require('../utilites/getId');
const validationHelper = require('../helpers/validation');
const { get } = require('mongoose');

const getAllProducts = asyncWrapper(async(req , res )=>{
    const products = await productService.getAllProducts();
    validationHelper.validateDataExist(products, 'No products found');
    res.status(200).json({status:statusCodeText.SUCCESS , data:{products}} );
})

const getProductById = asyncWrapper(async(req,res)=>{
    const pdId = getId(req);
    const product = await productService.getProductById(pdId);
    validationHelper.validateItemExist(product, 'Product not found');
    res.status(200).json({status:statusCodeText.SUCCESS , data:{product}});
})

const addProduct = asyncWrapper(async(req , res )=>{
    const {pdId, pdName, pdDesc , pdPrice,pdCategory ,pdSubCategory , pdImg , pdSize} = req.body;
    validationHelper.validateAllFieldsProvided({pdId, pdName, pdDesc, pdPrice, pdCategory, pdSubCategory, pdImg});
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
    const product = await productService.addProduct(newProduct);
    await product.save();
    res.status(201).json({status:statusCodeText.SUCCESS , message:'Product added successfully', data:{product}});
})

const updateProduct = asyncWrapper(async(req, res )=>{
    const pdId = getId(req);
    const product = await productService.updateProduct(pdId, req.body);
    validationHelper.validateItemExist(product, 'Product not found');
    res.status(200).json({status:statusCodeText.SUCCESS , message:'Product updated successfully', data:{product}});
})
const deleteProduct = asyncWrapper(async(req, res )=>{
    const pdId = getId(req);
    const product = await productService.deleteProduct(pdId);
    validationHelper.validateItemExist(product, 'Product not found');
    res.status(200).json({status:statusCodeText.SUCCESS , message:'Product deleted successfully', data:null});
})

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    addProduct,
    deleteProduct
}