const asyncWrapper = require('../middlewares/asyncWrapper');
const statusCodeText = require('../utilites/statusCodeText');
const appError = require('../utilites/appError');
const productService = require('../services/product.service ');
const getId = require('../utilites/getId');
const productsHelper = require('../helpers/products.helper');
const { get } = require('mongoose');

const getAllProducts = asyncWrapper(async(req , res )=>{
    const products = await productService.getAllProducts();
    productsHelper.validateProductsExist(products);
    res.status(200).json({status:statusCodeText.SUCCESS , data:{products}} );
})

const getProductById = asyncWrapper(async(req,res)=>{
    const pdId = getId(req);
    const product = await productService.getProductById(pdId);
    productsHelper.validateProductExist(product);
    res.status(200).json({status:statusCodeText.SUCCESS , data:{product}});
})

const addProduct = asyncWrapper(async(req , res )=>{
    const {pdId, pdName, pdDesc , pdPrice,pdCategory ,pdSubCategory , pdImg , pdSize} = req.body;
    productsHelper.validateAllFieldsProvided({pdId, pdName, pdDesc, pdPrice, pdCategory, pdSubCategory, pdImg});
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
    productsHelper.validateProductExist(product)
    res.status(200).json({status:statusCodeText.SUCCESS , message:'Product updated successfully', data:{product}});
})
const deleteProduct = asyncWrapper(async(req, res )=>{
    const pdId = getId(req);
    const product = await productService.deleteProduct(pdId);
    productsHelper.validateProductExist(product);
    res.status(200).json({status:statusCodeText.SUCCESS , message:'Product deleted successfully', data:null});
})

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    addProduct,
    deleteProduct
}