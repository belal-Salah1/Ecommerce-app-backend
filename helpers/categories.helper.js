const appError = require('../utilites/appError');
const statusCodeText = require('../utilites/statusCodeText');

validateCategoryiesExist = (categories) =>{
        if(!categories){
        throw new appError(statusCodeText.FAIL, 400, 'No categories found');
    }
}

validateCategoryExist = (category) => {
    if(!category){
        throw new appError(statusCodeText.FAIL, 400, 'No category found, maybe an invalid id');
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
    validateCategoryiesExist,
    validateCategoryExist,
    validateAllFieldsProvided
}