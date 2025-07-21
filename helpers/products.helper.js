const appError = require('../utilites/appError');
const statusCodeText = require('../utilites/statusCodeText');

validateProductsExist = (products)=>{
    if(!products ){
        throw new appError(statusCodeText.FAIL, 400, 'No products found');
    }
}

validateProductExist = (product) =>{
    if(!product){
        throw new appError(statusCodeText.FAIL, 400, 'Product not found');
    }
}

validateAllFieldsProvided = (...fields) => {
    fields.forEach(field => {
        if(!field){
            throw new appError(statusCodeText.FAIL, 400, `Please provide ${field}`);
        }
    });

}





module.exports = {
    validateProductsExist,
    validateProductExist,
    validateAllFieldsProvided
}